"""
Smart Security System (IOT)
"""

from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi.staticfiles import StaticFiles
from sqlalchemy.future import select
from sqlalchemy import delete, desc
from jdatetime import datetime
import aiofiles
import httpx
import os

import db.models
from bot.bot import send_photo
from devices.utils import system_alarm
from db.config import Base, engine, get_db
from devices.esp32 import system_mode_serial
from db.models import User, HistoryDiagnoses


app = FastAPI(
    title="Smart Security System (IOT)",
    version="1.0.1"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"],
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)
app.mount("/static", StaticFiles(directory="static"), name="static")


@app.on_event("startup")
async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


@app.post("/device/motion", tags=["Device"])
async def device_motion(status: bool):
    if status == True:
        try:
            os.makedirs("static/images", exist_ok=True)
            filename = datetime.now().strftime("%Y%m%d_%H%M%S") + ".jpg"

            cam_one_url = "http://10.181.168.241:8080/shot.jpg"
            save_path_one = f"static/images/CAM01_{filename}"
            request_url_history_diagnoses_add = "http://localhost:8000/history_diagnoses/add"

            device_alarm(status=True)

            async with httpx.AsyncClient() as client:
                response = await client.get(cam_one_url)
                response.raise_for_status()
            async with aiofiles.open(save_path_one, "wb") as f:
                await f.write(response.content)
                await send_photo(
                    path=f"./{save_path_one}",
                    caption=f"Motion: {True}\nTimestamp: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"
                )
                await httpx.post(request_url_history_diagnoses_add, params={"image_url": save_path_one, "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S")})

            return {"motion": True, "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"), "status": "active", "msg": "motion has been detected."}
        except:
            device_alarm(status=False)
            
            return {"status": "error", "msg": "There is a problem with the source."}
    else:
        return {"motion": False, "status": "inactive", "msg": "no movement detected."}

@app.post("/device/mode", tags=["Device"])
def device_mode(status: bool):
    if status == True:
        system_mode_serial(status=status)
        return {"status": "ok", "msg": "ON"}
    elif status == False:
        system_mode_serial(status=status)
        return {"status": "ok", "msg": "OFF"}
    else:
        return {"status": "error", "msg": "invalid"}

@app.post("/device/alarm", tags=["Device"])
def device_alarm(status: bool):
    if status == True:
        system_alarm(status=True)
        return {"status": "ok", "msg": "ON"}
    elif status == False:
        system_alarm(status=False)
        return {"status": "ok", "msg": "OFF"}
    else:
        return {"status": "error", "msg": "invalid"}


@app.get("/history_diagnoses/info", tags=["History Diagnoses"])
async def history_diagnoses_info(db: AsyncSession = Depends(get_db)):
    try:
        history_diagnoses = await db.execute(select(HistoryDiagnoses).order_by(desc(HistoryDiagnoses.id)))
        history_diagnoses_len = await db.execute(select(HistoryDiagnoses))

        return {"status": "ok", "length": len(history_diagnoses_len.scalars().all()), "history_diagnoses": history_diagnoses.scalars().all()}
    except:
        return {"status": "error", "msg": "History diagnoses does not exist."}

@app.post("/history_diagnoses/add", tags=["History Diagnoses"])
async def history_diagnoses_add(image_url: str, timestamp: str, db: AsyncSession = Depends(get_db)):
    try:
        history_diagnoses = HistoryDiagnoses(image_url=image_url, timestamp=timestamp)
        db.add(history_diagnoses)
        await db.commit()
        await db.refresh(history_diagnoses)

        return {"status": "ok", "msg": "Successful operation."}
    except:
        return {"status": "error", "msg": "History diagnoses does not exist."}

@app.delete("/history_diagnoses/remove", tags=["History Diagnoses"])
async def history_diagnoses_remove(db: AsyncSession = Depends(get_db)):
    try:
        await db.execute(delete(HistoryDiagnoses))
        await db.commit()

        folder_path = "static/images"
        try:
            for file in os.listdir(folder_path):
                os.remove(f"{folder_path}/{file}")
        except:
            print({"status": "error", "msg": "Operation failed."})

        return {"status": "ok", "msg": "Successful operation."}
    except:
        return {"status": "error", "msg": "Operation failed."}


@app.get("/user/info", tags=["User"])
async def info_user(db: AsyncSession = Depends(get_db)):
    try:
        user = await db.execute(select(User))

        return {"status": "ok", "user": user.scalars().first()}
    except:
        return {"status": "error", "msg": "User does not exist."}

@app.post("/user/create", tags=["User"])
async def create_user(username: str, email: str, tel: str, password: str, db: AsyncSession = Depends(get_db)):
    try:
        user = User(username=username, email=email, tel=tel, password=password)
        db.add(user)
        await db.commit()
        await db.refresh(user)

        return {"status": "ok", "msg": "Successful operation."}
    except:
        return {"status": "error", "msg": "Operation failed."}

@app.put("/user/update", tags=["User"])
async def update_user(id: int, username: str, email: str, tel: str, password: str, db: AsyncSession = Depends(get_db)):
    user = await db.execute(select(User).where(User.id == id))
    u = user.scalar_one_or_none()

    if not u:
        return {"status": "error", "msg": "User does not exist."}
    else:
        u.username = username
        u.email = email
        u.tel = tel
        u.password = password
        await db.commit()
        await db.refresh(u)

        return {"status": "ok", "msg": "Successful operation."}
