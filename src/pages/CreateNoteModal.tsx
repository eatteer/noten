import { Field, Form, Formik } from 'formik'
import { Modal } from '../components/Modal'
import useModal from '../hooks/useModal'
import { CategoriesModal } from './CategoriesModal'
import { useEffect, useState } from 'react'
import { Category } from '../entities/Category'
import { MdLabelOutline } from 'react-icons/md'
import { createNote } from '../services/notes-services'
import { useDispatch, useSelector } from 'react-redux'
import { CreateNoteDto } from '../dto/CreateNoteDto'
import { AppStore } from '../redux/store'
import { IoIosAddCircleOutline } from 'react-icons/io'
import { addNote } from '../redux/notes/action-creators'

type Props = {
  isOpen: boolean
  closeModal: () => void
}

export const CreateNoteModal: React.FC<Props> = ({ isOpen, closeModal }) => {
  console.log('Rendering CreateNoteModal')

  const [category, setCategory] = useState<Category | null>(null)

  const store = useSelector<AppStore, AppStore>((store) => store)
  const { user, categoryFilter, categories } = store
  const dispatch = useDispatch()

  /* 
    Modal is always mounted, this is necesary because of the animations.
    That's why it's necessary control when it's open to reset the form values
  */
  useEffect(() => {
    /* 
      Set category to categoryFilter if selected from drawer
      or null if selected all notes
    */
    if (isOpen) {
      /*
        All user have the default category others
      */
      const defaultCategory = categories.find(
        (category) => category.name === 'Others'
      )!
      const category = categoryFilter ?? defaultCategory
      setCategory(category)
    }
  }, [isOpen])

  const {
    isOpen: isOpenCategoriesModal,
    openModal: openCategoriesModal,
    closeModal: closeCategoriesModal,
  } = useModal()

  const handleCloseModal = (resetForm: () => void) => {
    resetForm()
    closeModal()
  }

  return (
    <Formik
      initialValues={{ title: '', description: '' }}
      onSubmit={async ({ title, description }, { resetForm }) => {
        try {
          const createNoteDto: CreateNoteDto = {
            title,
            description,
            categoryId: category?.id || 1,
          }
          const note = await createNote(user.accessToken, createNoteDto)
          if (category === categoryFilter) {
            dispatch(addNote(note))
          }
          handleCloseModal(resetForm)
        } catch (error) {
          console.error(error)
        }
      }}
    >
      {({ resetForm }) => (
        <>
          <Modal isOpen={isOpen} closeModal={() => handleCloseModal(resetForm)}>
            <Form className='flex flex-col h-96'>
              <Field
                className='w-full p-4 pb-0 outline-none text-xl font-bold text-slate-600'
                name='title'
                placeholder='Title'
              />
              <Field
                className='flex-grow m-4 outline-none resize-none'
                placeholder='Description...'
                name='description'
                as='textarea'
              />
              <div
                className='flex items-center justify-between p-4 pt-0'
                onClick={openCategoriesModal}
              >
                <div className='flex'>
                  <MdLabelOutline className='mr-4' size={24} />
                  <p className='font-bold text-ellipsis'>{category?.name}</p>
                </div>
                <IoIosAddCircleOutline size={24} />
              </div>
              <div className='p-4 border-t border-slate-300'>
                <button className='button primary' type='submit'>
                  Save note
                </button>
              </div>
            </Form>
          </Modal>
          <CategoriesModal
            isOpen={isOpenCategoriesModal}
            closeModal={closeCategoriesModal}
            setCategory={setCategory}
          />
        </>
      )}
    </Formik>
  )
}
