from fastapi import APIRouter, Query
from typing import List, Optional

router = APIRouter()

@router.get("/search")
async def search_dictionary(
    q: str = Query(..., min_length=1, description="Search query"),
    lang: str = Query("en", description="Source language (en or ja)")
):
    """
    Search JMdict dictionary for word definitions.
    """
    return {
        "results": [
            {
                "word": "食べる",
                "reading": "たべる",
                "romaji": "taberu",
                "meanings": ["to eat"],
                "jlpt_level": "N5",
                "example_sentences": [
                    {
                        "japanese": "私は寿司を食べます。",
                        "romaji": "Watashi wa sushi wo tabemasu.",
                        "english": "I eat sushi."
                    }
                ]
            }
        ],
        "count": 1
    }

@router.get("/kanji/{kanji}")
async def get_kanji_info(kanji: str):
    """
    Get detailed information about a kanji character.
    """
    return {
        "kanji": kanji,
        "meanings": ["example"],
        "on_readings": ["オン"],
        "kun_readings": ["くん"],
        "stroke_count": 10,
        "jlpt_level": "N5",
        "examples": []
    }
