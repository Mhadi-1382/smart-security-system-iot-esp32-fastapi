"""
Database (SQLite3) Config
"""

from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import declarative_base
from fastapi import Depends


DATABASE_URL = "sqlite+aiosqlite:///./security.db"

engine = create_async_engine(
    DATABASE_URL, echo=True, future=True
)

AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    autoflush=False,
    autocommit=False,
    class_=AsyncSession,
    expire_on_commit=False
)

Base = declarative_base()

async def get_db() -> AsyncSession:
    async with AsyncSessionLocal() as session:
        yield session
