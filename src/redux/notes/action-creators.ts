import { Note } from "../../entities/Note";
import { NOTES_ADD, NOTES_LOAD } from "./types";

export const loadNotes = (notes: Note[]) => {
  return {
    type: NOTES_LOAD,
    payload: {
      notes
    }
  }
}

export const addNote = (note: Note) => {
  return {
    type: NOTES_ADD,
    payload: {
      note
    }
  }
}