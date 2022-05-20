import {
  ChangeEventHandler,
  Dispatch,
  SetStateAction,
  useRef,
  useState,
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CreateCategoryDto } from '../dto/CreateCategoryDto'
import { Category } from '../entities/Category'
import { AppStore } from '../redux/store'
import { addCategory } from '../redux/categories/action-creators'
import { createCategory } from '../services/categories-service'
import { IoIosAdd } from 'react-icons/io'
import { MdLabelOutline } from 'react-icons/md'

type Props = {
  closeModal: () => void
  setCategory: Dispatch<SetStateAction<Category>>
}

export const SelectCategory: React.FC<Props> = ({ closeModal, setCategory }) => {
  // console.log('Rendering CategoriesModal') 

  /* Store */
  const store = useSelector<AppStore, AppStore>((store) => store)
  const user = store.user!
  const { categories: categoriesInStore } = store
  
  /* States */
  const [categoryName, setCategoryName] = useState('')
  const [categories, setCategories] = useState<Category[]>(categoriesInStore)

  /* Hooks */
  const dispatch = useDispatch()
  const timer = useRef<any>(null)

  /* Handlers */
  const onChangeCategoryName: ChangeEventHandler<HTMLInputElement> = (event) => {
    setCategoryName(event.target.value)
  }

  const onKeyUpCategoryName = () => {
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

  const onCreateCategory = async (name: string) => {
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

  const onSetCategory = (catagory: Category) => {
    setCategory(catagory)
    closeModal()
  }

  return (
    <div className='h-96 overflow-y-auto'>
      <input
        className='
          sticky top-0
          w-full p-4
          outline-none
          text-xl font-bold text-slate-600
          bg-white border-b border-slate-300
        '
        name='keyword'
        placeholder='Enter category name'
        autoComplete='off'
        value={categoryName}
        onChange={onChangeCategoryName}
        onKeyUp={onKeyUpCategoryName}
      />
      {/* Empty categories */}
      {categories.length === 0 && (
        <div
          className='flex items-center p-2'
          onClick={() => onCreateCategory(categoryName)}
        >
          <IoIosAdd className='mr-4' size={24} />
          <p>Create {categoryName}</p>
        </div>
      )}
      {/* Categories */}
      {categories.length > 0 && (
        <div className='p-4'>
          {categories.map((category) => (
            <div
              key={category.id}
              className='
                flex items-center
                py-2 first:pt-0 last:pb-0
              '
              onClick={() => onSetCategory(category)}
            >
              <MdLabelOutline className='mr-4' size={24} />
              <p>{category.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
