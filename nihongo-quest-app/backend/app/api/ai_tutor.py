from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from app.services.openai_service import OpenAIService

router = APIRouter()
openai_service = OpenAIService()

class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    message: str
    history: Optional[List[Message]] = []

class ChatResponse(BaseModel):
    response: str

class GrammarExplanationRequest(BaseModel):
    grammar_point: str
    jlpt_level: str = "N5"

class GrammarExplanationResponse(BaseModel):
    explanation: str
    examples: List[str]

class QuizRequest(BaseModel):
    topic: str
    jlpt_level: str = "N5"
    question_count: int = 5

class SentenceCorrectionRequest(BaseModel):
    sentence: str

class SentenceCorrectionResponse(BaseModel):
    corrected_sentence: str
    explanation: str

class TranslationRequest(BaseModel):
    text: str
    source_language: str = "en"
    target_language: str = "ja"

class TranslationResponse(BaseModel):
    translation: str
    reading: str
    explanation: str

@router.post("/chat", response_model=ChatResponse)
async def chat_with_tutor(request: ChatRequest):
    """
    Chat with the AI Japanese tutor. Maintains conversation context.
    """
    try:
        response = await openai_service.chat(
            message=request.message,
            history=request.history
        )
        return ChatResponse(response=response)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Chat failed: {str(e)}")

@router.post("/explain-grammar", response_model=GrammarExplanationResponse)
async def explain_grammar(request: GrammarExplanationRequest):
    """
    Get a detailed explanation of a specific Japanese grammar point.
    """
    try:
        result = await openai_service.explain_grammar(
            grammar_point=request.grammar_point,
            jlpt_level=request.jlpt_level
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Grammar explanation failed: {str(e)}")

@router.post("/generate-quiz")
async def generate_quiz(request: QuizRequest):
    """
    Generate a custom quiz based on topic and JLPT level.
    """
    try:
        quiz = await openai_service.generate_quiz(
            topic=request.topic,
            jlpt_level=request.jlpt_level,
            question_count=request.question_count
        )
        return {"quiz": quiz}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Quiz generation failed: {str(e)}")

@router.post("/correct-sentence", response_model=SentenceCorrectionResponse)
async def correct_sentence(request: SentenceCorrectionRequest):
    """
    Correct a Japanese sentence and provide explanation.
    """
    try:
        result = await openai_service.correct_sentence(request.sentence)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Sentence correction failed: {str(e)}")

@router.post("/translate", response_model=TranslationResponse)
async def translate_with_context(request: TranslationRequest):
    """
    Translate text with cultural context and reading assistance.
    """
    try:
        result = await openai_service.translate_with_context(
            text=request.text,
            source_language=request.source_language,
            target_language=request.target_language
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Translation failed: {str(e)}")
