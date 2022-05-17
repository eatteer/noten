import { Category } from "../../entities/Category"
import { CATEGORIES_ADD, CATEGORIES_LOAD, CATEGORIES_REMOVE } from "./types"

export const initCategories = (categories: Category[]) => {
  return {
    type: CATEGORIES_LOAD,
    payload: { categories }
  }
}

export const addCategory = (category: Category) => {
  return {
    type: CATEGORIES_ADD,
    payload: { category }
  }
}

export const removeCategory = (category: Category) => {
  return {
    type: CATEGORIES_REMOVE,
    payload: { category }
  }
}