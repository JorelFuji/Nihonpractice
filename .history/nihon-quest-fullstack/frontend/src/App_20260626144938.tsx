import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { Toaster as Sonner } from 'sonner'
import HomePage from './pages/HomePage'
import LessonsPage from './pages/LessonsPage'
import AITutorPage from './pages/AITutorPage'
import ProfilePage from './pages/ProfilePage'
import AuthPage from './pages/AuthPage'
import DictionaryPage from './pages/DictionaryPage'
import QuizPage from './pages/QuizPage'
import WordGeneratorPage from './pages/WordGeneratorPage'
import CurriculumPage from './pages/CurriculumPage'
import FlashcardPage from './pages/FlashcardPage'
import SentenceGamePage from './pages/SentenceGamePage'
import GrammarGamePage from './pages/GrammarGamePage'
import VideoLessonsPage from './pages/VideoLessonsPage'
import KidsModePage from './pages/KidsModePage'
import GrammarLearningPage from './pages/GrammarLearningPage'
import StudyJournalPage from './pages/StudyJournalPage'
import AdultLearningPage from './pages/AdultLearningPage'
import Layout from './components/Layout'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Toaster position="top-center" />
        <Sonner />
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="practice" element={<CurriculumPage />} />
            <Route path="flashcards" element={<FlashcardPage />} />
            <Route path="grammar-game" element={<GrammarGamePage />} />
            <Route path="sentence-game" element={<SentenceGamePage />} />
            <Route path="study-journal" element={<StudyJournalPage />} />
            <Route path="adult-learning" element={<AdultLearningPage />} />
            <Route path="kids-mode" element={<KidsModePage />} />
            <Route path="grammar-learning" element={<GrammarLearningPage />} />
            <Route path="video-lessons" element={<VideoLessonsPage />} />
            <Route path="lessons" element={<LessonsPage />} />
            <Route path="dictionary" element={<DictionaryPage />} />
            <Route path="quiz" element={<QuizPage />} />
            <Route path="word-generator" element={<WordGeneratorPage />} />
            <Route path="tutor" element={<AITutorPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
