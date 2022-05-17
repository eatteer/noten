import { MouseEventHandler } from 'react'
import { CSSTransition } from 'react-transition-group'

type Props = {
  isOpen: boolean
  closeDrawer: () => void
  children: JSX.Element | JSX.Element[]
}

export const Drawer: React.FC<Props> = ({ isOpen, closeDrawer, children }) => {
  /* Handlers */
  const onCloseDrawer: MouseEventHandler = (event) => {
    if (event.target === event.currentTarget) {
      closeDrawer()
    }
  }

  const isVisible = isOpen ? 'visible opacity-100' : 'invisible opacity-0'

  return (
    <div
      onClick={onCloseDrawer}
      className={`
        z-10
        fixed top-0 left-0 bottom-0 right-0
        ${isVisible}
        ease-in duration-300 touch-none
      bg-[#111111bd] backdrop-blur-sm
      `}
    >
      <CSSTransition
        in={isOpen}
        timeout={300}
        classNames='drawer-container'
        unmountOnExit
      >
        <div className='drawer-container'>{children}</div>
      </CSSTransition>
    </div>
  )
}
