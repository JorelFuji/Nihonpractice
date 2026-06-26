from openai import AsyncOpenAI
from typing import List, Dict, Any
from app.core.config import settings
import json

class OpenAIService:
    def __init__(self):
        self.client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)
        self.model = settings.OPENAI_MODEL
        
        self.system_prompt = """You are an expert Japanese language tutor with deep knowledge of:
- Japanese grammar (N5 to N1 JLPT levels)
- Kanji, Hiragana, and Katakana
- Japanese culture and customs
- Common mistakes learners make
- Effective learning strategies

Your teaching style is:
- Patient and encouraging
- Clear and concise
- Uses examples frequently
- Adapts to the learner's level
- Provides cultural context when relevant
- Uses both Japanese and English explanations

When explaining grammar:
1. Give the pattern/structure
2. Explain the meaning
3. Provide 2-3 example sentences with translations
4. Note common mistakes if applicable

Always be supportive and motivating. Use occasional Japanese expressions like:
- がんばって！(Ganbatte! - Do your best!)
- すばらしい！(Subarashii! - Wonderful!)
- よくできました！(Yoku dekimashita! - Well done!)
"""

    async def chat(self, message: str, history: List[Dict[str, str]] = None) -> str:
        """
        Main chat interface with conversation history.
        """
        messages = [{"role": "system", "content": self.system_prompt}]
        
        if history:
            messages.extend([
                {"role": msg["role"], "content": msg["content"]}
                for msg in history
            ])
        
        messages.append({"role": "user", "content": message})
        
        try:
            response = await self.client.chat.completions.create(
                model=self.model,
                messages=messages,
                temperature=0.7,
                max_tokens=1000,
            )
            
            return response.choices[0].message.content
        except Exception as e:
            raise Exception(f"OpenAI API error: {str(e)}")

    async def explain_grammar(self, grammar_point: str, jlpt_level: str = "N5") -> Dict[str, Any]:
        """
        Provide detailed grammar explanation.
        """
        prompt = f"""Explain the Japanese grammar point: {grammar_point}
        
Target level: {jlpt_level}

Please provide:
1. Structure/Pattern
2. Meaning/Usage
3. Three example sentences (Japanese with romaji and English translation)
4. Common mistakes to avoid
5. Related grammar points

Format your response clearly with sections."""

        try:
            response = await self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": self.system_prompt},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.5,
                max_tokens=1500,
            )
            
            explanation = response.choices[0].message.content
            
            examples = [
                "私は学生です。(Watashi wa gakusei desu.) - I am a student.",
                "彼は日本人です。(Kare wa nihonjin desu.) - He is Japanese.",
                "これは本です。(Kore wa hon desu.) - This is a book."
            ]
            
            return {
                "explanation": explanation,
                "examples": examples
            }
        except Exception as e:
            raise Exception(f"Grammar explanation error: {str(e)}")

    async def generate_quiz(self, topic: str, jlpt_level: str = "N5", question_count: int = 5) -> List[Dict[str, Any]]:
        """
        Generate a custom quiz based on topic and level.
        """
        prompt = f"""Create {question_count} multiple choice questions about: {topic}
        
Target level: {jlpt_level}

For each question, provide:
1. Question text in English
2. Four options (mix of Japanese and English where appropriate)
3. Correct answer index (0-3)
4. Brief explanation

Format as JSON array with this structure:
[
  {{
    "question": "question text",
    "options": ["option1", "option2", "option3", "option4"],
    "correctIndex": 0,
    "explanation": "explanation text",
    "japanese": "japanese text",
    "romaji": "romaji reading"
  }}
]"""

        try:
            response = await self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": "You are a Japanese language quiz generator. Always respond with valid JSON."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.7,
                max_tokens=2000,
            )
            
            content = response.choices[0].message.content
            
            try:
                quiz = json.loads(content)
                return quiz
            except json.JSONDecodeError:
                return [{
                    "question": f"What is a basic greeting in Japanese for {topic}?",
                    "options": ["おはよう", "こんにちは", "こんばんは", "さようなら"],
                    "correctIndex": 0,
                    "explanation": "Sample question - JSON parse failed",
                    "japanese": "おはよう",
                    "romaji": "ohayou"
                }]
        except Exception as e:
            raise Exception(f"Quiz generation error: {str(e)}")

    async def correct_sentence(self, sentence: str) -> Dict[str, str]:
        """
        Correct a Japanese sentence and explain errors.
        """
        prompt = f"""Please correct this Japanese sentence if it has any errors: "{sentence}"

Provide:
1. The corrected sentence (or same if correct)
2. Explanation of what was wrong (or confirmation it's correct)
3. Grammar points used

Be encouraging and educational."""

        try:
            response = await self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": self.system_prompt},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.3,
                max_tokens=500,
            )
            
            content = response.choices[0].message.content
            
            return {
                "corrected_sentence": sentence,
                "explanation": content
            }
        except Exception as e:
            raise Exception(f"Sentence correction error: {str(e)}")

    async def translate_with_context(
        self, 
        text: str, 
        source_language: str = "en", 
        target_language: str = "ja"
    ) -> Dict[str, str]:
        """
        Translate with cultural context and reading assistance.
        """
        direction = "English to Japanese" if source_language == "en" else "Japanese to English"
        
        prompt = f"""Translate this text from {direction}: "{text}"

Provide:
1. Natural translation
2. Reading in romaji (if target is Japanese)
3. Brief cultural/usage notes if relevant
4. Formality level (casual/polite/formal)

Make it practical for language learners."""

        try:
            response = await self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": self.system_prompt},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.5,
                max_tokens=800,
            )
            
            content = response.choices[0].message.content
            
            return {
                "translation": "Translation here",
                "reading": "romaji here",
                "explanation": content
            }
        except Exception as e:
            raise Exception(f"Translation error: {str(e)}")
