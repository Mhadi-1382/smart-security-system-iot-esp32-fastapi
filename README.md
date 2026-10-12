# Smart Security System IOT ESP32 Fastapi

<br />

*An IoT-based smart security system powered by ESP32 and FastAPI, designed to detect potential security threats through motion detection, capture images of the monitored environment, and send real-time alerts to the relevant user. The system also provides remote control capabilities, enabling users to monitor and manage connected security devices remotely.*

<br />

## Project Architecture

- **Microcontroller (System Core):** ESP32 DevKit V1 with Wi-Fi
- **Sensors & Camera (System Senses):** PIR Motion Sensor and Camera (IP Webcam)
- **Programming Languages (System Brain):** C++, Python, and JavaScript
- **Frameworks & Libraries:** FastAPI, PySerial, SQLAlchemy, HTTPX, and Next.js (React.js)
- **Database:** SQLite3
- **Web Service Architecture:** REST API

## Project Workflow

1. **Motion Detection:** Detects movement using the PIR sensor, with a configurable detection interval (e.g., every 10 seconds).

2. **Image Capture:** Captures an image of the monitored environment whenever motion is detected.

3. **Alert Notifications:** Sends alerts through supported channels, such as notifications, email, SMS, phone calls, or a bot, when motion is detected and an image is successfully captured.

4. **Database Storage:** Stores event data and related information in the database after the required detection, image capture, and processing steps are completed successfully.

5. **Dashboard & Monitoring:** Displays recorded events, captured images, alerts, and other available information in the web dashboard.

## Documentation

- [Project Documentation](https://github.com/Mhadi-1382/smart-security-system-iot-esp32-fastapi/blob/main/assets/Docs.pdf)

## License

This project is licensed under the [MIT License](https://github.com/Mhadi-1382/ayat/blob/main/LICENSE).
