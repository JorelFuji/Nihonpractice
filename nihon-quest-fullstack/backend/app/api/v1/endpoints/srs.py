from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.database import Card, Review, User
from app.services.fsrs_service import srs_service

router = APIRouter()

class ReviewRequest(BaseModel):
    card_id: int
    rating: int
    duration_ms: int

class ReviewResponse(BaseModel):
    card_id: int
    next_review: str
    difficulty: float
    stability: float
    state: str

@router.get("/reviews/due")
async def get_due_reviews(
    user_id: int,
    limit: int = 20,
    db: Session = Depends(get_db)
):
    """
    Get cards due for review.
    
    Returns up to `limit` cards that are due for review based on the FSRS algorithm.
    """
    now = datetime.utcnow()
    
    due_cards = db.query(Card).filter(
        Card.user_id == user_id,
        Card.due_date <= now
    ).order_by(Card.due_date).limit(limit).all()
    
    return {
        "count": len(due_cards),
        "cards": [
            {
                "id": card.id,
                "type": card.card_type,
                "front": card.front,
                "back": card.back,
                "due_date": card.due_date.isoformat(),
                "difficulty": card.difficulty,
                "stability": card.stability,
                "reps": card.reps
            }
            for card in due_cards
        ]
    }

@router.post("/reviews/answer")
async def submit_review(
    request: ReviewRequest,
    user_id: int,
    db: Session = Depends(get_db)
) -> ReviewResponse:
    """
    Submit a review answer for a card.
    
    Rating: 1=Again, 2=Hard, 3=Good, 4=Easy
    
    The card's next review date is calculated using the FSRS algorithm.
    """
    card = db.query(Card).filter(
        Card.id == request.card_id,
        Card.user_id == user_id
    ).first()
    
    if not card:
        raise HTTPException(status_code=404, detail="Card not found")
    
    if request.rating not in [1, 2, 3, 4]:
        raise HTTPException(status_code=400, detail="Rating must be 1, 2, 3, or 4")
    
    difficulty_before = card.difficulty
    stability_before = card.stability
    
    review_result = srs_service.review_card(
        rating=request.rating,
        difficulty=card.difficulty,
        stability=card.stability,
        last_review=card.last_review or datetime.utcnow(),
        state=card.state
    )
    
    card.difficulty = review_result["difficulty"]
    card.stability = review_result["stability"]
    card.due_date = datetime.fromisoformat(review_result["due_date"])
    card.state = review_result["state"]
    card.last_review = datetime.utcnow()
    card.reps = review_result["reps"]
    card.lapses = review_result["lapses"]
    card.updated_at = datetime.utcnow()
    
    review = Review(
        user_id=user_id,
        card_id=card.id,
        rating=request.rating,
        duration_ms=request.duration_ms,
        difficulty_before=difficulty_before,
        difficulty_after=card.difficulty,
        stability_before=stability_before,
        stability_after=card.stability,
        reviewed_at=datetime.utcnow()
    )
    
    db.add(review)
    db.commit()
    db.refresh(card)
    
    user = db.query(User).filter(User.id == user_id).first()
    if user:
        user.exp_points += 5 if request.rating >= 3 else 2
        db.commit()
    
    return ReviewResponse(
        card_id=card.id,
        next_review=card.due_date.isoformat(),
        difficulty=card.difficulty,
        stability=card.stability,
        state=card.state
    )

@router.get("/stats")
async def get_srs_stats(
    user_id: int,
    db: Session = Depends(get_db)
):
    """
    Get user's SRS statistics.
    
    Returns card counts, review stats, and retention metrics.
    """
    total_cards = db.query(Card).filter(Card.user_id == user_id).count()
    
    new_cards = db.query(Card).filter(
        Card.user_id == user_id,
        Card.state == "new"
    ).count()
    
    learning_cards = db.query(Card).filter(
        Card.user_id == user_id,
        Card.state.in_(["learning", "relearning"])
    ).count()
    
    review_cards = db.query(Card).filter(
        Card.user_id == user_id,
        Card.state == "review"
    ).count()
    
    now = datetime.utcnow()
    due_today = db.query(Card).filter(
        Card.user_id == user_id,
        Card.due_date <= now
    ).count()
    
    total_reviews = db.query(Review).filter(Review.user_id == user_id).count()
    
    recent_reviews = db.query(Review).filter(
        Review.user_id == user_id
    ).order_by(Review.reviewed_at.desc()).limit(100).all()
    
    if recent_reviews:
        avg_rating = sum(r.rating for r in recent_reviews) / len(recent_reviews)
        retention_rate = sum(1 for r in recent_reviews if r.rating >= 3) / len(recent_reviews) * 100
    else:
        avg_rating = 0
        retention_rate = 0
    
    return {
        "total_cards": total_cards,
        "new_cards": new_cards,
        "learning_cards": learning_cards,
        "review_cards": review_cards,
        "due_today": due_today,
        "total_reviews": total_reviews,
        "avg_rating": round(avg_rating, 2),
        "retention_rate": round(retention_rate, 1)
    }

@router.get("/forecast")
async def get_review_forecast(
    user_id: int,
    days: int = 7,
    db: Session = Depends(get_db)
):
    """
    Get forecast of upcoming reviews for the next N days.
    """
    from datetime import timedelta
    
    forecast = []
    for day in range(days):
        target_date = datetime.utcnow() + timedelta(days=day)
        start_of_day = target_date.replace(hour=0, minute=0, second=0, microsecond=0)
        end_of_day = start_of_day + timedelta(days=1)
        
        count = db.query(Card).filter(
            Card.user_id == user_id,
            Card.due_date >= start_of_day,
            Card.due_date < end_of_day
        ).count()
        
        forecast.append({
            "date": start_of_day.date().isoformat(),
            "reviews_due": count
        })
    
    return {"forecast": forecast}
