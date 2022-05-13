import { CreateNoteDto } from "../dto/CreateNoteDto"
import { Note } from "../entities/Note"

const URL_API = process.env.REACT_APP_SERVER

export const createNote = async (accessToken: string, createNoteDto: CreateNoteDto): Promise<Note> => {
  const endpoint = `${URL_API}/notes`
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(createNoteDto)
  })
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message, { cause: error })

  }
  const note = await response.json() as Note
  return note
}

export const findAllNotes = async (accessToken: string): Promise<Note[]> => {
  const endpoint = `${URL_API}/notes`
  const response = await fetch(endpoint, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    },
  })
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message, { cause: error })

  }
  const note = await response.json() as Note[]
  return note
}

