import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Formik } from 'formik'
import { logoutUser } from '../redux/user/action-creators'
import useDrawer from '../hooks/useDrawer'
import useModal from '../hooks/useModal'
import { InputField } from './InputField'
import { Drawer } from './Drawer'
import { IoSettingsOutline } from 'react-icons/io5'
import { IoIosAdd } from 'react-icons/io'
import { BiNote } from 'react-icons/bi'
import { IoMdLogOut } from 'react-icons/io'
import { GrMenu } from 'react-icons/gr'
import { CreateNoteModal } from '../pages/CreateNoteModal'
import { Tile } from './Tile'

import { Category } from '../entities/Category'
import { MdLabelOutline } from 'react-icons/md'
import { Divider } from './Divider'
import { AppStore } from '../redux/store'

export const Topbar: React.FC = () => {
  console.log('Rendering topbar')

  const navigationDelay = 350

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { isOpen, openDrawer, closeDrawer } = useDrawer()
  const store = useSelector<AppStore, AppStore>((store) => store)
  const { user, categories } = store
  const {
    isOpen: isOpenCreateNoteModal,
    openModal: openModalCreateNotaModal,
    closeModal: closeModalCreateNoteModal,
  } = useModal()

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  const navigateToHome = () => {
    closeDrawer()
    setTimeout(() => {
      navigate('/')
    }, navigationDelay)
  }

  return (
    <>
      <nav className='top-bar'>
        <GrMenu
          className='cursor-pointer mr-4'
          size={24}
          onClick={openDrawer}
        />
        <Formik
          initialValues={{ keyword: '' }}
          onSubmit={(values) => {
            navigate(`/search/${values.keyword}`)
          }}
        >
          {() => (
            <Form className='w-full'>
              <InputField
                name='keyword'
                type='text'
                placeholder='Search a book'
              />
            </Form>
          )}
        </Formik>
      </nav>
      <Drawer isOpen={isOpen} closeDrawer={closeDrawer}>
        <div>
          <p
            className='
              p-4
              text-2xl font-medium
              border-b border-slate-200
              last:border-0
            '
          >
            {user.username}
          </p>
          <div>
            <Tile
              icon={<BiNote size={24} />}
              title='Notes'
              onClick={navigateToHome}
            />
          </div>
          <Divider />
          <div>
            <h2 className='px-4 text-sm font-medium text-slate-600'>
              Categories
            </h2>
            <div>
              <Tile
                icon={<MdLabelOutline size={24} />}
                title='No category'
                onClick={() => {}}
              />
              {categories.map((category: Category) => (
                <Tile
                  key={category.id}
                  icon={<MdLabelOutline size={24} />}
                  title={category.name}
                  onClick={() => {}}
                />
              ))}
            </div>
          </div>
          <Divider />
          <div>
            <Tile
              icon={<IoMdLogOut size={24} />}
              title='Logout'
              onClick={handleLogout}
            />
            <Tile
              icon={<IoSettingsOutline size={24} />}
              title='Settings'
              onClick={handleLogout}
            />
          </div>
        </div>
      </Drawer>
      <button
        className='fixed bottom-4 right-4 p-2 rounded-full bg-blue-600 text-white'
        onClick={openModalCreateNotaModal}
      >
        <span>
          <IoIosAdd size={24} />
        </span>
      </button>
      <CreateNoteModal
        isOpen={isOpenCreateNoteModal}
        closeModal={closeModalCreateNoteModal}
      />
    </>
  )
}
