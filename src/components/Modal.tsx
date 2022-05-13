import { MouseEventHandler } from 'react'
import { GrFormClose } from 'react-icons/gr'

type Props = {
  isOpen: boolean
  closeModal: () => void
  children: JSX.Element | JSX.Element[]
}

export const Modal: React.FC<Props> = ({ isOpen, closeModal, children }) => {
  const handleCloseModalOutside: MouseEventHandler = (event) => {
    if (event.target === event.currentTarget) {
      closeModal()
    }
  }

  const handleCloseModal = () => {
    closeModal()
  }

  const isVisible = isOpen ? 'visible opacity-100' : 'invisible opacity-0'
  const isOverlayVisible = isOpen ? 'translate-y-[0%]' : 'translate-y-[100%]'

  return (
    <div
      className={`
        z-20
        fixed top-0 left-0 bottom-0 right-0
        ${isVisible}
        ease-in duration-300
        touch-none
        bg-[#8d7979bd] backdrop-blur-sm
      `}
      onClick={handleCloseModalOutside}
    >
      <div
        className={`
          z-30
          fixed bottom-0
          w-screen
          ${isOverlayVisible}
          ease-in-out duration-300 
        `}
      >
        <div
          className='
            flex
            p-2
            rounded-tl-xl rounded-tr-xl
            bg-white border-b border-b-gray-300
          '
        >
          <GrFormClose
            className='cursor-pointer'
            size={24}
            onClick={handleCloseModal}
          />
        </div>
        <div className='bg-white'>{children}</div>
      </div>
    </div>
  )
}
