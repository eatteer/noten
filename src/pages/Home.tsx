import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Topbar } from '../components/Topbar'
import { Note } from '../entities/Note'
import { User } from '../entities/User'
import { AppStore } from '../redux/store'
import { findAllNotes } from '../services/notes-services'

export const Home = () => {
  console.log('Rendering Home')

  const [notes, setNotes] = useState<Note[]>([])
  const user = useSelector<AppStore, User>((store) => store.user)

  useEffect(() => {
    const _fetch = async () => {
      try {
        const notes = await findAllNotes(user.accessToken)
        setNotes(notes)
      } catch (error) {
        console.error(error)
      }
    }
    _fetch()
  }, [])

  return (
    <>
      <Topbar />
      <div className='grid grid-cols-2 gap-2 p-4'>
        {notes.map((note) => (
          <div key={note.id} className='p-2 border rounded-md border-slate-300'>
            <p className='text-sm font-bold'>{note.title}</p>
            <p className='text-sm'>{note.description}</p>
          </div>
        ))}
      </div>
    </>
  )
}
