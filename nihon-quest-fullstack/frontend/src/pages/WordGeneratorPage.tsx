import WordOfDay from '@/components/WordOfDay'
import { Sparkles } from 'lucide-react'

export default function WordGeneratorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/5 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary/10 rounded-full mb-4">
            <Sparkles className="w-8 h-8 text-secondary" />
          </div>
          <h1 className="text-4xl font-bold mb-2">Random Word Generator</h1>
          <p className="text-muted-foreground text-lg">
            Discover new Japanese vocabulary randomly
          </p>
        </div>

        <div className="grid gap-6">
          <WordOfDay mode="random" />
          
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-6 text-center">
            <h2 className="text-2xl font-bold mb-3">How to Use</h2>
            <div className="grid md:grid-cols-3 gap-4 text-left">
              <div className="bg-white p-4 rounded-lg">
                <p className="font-semibold mb-2">1️⃣ Click the Card</p>
                <p className="text-sm text-muted-foreground">
                  Click on the word card to flip it and reveal the meaning
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <p className="font-semibold mb-2">2️⃣ Study the Example</p>
                <p className="text-sm text-muted-foreground">
                  See how the word is used in a real sentence
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <p className="font-semibold mb-2">3️⃣ Generate New Word</p>
                <p className="text-sm text-muted-foreground">
                  Click "New Word" button to get a random vocabulary
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
