import asyncio
from aiogram import Bot, Dispatcher
from aiogram.filters import Command
from aiogram.types import Message, FSInputFile
from aiogram.client.session.aiohttp import AiohttpSession


BOT_TOKEN = ""
CHAT_ID = ""

session = AiohttpSession(proxy="socks5://127.0.0.1:1080")
bot = Bot(token=BOT_TOKEN, session=session)
dp = Dispatcher()


@dp.message(Command("start"))
async def start(message: Message):
    await bot.send_message(CHAT_ID, "مدیر خوش اومدی!")

async def send_photo(path: str, caption: str = None):
    photo = FSInputFile(path)
    await bot.send_photo(CHAT_ID, photo, caption=caption)


async def main():
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())