import { useEffect, useState } from 'react'
import { IoIosAdd } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { Topbar } from '../components/Topbar'
import useModal from '../hooks/useModal'
import { addNotes } from '../redux/notes/action-creators'
import { AppStore } from '../redux/store'
import { findAllNotes, findNotesByCategory } from '../services/notes-services'
import { CreateNote } from './CreateNote'
import Masonry from 'react-masonry-css'
import { Note } from '../entities/Note'
import { NoteDetail } from './NoteDetail'
import { BottomModal } from '../components/BottomModal'

export const Home = () => {
  // console.log('Rendering Home') 

  /* Store */
  const store = useSelector<AppStore, AppStore>((store) => store)
  const user = store.user!
  const { categoryFilter, notes } = store

  /* States */
  const [note, setNote] = useState<Note>()

  /* Hooks */
  const dispatch = useDispatch()
  const {
    isOpen: isOpenCreateNote,
    openModal: openModalCreateNota,
    closeModal: closeModalCreateNote,
  } = useModal()
  const {
    isOpen: isOpenNoteDetail,
    openModal: openNoteDetail,
    closeModal: closeNoteDetail,
  } = useModal()

  /* Effects */
  useEffect(() => {
    /* Avoid to run effect if user does not exists */
    if (!user) return
    /* No filter selected */
    if (!categoryFilter) {
      ;(async function () {
        try {
          const notes = await findAllNotes(user.accessToken)
          dispatch(addNotes(notes))
        } catch (error) {
          console.error(error)
        }
      })()
    }
    /* Filter selected */
    if (categoryFilter) {
      ;(async function () {
        try {
          const notes = await findNotesByCategory(
            user.accessToken,
            categoryFilter.id
          )
          dispatch(addNotes(notes))
        } catch (error) {
          console.error(error)
        }
      })()
    }
  }, [categoryFilter])

  /* Handlers */
  const onSetNote = (note: Note) => {
    setNote(note)
    openNoteDetail()
  }

  return (
    <>
      {user && (
        <>
          <Topbar />
          {/* Empty notes */}
          {/* {notes.length === 0 && (
            <div className='p-4 text-center'>
              <h2 className='text-2xl font-bold'>Nothing here</h2>
              <p className='text-slate-600'>Try adding a new note</p>
            </div>
          )} */}
          {/* Notes */}
          {notes.length > 0 && (
            <Masonry breakpointCols={{ default: 2 }} className='flex p-4 gap-2'>
              {notes.map((note) => (
                <div
                  key={note.id}
                  className='
                    mb-2 last:mb-0 p-2
                    border rounded-md border-slate-300
                  '
                  onClick={() => onSetNote(note)}
                >
                  <p className='text-sm font-bold'>{note.title}</p>
                  <p className='text-sm'>{note.description}</p>
                </div>
              ))}
            </Masonry>
          )}
          <button
            className='
              fixed bottom-4 right-4
              p-2
              rounded-full 
              bg-blue-600 text-white
            '
            onClick={openModalCreateNota}
          >
            <span>
              <IoIosAdd size={24} />
            </span>
          </button>
          {/* Create note modal */}
          <BottomModal isOpen={isOpenCreateNote} closeModal={closeModalCreateNote}>
            <CreateNote closeModal={closeModalCreateNote} />
          </BottomModal>
          {/* Note detail modal */}

          <BottomModal isOpen={isOpenNoteDetail} closeModal={closeNoteDetail}>
            <NoteDetail note={note!} closeModal={closeNoteDetail} />
          </BottomModal>
        </>
      )}
    </>
  )
}
