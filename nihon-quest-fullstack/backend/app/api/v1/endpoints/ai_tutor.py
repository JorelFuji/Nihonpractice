from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from app.services.ai_tutor import ai_tutor

router = APIRouter()

class GrammarQuestionRequest(BaseModel):
    question: str
    context: Optional[str] = None
    jlpt_level: Optional[str] = None

class PracticeSentencesRequest(BaseModel):
    grammar_pattern: str
    count: int = 3
    jlpt_level: str = "N5"

class ConversationMessage(BaseModel):
    role: str
    content: str

class ConversationRequest(BaseModel):
    message: str
    history: List[ConversationMessage] = []
    scenario: str = "casual"
    jlpt_level: str = "N5"

class WritingCorrectionRequest(BaseModel):
    text: str
    jlpt_level: str = "N5"

class KanjiExplanationRequest(BaseModel):
    kanji: str
    include_mnemonics: bool = True

@router.post("/ask")
async def ask_grammar_question(request: GrammarQuestionRequest):
    """
    Ask the AI tutor a grammar question.
    
    The AI will provide clear explanations with examples tailored to your JLPT level.
    """
    try:
        result = await ai_tutor.ask_grammar_question(
            question=request.question,
            context=request.context,
            jlpt_level=request.jlpt_level
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/generate-sentences")
async def generate_practice_sentences(request: PracticeSentencesRequest):
    """
    Generate practice sentences for a specific grammar pattern.
    
    Returns example sentences with translations and explanations.
    """
    try:
        sentences = await ai_tutor.generate_practice_sentences(
            grammar_pattern=request.grammar_pattern,
            count=request.count,
            jlpt_level=request.jlpt_level
        )
        return {"sentences": sentences}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/conversation")
async def conversation_practice(request: ConversationRequest):
    """
    Practice Japanese conversation with the AI tutor.
    
    The AI responds naturally in Japanese with English translations and gentle corrections.
    """
    try:
        history = [{"role": msg.role, "content": msg.content} for msg in request.history]
        
        result = await ai_tutor.conversation_practice(
            user_message=request.message,
            conversation_history=history,
            scenario=request.scenario,
            jlpt_level=request.jlpt_level
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/correct")
async def correct_writing(request: WritingCorrectionRequest):
    """
    Get corrections and feedback on your Japanese writing.
    
    The AI provides constructive feedback with explanations and suggestions.
    """
    try:
        result = await ai_tutor.correct_writing(
            text=request.text,
            jlpt_level=request.jlpt_level
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/explain-kanji")
async def explain_kanji(request: KanjiExplanationRequest):
    """
    Get a detailed explanation of a kanji character.
    
    Includes meanings, readings, usage examples, and optional mnemonics.
    """
    try:
        result = await ai_tutor.explain_kanji(
            kanji=request.kanji,
            include_mnemonics=request.include_mnemonics
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
