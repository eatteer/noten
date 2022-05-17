import { Category } from "../../entities/Category";
import { CATEGORIES_ADD, CATEGORIES_LOAD, CATEGORIES_REMOVE } from "./types";

export const categoriesReducer = (categories: Category[] = [], action: any) => {
  switch (action.type) {
    case CATEGORIES_LOAD: {
      const categories = action.payload.categories as Category[]
      return categories
    }
    case CATEGORIES_ADD: {
      const category = action.payload.category as Category
      const updatedCategories = [category, ...categories]
      return updatedCategories
    }
    case CATEGORIES_REMOVE: {
      const category = action.payload.category as Category
      const updatedCategories = categories.filter(currentCategory => currentCategory.id !== category.id)
      return updatedCategories
    }
    default:
      return categories
  }
}