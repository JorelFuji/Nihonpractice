import { Link } from 'react-router-dom'
import { BookOpen, Target, Sparkles, Brain } from 'lucide-react'
import WordOfDay from '@/components/WordOfDay'
import { japaneseText } from '@/config/japaneseText'

export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-5 py-4 sm:py-8 pb-24">
      <div className="bg-gradient-to-br from-primary/10 to-tertiary/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 mb-4 sm:mb-8 border-2 border-primary/20">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-3 sm:mb-4">
          {japaneseText.home.greeting}
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-on-surface-variant mb-4 sm:mb-6">
          {japaneseText.home.welcomeBack}
        </p>
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
          <Link
            to="/practice"
            className="bg-primary text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-bold hover:bg-primary/90 transition-all active:scale-95 border-b-4 border-primary/50 text-center"
          >
            {japaneseText.home.startPractice}
          </Link>
          <Link
            to="/quiz"
            className="bg-secondary text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-bold hover:bg-secondary/90 transition-all active:scale-95 border-b-4 border-secondary/50 text-center"
          >
            {japaneseText.home.takeQuiz}
          </Link>
          <Link
            to="/tutor"
            className="bg-white text-primary px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-bold hover:bg-surface-container transition-all active:scale-95 border-2 border-primary/20 text-center"
          >
            {japaneseText.home.askAISensei}
          </Link>
        </div>
      </div>

      <div className="mb-4 sm:mb-8">
        <WordOfDay mode="daily" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-8">
        <StatCard
          icon={Target}
          label={japaneseText.home.currentStreak}
          value={`7 ${japaneseText.home.days}`}
          color="primary"
        />
        <StatCard
          icon={Sparkles}
          label={japaneseText.home.totalExp}
          value="1,240 XP"
          color="secondary"
        />
      </div>

      {/* Flutter Mobile Games Featured Banner */}
      <a 
        href="https://nihonselfpacepractic-flutter.web.app" 
        target="_blank" 
        rel="noopener noreferrer"
        className="block mb-6 sm:mb-8"
      >
        <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-2xl hover:shadow-3xl transition-all transform hover:scale-[1.02] relative overflow-hidden">
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_white_1px,_transparent_1px)] bg-[length:30px_30px]"></div>
          </div>
          
          {/* NEW Badge */}
          <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full font-bold text-sm sm:text-base animate-pulse shadow-lg">
            {japaneseText.home.newFeature}
          </div>

          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              {/* Icon */}
              <div className="text-7xl sm:text-8xl animate-bounce">🎮</div>
              
              {/* Content */}
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-3">
                  {japaneseText.home.playMobileGames}
                </h2>
                <p className="text-lg sm:text-xl lg:text-2xl text-white/90 mb-3 sm:mb-4">
                  {japaneseText.home.tryFlutterGames}
                </p>
                <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                  <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white font-semibold text-sm sm:text-base">
                    {japaneseText.home.hiraganaMatch}
                  </span>
                  <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white font-semibold text-sm sm:text-base">
                    {japaneseText.home.audioPronunciation}
                  </span>
                  <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white font-semibold text-sm sm:text-base">
                    {japaneseText.home.funAnimations}
                  </span>
                </div>
              </div>

              {/* CTA Button */}
              <div className="sm:ml-auto">
                <div className="bg-white text-purple-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-lg sm:text-xl shadow-xl hover:shadow-2xl transition-all flex items-center gap-2 hover:scale-110">
                  {japaneseText.home.playNow}
                  <span className="text-2xl">→</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </a>

      <div className="flex justify-between items-center mb-3 sm:mb-4">
        <h3 className="text-xl sm:text-2xl font-bold text-primary">{japaneseText.home.quickAccess}</h3>
        <Link to="/menu">
          <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg font-bold shadow-lg hover:shadow-xl transition-all text-sm">
            {japaneseText.home.viewAll}
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-4 sm:mb-8">
        <Link to="/adult-learning" className="block">
          <div className="bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 rounded-lg sm:rounded-xl p-3 sm:p-5 border-2 border-orange-300/50 hover:border-orange-500 transition-all hover:shadow-lg transform hover:scale-105">
            <div className="text-3xl sm:text-4xl mb-1 sm:mb-2">🎓</div>
            <h4 className="font-bold text-xs sm:text-sm lg:text-base mb-1">{japaneseText.cards.adultLearning.title}</h4>
            <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">{japaneseText.cards.adultLearning.description}</p>
          </div>
        </Link>
        <Link to="/sentence-game" className="block">
          <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 rounded-lg sm:rounded-xl p-3 sm:p-5 border-2 border-purple-300/50 hover:border-purple-500 transition-all hover:shadow-lg transform hover:scale-105">
            <div className="text-3xl sm:text-4xl mb-1 sm:mb-2">🎮</div>
            <h4 className="font-bold text-xs sm:text-sm lg:text-base mb-1">{japaneseText.cards.sovGame.title}</h4>
            <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">{japaneseText.cards.sovGame.description}</p>
          </div>
        </Link>
        <Link to="/flashcards" className="block">
          <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg sm:rounded-xl p-3 sm:p-5 border-2 border-pink-200/50 hover:border-pink-400 transition-all hover:shadow-lg transform hover:scale-105">
            <div className="text-3xl sm:text-4xl mb-1 sm:mb-2">🃏</div>
            <h4 className="font-bold text-xs sm:text-sm lg:text-base mb-1">{japaneseText.cards.flashcards.title}</h4>
            <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">{japaneseText.cards.flashcards.description}</p>
          </div>
        </Link>
        <Link to="/quiz" className="block">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg sm:rounded-xl p-3 sm:p-5 border-2 border-blue-200/50 hover:border-blue-400 transition-all hover:shadow-lg transform hover:scale-105">
            <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 mb-1 sm:mb-2 mx-auto" />
            <h4 className="font-bold text-xs sm:text-sm lg:text-base mb-1">{japaneseText.cards.quiz.title}</h4>
            <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">{japaneseText.cards.quiz.description}</p>
          </div>
        </Link>
        <Link to="/word-generator" className="block">
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg sm:rounded-xl p-3 sm:p-5 border-2 border-yellow-200/50 hover:border-yellow-400 transition-all hover:shadow-lg transform hover:scale-105">
            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600 mb-1 sm:mb-2 mx-auto" />
            <h4 className="font-bold text-xs sm:text-sm lg:text-base mb-1">{japaneseText.cards.randomWord.title}</h4>
            <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">{japaneseText.cards.randomWord.description}</p>
          </div>
        </Link>
        <Link to="/dictionary" className="block">
          <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-lg sm:rounded-xl p-3 sm:p-5 border-2 border-green-200/50 hover:border-green-400 transition-all hover:shadow-lg transform hover:scale-105">
            <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 mb-1 sm:mb-2 mx-auto" />
            <h4 className="font-bold text-xs sm:text-sm lg:text-base mb-1">{japaneseText.cards.dictionary.title}</h4>
            <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">{japaneseText.cards.dictionary.description}</p>
          </div>
        </Link>
        <Link to="/kanji" className="block">
          <div className="bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 rounded-lg sm:rounded-xl p-3 sm:p-5 border-2 border-red-300/50 hover:border-red-500 transition-all hover:shadow-lg transform hover:scale-105">
            <div className="text-3xl sm:text-4xl mb-1 sm:mb-2">漢</div>
            <h4 className="font-bold text-xs sm:text-sm lg:text-base mb-1">{japaneseText.cards.kanji.title}</h4>
            <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">{japaneseText.cards.kanji.description}</p>
          </div>
        </Link>
        <Link to="/kids-mode" className="block">
          <div className="bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 rounded-lg sm:rounded-xl p-3 sm:p-5 border-2 border-pink-300/50 hover:border-pink-500 transition-all hover:shadow-lg transform hover:scale-105">
            <div className="text-3xl sm:text-4xl mb-1 sm:mb-2">👶</div>
            <h4 className="font-bold text-xs sm:text-sm lg:text-base mb-1">{japaneseText.cards.kidsMode.title}</h4>
            <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">{japaneseText.cards.kidsMode.description}</p>
          </div>
        </Link>
        <Link to="/grammar-learning" className="block">
          <div className="bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 rounded-lg sm:rounded-xl p-3 sm:p-5 border-2 border-indigo-300/50 hover:border-indigo-500 transition-all hover:shadow-lg transform hover:scale-105">
            <div className="text-3xl sm:text-4xl mb-1 sm:mb-2">📚</div>
            <h4 className="font-bold text-xs sm:text-sm lg:text-base mb-1">{japaneseText.cards.grammarN5N1.title}</h4>
            <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">{japaneseText.cards.grammarN5N1.description}</p>
          </div>
        </Link>
        <Link to="/video-lessons" className="block">
          <div className="bg-gradient-to-br from-red-50 via-pink-50 to-rose-50 rounded-lg sm:rounded-xl p-3 sm:p-5 border-2 border-red-300/50 hover:border-red-500 transition-all hover:shadow-lg transform hover:scale-105">
            <div className="text-3xl sm:text-4xl mb-1 sm:mb-2">📹</div>
            <h4 className="font-bold text-xs sm:text-sm lg:text-base mb-1">{japaneseText.cards.videos.title}</h4>
            <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">{japaneseText.cards.videos.description}</p>
          </div>
        </Link>
        <a href="https://nihonselfpacepractic-flutter.web.app" target="_blank" rel="noopener noreferrer" className="block">
          <div className="bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 rounded-lg sm:rounded-xl p-3 sm:p-5 border-2 border-purple-300/50 hover:border-purple-500 transition-all hover:shadow-lg transform hover:scale-105 relative">
            <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">{japaneseText.cards.mobileGames.new}</div>
            <div className="text-3xl sm:text-4xl mb-1 sm:mb-2">🎮</div>
            <h4 className="font-bold text-xs sm:text-sm lg:text-base mb-1">{japaneseText.cards.mobileGames.title}</h4>
            <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">{japaneseText.cards.mobileGames.description}</p>
          </div>
        </a>
      </div>

      <h3 className="text-xl sm:text-2xl font-bold text-primary mb-3 sm:mb-4">{japaneseText.home.todaysGoals}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <GoalCard
          icon={BookOpen}
          title={japaneseText.home.dailyReviews}
          progress={15}
          total={20}
          color="primary"
        />
        <GoalCard
          icon={Brain}
          title={japaneseText.home.quizScore}
          progress={8}
          total={10}
          color="secondary"
        />
        <GoalCard
          icon={Target}
          title={japaneseText.home.newWords}
          progress={5}
          total={10}
          color="tertiary"
        />
      </div>
    </div>
  )
}

function StatCard({ icon: Icon, label, value, color }: any) {
  return (
    <div className={`bg-white rounded-2xl p-6 border-2 border-${color}/10`}>
      <div className="flex items-center gap-4">
        <div className={`bg-${color}/10 p-4 rounded-xl`}>
          <Icon className={`w-8 h-8 text-${color}`} />
        </div>
        <div>
          <p className="text-sm font-semibold text-on-surface-variant">{label}</p>
          <p className={`text-3xl font-bold text-${color}`}>{value}</p>
        </div>
      </div>
    </div>
  )
}

function GoalCard({ icon: Icon, title, progress, total, color }: any) {
  const percentage = (progress / total) * 100

  return (
    <div className="bg-white rounded-xl p-5 border-2 border-primary/10">
      <div className="flex items-center gap-3 mb-3">
        <Icon className={`w-6 h-6 text-${color}`} />
        <h4 className="font-bold text-on-surface">{title}</h4>
      </div>
      <div className="mb-2">
        <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
          <div
            className={`bg-${color} h-full transition-all rounded-full`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
      <p className="text-sm text-on-surface-variant">
        {progress} / {total}
      </p>
    </div>
  )
}
