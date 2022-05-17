import { MouseEventHandler } from 'react'

type Props = {
  leftIcon?: JSX.Element
  title: string
  rightIcon?: JSX.Element
  onClick: MouseEventHandler
}
export const Tile: React.FC<Props> = ({
  leftIcon,
  title,
  rightIcon,
  onClick,
}) => {
  return (
    <div
      className='
        flex justify-between items-center
        p-4
        font-medium
        border-b border-slate-200
        last:border-0
      '
      onClick={onClick}
    >
      <div className='flex'>
        {leftIcon && <span className='mr-2'>{leftIcon}</span>}
        {title}
      </div>
      {rightIcon && <span className='ml-2'>{rightIcon}</span>}
    </div>
  )
}
