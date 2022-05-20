import { User } from "../entities/User"
import { API_URL } from "../globals"

export const registerUser = async (username: string, password: string): Promise<void> => {
  const endpoint = `${API_URL}/users`
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  })
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message, { cause: error })
  }
  return
}

export const determineUserExistenceByUsername = async (username: string): Promise<boolean> => {
  const endpoint = `${API_URL}/users/existence?username=${username}`
  const response = await fetch(endpoint)
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message, { cause: error })
  }
  const userExists = await response.json() as boolean
  return userExists

}

export const authUser = async (username: string, password: string): Promise<User> => {
  const endpoint = `${API_URL}/auth/login`
  const response = await fetch(endpoint, {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message, { cause: error })
  }
  const user = await response.json() as User
  return user

}

export const removeUser = async (accessToken: string): Promise<User> => {
  const endpoint = `${API_URL}/users`
  const response = await fetch(endpoint, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  })
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message, { cause: error })

  }
  const user = await response.json() as User
  return user
}