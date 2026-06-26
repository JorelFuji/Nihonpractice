import { useState, useEffect } from 'react'
import { Volume2, Mic, Square, Play, RotateCcw, ThumbsUp, ThumbsDown, Star, Zap } from 'lucide-react'
import { flashcardService, type Flashcard } from '@/services/flashcardService'
import { audioService, VoiceRecorder, blobToBase64, base64ToBlob } from '@/services/audioService'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { BlockFurigana } from '@/components/Furigana'

export default function FlashcardPage() {
  const [currentCard, setCurrentCard] = useState<Flashcard | null>(null)
  const [isFlipped, setIsFlipped] = useState(false)
  const [showingWritingSystem, setShowingWritingSystem] = useState<'hiragana' | 'katakana' | 'kanji' | 'romaji'>('hiragana')
  const [isRecording, setIsRecording] = useState(false)
  const [recorder] = useState(() => new VoiceRecorder())
  const [isPlayingOwn, setIsPlayingOwn] = useState(false)
  const [stats, setStats] = useState({ reviewed: 0, correct: 0 })

  useEffect(() => {
    loadNextCard()
  }, [])

  const loadNextCard = () => {
    const card = flashcardService.getRandomCard()
    setCurrentCard(card)
    setIsFlipped(false)
    setShowingWritingSystem('hiragana')
  }

  const handlePlayJapanese = async () => {
    if (!currentCard) return
    try {
      await audioService.speakJapanese(currentCard.japanese)
    } catch (error) {
      console.error('Failed to play Japanese:', error)
    }
  }

  const handlePlayEnglish = async () => {
    if (!currentCard) return
    try {
      await audioService.speakEnglish(currentCard.english)
    } catch (error) {
      console.error('Failed to play English:', error)
    }
  }

  const handleStartRecording = async () => {
    try {
      await recorder.startRecording()
      setIsRecording(true)
    } catch (error) {
      console.error('Failed to start recording:', error)
      alert('Microphone access denied. Please allow microphone access to record.')
    }
  }

  const handleStopRecording = async () => {
    if (!currentCard) return
    try {
      const audioBlob = await recorder.stopRecording()
      const base64Audio = await blobToBase64(audioBlob)
      flashcardService.saveAudioRecording(currentCard.id, base64Audio)
      setIsRecording(false)
      setCurrentCard({ ...currentCard, audioRecording: base64Audio })
    } catch (error) {
      console.error('Failed to stop recording:', error)
    }
  }

  const handlePlayRecording = () => {
    if (!currentCard?.audioRecording) return
    const blob = base64ToBlob(currentCard.audioRecording)
    const url = URL.createObjectURL(blob)
    const audio = new Audio(url)
    setIsPlayingOwn(true)
    audio.onended = () => setIsPlayingOwn(false)
    audio.play()
  }

  const handleRating = (quality: number) => {
    if (!currentCard) return
    
    flashcardService.updateCardProgress(currentCard.id, quality)
    
    setStats(prev => ({
      reviewed: prev.reviewed + 1,
      correct: quality >= 3 ? prev.correct + 1 : prev.correct
    }))

    if (quality >= 3) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      })
    }

    setTimeout(() => {
      loadNextCard()
    }, 500)
  }

  const cycleWritingSystem = () => {
    const systems: Array<'hiragana' | 'katakana' | 'kanji' | 'romaji'> = ['hiragana', 'katakana', 'kanji', 'romaji']
    const currentIndex = systems.indexOf(showingWritingSystem)
    setShowingWritingSystem(systems[(currentIndex + 1) % systems.length])
  }

  if (!currentCard) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  const getDisplayText = () => {
    switch (showingWritingSystem) {
      case 'hiragana': return currentCard.hiragana
      case 'katakana': return currentCard.katakana
      case 'kanji': return currentCard.japanese
      case 'romaji': return currentCard.romaji
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header with Stats */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold mb-2">
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              ✨ Flashcards ✨
            </span>
          </h1>
          <div className="flex justify-center gap-6 text-lg">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              <span className="font-bold">{stats.reviewed}</span> reviewed
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-green-500" />
              <span className="font-bold">{stats.correct}</span> correct
            </div>
          </div>
        </div>

        {/* Main Flashcard */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCard.id}
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: -90, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-4 border-primary/30 shadow-2xl mb-6 overflow-hidden">
              <div
                className="cursor-pointer bg-gradient-to-br from-white to-primary/5"
                onClick={() => setIsFlipped(!isFlipped)}
              >
                <CardHeader className="text-center bg-gradient-to-r from-primary/10 to-secondary/10">
                  <CardTitle className="text-6xl mb-4">
                    {currentCard.emoji}
                  </CardTitle>
                  <CardDescription className="text-lg">
                    👆 Click card to flip
                  </CardDescription>
                </CardHeader>

                <CardContent className="py-12">
                  {!isFlipped ? (
                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="text-center space-y-6"
                    >
                      {/* Japanese Display */}
                      <div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            cycleWritingSystem()
                          }}
                          className="mb-4"
                        >
                          Switch: {showingWritingSystem}
                        </Button>
                        {showingWritingSystem === 'kanji' ? (
                          <BlockFurigana
                            word={currentCard.japanese}
                            reading={currentCard.hiragana}
                            className="mb-4"
                          />
                        ) : (
                          <>
                            <h2 className="text-6xl font-bold mb-4 text-primary">
                              {getDisplayText()}
                            </h2>
                            <p className="text-2xl text-muted-foreground mb-4">
                              {currentCard.romaji}
                            </p>
                          </>
                        )}
                      </div>

                      {/* Audio Controls */}
                      <div className="flex justify-center gap-4">
                        <Button
                          onClick={(e) => {
                            e.stopPropagation()
                            handlePlayJapanese()
                          }}
                          className="gap-2"
                          size="lg"
                        >
                          <Volume2 className="w-5 h-5" />
                          🇯🇵 Japanese
                        </Button>
                      </div>

                      {/* Recording Controls */}
                      <div className="flex justify-center gap-4">
                        {!isRecording ? (
                          <Button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleStartRecording()
                            }}
                            variant="secondary"
                            className="gap-2"
                          >
                            <Mic className="w-5 h-5" />
                            🎤 Record Your Voice
                          </Button>
                        ) : (
                          <Button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleStopRecording()
                            }}
                            variant="destructive"
                            className="gap-2 animate-pulse"
                          >
                            <Square className="w-5 h-5" />
                            ⏹️ Stop Recording
                          </Button>
                        )}

                        {currentCard.audioRecording && (
                          <Button
                            onClick={(e) => {
                              e.stopPropagation()
                              handlePlayRecording()
                            }}
                            variant="outline"
                            disabled={isPlayingOwn}
                            className="gap-2"
                          >
                            <Play className="w-5 h-5" />
                            🔊 Play My Voice
                          </Button>
                        )}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="text-center space-y-6"
                    >
                      {/* English Side */}
                      <h2 className="text-5xl font-bold mb-6 text-secondary">
                        {currentCard.english}
                      </h2>

                      <Button
                        onClick={(e) => {
                          e.stopPropagation()
                          handlePlayEnglish()
                        }}
                        variant="secondary"
                        className="gap-2"
                        size="lg"
                      >
                        <Volume2 className="w-5 h-5" />
                        🇺🇸 English
                      </Button>

                      {/* All Writing Systems */}
                      <div className="grid grid-cols-2 gap-4 mt-8">
                        <div className="bg-pink-50 p-4 rounded-lg">
                          <p className="text-xs text-muted-foreground mb-2">Hiragana</p>
                          <p className="text-2xl font-bold">{currentCard.hiragana}</p>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-lg">
                          <p className="text-xs text-muted-foreground mb-2">Katakana</p>
                          <p className="text-2xl font-bold">{currentCard.katakana}</p>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <p className="text-xs text-muted-foreground mb-2">Kanji</p>
                          <p className="text-2xl font-bold">{currentCard.japanese}</p>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                          <p className="text-xs text-muted-foreground mb-2">Romaji</p>
                          <p className="text-2xl font-bold">{currentCard.romaji}</p>
                        </div>
                      </div>

                      {/* Example Sentence */}
                      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-lg">
                        <p className="text-lg mb-2">{currentCard.example}</p>
                        <p className="text-sm text-muted-foreground italic">{currentCard.exampleTranslation}</p>
                      </div>
                    </motion.div>
                  )}
                </CardContent>
              </div>

              {/* Rating Buttons (only show when flipped) */}
              {isFlipped && (
                <div className="border-t bg-gradient-to-r from-gray-50 to-gray-100 p-6">
                  <p className="text-center text-sm text-muted-foreground mb-4">
                    💭 How well did you know this?
                  </p>
                  <div className="grid grid-cols-4 gap-3">
                    <Button
                      onClick={() => handleRating(1)}
                      variant="outline"
                      className="flex-col h-auto py-4 border-2 hover:border-red-500 hover:bg-red-50"
                    >
                      <ThumbsDown className="w-6 h-6 mb-2 text-red-500" />
                      <span className="text-xs">😓 Hard</span>
                    </Button>
                    <Button
                      onClick={() => handleRating(2)}
                      variant="outline"
                      className="flex-col h-auto py-4 border-2 hover:border-orange-500 hover:bg-orange-50"
                    >
                      <span className="text-2xl mb-2">😐</span>
                      <span className="text-xs">Okay</span>
                    </Button>
                    <Button
                      onClick={() => handleRating(3)}
                      variant="outline"
                      className="flex-col h-auto py-4 border-2 hover:border-green-500 hover:bg-green-50"
                    >
                      <ThumbsUp className="w-6 h-6 mb-2 text-green-500" />
                      <span className="text-xs">😊 Good</span>
                    </Button>
                    <Button
                      onClick={() => handleRating(4)}
                      variant="outline"
                      className="flex-col h-auto py-4 border-2 hover:border-blue-500 hover:bg-blue-50"
                    >
                      <Star className="w-6 h-6 mb-2 text-yellow-500" />
                      <span className="text-xs">🎉 Easy</span>
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Quick Actions */}
        <div className="flex justify-center gap-4">
          <Button
            onClick={loadNextCard}
            variant="outline"
            size="lg"
            className="gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            ⏭️ Skip
          </Button>
        </div>
      </div>
    </div>
  )
}
