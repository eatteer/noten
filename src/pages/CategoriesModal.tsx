import {
  ChangeEventHandler,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react'
import { IoIosAdd } from 'react-icons/io'
import { MdLabelOutline } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from '../components/Modal'
import { CreateCategoryDto } from '../dto/CreateCategoryDto'
import { Category } from '../entities/Category'
import { addCategory } from '../redux/categories/action-creators'
import { AppStore } from '../redux/store'
import { createCategory } from '../services/categories-service'

type Props = {
  isOpen: boolean
  closeModal: () => void
  setCategory: Dispatch<SetStateAction<Category | null>>
}

export const CategoriesModal: React.FC<Props> = ({
  isOpen,
  closeModal,
  setCategory,
}) => {
  const [categoryName, setCategoryName] = useState('')
  const [categories, setCategories] = useState<Category[]>([])

  const store = useSelector<AppStore, AppStore>((store) => store)
  const { user, categories: categoriesInStore } = store

  const dispatch = useDispatch()

  const timer = useRef<any>(null)

  useEffect(() => {
    if (isOpen) setCategories(categoriesInStore)
  }, [isOpen])

  const onChangeValue: ChangeEventHandler<HTMLInputElement> = (event) => {
    setCategoryName(event.target.value)
  }

  const onKeyUp = () => {
    clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      const filteredCategories = categoriesInStore.filter((category) =>
        category.name.toLowerCase().includes(categoryName.toLowerCase())
      )
      categoryName.length === 0
        ? setCategories(categoriesInStore)
        : setCategories(filteredCategories)
    }, 100)
  }

  const handleCreateCategory = async (name: string) => {
    try {
      const createCategoryDto: CreateCategoryDto = { name }
      const category = await createCategory(user.accessToken, createCategoryDto)
      setCategoryName('')
      setCategories([category, ...categoriesInStore])
      dispatch(addCategory(category))
    } catch (error) {
      console.error(error)
    }
  }

  const handleCloseModal = () => {
    closeModal()
    setCategoryName('')
  }

  const handleSetCategory = (catagory: Category) => {
    setCategory(catagory)
    handleCloseModal()
  }

  return (
    <Modal isOpen={isOpen} closeModal={handleCloseModal}>
      <div className='h-96 overflow-y-auto'>
        <input
          className='sticky top-0 w-full p-4 outline-none text-xl font-bold text-slate-600 bg-white border-b border-slate-300'
          name='keyword'
          placeholder='Enter category name'
          value={categoryName}
          onChange={onChangeValue}
          onKeyUp={onKeyUp}
        />
        {categories.length === 0 && (
          <div
            className='flex items-center p-2'
            onClick={() => handleCreateCategory(categoryName)}
          >
            <IoIosAdd className='mr-4' size={24} />
            <p>Create {categoryName}</p>
          </div>
        )}
        {categories.length > 0 && (
          <div className='p-4'>
            {categories.map((category) => (
              <div
                key={category.id}
                className='flex items-center py-2 first:pt-0 last:pb-0'
                onClick={() => handleSetCategory(category)}
              >
                <MdLabelOutline className='mr-4' size={24} />
                <p>{category.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Modal>
  )
}
