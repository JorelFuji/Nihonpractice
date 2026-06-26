from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class UserProfile(BaseModel):
    user_id: str
    username: str
    level: int
    xp: int
    streak: int
    gems: int

@router.get("/profile")
async def get_user_profile(user_id: str):
    """
    Get user profile and progress.
    """
    return {
        "user_id": user_id,
        "username": "Guest",
        "level": 1,
        "xp": 0,
        "streak": 5,
        "gems": 120
    }

@router.post("/progress")
async def update_user_progress(
    user_id: str,
    xp_gained: int,
    gems_gained: int
):
    """
    Update user progress after completing activities.
    """
    return {
        "success": True,
        "new_xp": 100,
        "new_gems": 125
    }
