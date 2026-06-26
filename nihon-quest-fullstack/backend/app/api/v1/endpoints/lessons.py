from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.database import Lesson, UserLessonProgress

router = APIRouter()

@router.get("/")
async def get_lessons(jlpt_level: str = None, db: Session = Depends(get_db)):
    query = db.query(Lesson).filter(Lesson.is_published == True)
    if jlpt_level:
        query = query.filter(Lesson.jlpt_level == jlpt_level)
    lessons = query.order_by(Lesson.order).all()
    return {"lessons": lessons}

@router.get("/{lesson_id}")
async def get_lesson_details(lesson_id: int, db: Session = Depends(get_db)):
    lesson = db.query(Lesson).filter(Lesson.id == lesson_id).first()
    if not lesson:
        return {"error": "Lesson not found"}
    return lesson
