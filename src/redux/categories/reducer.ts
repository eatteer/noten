import { Category } from "../../entities/Category";
import { CATEGORIES_ADD, CATEGORIES_LOAD } from "./types";

export const categoriesReducer = (categories: Category[] = [], action: any) => {
  switch (action.type) {
    case CATEGORIES_LOAD: {
      const categories = action.payload
      return categories
    }
    case CATEGORIES_ADD: {
      const category = action.payload
      const updatedCategories = [category, ...categories]
      return updatedCategories
    }
    default:
      return categories
  }
}