import { Field, Form, Formik } from 'formik'
import { Modal } from '../components/Modal'
import { BsThreeDotsVertical } from 'react-icons/bs'
import useModal from '../hooks/useModal'
import { CategoriesModal } from './CategoriesModal'
import { useState } from 'react'
import { Category } from '../entities/Category'
import { MdLabelOutline } from 'react-icons/md'
import { createNote } from '../services/notes-services'
import { useSelector } from 'react-redux'
import { CreateNoteDto } from '../dto/CreateNoteDto'
import { AppStore } from '../redux/store'
import { User } from '../entities/User'

type Props = {
  isOpen: boolean
  closeModal: () => void
}

export const CreateNoteModal: React.FC<Props> = ({ isOpen, closeModal }) => {
  const user = useSelector<AppStore, User>(store => store.user)
  const [category, setCategory] = useState<Category | null>(null)
  const {
    isOpen: isOpenCategoriesModal,
    openModal: openCategoriesModal,
    closeModal: closeCategoriesModal,
  } = useModal()
  return (
    <Formik
      initialValues={{ title: '', description: '' }}
      onSubmit={async ({ title, description }) => {
        try {
          const createNoteDto: CreateNoteDto = {
            title,
            description,
            categoryId: category?.id || null
          }
          console.log(createNoteDto)
          const note = await createNote(user.accessToken, createNoteDto)
        } catch (error) {
          console.error(error)
        }
      }}
    >
      {({resetForm}) => (
        <>
          <Modal isOpen={isOpen} closeModal={()=> {
            closeModal()
            resetForm()
            setCategory(null)
          }}>
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
              <div className='flex items-center p-4 '>
                <MdLabelOutline className='mr-4' size={24} />
                <p className='text-xl font-bold'>
                  {category?.name ?? 'No category'}
                </p>
              </div>
              <div className='flex items-center justify-between p-4 border-t border-slate-300'>
                <BsThreeDotsVertical size={24} onClick={openCategoriesModal} />
                <button className='button primary' type='submit'>Save note</button>
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
