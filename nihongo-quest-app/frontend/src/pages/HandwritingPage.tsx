import { useRef, useState, useEffect } from 'react'
import toast from 'react-hot-toast'

export default function HandwritingPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [paths, setPaths] = useState<Array<Array<{ x: number; y: number }>>>([])
  const [currentPath, setCurrentPath] = useState<Array<{ x: number; y: number }>>([])
  const [currentCharacter] = useState('あ')

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resizeCanvas = () => {
      const rect = canvas.parentElement?.getBoundingClientRect()
      if (rect) {
        canvas.width = rect.width
        canvas.height = rect.height
        redraw()
      }
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    return () => window.removeEventListener('resize', resizeCanvas)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const redraw = () => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.lineWidth = 12
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.strokeStyle = '#9c3f59'

    paths.forEach((path) => {
      if (path.length === 0) return
      ctx.beginPath()
      ctx.moveTo(path[0].x, path[0].y)
      path.forEach((point) => {
        ctx.lineTo(point.x, point.y)
      })
      ctx.stroke()
    })
  }

  const getPosition = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }

    const rect = canvas.getBoundingClientRect()
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY

    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    }
  }

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true)
    const pos = getPosition(e)
    setCurrentPath([pos])
  }

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return

    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!ctx) return

    const pos = getPosition(e)
    setCurrentPath((prev) => [...prev, pos])

    ctx.lineWidth = 12
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.strokeStyle = '#9c3f59'
    ctx.lineTo(pos.x, pos.y)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(pos.x, pos.y)
  }

  const stopDrawing = () => {
    if (isDrawing && currentPath.length > 0) {
      setPaths((prev) => [...prev, currentPath])
    }
    setIsDrawing(false)
    setCurrentPath([])
  }

  const clearCanvas = () => {
    setPaths([])
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (ctx && canvas) {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
    toast.success('Canvas cleared!')
  }

  const undoLast = () => {
    setPaths((prev) => prev.slice(0, -1))
    setTimeout(redraw, 0)
    toast.success('Undo!')
  }

  const checkWriting = () => {
    toast.success('すごい！(Sugoi!) Great job! +10 XP', { duration: 2000 })
  }

  return (
    <div className="max-w-md mx-auto px-container-margin py-lg flex flex-col items-center gap-lg pb-32">
      <div>
        <h1 className="font-display-lg-mobile text-display-lg-mobile text-primary text-center mb-xs">
          Handwriting Practice
        </h1>
        <p className="font-body-md text-on-surface-variant text-center">
          Trace the character and practice your strokes
        </p>
      </div>

      {/* Canvas Container */}
      <div className="w-full aspect-square bg-surface-container-lowest rounded-lg border-4 border-surface-container-high relative overflow-hidden shadow-lg">
        {/* Grid Background */}
        <div className="absolute inset-0 canvas-grid pointer-events-none">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full border-t border-dashed border-primary/20" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-full border-l border-dashed border-primary/20" />
          </div>
        </div>

        {/* Ghost Character Guide */}
        <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none opacity-10">
          <span className="text-[240px] font-bold text-primary">{currentCharacter}</span>
        </div>

        {/* Drawing Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full cursor-crosshair"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={(e) => {
            e.preventDefault()
            startDrawing(e)
          }}
          onTouchMove={(e) => {
            e.preventDefault()
            draw(e)
          }}
          onTouchEnd={stopDrawing}
        />
      </div>

      {/* Controls */}
      <div className="w-full flex flex-wrap justify-center gap-md">
        <button
          onClick={undoLast}
          className="flex flex-col items-center justify-center bg-surface-container-high text-on-surface-variant px-md py-sm rounded-xl border-b-4 border-surface-dim transition-all active:translate-y-1"
        >
          <span className="material-symbols-outlined mb-1">undo</span>
          <span className="font-label-sm text-label-sm">Undo</span>
        </button>
        <button
          onClick={clearCanvas}
          className="flex flex-col items-center justify-center bg-surface-container-high text-on-surface-variant px-md py-sm rounded-xl border-b-4 border-surface-dim transition-all active:translate-y-1"
        >
          <span className="material-symbols-outlined mb-1">delete</span>
          <span className="font-label-sm text-label-sm">Clear</span>
        </button>
        <button
          onClick={checkWriting}
          className="flex-1 flex items-center justify-center gap-md bg-primary text-on-primary px-lg py-md rounded-xl border-b-4 border-primary-container font-label-bold text-headline-md transition-all active:translate-y-1"
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
            check_circle
          </span>
          Check
        </button>
      </div>

      {/* Character Info Card */}
      <div className="w-full bg-tertiary-container/20 p-md rounded-lg flex items-center gap-md border-2 border-tertiary-container/30">
        <div className="bg-tertiary text-on-tertiary w-16 h-16 rounded-lg flex items-center justify-center text-display-lg-mobile font-headline-md">
          {currentCharacter}
        </div>
        <div>
          <h3 className="font-label-bold text-primary uppercase tracking-widest text-xs">
            Hiragana "A"
          </h3>
          <p className="text-body-md text-on-surface-variant">Sounds like 'ah' as in 'father'.</p>
          <div className="flex gap-2 mt-2">
            <span className="bg-surface-bright px-2 py-1 rounded-full text-[10px] font-bold text-tertiary border border-tertiary/20">
              3 Strokes
            </span>
            <span className="bg-surface-bright px-2 py-1 rounded-full text-[10px] font-bold text-secondary border border-secondary/20">
              Vowel
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
