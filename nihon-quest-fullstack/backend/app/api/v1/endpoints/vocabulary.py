from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.database import DictionaryEntry, KanjiEntry

router = APIRouter()

@router.get("/search")
async def search_dictionary(
    q: str = Query(..., min_length=1),
    limit: int = 20,
    db: Session = Depends(get_db)
):
    results = db.query(DictionaryEntry).filter(
        (DictionaryEntry.kanji.like(f"%{q}%")) |
        (DictionaryEntry.reading.like(f"%{q}%")) |
        (DictionaryEntry.romaji.like(f"%{q}%"))
    ).limit(limit).all()
    
    return {"results": results}

@router.get("/word/{word_id}")
async def get_word_details(word_id: int, db: Session = Depends(get_db)):
    word = db.query(DictionaryEntry).filter(DictionaryEntry.id == word_id).first()
    if not word:
        return {"error": "Word not found"}
    return word

@router.get("/kanji/{character}")
async def get_kanji_details(character: str, db: Session = Depends(get_db)):
    kanji = db.query(KanjiEntry).filter(KanjiEntry.character == character).first()
    if not kanji:
        return {"error": "Kanji not found"}
    return kanji
