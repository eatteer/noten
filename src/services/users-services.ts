import { User } from "../entities/User"

const URL_API = process.env.REACT_APP_SERVER

export const registerUser = async (username: string, password: string): Promise<void> => {
  const endpoint = `${URL_API}/users`
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  })
  if (response.ok) return
  const error = await response.json()
  throw new Error(error.message, { cause: error })
}

export const determineUserExistenceByUsername = async (username: string): Promise<boolean> => {
  const endpoint = `${URL_API}/users/existence?username=${username}`
  const response = await fetch(endpoint)
  if (response.ok) {
    const userExists = await response.json() as boolean
    return userExists
  }
  const error = await response.json()
  throw new Error(error.message, { cause: error })
}

export const authUser = async (username: string, password: string): Promise<User> => {
  const endpoint = `${URL_API}/auth/login`
  const response = await fetch(endpoint, {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  if (response.ok) {
    const user = await response.json() as User
    return user
  }
  const error = await response.json()
  throw new Error(error.message, { cause: error })
}

export const removeUser = async (accessToken: string): Promise<User> => {
  const endpoint = `${URL_API}/users`
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