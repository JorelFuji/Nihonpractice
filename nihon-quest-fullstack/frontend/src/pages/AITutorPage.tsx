import { useState, useEffect } from 'react'
import { Send, Sparkles, Book, MessageCircle, PenTool, Zap, Languages } from 'lucide-react'
import { useUserStore } from '@/store/userStore'
import { japaneseNLP } from '@/services/japaneseNLP'
import axios from 'axios'

type TutorMode = 'grammar' | 'conversation' | 'correction'

export default function AITutorPage() {
  const { addTutorInteraction, incrementStreak, stats } = useUserStore()
  const [mode, setMode] = useState<TutorMode>('grammar')
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Array<{ role: string; content: string; analysis?: any }>>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showNLPAnalysis, setShowNLPAnalysis] = useState(false)
  const [currentAnalysis, setCurrentAnalysis] = useState<any>(null)

  useEffect(() => {
    // Initialize NLP engine
    japaneseNLP.initialize().catch(console.error)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Analyze Japanese text with NLP
    let analysis = null
    if (japaneseNLP.hasKanji(input) || japaneseNLP.hasHiragana(input) || japaneseNLP.hasKatakana(input)) {
      try {
        const wordInfo = await japaneseNLP.getWordInfo(input)
        const tokens = await japaneseNLP.tokenize(input)
        const furigana = await japaneseNLP.addFurigana(input)
        const romaji = await japaneseNLP.toRomaji(input)
        analysis = { wordInfo, tokens, furigana, romaji }
      } catch (error) {
        console.error('NLP analysis error:', error)
      }
    }

    const userMessage = { role: 'user', content: input, analysis }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)
    
    // Award XP for interaction
    addTutorInteraction()
    incrementStreak()

    try {
      let response: any
      
      if (mode === 'grammar') {
        response = await axios.post('/api/v1/tutor/ask', {
          question: input,
          jlpt_level: 'N5'
        })
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: response.data.answer
        }])
      } else if (mode === 'conversation') {
        response = await axios.post('/api/v1/tutor/conversation', {
          message: input,
          history: messages,
          scenario: 'casual',
          jlpt_level: 'N5'
        })
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: response.data.response
        }])
      } else if (mode === 'correction') {
        response = await axios.post('/api/v1/tutor/correct', {
          text: input,
          jlpt_level: 'N5'
        })
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: response.data.correction
        }])
      }
    } catch (error) {
      console.error('Error:', error)
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. The AI tutor backend is not yet connected. However, your Japanese text has been analyzed! Click the 🔍 button to see NLP analysis.'
      }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-5 py-8 pb-24">
      <div className="bg-white rounded-2xl p-6 mb-6 border-2 border-primary/10">
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="text-primary w-8 h-8" />
          <h2 className="text-3xl font-bold text-primary">AI Sensei</h2>
        </div>
        <p className="text-on-surface-variant mb-6">
          Your personal Japanese tutor powered by AI. Ask grammar questions, practice conversation, or get writing corrections!
        </p>

        <div className="flex gap-3 flex-wrap items-center justify-between">
          <div className="flex gap-3 flex-wrap">
            <ModeButton
              active={mode === 'grammar'}
              onClick={() => setMode('grammar')}
              icon={Book}
              label="Grammar Help"
            />
            <ModeButton
              active={mode === 'conversation'}
              onClick={() => setMode('conversation')}
              icon={MessageCircle}
              label="Conversation"
            />
            <ModeButton
              active={mode === 'correction'}
              onClick={() => setMode('correction')}
              icon={PenTool}
              label="Correction"
            />
          </div>
          <div className="flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-lg border-2 border-yellow-400">
            <Zap className="w-4 h-4 text-yellow-600" />
            <span className="text-sm font-bold text-yellow-700">{stats.totalXP} XP</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border-2 border-primary/10 overflow-hidden">
        <div className="h-[500px] overflow-y-auto p-6 space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-12 text-on-surface-variant">
              <Sparkles className="w-16 h-16 mx-auto mb-4 text-primary/30" />
              <p className="text-lg font-semibold mb-2">Start Your Learning Journey!</p>
              <p className="text-sm">
                {mode === 'grammar' && "Ask me any grammar question, like 'What's the difference between は and が?'"}
                {mode === 'conversation' && "Start a conversation in Japanese! I'll respond and help you practice."}
                {mode === 'correction' && "Write something in Japanese and I'll help you improve it!"}
              </p>
            </div>
          )}
          
          {messages.map((msg, idx) => (
            <div key={idx}>
              <div
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    msg.role === 'user'
                      ? 'bg-primary text-white'
                      : 'bg-surface-container text-on-surface'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                  {msg.analysis && msg.role === 'user' && (
                    <button
                      onClick={() => {
                        setCurrentAnalysis(msg.analysis)
                        setShowNLPAnalysis(true)
                      }}
                      className="mt-2 text-xs flex items-center gap-1 bg-white/20 hover:bg-white/30 px-2 py-1 rounded transition-all"
                    >
                      <Languages className="w-3 h-3" />
                      View NLP Analysis 🔍
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-surface-container rounded-2xl px-4 py-3">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="border-t-2 border-primary/10 p-4 bg-surface">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                mode === 'grammar' 
                  ? "Ask a grammar question..." 
                  : mode === 'conversation'
                  ? "Type in Japanese..."
                  : "Write Japanese text to check..."
              }
              className="flex-1 px-4 py-3 rounded-xl border-2 border-primary/20 focus:border-primary outline-none"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 border-b-4 border-primary/50"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>

      <div className="mt-6 space-y-4">
        <div className="bg-tertiary-container/20 rounded-2xl p-4 border-2 border-tertiary/30">
          <p className="text-sm text-on-surface-variant">
            <span className="font-bold text-tertiary">💡 Pro Tip:</span> The more you practice with AI Sensei, the better your Japanese will become! Try asking follow-up questions.
          </p>
        </div>
        <div className="bg-green-50 rounded-2xl p-4 border-2 border-green-300">
          <p className="text-sm font-bold text-green-800 mb-2">🧠 Japanese NLP Features Active:</p>
          <ul className="text-xs text-green-700 space-y-1">
            <li>✓ Morphology Parsing (MeCab) - Break sentences into words</li>
            <li>✓ Furigana Generation - Pronunciation above kanji</li>
            <li>✓ Kana Conversion - Hiragana ↔ Katakana ↔ Romaji</li>
            <li>✓ Part of Speech Tagging - Grammar analysis</li>
            <li>✓ Tokenization - Word segmentation</li>
          </ul>
          <p className="text-xs text-green-600 mt-2 italic">
            Type Japanese text and click 🔍 to see detailed NLP analysis!
          </p>
        </div>
        <div className="bg-purple-50 rounded-2xl p-4 border-2 border-purple-300">
          <p className="text-sm font-bold text-purple-800 mb-2">📊 Your Stats:</p>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="text-center p-2 bg-white rounded-lg">
              <p className="font-bold text-purple-700">{stats.tutorInteractions}</p>
              <p className="text-purple-600">Interactions</p>
            </div>
            <div className="text-center p-2 bg-white rounded-lg">
              <p className="font-bold text-yellow-700">{stats.totalXP}</p>
              <p className="text-yellow-600">Total XP</p>
            </div>
            <div className="text-center p-2 bg-white rounded-lg">
              <p className="font-bold text-green-700">{stats.dayStreak}</p>
              <p className="text-green-600">Day Streak</p>
            </div>
          </div>
        </div>
      </div>

      {/* NLP Analysis Modal */}
      {showNLPAnalysis && currentAnalysis && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowNLPAnalysis(false)}>
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
              <Languages className="w-6 h-6" />
              Japanese NLP Analysis
            </h3>
            
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-300">
                <h4 className="font-bold text-blue-800 mb-2">📝 Original Text:</h4>
                <p className="text-2xl mb-2">{currentAnalysis.wordInfo.word}</p>
                <div className="space-y-1 text-sm">
                  <p><strong>Hiragana:</strong> {currentAnalysis.wordInfo.hiragana}</p>
                  <p><strong>Romaji:</strong> {currentAnalysis.wordInfo.romaji}</p>
                  <p><strong>Part of Speech:</strong> {currentAnalysis.wordInfo.partOfSpeech}</p>
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg border-2 border-purple-300">
                <h4 className="font-bold text-purple-800 mb-2">🔤 Furigana (Pronunciation):</h4>
                <div className="text-lg" dangerouslySetInnerHTML={{ __html: currentAnalysis.furigana }} />
              </div>

              {currentAnalysis.tokens.length > 0 && (
                <div className="bg-green-50 p-4 rounded-lg border-2 border-green-300">
                  <h4 className="font-bold text-green-800 mb-2">🧩 Morphological Tokens:</h4>
                  <div className="space-y-2">
                    {currentAnalysis.tokens.slice(0, 5).map((token: any, i: number) => (
                      <div key={i} className="bg-white p-2 rounded text-sm">
                        <span className="font-bold">{token.surface}</span> - 
                        <span className="text-gray-600">{token.partOfSpeech}</span>
                        {token.reading && <span className="ml-2 text-purple-600">({token.reading})</span>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={() => setShowNLPAnalysis(false)}
                className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary/90 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function ModeButton({ active, onClick, icon: Icon, label }: {
  active: boolean
  onClick: () => void
  icon: any
  label: string
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all ${
        active
          ? 'bg-primary text-white border-b-4 border-primary/50'
          : 'bg-surface-container text-on-surface-variant hover:bg-primary/10'
      }`}
    >
      <Icon className="w-5 h-5" />
      {label}
    </button>
  )
}

/* Example Phrases for Testing:
こんにちは - Hello
今日は学校へ行きます - I go to school today
日本語を勉強します - I study Japanese
謝ってください - Please apologize
ごめんなさい - I'm sorry
本当にごめんなさい - I'm really sorry
申し訳ありません - I sincerely apologize
食べました - I ate
*/
