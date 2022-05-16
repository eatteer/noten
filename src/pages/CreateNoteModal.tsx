import { useEffect, useState } from 'react'
import { Field, Form, Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { CreateNoteDto } from '../dto/CreateNoteDto'
import { Category } from '../entities/Category'
import { createNote } from '../services/notes-services'
import useModal from '../hooks/useModal'
import { Modal } from '../components/Modal'
import { CategoriesModal } from './CategoriesModal'
import { AppStore } from '../redux/store'
import { addNote } from '../redux/notes/action-creators'
import { IoIosAddCircleOutline } from 'react-icons/io'
import { MdLabelOutline } from 'react-icons/md'

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
      Set category to categoryFilter if selected any
      or null if selected all notes from drawer
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
      validate={({ title, description }) => {
        let errors: any = {}
        if (!title) {
          errors.title = 'Required'
        }
        if (!description) {
          errors.description = 'Required'
        }
        return errors
      }}
      onSubmit={async ({ title, description }, { resetForm }) => {
        try {
          const createNoteDto: CreateNoteDto = {
            title,
            description,
            categoryId: category?.id || 1,
          }
          console.log(createNoteDto)
          const note = await createNote(user.accessToken, createNoteDto)
          /* 
            If category of note that is being created matchs with the current global categoryFilter
            then add the note to current global displaying notes
            */
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
              <Field name='title'>
                {({ field, form, meta }: any) => (
                  <input
                    className={`w-full p-4 outline-none text-xl font-bold text-slate-600 ${
                      meta.touched && meta.error
                        ? 'placeholder:text-pink-600'
                        : ''
                    }`}
                    placeholder='Title'
                    {...field}
                  />
                )}
              </Field>
              <Field name='description'>
                {({ field, form, meta }: any) => (
                  <textarea
                    className={`flex-grow m-4 outline-none resize-none ${
                      meta.touched && meta.error
                        ? 'placeholder:text-pink-600'
                        : ''
                    }`}
                    placeholder='Description...'
                    {...field}
                  />
                )}
              </Field>
              <div
                className='flex items-center justify-between p-4'
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
