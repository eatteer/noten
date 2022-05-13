import { Category } from "../../entities/Category"
import { CATEGORIES_ADD, CATEGORIES_LOAD } from "./types"

export const loadCategories = (categories: Category[]) => {
  return {
    type: CATEGORIES_LOAD,
    payload: categories
  }
}

export const addCategory = (category: Category) => {
  return {
    type: CATEGORIES_ADD,
    payload: category
  }
}