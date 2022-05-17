import { CreateCategoryDto } from "../dto/CreateCategoryDto"
import { Category } from "../entities/Category"
const URL_API = process.env.REACT_APP_SERVER

export const createCategory = async (accessToken: string, createCategoryDto: CreateCategoryDto): Promise<Category> => {
  const endpoint = `${URL_API}/categories`
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(createCategoryDto)
  })
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message, { cause: error })

  }
  const category = await response.json() as Category
  return category
}

export const findAllCategories = async (accessToken: string): Promise<Category[]> => {
  const endpoint = `${URL_API}/categories`
  const response = await fetch(endpoint, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message, { cause: error })

  }
  const categories = await response.json() as Category[]
  return categories
}

export const removeCategoryById = async (accessToken: string, categoryId: number): Promise<Category> => {
  const endpoint = `${URL_API}/categories/${categoryId}`
  const response = await fetch(endpoint, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message, { cause: error })

  }
  const category = await response.json() as Category
  return category
}