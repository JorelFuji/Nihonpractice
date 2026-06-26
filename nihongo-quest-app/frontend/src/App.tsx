import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Layout from '@/components/Layout'
import HomePage from '@/pages/HomePage'
import PracticePage from '@/pages/PracticePage'
import HandwritingPage from '@/pages/HandwritingPage'
import CurriculumPage from '@/pages/CurriculumPage'
import RoadmapPage from '@/pages/RoadmapPage'
import AITutorPage from '@/pages/AITutorPage'
import ProfilePage from '@/pages/ProfilePage'
import LessonPage from '@/pages/LessonPage'

function App() {
  return (
    <Router>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#9c3f59',
            color: '#fff',
            borderRadius: '2rem',
            padding: '16px 24px',
            fontFamily: 'Quicksand',
            fontWeight: 600,
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="practice" element={<PracticePage />} />
          <Route path="handwriting" element={<HandwritingPage />} />
          <Route path="curriculum" element={<CurriculumPage />} />
          <Route path="roadmap" element={<RoadmapPage />} />
          <Route path="ai-tutor" element={<AITutorPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="lesson/:id" element={<LessonPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
