from fastapi import APIRouter
from pydantic import BaseModel
from typing import List

router = APIRouter()

class Question(BaseModel):
    id: str
    question: str
    options: List[str]
    correctIndex: int
    explanation: str
    japanese: str
    romaji: str

@router.get("/questions")
async def get_practice_questions(level: str = "N5", count: int = 10):
    """
    Get practice questions for a specific JLPT level.
    """
    sample_questions = [
        {
            "id": "1",
            "question": "How do you say 'Good Morning' in Japanese?",
            "options": ["おはよう", "こんにちは", "こんばんは", "さようなら"],
            "correctIndex": 0,
            "explanation": "おはよう (Ohayou) is used in the morning.",
            "japanese": "おはよう",
            "romaji": "Ohayou"
        }
    ]
    return {"questions": sample_questions}

@router.post("/submit")
async def submit_practice_result(
    question_id: str,
    user_answer: int,
    is_correct: bool
):
    """
    Submit practice question result and update progress.
    """
    return {
        "success": True,
        "xp_earned": 10 if is_correct else 0,
        "gems_earned": 5 if is_correct else 0
    }
