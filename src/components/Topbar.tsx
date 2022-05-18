import { useDispatch, useSelector } from 'react-redux'
import { Form, Formik } from 'formik'
import { logoutUser } from '../redux/user/action-creators'
import useDrawer from '../hooks/useDrawer'
import { InputField } from './InputField'
import { Drawer } from './Drawer'
import { IoSettingsOutline } from 'react-icons/io5'
import { BiNote } from 'react-icons/bi'
import { IoMdLogOut } from 'react-icons/io'
import { GrMenu } from 'react-icons/gr'
import { Tile } from './Tile'
import { Category } from '../entities/Category'
import { MdLabelOutline } from 'react-icons/md'
import { Divider } from './Divider'
import { AppStore } from '../redux/store'
import { setCategoryFilter } from '../redux/category-filter/action-creators'
import { useNavigate } from 'react-router-dom'
import { findAllNotes, findNotesByKeyword } from '../services/notes-services'
import { addNotes } from '../redux/notes/action-creators'

export const Topbar: React.FC = () => {
  // console.log('Rendering Topbar') 

  /* Store */
  const store = useSelector<AppStore, AppStore>((store) => store)
  const user = store.user!
  const { categories, categoryFilter } = store

  /* Hooks */
  const { isOpen, openDrawer, closeDrawer } = useDrawer()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  /* Handlers */
  const onLogoutUser = () => {
    dispatch(logoutUser())
  }

  const onDispatchCategoryFilter = async (category: Category | null) => {
    dispatch(setCategoryFilter(category))
    /*
      Required validation because Home useEffect fetchs notes when categoryFilter changes.

      If a search is made while categoryFilter is null the next time
      user selects Notes on Drawer, useEffect will note fetch notes
      because categoryFilter has not changed.

      The below condition fix that.
    */
    if (!categoryFilter) {
      const notes = await findAllNotes(user.accessToken)
      dispatch(addNotes(notes))
    }
    closeDrawer()
  }

  const onNavigateToCategories = () => {
    closeDrawer()
    setTimeout(() => navigate('/categories'), 300)
  }

  const onNavigateToSettings = () => {
    closeDrawer()
    setTimeout(() => navigate('/settings'), 300)
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
          validate={({ keyword }) => {
            let errors: any = {}
            if (!keyword) {
              errors.keyword = 'Required'
            }
            return errors
          }}
          onSubmit={async ({ keyword }) => {
            try {
              const notes = await findNotesByKeyword(user.accessToken, keyword)
              dispatch(addNotes(notes))
            } catch (error) {
              console.error(error)
            }
          }}
        >
          {() => (
            <Form className='w-full'>
              <InputField
                name='keyword'
                type='text'
                placeholder='Search a book'
                showError={false}
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
              text-2xl font-bold
              border-b border-slate-200
              last:border-0
            '
          >
            {user.username}
          </p>
          <div>
            <Tile
              leftIcon={<BiNote size={24} />}
              title='Notes'
              onClick={() => onDispatchCategoryFilter(null)}
            />
          </div>
          <Divider />
          <div>
            <div className='flex justify-between items-center'>
              <h2 className='mx-4 text-sm font-medium text-slate-600'>
                Categories
              </h2>
              <span className='badge mx-4' onClick={onNavigateToCategories}>
                Edit
              </span>
            </div>
            <div>
              {categories.map((category: Category) => (
                <Tile
                  key={category.id}
                  leftIcon={<MdLabelOutline size={24} />}
                  title={category.name}
                  onClick={() => onDispatchCategoryFilter(category)}
                />
              ))}
            </div>
          </div>
          <Divider />
          <div>
          <Tile
              leftIcon={<IoSettingsOutline size={24} />}
              title='Settings'
              onClick={onNavigateToSettings}
            />
            <Tile
              leftIcon={<IoMdLogOut size={24} />}
              title='Logout'
              onClick={onLogoutUser}
            />     
          </div>
        </div>
      </Drawer>
    </>
  )
}
