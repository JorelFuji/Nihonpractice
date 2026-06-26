from typing import List, Dict, Optional
import openai
import httpx
from app.core.config import settings

class AITutorService:
    def __init__(self):
        self.use_local = settings.USE_LOCAL_LLM
        if not self.use_local and settings.OPENAI_API_KEY:
            openai.api_key = settings.OPENAI_API_KEY
        self.ollama_url = settings.OLLAMA_URL
        
    async def ask_grammar_question(
        self, 
        question: str, 
        context: Optional[str] = None,
        jlpt_level: Optional[str] = None
    ) -> Dict:
        system_prompt = f"""You are a friendly Japanese language tutor specializing in grammar explanations.
        
Guidelines:
- Explain concepts clearly and simply
- Use examples with both Japanese and English
- Break down complex patterns step by step
- Relate to JLPT {jlpt_level or 'N5-N1'} level when relevant
- Be encouraging and patient

Context: {context if context else 'General Japanese grammar'}"""

        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": question}
        ]
        
        if self.use_local:
            response = await self._query_ollama(messages)
        else:
            response = await self._query_openai(messages)
            
        return {
            "answer": response,
            "source": "local_llm" if self.use_local else "openai"
        }
    
    async def generate_practice_sentences(
        self,
        grammar_pattern: str,
        count: int = 3,
        jlpt_level: str = "N5"
    ) -> List[Dict]:
        prompt = f"""Generate {count} practice sentences using the Japanese grammar pattern: {grammar_pattern}

Requirements:
- JLPT {jlpt_level} level vocabulary
- Provide: Japanese sentence, romaji, English translation, and a brief explanation of how the pattern is used
- Make sentences practical and useful for daily conversation

Format as JSON array:
[
  {{
    "japanese": "...",
    "romaji": "...",
    "english": "...",
    "explanation": "..."
  }}
]"""

        messages = [
            {"role": "system", "content": "You are a Japanese language teacher creating practice materials."},
            {"role": "user", "content": prompt}
        ]
        
        if self.use_local:
            response = await self._query_ollama(messages)
        else:
            response = await self._query_openai(messages)
            
        import json
        try:
            sentences = json.loads(response)
            return sentences
        except:
            return [{"japanese": response, "error": "Failed to parse JSON"}]
    
    async def conversation_practice(
        self,
        user_message: str,
        conversation_history: List[Dict],
        scenario: str = "casual",
        jlpt_level: str = "N5"
    ) -> Dict:
        system_prompt = f"""You are a Japanese conversation partner for a {jlpt_level} level student.

Scenario: {scenario}

Guidelines:
- Respond naturally in Japanese appropriate for {jlpt_level} level
- After your Japanese response, provide English translation in parentheses
- Gently correct mistakes by rephrasing naturally
- Keep responses short and conversational
- Use grammar patterns appropriate for the student's level
- Be encouraging and friendly"""

        messages = [{"role": "system", "content": system_prompt}]
        messages.extend(conversation_history)
        messages.append({"role": "user", "content": user_message})
        
        if self.use_local:
            response = await self._query_ollama(messages)
        else:
            response = await self._query_openai(messages)
            
        return {
            "response": response,
            "feedback": await self._generate_feedback(user_message, jlpt_level)
        }
    
    async def correct_writing(
        self,
        text: str,
        jlpt_level: str = "N5"
    ) -> Dict:
        prompt = f"""Review this Japanese text written by a {jlpt_level} level student:

"{text}"

Provide:
1. Corrected version (if needed)
2. Explanation of any errors
3. Suggestions for improvement
4. Encouragement

Be constructive and kind."""

        messages = [
            {"role": "system", "content": "You are a patient Japanese writing tutor."},
            {"role": "user", "content": prompt}
        ]
        
        if self.use_local:
            response = await self._query_ollama(messages)
        else:
            response = await self._query_openai(messages)
            
        return {"correction": response}
    
    async def explain_kanji(
        self,
        kanji: str,
        include_mnemonics: bool = True
    ) -> Dict:
        prompt = f"""Explain the kanji: {kanji}

Provide:
1. Meaning(s)
2. Common readings (onyomi and kunyomi)
3. Stroke order tips
4. Common words using this kanji
{"5. A helpful mnemonic or memory aid" if include_mnemonics else ""}

Keep it friendly and easy to understand."""

        messages = [
            {"role": "system", "content": "You are a kanji expert and teacher."},
            {"role": "user", "content": prompt}
        ]
        
        if self.use_local:
            response = await self._query_ollama(messages)
        else:
            response = await self._query_openai(messages)
            
        return {"explanation": response}
    
    async def _query_openai(self, messages: List[Dict]) -> str:
        try:
            response = await openai.ChatCompletion.acreate(
                model=settings.DEFAULT_MODEL,
                messages=messages,
                temperature=0.7,
                max_tokens=1000
            )
            return response.choices[0].message.content
        except Exception as e:
            return f"Error querying OpenAI: {str(e)}"
    
    async def _query_ollama(self, messages: List[Dict]) -> str:
        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    f"{self.ollama_url}/api/chat",
                    json={
                        "model": settings.LOCAL_MODEL,
                        "messages": messages,
                        "stream": False
                    },
                    timeout=60.0
                )
                result = response.json()
                return result.get("message", {}).get("content", "No response")
        except Exception as e:
            return f"Error querying Ollama: {str(e)}"
    
    async def _generate_feedback(self, user_message: str, jlpt_level: str) -> Optional[str]:
        if len(user_message) < 5:
            return None
            
        prompt = f"""Analyze this Japanese message from a {jlpt_level} student: "{user_message}"

Provide brief, encouraging feedback on:
- Grammar usage
- Natural phrasing
- Vocabulary choice

Keep it under 50 words and positive."""

        messages = [
            {"role": "system", "content": "You are a supportive language coach."},
            {"role": "user", "content": prompt}
        ]
        
        try:
            if self.use_local:
                return await self._query_ollama(messages)
            else:
                return await self._query_openai(messages)
        except:
            return None

ai_tutor = AITutorService()
