import { CreateNoteDto } from "../dto/CreateNoteDto"
import { UpdateNoteDto } from "../dto/UpdateNoteDto"
import { Note } from "../entities/Note"
import { API_URL } from "../globals"

export const createNote = async (accessToken: string, createNoteDto: CreateNoteDto): Promise<Note> => {
  const endpoint = `${API_URL}/notes`
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

export const findNotesByCategory = async (accessToken: string, categoryId: number): Promise<Note[]> => {
  const endpoint = `${API_URL}/notes?categoryId=${categoryId}`
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
  const notes = await response.json() as Note[]
  return notes
}


export const findAllNotes = async (accessToken: string): Promise<Note[]> => {
  const endpoint = `${API_URL}/notes`
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
  const notes = await response.json() as Note[]
  return notes
}

export const findNotesByKeyword = async (accessToken: string, keyword: string): Promise<Note[]> => {
  const endpoint = `${API_URL}/notes?keyword=${keyword}`
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
  const notes = await response.json() as Note[]
  return notes
}

export const updateNoteById = async (accessToken: string, noteId: number, updateNoteDto: UpdateNoteDto): Promise<Note> => {
  const endpoint = `${API_URL}/notes/${noteId}`
  const response = await fetch(endpoint, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updateNoteDto)
  })
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message, { cause: error })

  }
  const note = await response.json() as Note
  return note
}

export const removeNoteById = async (accessToken: string, noteId: number): Promise<Note> => {
  const endpoint = `${API_URL}/notes/${noteId}`
  const response = await fetch(endpoint, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  })
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message, { cause: error })

  }
  const note = await response.json() as Note
  return note
}

