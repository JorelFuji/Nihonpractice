from fastapi import APIRouter, Query
from typing import List, Optional
from pydantic import BaseModel

from app.services.jmdict_service import get_jmdict_service

router = APIRouter(prefix="/api/dictionary", tags=["dictionary"])


class DictionarySense(BaseModel):
    partOfSpeech: List[str]
    glosses: List[str]
    info: List[str] = []


class DictionaryEntry(BaseModel):
    id: str
    common: bool
    kanji: List[str]
    kana: List[str]
    senses: List[DictionarySense]


@router.get("/lookup", response_model=List[DictionaryEntry])
async def lookup_word(
    q: str = Query(..., description="Search term (Japanese or English)"),
    prefix: bool = Query(False, description="Enable prefix matching for Japanese"),
    limit: int = Query(20, ge=1, le=100, description="Maximum results")
):
    """
    Look up a word in the JMdict dictionary.
    
    - **q**: Search term (Japanese text or English word/phrase)
    - **prefix**: If true, match Japanese words starting with query
    - **limit**: Maximum number of results (1-100)
    
    Returns matching dictionary entries with kanji, kana, and English definitions.
    """
    service = get_jmdict_service()
    results = service.lookup(q, prefix=prefix, limit=limit)
    return results


@router.get("/random", response_model=List[DictionaryEntry])
async def random_words(
    count: int = Query(10, ge=1, le=50, description="Number of random words")
):
    """
    Get random dictionary entries.
    
    - **count**: Number of random entries to return (1-50)
    
    Returns random common words from the dictionary.
    """
    service = get_jmdict_service()
    results = service.get_random_words(count=count)
    return results


@router.get("/health")
async def dictionary_health():
    """Check if dictionary database is available."""
    service = get_jmdict_service()
    available = service.conn is not None
    
    return {
        "status": "healthy" if available else "unavailable",
        "database": "jmdict.sqlite",
        "message": "Dictionary ready" if available else "Database not found. Run build_jmdict.py to create it."
    }
