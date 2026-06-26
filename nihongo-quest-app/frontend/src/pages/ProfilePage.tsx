import { useUserStore } from '@/store/userStore'

export default function ProfilePage() {
  const user = useUserStore()
  
  return (
    <div className="max-w-4xl mx-auto px-container-margin py-lg">
      <h1 className="font-display-lg-mobile text-display-lg-mobile text-primary mb-md">
        Profile
      </h1>
      
      <div className="kawaii-card mb-md">
        <div className="flex items-center gap-md mb-md">
          <div className="w-24 h-24 bg-primary-container rounded-full flex items-center justify-center text-5xl">
            🐕
          </div>
          <div>
            <h2 className="font-headline-md text-headline-md text-on-surface">{user.username}</h2>
            <p className="font-body-md text-on-surface-variant">Level {user.level} • {user.currentJLPTLevel} Student</p>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-md">
          <div className="text-center">
            <div className="font-headline-md text-headline-md text-primary">{user.totalKanji}</div>
            <div className="font-label-sm text-on-surface-variant">Kanji</div>
          </div>
          <div className="text-center">
            <div className="font-headline-md text-headline-md text-secondary">{user.totalVocab}</div>
            <div className="font-label-sm text-on-surface-variant">Vocabulary</div>
          </div>
          <div className="text-center">
            <div className="font-headline-md text-headline-md text-tertiary">{user.totalGrammar}</div>
            <div className="font-label-sm text-on-surface-variant">Grammar</div>
          </div>
        </div>
      </div>

      <div className="kawaii-card">
        <h3 className="font-label-bold text-on-surface mb-md">Settings</h3>
        <p className="font-body-md text-on-surface-variant">Settings coming soon!</p>
      </div>
    </div>
  )
}
