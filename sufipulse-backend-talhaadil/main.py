from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from api import auth_router,user_router,admin_router,vocalist_router,kalam_router,studio_router,notification_router,public_router,writer_router,blogger_router,youtube_router,recording_requests_router,cms_router
from db.connection import DBConnection
import os
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="My App")

@app.on_event("startup")
async def startup_db_client():
    """Test database connection on startup"""
    try:
        conn = DBConnection.get_connection()
        if conn:
            logger.info("✅ Database connected successfully!")
            conn.close()
        else:
            logger.error("❌ Failed to connect to database")
    except Exception as e:
        logger.error(f"❌ Database connection failed: {e}")

# CORS middleware - MUST BE ADDED FIRST before any other middleware/routers
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3001",
        "https://sufipulse.com",
        "http://127.0.0.1",
        "http://localhost:8000",
        "http://127.0.0.1:8000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)

# Create uploads directory if it doesn't exist
os.makedirs("uploads/blog-images", exist_ok=True)

# Mount static files for uploaded images
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

app.include_router(auth_router)
app.include_router(user_router)
app.include_router(admin_router)
app.include_router(vocalist_router)
app.include_router(kalam_router)
app.include_router(studio_router)
app.include_router(notification_router)
app.include_router(public_router)
app.include_router(writer_router)
app.include_router(blogger_router)
app.include_router(youtube_router)
app.include_router(recording_requests_router)
app.include_router(cms_router)
