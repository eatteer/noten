
import { User } from "../../entities/User"
import { USER_LOGIN, USER_LOGOUT } from "./types"

export const loginUser = (user: User) => {
  return {
    type: USER_LOGIN,
    payload: user
  }
}

export const logoutUser = () => {
  return {
    type: USER_LOGOUT
  }
}