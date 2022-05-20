import { useState } from 'react'
import { Field, Form, Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { CreateNoteDto } from '../dto/CreateNoteDto'
import { Category } from '../entities/Category'
import { createNote } from '../services/notes-services'
import useModal from '../hooks/useModal'
import { SelectCategory } from './SelectCategory'
import { AppStore } from '../redux/store'
import { addNote } from '../redux/notes/action-creators'
import { IoIosAddCircleOutline } from 'react-icons/io'
import { MdLabelOutline } from 'react-icons/md'
import { BottomModal } from '../components/BottomModal'

type Props = {
  closeModal: () => void
}

const DEFAULT_CATEGORY_NAME = 'Others'

export const CreateNote: React.FC<Props> = ({ closeModal }) => {
  // console.log('Rendering CreateNoteModal') 

  /* Store */
  const store = useSelector<AppStore, AppStore>((store) => store)
  const user = store.user!
  const { categoryFilter, categories } = store

  /* States */
  const [category, setCategory] = useState<Category>(() => {
    const defaultCategory = categories.find(
      (category) => category.name === DEFAULT_CATEGORY_NAME
    )!
    const category = categoryFilter ?? defaultCategory
    return category
  })

  /* Hooks */
  const dispatch = useDispatch()
  const {
    isOpen: isOpenCategories,
    openModal: openCategories,
    closeModal: closeCategories,
  } = useModal()

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
      onSubmit={async ({ title, description }) => {
        try {
          const createNoteDto: CreateNoteDto = {
            title,
            description,
            categoryId: category.id,
          }
          const note = await createNote(user.accessToken, createNoteDto)
          dispatch(addNote(note))
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
          {/* Categories modal */}
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
