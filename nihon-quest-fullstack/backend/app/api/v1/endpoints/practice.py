from fastapi import APIRouter, UploadFile, File
from pydantic import BaseModel
from typing import List, Dict

router = APIRouter()

class HandwritingCheckRequest(BaseModel):
    target_character: str
    strokes: List[Dict]

class SpeechEvaluationRequest(BaseModel):
    target_text: str
    audio_base64: str

@router.post("/handwriting/check")
async def check_handwriting(request: HandwritingCheckRequest):
    score = 85.0
    feedback = "Good stroke order! Pay attention to the angle of stroke 3."
    
    return {
        "score": score,
        "feedback": feedback,
        "passed": score >= 70
    }

@router.post("/speech/evaluate")
async def evaluate_speech(request: SpeechEvaluationRequest):
    accuracy = 82.5
    feedback = "Good pronunciation! Work on the 'tsu' sound."
    
    return {
        "accuracy": accuracy,
        "transcription": request.target_text,
        "feedback": feedback
    }
