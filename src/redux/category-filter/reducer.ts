import { Category } from "../../entities/Category";
import { CATEGORY_FILTER_SET } from "./types";

export const categoryFilterReducer = (categoryFilter: Category | null | undefined = null, action: any) => {
  switch (action.type) {
    case CATEGORY_FILTER_SET: {
      const category = action.payload.category as Category
      return category
    }
    default: {
      return categoryFilter
    }
  }
}