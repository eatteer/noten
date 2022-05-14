import { User } from "../../entities/User"
import { USER_LOGIN, USER_LOGOUT } from "./types"

export const userReducer = (state: User | null = null, action: any) => {
  switch (action.type) {
    case USER_LOGIN:
      const user = action.payload
      localStorage.setItem('user', JSON.stringify(user))
      return user
    case USER_LOGOUT:
      localStorage.removeItem('user')
      return null
    default:
      return state
  }
}