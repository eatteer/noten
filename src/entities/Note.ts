import { Category } from "./Category"
import { User } from "./User"

export type Note = {
  id: number
  title: string
  description: string
  user: User
  category: Category
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}