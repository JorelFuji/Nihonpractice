import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { Toaster as Sonner } from 'sonner'
import HomePage from './pages/HomePage'
import PracticePage from './pages/PracticePage'
import LessonsPage from './pages/LessonsPage'
import AITutorPage from './pages/AITutorPage'
import ProfilePage from './pages/ProfilePage'
import AuthPage from './pages/AuthPage'
import DictionaryPage from './pages/DictionaryPage'
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
            <Route path="practice" element={<PracticePage />} />
            <Route path="lessons" element={<LessonsPage />} />
            <Route path="dictionary" element={<DictionaryPage />} />
            <Route path="tutor" element={<AITutorPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
