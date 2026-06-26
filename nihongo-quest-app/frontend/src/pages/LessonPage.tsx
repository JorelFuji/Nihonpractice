import { useParams } from 'react-router-dom'

export default function LessonPage() {
  const { id } = useParams()
  
  return (
    <div className="max-w-4xl mx-auto px-container-margin py-lg">
      <h1 className="font-display-lg-mobile text-display-lg-mobile text-primary mb-md">
        Lesson {id}
      </h1>
      <p className="font-body-md text-on-surface-variant">
        Lesson content coming soon!
      </p>
    </div>
  )
}
