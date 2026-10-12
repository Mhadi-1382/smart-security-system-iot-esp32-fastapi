"""
ESP32 Board Utils
"""

# import httpx
import requests
import threading
from winsound import PlaySound, SND_LOOP, SND_ASYNC, SND_PURGE

from .esp32 import esp32


def esp32_serial():
    request_url = "http://localhost:8000/device/motion"

    count = 0
    while True:
        readline_data = esp32.readline().decode("utf-8").strip()
        esp32.reset_input_buffer()

        if "HIGH" in readline_data:
            requests.post(request_url, params={"status": True})

            count += 1
            print(f"{count}:", True)
        # else:
        #     requests.post(request_url, params={"status": True})
        #     print(False)

def system_alarm(status: bool):
    if status == True:
        PlaySound(sound="static/audio/Receive_Call.wav", flags=SND_LOOP + SND_ASYNC)
    else:
        PlaySound(None, flags=SND_PURGE)


threading.Thread(target=esp32_serial, daemon=True).start()
