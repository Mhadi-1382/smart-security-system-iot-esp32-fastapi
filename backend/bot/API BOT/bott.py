"""
Telegram Bot
"""

import httpx
import time


BOT_TOKEN = ""
CHAT_ID = ""
URL = f"https://api.telegram.org/bot{BOT_TOKEN}/sendPhoto"
PROXIES = "socks5://127.0.0.1:1080"

def send_message_tel(photo_path: str, caption: str):
    data = {
        "chat_id": CHAT_ID,
        "photo": photo_path,
        "caption": caption
    }
    #files = {"photo": open(photo_path, "rb")}

    with httpx.Client(timeout=30) as client:
        response = client.post(URL, data=data)
        print(response.json())
        time.sleep(0.5)

send_message_tel(photo_path="https://m3list.com/wp-content/uploads/2024/03/individual-frozen-black-f80-m3-jesse-bmw-m3-F80-M3-ownership-m3list-satin-matte-black-satin-black-matte-black-frozen-black-e1711888731373.jpg", caption="Motion Deteceted!")