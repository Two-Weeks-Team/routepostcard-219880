import os
from sqlalchemy import create_engine, Column, Integer, String, Text, DateTime, ForeignKey, func, JSON
from sqlalchemy.orm import declarative_base, relationship, sessionmaker

# ------- Database URL handling -------
# Read from env, with fallbacks
_db_url = os.getenv("DATABASE_URL") or os.getenv("POSTGRES_URL") or "sqlite:///./app.db"
# Replace asyncpg scheme with psycopg
if _db_url.startswith("postgresql+asyncpg://"):
    _db_url = _db_url.replace("postgresql+asyncpg://", "postgresql+psycopg://")
elif _db_url.startswith("postgres://"):
    _db_url = _db_url.replace("postgres://", "postgresql+psycopg://")
# Add sslmode=require for non‑localhost, non‑sqlite URLs
if not _db_url.startswith("sqlite"):
    if "localhost" not in _db_url and "127.0.0.1" not in _db_url:
        if "sslmode=" not in _db_url:
            _db_url = _db_url + ("&" if "?" in _db_url else "?") + "sslmode=require"

# Create engine (synchronous)
engine = create_engine(
    _db_url,
    connect_args={"sslmode": "require"} if not _db_url.startswith("sqlite") else {}
)

SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)
Base = declarative_base()

# ------- Table prefix (rp_) -------
class Postcard(Base):
    __tablename__ = "rp_postcards"
    id = Column(Integer, primary_key=True, index=True)
    city = Column(String, nullable=False)
    brief = Column(Text, nullable=False)
    summary = Column(Text)  # AI‑generated short summary
    data = Column(JSON)     # Full AI result payload
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    # Relationship to items (day cards)
    items = relationship("Item", back_populates="postcard")

class Item(Base):
    __tablename__ = "rp_items"
    id = Column(Integer, primary_key=True, index=True)
    postcard_id = Column(Integer, ForeignKey("rp_postcards.id"), nullable=False)
    title = Column(String, nullable=False)
    description = Column(Text)
    day = Column(Integer)
    postcard = relationship("Postcard", back_populates="items")
