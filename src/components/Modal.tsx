import { MouseEventHandler } from 'react'
import { CSSTransition } from 'react-transition-group'
import { GrFormClose } from 'react-icons/gr'

type Props = {
  isOpen: boolean
  closeModal: () => void
  children: JSX.Element | JSX.Element[]
}

export const Modal: React.FC<Props> = ({ isOpen, closeModal, children }) => {
  const onCloseModalOutside: MouseEventHandler = (event) => {
    if (event.target === event.currentTarget) {
      closeModal()
    }
  }

  const onCloseModal = () => {
    closeModal()
  }

  const isVisible = isOpen ? 'visible opacity-100' : 'invisible opacity-0'

  return (
    /* Background */
    <div
      className={`
        z-30
        fixed top-0 left-0 bottom-0 right-0
        flex justify-center items-center
        ${isVisible}
        ease-in duration-300
        touch-none
        bg-[#8d7979bd] backdrop-blur-sm
      `}
      onClick={onCloseModalOutside}
    >
      <CSSTransition
        in={isOpen}
        timeout={300}
        classNames='modal-container'
        unmountOnExit
      >
        {/* Container for animation */}
        <div className='modal-container'>
          {/* Header */}
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
              onClick={onCloseModal}
            />
          </div>
          {/* Content */}
          <div className='bg-white rounded-xl'>{children}</div>
        </div>
      </CSSTransition>
    </div>
  )
}
