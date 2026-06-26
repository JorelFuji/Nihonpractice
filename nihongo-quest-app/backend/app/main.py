from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api import practice, ai_tutor, lessons, dictionary, users

app = FastAPI(
    title="NihongoQuest API",
    description="Full-stack Japanese learning platform with AI tutor",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(ai_tutor.router, prefix="/api/ai-tutor", tags=["AI Tutor"])
app.include_router(practice.router, prefix="/api/practice", tags=["Practice"])
app.include_router(lessons.router, prefix="/api/lessons", tags=["Lessons"])
app.include_router(dictionary.router, prefix="/api/dictionary", tags=["Dictionary"])
app.include_router(users.router, prefix="/api/users", tags=["Users"])

@app.get("/")
async def root():
    return {
        "message": "Welcome to NihongoQuest API!",
        "docs": "/docs",
        "health": "/health"
    }

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "environment": settings.ENVIRONMENT,
        "openai_configured": bool(settings.OPENAI_API_KEY)
    }
