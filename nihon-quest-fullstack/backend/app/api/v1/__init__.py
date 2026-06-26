from fastapi import APIRouter
from app.api.v1.endpoints import auth, vocabulary, srs, lessons, ai_tutor, practice

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["authentication"])
api_router.include_router(vocabulary.router, prefix="/vocab", tags=["vocabulary"])
api_router.include_router(srs.router, prefix="/srs", tags=["spaced-repetition"])
api_router.include_router(lessons.router, prefix="/lessons", tags=["lessons"])
api_router.include_router(ai_tutor.router, prefix="/tutor", tags=["ai-tutor"])
api_router.include_router(practice.router, prefix="/practice", tags=["practice"])
