import { useEffect } from 'react'
import { IoIosAdd } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { Topbar } from '../components/Topbar'
import useModal from '../hooks/useModal'
import { loadNotes } from '../redux/notes/action-creators'
import { AppStore } from '../redux/store'
import { findAllNotes, findManyByCategory } from '../services/notes-services'
import { CreateNoteModal } from './CreateNoteModal'
import Masonry from 'react-masonry-css'

export const Home = () => {
  console.log('Rendering Home')

  const store = useSelector<AppStore, AppStore>((store) => store)
  const { user, categoryFilter, notes } = store
  const dispatch = useDispatch()
  const {
    isOpen: isOpenCreateNoteModal,
    openModal: openModalCreateNotaModal,
    closeModal: closeModalCreateNoteModal,
  } = useModal()

  useEffect(() => {
    /* Avoid to run effect if user does not exists */
    if (!user) return
    /* No filter selected */
    if (!categoryFilter) {
      ;(async function () {
        try {
          const notes = await findAllNotes(user.accessToken)
          dispatch(loadNotes(notes))
        } catch (error) {
          console.error(error)
        }
      })()
    }
    /* Filter selected */
    if (categoryFilter) {
      ;(async function () {
        try {
          const notes = await findManyByCategory(
            user.accessToken,
            categoryFilter.id
          )
          dispatch(loadNotes(notes))
        } catch (error) {
          console.error(error)
        }
      })()
    }
  }, [categoryFilter])

  return (
    <>
      {user && (
        <>
          <Topbar />
          {notes.length === 0 && <div>Empty</div>}
          {notes.length > 0 && (
            <Masonry breakpointCols={{ default: 2 }} className='flex p-4 gap-2'>
              {notes.map((note) => (
                <div
                  key={note.id}
                  className='mb-2 last:mb-0 p-2 border rounded-md border-slate-300'
                >
                  <p className='text-sm font-bold'>{note.title}</p>
                  <p className='text-sm'>{note.description}</p>
                </div>
              ))}
            </Masonry>
          )}
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
      )}
    </>
  )
}
