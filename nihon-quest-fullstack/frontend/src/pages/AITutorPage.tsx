import { useState } from 'react'
import { Send, Sparkles, Book, MessageCircle, PenTool } from 'lucide-react'
import axios from 'axios'

type TutorMode = 'grammar' | 'conversation' | 'correction'

export default function AITutorPage() {
  const [mode, setMode] = useState<TutorMode>('grammar')
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

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
        content: 'Sorry, I encountered an error. Please try again.'
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
            <div
              key={idx}
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

      <div className="mt-6 bg-tertiary-container/20 rounded-2xl p-4 border-2 border-tertiary/30">
        <p className="text-sm text-on-surface-variant">
          <span className="font-bold text-tertiary">💡 Pro Tip:</span> The more you practice with AI Sensei, the better your Japanese will become! Try asking follow-up questions.
        </p>
      </div>
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
