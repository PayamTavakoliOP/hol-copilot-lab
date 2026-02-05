import { useState } from 'react'
import MemeModal from './MemeModal'

const MemeButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <button
        className="meme-fab"
        onClick={() => setIsModalOpen(true)}
        aria-label="Show daily meme"
        title="Click for daily meme!"
      >
        😂
      </button>
      <MemeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}

export default MemeButton
