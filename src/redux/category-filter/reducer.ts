import { Category } from "../../entities/Category";
import { CATEGORY_FILTER_SET } from "./types";

export const categoryFilterReducer = (categoryFilter: Category | null = null, action: any) => {
  switch (action.type) {
    case CATEGORY_FILTER_SET: {
      const category = action.payload.category
      return category
    }
    default: {
      return categoryFilter
    }
  }
}