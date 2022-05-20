import { Field, Form, Formik } from 'formik'
import { useState } from 'react'
import { BiTrashAlt } from 'react-icons/bi'
import { IoIosAddCircleOutline } from 'react-icons/io'
import { MdLabelOutline } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { BottomModal } from '../components/BottomModal'
import { Modal } from '../components/Modal'
import { UpdateNoteDto } from '../dto/UpdateNoteDto'
import { Category } from '../entities/Category'
import { Note } from '../entities/Note'
import useModal from '../hooks/useModal'
import { editNote, removeNote } from '../redux/notes/action-creators'
import { AppStore } from '../redux/store'
import { removeNoteById, updateNoteById } from '../services/notes-services'
import { SelectCategory } from './SelectCategory'

type Props = {
  note: Note
  closeModal: () => void
}

export const NoteDetail: React.FC<Props> = ({ note, closeModal }) => {
  /* Store */
  const store = useSelector<AppStore, AppStore>((store) => store)
  const user = store.user!

  /* Hooks */
  const dispatch = useDispatch()
  const [category, setCategory] = useState<Category>(note.category)

  const {
    isOpen: isOpenDeleteNote,
    openModal: openDeleteNote,
    closeModal: closeDeleteNote,
  } = useModal()

  const {
    isOpen: isOpenCategories,
    openModal: openCategories,
    closeModal: closeCategories,
  } = useModal()

  /* Handlers */
  const onRemoveNote = async () => {
    const removedNote = await removeNoteById(user.accessToken, note.id)
    dispatch(removeNote(removedNote))
    closeModal()
  }

  return (
    <Formik
      initialValues={{ title: note.title, description: note.description }}
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
      onSubmit={async ({ title, description }) => {
        try {
          const updateNoteDto: UpdateNoteDto = {
            title,
            description,
            categoryId: category.id,
          }
          const updatedNote = await updateNoteById(
            user.accessToken,
            note.id,
            updateNoteDto
          )
          dispatch(editNote(updatedNote))
          closeModal()
        } catch (error) {
          console.error(error)
        }
      }}
    >
      {() => (
        <>
          <Form className='flex flex-col h-96'>
            <Field name='title'>
              {({ field, form, meta }: any) => {
                const styleInputError =
                  meta.touched && meta.error ? 'placeholder:text-pink-600' : ''
                return (
                  <input
                    className={`
                      w-full p-4
                      outline-none
                      text-xl font-bold text-slate-600
                      ${styleInputError}
                    `}
                    placeholder='Title'
                    autoComplete='off'
                    {...field}
                  />
                )
              }}
            </Field>
            <Field name='description'>
              {({ field, form, meta }: any) => {
                const styleInputError =
                  meta.touched && meta.error ? 'placeholder:text-pink-600' : ''
                return (
                  <textarea
                    className={`
                      flex-grow m-4
                      outline-none
                      resize-none
                      ${styleInputError}
                    `}
                    placeholder='Description...'
                    autoComplete='off'
                    {...field}
                  />
                )
              }}
            </Field>
            <div
              className='flex items-center justify-between p-4'
              onClick={openCategories}
            >
              <div className='flex'>
                <MdLabelOutline className='mr-4' size={24} />
                <p className='font-bold text-ellipsis'>{category.name}</p>
              </div>
              <IoIosAddCircleOutline size={24} />
            </div>
            <div
              className='
                  flex justify-between items-center
                  p-4
                  border-t border-slate-300
                '
            >
              <BiTrashAlt size={24} onClick={openDeleteNote} />
              <button className='button primary' type='submit'>
                Edit note
              </button>
            </div>
          </Form>

          <Modal isOpen={isOpenDeleteNote} closeModal={closeDeleteNote}>
            <div className='p-4'>
              <h2 className='text-xl font-bold'>Delete note</h2>
              <h2 className='mb-8'>
                Are you sure you want to delete this note?
              </h2>
              <div className='flex justify-end items-center space-x-4'>
                <button className='button light' onClick={closeDeleteNote}>
                  Cancel
                </button>
                <button className='button danger' onClick={onRemoveNote}>
                  Confirm
                </button>
              </div>
            </div>
          </Modal>

          <BottomModal isOpen={isOpenCategories} closeModal={closeCategories}>
            <SelectCategory
              closeModal={closeCategories}
              setCategory={setCategory}
            />
          </BottomModal>
        </>
      )}
    </Formik>
  )
}
