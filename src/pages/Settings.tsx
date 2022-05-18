import { FC } from 'react'
import { IoArrowBackOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'

export const Settings: FC = () => {
  const navigate = useNavigate()

  const onNavigateBack = () => {
    navigate(-1)
  }
  return (
    <>
      <nav className='top-bar'>
        <IoArrowBackOutline
          className='mr-4'
          size={24}
          onClick={onNavigateBack}
        />
        <h1 className='text-xl font-bold'>Settings</h1>
      </nav>
    </>
  )
}
