import DictionarySearch from '@/components/DictionarySearch'
import { BookMarked } from 'lucide-react'

export default function DictionaryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/5 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <BookMarked className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-2">
            辞書 Dictionary
          </h1>
          <p className="text-muted-foreground text-lg">
            Bilingual Japanese-English dictionary with instant translation
          </p>
        </div>
        
        <DictionarySearch />
      </div>
    </div>
  )
}
