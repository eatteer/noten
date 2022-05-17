import { Note } from "../../entities/Note";
import { NOTES_ADD, NOTES_EDIT, NOTES_LOAD, NOTES_REMOVE } from "./types";

export const notesReducer = (notes: Note[] = [], action: any) => {
  switch (action.type) {
    case NOTES_LOAD: {
      const notes = action.payload.notes as Note[]
      return notes
    }
    case NOTES_ADD: {
      const note = action.payload.note as Note
      const updatedNotes = [note, ...notes]
      return updatedNotes
    }
    case NOTES_EDIT: {
      const note = action.payload.note as Note
      const updatedNotes = notes.map(currentNote => currentNote.id !== note.id ? currentNote : note)
      return updatedNotes
    }
    case NOTES_REMOVE: {
      const note = action.payload.note as Note
      const updatedNotes = notes.filter(currentNote => currentNote.id !== note.id)
      return updatedNotes
    }
    default: {
      return notes
    }
  }
}