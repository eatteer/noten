import { MouseEventHandler } from 'react'

type Props = {
  icon: JSX.Element
  title: string
  onClick: MouseEventHandler
}
export const Tile: React.FC<Props> = ({ icon, title, onClick }) => {
  return (
    <div
      className='
        flex items-center
        p-4
        font-medium
        border-b border-slate-200
        last:border-0
      '
      onClick={onClick}
    >
      <span className='mr-2'>{icon}</span>
      {title}
    </div>
  )
}
