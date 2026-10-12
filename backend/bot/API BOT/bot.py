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
    data = {"chat_id": CHAT_ID, "caption": caption}
    files = {"photo": open(photo_path, "rb")}

    with httpx.Client(proxies=PROXIES, timeout=30) as client:
        response = client.post(URL, data=data, files=files)
        print(response.json())
        time.sleep(0.5)

# send_message_tel(photo_path="./static/bmw-m5-sedan-hd-01-2.jpg", caption="Motion Deteceted!")
