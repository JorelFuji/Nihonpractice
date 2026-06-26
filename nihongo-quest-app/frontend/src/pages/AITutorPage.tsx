import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import { aiTutorService } from '@/lib/aiTutorService'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const quickPrompts = [
  { icon: '🤔', text: 'Explain は vs が', category: 'Grammar' },
  { icon: '✍️', text: 'How do I say "I want to..."', category: 'Grammar' },
  { icon: '📚', text: 'What is the difference between 見る and 観る?', category: 'Vocabulary' },
  { icon: '💬', text: 'Teach me casual greetings', category: 'Conversation' },
  { icon: '🎯', text: 'Create a practice quiz for N5', category: 'Practice' },
  { icon: '📖', text: 'Explain て-form conjugation', category: 'Grammar' },
]

export default function AITutorPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      content: 'こんにちは！(Konnichiwa!) I\'m your AI Japanese tutor! 🌸\n\nI can help you with:\n• Grammar explanations (は vs が, particles, conjugations)\n• Vocabulary questions\n• Conversation practice\n• Custom practice quizzes\n• Cultural insights\n\nWhat would you like to learn today?',
      timestamp: new Date(),
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || input.trim()
    if (!textToSend || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: textToSend,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await aiTutorService.chat(textToSend, messages)
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      toast.error('Failed to get response from AI tutor')
      console.error('AI Tutor error:', error)
    } finally {
      setIsLoading(false)
      inputRef.current?.focus()
    }
  }

  const handleQuickPrompt = (prompt: string) => {
    handleSendMessage(prompt)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-4xl mx-auto px-container-margin">
      {/* Header */}
      <div className="py-lg">
        <h1 className="font-display-lg-mobile text-display-lg-mobile text-primary mb-xs">
          AI Japanese Tutor 🤖
        </h1>
        <p className="font-body-md text-on-surface-variant">
          Ask me anything about Japanese! Grammar, vocab, culture, practice...
        </p>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto mb-md space-y-md pb-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] md:max-w-[70%] p-md rounded-lg ${
                  message.role === 'user'
                    ? 'bg-primary text-on-primary rounded-br-sm'
                    : 'bg-white border-2 border-surface-container-highest rounded-bl-sm'
                }`}
              >
                <div className="whitespace-pre-wrap font-body-md">
                  {message.content}
                </div>
                <div
                  className={`text-xs mt-2 ${
                    message.role === 'user' ? 'text-primary-fixed-dim' : 'text-on-surface-variant'
                  }`}
                >
                  {message.timestamp.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-white border-2 border-surface-container-highest p-md rounded-lg">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts */}
      {messages.length <= 1 && (
        <div className="mb-md">
          <p className="font-label-bold text-on-surface-variant mb-sm">Quick Questions:</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-sm">
            {quickPrompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => handleQuickPrompt(prompt.text)}
                className="bg-white border-2 border-surface-container-highest hover:border-primary p-sm rounded-lg text-left transition-all active:scale-95"
              >
                <div className="text-2xl mb-1">{prompt.icon}</div>
                <div className="font-label-sm text-on-surface-variant text-[10px] uppercase tracking-wider mb-1">
                  {prompt.category}
                </div>
                <div className="font-body-md text-sm text-on-surface line-clamp-2">
                  {prompt.text}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="bg-white border-t-4 border-surface-container-highest p-md rounded-t-lg sticky bottom-0">
        <div className="flex gap-sm items-end">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything in English or Japanese..."
            className="flex-1 bg-surface-container px-md py-sm rounded-lg border-2 border-surface-container-highest focus:border-primary focus:outline-none resize-none font-body-md"
            rows={1}
            style={{ minHeight: '44px', maxHeight: '120px' }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement
              target.style.height = 'auto'
              target.style.height = target.scrollHeight + 'px'
            }}
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={!input.trim() || isLoading}
            className="bg-primary text-on-primary p-sm rounded-lg tactile-btn disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="material-symbols-outlined text-2xl">send</span>
          </button>
        </div>
        <p className="text-xs text-on-surface-variant mt-sm text-center">
          Powered by ChatGPT • Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </div>
  )
}
