import { combineReducers, createStore } from "redux"
import { userReducer } from './user/reducer'
import { categoriesReducer } from "./categories/reducer"
import { User } from "../entities/User"
import { Category } from "../entities/Category"

export type AppStore = {
  user: User
  categories: Category[]
}

export const reducer = combineReducers<AppStore>({ user: userReducer, categories: categoriesReducer })

export const store = createStore(reducer, (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__())