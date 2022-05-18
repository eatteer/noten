import { FC } from 'react'
import { IoArrowBackOutline } from 'react-icons/io5'
import { MdLabelOutline, MdOutlineCancel } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Modal } from '../components/Modal'
import { Tile } from '../components/Tile'
import { toastSuccessOptions } from '../components/toast/options'
import useModal from '../hooks/useModal'
import { AppStore } from '../redux/store'
import { logoutUser } from '../redux/user/action-creators'
import { removeUser } from '../services/users-services'

export const Settings: FC = () => {
  /* Store */
  const store = useSelector<AppStore, AppStore>((store) => store)
  const user = store.user!

  /* Hooks */
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isOpen, openModal, closeModal } = useModal()

  /* Handlers */
  const onRemoveAccount = async () => {
    await removeUser(user.accessToken)
    dispatch(logoutUser())
    toast.success('Account deleted', toastSuccessOptions)
  }

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
      <Tile
        leftIcon={<MdOutlineCancel size={24} />}
        title={'Delete your account'}
        onClick={openModal}
      />
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <div className='p-4'>
          <h2 className='text-xl font-bold mb-4'>Delete account</h2>
          <h2 className='mb-8'>
            Are you sure you want to delete your account?
          </h2>
          <div className='flex justify-end items-center space-x-4'>
            <button className='button light' onClick={closeModal}>
              Cancel
            </button>
            <button className='button danger' onClick={onRemoveAccount}>
              Confirm
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}
