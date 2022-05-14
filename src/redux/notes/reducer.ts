import { Note } from "../../entities/Note";
import { NOTES_ADD, NOTES_LOAD } from "./types";

export const notesReducer = (notes: Note[] = [], action: any) => {
  switch (action.type) {
    case NOTES_LOAD: {
      const notes = action.payload.notes
      return notes
    }
    case NOTES_ADD: {
      const note = action.payload.note
      const updatedNotes = [note, ...notes]
      return updatedNotes
    }
    default: {
      return notes
    }
  }
}