import { Note } from "../../entities/Note";
import { NOTES_ADD, NOTES_EDIT, NOTES_LOAD, NOTES_REMOVE } from "./types";

export const addNotes = (notes: Note[]) => {
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
    payload: { note }
  }
}

export const editNote = (note: Note) => {
  return {
    type: NOTES_EDIT,
    payload: { note }
  }
}

export const removeNote = (note: Note) => {
  return {
    type: NOTES_REMOVE,
    payload: { note }
  }
}