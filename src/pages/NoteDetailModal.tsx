import { Field, Form, Formik } from 'formik'
import { useEffect, useState } from 'react'
import { IoIosAddCircleOutline } from 'react-icons/io'
import { MdLabelOutline } from 'react-icons/md'
import { Modal } from '../components/Modal'
import { CreateNoteDto } from '../dto/CreateNoteDto'
import { Category } from '../entities/Category'
import { Note } from '../entities/Note'
import useModal from '../hooks/useModal'
import { CategoriesModal } from './CategoriesModal'

type Props = {
  note: Note | null
  isOpen: boolean
  closeModal: () => void
}

export const NoteDetail: React.FC<Props> = ({ note, isOpen, closeModal }) => {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState<Category | null>(null)
  const {
    isOpen: isOpenCategoriesModal,
    openModal: openCategoriesModal,
    closeModal: closeCategoriesModal,
  } = useModal()

  useEffect(() => {
    if (isOpen && note) {
      console.log('isOpen')
      setTitle(note.title)
      setCategory(note.category)
    }
  }, [isOpen])

  return (
    <Formik
      initialValues={{ title: title, description: note?.description }}
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
        // try {
        //   const createNoteDto: CreateNoteDto = {
        //     title,
        //     description,
        //     categoryId: category?.id || 1,
        //   }
        //   console.log(createNoteDto)
        //   const note = await createNote(user.accessToken, createNoteDto)
        //   /*
        //     If category of note that is being created matchs with the current global categoryFilter
        //     then add the note to current global displaying notes
        //     */
        //   if (category === categoryFilter) {
        //     dispatch(addNote(note))
        //   }
        //   handleCloseModal(resetForm)
        // } catch (error) {
        //   console.error(error)
        // }
      }}
    >
      {({ resetForm }) => (
        <>
          <Modal isOpen={isOpen} closeModal={closeModal}>
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
