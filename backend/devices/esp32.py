"""
ESP32 Board Connection
"""

import serial
import time
import os


os.system("cls")
esp32 = serial.Serial('COM6', 115200, timeout=10)
esp32.reset_input_buffer()
print("Waiting...")

time.sleep(3)
os.system("cls")


def system_mode_serial(status: bool):
    if status == True:
        esp32.write("ON\n".encode())
    else:
        esp32.write("OFF\n".encode())
