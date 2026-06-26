from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter()

class Lesson(BaseModel):
    id: str
    title: str
    description: str
    level: str
    duration: int
    content_type: str
    thumbnail_url: Optional[str] = None

@router.get("/")
async def get_lessons(level: str = "N5"):
    """
    Get all lessons for a specific JLPT level.
    """
    lessons = [
        {
            "id": "1",
            "title": "Hiragana: The Basics",
            "description": "Learn the fundamentals of Hiragana",
            "level": "N5",
            "duration": 105,
            "content_type": "video",
            "thumbnail_url": None
        }
    ]
    return {"lessons": lessons}

@router.get("/{lesson_id}")
async def get_lesson_detail(lesson_id: str):
    """
    Get detailed information about a specific lesson.
    """
    return {
        "id": lesson_id,
        "title": "Sample Lesson",
        "description": "Learn Japanese basics",
        "content": "Lesson content here",
        "exercises": []
    }
