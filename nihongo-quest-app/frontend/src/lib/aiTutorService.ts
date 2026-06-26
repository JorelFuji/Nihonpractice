import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

class AITutorService {
  async chat(message: string, history: Message[]): Promise<string> {
    try {
      const response = await axios.post(`${API_URL}/api/ai-tutor/chat`, {
        message,
        history: history.slice(-10).map(m => ({
          role: m.role,
          content: m.content
        })),
      })
      
      return response.data.response
    } catch (error) {
      console.error('AI Tutor service error:', error)
      throw new Error('Failed to get response from AI tutor')
    }
  }

  async explainGrammar(grammarPoint: string, level: string = 'N5'): Promise<string> {
    try {
      const response = await axios.post(`${API_URL}/api/ai-tutor/explain-grammar`, {
        grammar_point: grammarPoint,
        jlpt_level: level,
      })
      
      return response.data.explanation
    } catch (error) {
      console.error('Grammar explanation error:', error)
      throw new Error('Failed to get grammar explanation')
    }
  }

  async generateQuiz(topic: string, level: string = 'N5', questionCount: number = 5): Promise<any> {
    try {
      const response = await axios.post(`${API_URL}/api/ai-tutor/generate-quiz`, {
        topic,
        jlpt_level: level,
        question_count: questionCount,
      })
      
      return response.data.quiz
    } catch (error) {
      console.error('Quiz generation error:', error)
      throw new Error('Failed to generate quiz')
    }
  }

  async correctSentence(sentence: string): Promise<{ corrected: string; explanation: string }> {
    try {
      const response = await axios.post(`${API_URL}/api/ai-tutor/correct-sentence`, {
        sentence,
      })
      
      return {
        corrected: response.data.corrected_sentence,
        explanation: response.data.explanation,
      }
    } catch (error) {
      console.error('Sentence correction error:', error)
      throw new Error('Failed to correct sentence')
    }
  }

  async translateWithContext(text: string, sourceLanguage: string = 'en', targetLanguage: string = 'ja'): Promise<{
    translation: string
    reading: string
    explanation: string
  }> {
    try {
      const response = await axios.post(`${API_URL}/api/ai-tutor/translate`, {
        text,
        source_language: sourceLanguage,
        target_language: targetLanguage,
      })
      
      return response.data
    } catch (error) {
      console.error('Translation error:', error)
      throw new Error('Failed to translate')
    }
  }
}

export const aiTutorService = new AITutorService()
