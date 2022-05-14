import { MouseEventHandler } from 'react'

type Props = {
  isOpen: boolean
  closeDrawer: () => void
  children: JSX.Element | JSX.Element[]
}

export const Drawer: React.FC<Props> = ({ isOpen, closeDrawer, children }) => {
  const handleCloseDrawer: MouseEventHandler = (event) => {
    if (event.target === event.currentTarget) {
      closeDrawer()
    }
  }

  const isVisible = isOpen ? 'visible opacity-100' : 'invisible opacity-0'
  const isOverlayVisible = isOpen ? 'translate-x-[0%]' : 'translate-x-[-100%]'

  return (
    <div
      onClick={handleCloseDrawer}
      className={`
        z-10
        fixed top-0 left-0 bottom-0 right-0
        ${isVisible}
        ease-in duration-500 touch-none
      bg-[#111111bd] backdrop-blur-sm
      `}
    >
      <div
        className={`
          w-72 h-full
          overflow-y-auto
          ${isOverlayVisible}
          ease-in-out duration-500 
        bg-white rounded-tr-xl rounded-br-xl
        `}
      >
        {children}
      </div>
    </div>
  )
}
