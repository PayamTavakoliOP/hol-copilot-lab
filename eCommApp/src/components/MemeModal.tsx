import { useEffect, useState } from 'react'
import { getRandomMeme } from '../data/memes'

interface MemeModalProps {
  isOpen: boolean
  onClose: () => void
}

const MemeModal = ({ isOpen, onClose }: MemeModalProps) => {
  const [memeUrl, setMemeUrl] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (isOpen) {
      const loadMeme = async () => {
        setLoading(true)
        setError(false)
        
        try {
          const url = await getRandomMeme()
          setMemeUrl(url)

          // Preload image
          const img = new Image()
          img.onload = () => setLoading(false)
          img.onerror = () => {
            setError(true)
            setLoading(false)
          }
          img.src = url
        } catch {
          setError(true)
          setLoading(false)
        }
      }
      
      loadMeme()
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleRefresh = async () => {
    setLoading(true)
    setError(false)
    
    try {
      const url = await getRandomMeme()
      setMemeUrl(url)

      const img = new Image()
      img.onload = () => setLoading(false)
      img.onerror = () => {
        setError(true)
        setLoading(false)
      }
      img.src = url
    } catch {
      setError(true)
      setLoading(false)
    }
  }

  return (
    <div 
      className="meme-modal-overlay" 
      onClick={onClose}
      onKeyDown={(e) => e.key === 'Escape' && onClose()}
      role="presentation"
      tabIndex={-1}
    >
      <div 
        className="meme-modal-content" 
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button
          className="meme-close-button"
          onClick={onClose}
          aria-label="Close meme"
        >
          ✕
        </button>
        <h2 className="meme-modal-title">🔥 Daily Meme 🔥</h2>
        <div className="meme-image-container">
          {loading && (
            <div className="meme-loading">
              <div className="meme-spinner"></div>
              <p>Loading dank meme...</p>
            </div>
          )}
          {error && (
            <div className="meme-error">
              <p>Failed to load meme 😢</p>
              <button onClick={handleRefresh} className="meme-retry-btn">
                Try Another
              </button>
            </div>
          )}
          {!loading && !error && (
            <img
              src={memeUrl}
              alt="Daily meme"
              className="meme-image"
            />
          )}
        </div>
        <div className="meme-actions">
          <button onClick={handleRefresh} className="meme-refresh-btn">
            🎲 Another One
          </button>
        </div>
      </div>
    </div>
  )
}

export default MemeModal
