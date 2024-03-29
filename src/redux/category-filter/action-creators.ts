import { Category } from "../../entities/Category"
import { CATEGORY_FILTER_SET } from "./types"

export const setCategoryFilter = (category: Category | null | undefined) => {
  return {
    type: CATEGORY_FILTER_SET,
    payload: { category }
  }
}