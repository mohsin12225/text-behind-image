import { useState, useRef } from 'react'
import UploadImage from './components/UploadImage.jsx'
import TextControls from './components/TextControls.jsx'
import CanvasEditor from './components/CanvasEditor.jsx'
import DownloadButton from './components/DownloadButton.jsx'

const DEFAULT_TEXT_STYLE = {
  text: 'YOUR TEXT',
  font: 'Syne',
  size: 80,
  color: '#ffffff',
  bold: true,
  italic: false,
  x: 0.5,   // normalized 0-1
  y: 0.5,
  opacity: 1,
  letterSpacing: 0,
}

export default function App() {
  const [image, setImage] = useState(null)          // { src, width, height }
  const [foregroundMask, setForegroundMask] = useState(null)  // base64 PNG mask
  const [textStyle, setTextStyle] = useState(DEFAULT_TEXT_STYLE)
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingStatus, setProcessingStatus] = useState('')
  const [error, setError] = useState(null)
  const stageRef = useRef(null)

  const handleImageUpload = (imgData) => {
    setImage(imgData)
    setForegroundMask(null)
    setError(null)
  }

  const handleSegment = async (imageBase64) => {
    setIsProcessing(true)
    setProcessingStatus('Analyzing image with AI...')
    setError(null)
    try {
      const response = await fetch('/api/groq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: imageBase64 }),
      })
      if (!response.ok) {
        const err = await response.json()
        throw new Error(err.error || 'Segmentation failed')
      }
      const data = await response.json()
      setForegroundMask(data.mask)
      setProcessingStatus('Done! Drag the text to position it.')
    } catch (e) {
      setError(e.message)
      setProcessingStatus('')
    } finally {
      setIsProcessing(false)
    }
  }

  const step = !image ? 1 : !foregroundMask ? 2 : 3

  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <div className="logo">
            <span className="logo-icon">◈</span>
            <span className="logo-text">TextBehind<em>AI</em></span>
          </div>
          <p className="tagline">Place text behind any subject — like magic.</p>
        </div>
      </header>

      <main className="main">
        {/* Step indicators */}
        <div className="steps">
          {['Upload Image', 'AI Segment', 'Style & Export'].map((label, i) => (
            <div key={i} className={`step ${step === i + 1 ? 'active' : ''} ${step > i + 1 ? 'done' : ''}`}>
              <div className="step-num">{step > i + 1 ? '✓' : i + 1}</div>
              <span>{label}</span>
            </div>
          ))}
        </div>

        <div className="workspace">
          {/* Left panel */}
          <div className="panel panel-left">
            <UploadImage
              onUpload={handleImageUpload}
              onSegment={handleSegment}
              image={image}
              isProcessing={isProcessing}
              processingStatus={processingStatus}
              hasMask={!!foregroundMask}
            />

            {image && foregroundMask && (
              <TextControls
                textStyle={textStyle}
                onChange={setTextStyle}
              />
            )}
          </div>

          {/* Right panel - canvas */}
          <div className="panel panel-right">
            {!image ? (
              <div className="canvas-placeholder">
                <div className="placeholder-inner">
                  <div className="placeholder-icon">🖼</div>
                  <p>Upload an image to get started</p>
                  <span>Portraits, products, objects — anything with a clear subject</span>
                </div>
              </div>
            ) : (
              <>
                <CanvasEditor
                  image={image}
                  foregroundMask={foregroundMask}
                  textStyle={textStyle}
                  onTextMove={(x, y) => setTextStyle(s => ({ ...s, x, y }))}
                  stageRef={stageRef}
                />
                {foregroundMask && (
                  <DownloadButton stageRef={stageRef} />
                )}
              </>
            )}

            {error && (
              <div className="error-banner">
                <span>⚠</span> {error}
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>Powered by Groq AI · Built with React + Konva</p>
      </footer>
    </div>
  )
}
