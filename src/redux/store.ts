import { combineReducers, createStore } from "redux"
import { userReducer } from './user/reducer'
import { categoriesReducer } from "./categories/reducer"
import { User } from "../entities/User"
import { Category } from "../entities/Category"
import { categoryFilterReducer } from "./category-filter/reducer"
import { Note } from "../entities/Note"
import { notesReducer } from "./notes/reducer"

export type AppStore = {
  user: User
  categories: Category[]
  categoryFilter: Category | null
  notes: Note[]
}

export const reducer = combineReducers<AppStore>({
  user: userReducer,
  categories: categoriesReducer,
  categoryFilter: categoryFilterReducer,
  notes: notesReducer
})

export const store = createStore(reducer, (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__())