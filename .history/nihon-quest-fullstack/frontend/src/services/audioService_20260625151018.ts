class AudioService {
  private synth = window.speechSynthesis
  private voices: SpeechSynthesisVoice[] = []
  private audioCache = new Map<string, HTMLAudioElement>()

  constructor() {
    this.loadVoices()
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = () => this.loadVoices()
    }
  }

  private loadVoices() {
    this.voices = this.synth.getVoices()
  }

  async speakJapanese(text: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.synth) {
        reject(new Error('Speech synthesis not supported'))
        return
      }

      const utterance = new SpeechSynthesisUtterance(text)
      
      // Try to find Japanese voice
      const japaneseVoice = this.voices.find(voice => 
        voice.lang.startsWith('ja')
      )
      
      if (japaneseVoice) {
        utterance.voice = japaneseVoice
      }
      
      utterance.lang = 'ja-JP'
      utterance.rate = 0.9
      utterance.pitch = 1.0

      utterance.onend = () => resolve()
      utterance.onerror = (e) => reject(e)

      this.synth.speak(utterance)
    })
  }

  async speakEnglish(text: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.synth) {
        reject(new Error('Speech synthesis not supported'))
        return
      }

      const utterance = new SpeechSynthesisUtterance(text)
      
      // Try to find English voice
      const englishVoice = this.voices.find(voice => 
        voice.lang.startsWith('en')
      )
      
      if (englishVoice) {
        utterance.voice = englishVoice
      }
      
      utterance.lang = 'en-US'
      utterance.rate = 0.9
      utterance.pitch = 1.0

      utterance.onend = () => resolve()
      utterance.onerror = (e) => reject(e)

      this.synth.speak(utterance)
    })
  }

  stopSpeaking() {
    this.synth.cancel()
  }

  getAvailableVoices(): { japanese: SpeechSynthesisVoice[]; english: SpeechSynthesisVoice[] } {
    return {
      japanese: this.voices.filter(v => v.lang.startsWith('ja')),
      english: this.voices.filter(v => v.lang.startsWith('en'))
    }
  }
}

export const audioService = new AudioService()

// Voice Recording Service
export class VoiceRecorder {
  private mediaRecorder: MediaRecorder | null = null
  private audioChunks: Blob[] = []
  private stream: MediaStream | null = null

  async startRecording(): Promise<void> {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      this.mediaRecorder = new MediaRecorder(this.stream)
      this.audioChunks = []

      this.mediaRecorder.ondataavailable = (event) => {
        this.audioChunks.push(event.data)
      }

      this.mediaRecorder.start()
    } catch (error) {
      console.error('Failed to start recording:', error)
      throw error
    }
  }

  async stopRecording(): Promise<Blob> {
    return new Promise((resolve, reject) => {
      if (!this.mediaRecorder) {
        reject(new Error('No recording in progress'))
        return
      }

      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' })
        this.cleanup()
        resolve(audioBlob)
      }

      this.mediaRecorder.stop()
    })
  }

  private cleanup() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop())
      this.stream = null
    }
    this.mediaRecorder = null
    this.audioChunks = []
  }

  isRecording(): boolean {
    return this.mediaRecorder?.state === 'recording'
  }
}

export function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}

export function base64ToBlob(base64: string): Blob {
  const parts = base64.split(';base64,')
  const contentType = parts[0].split(':')[1]
  const raw = window.atob(parts[1])
  const rawLength = raw.length
  const uInt8Array = new Uint8Array(rawLength)

  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i)
  }

  return new Blob([uInt8Array], { type: contentType })
}
