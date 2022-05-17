import { BiTrashAlt } from 'react-icons/bi'
import { IoArrowBackOutline } from 'react-icons/io5'
import { MdLabelOutline } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Tile } from '../components/Tile'
import { Category } from '../entities/Category'
import { removeCategory } from '../redux/categories/action-creators'
import { setCategoryFilter } from '../redux/category-filter/action-creators'
import { AppStore } from '../redux/store'
import { removeCategoryById } from '../services/categories-service'

export const Categories: React.FC = () => {
  const store = useSelector<AppStore, AppStore>((store) => store)
  const user = store.user!
  const { categories } = store

  /* Hooks */
  const navigate = useNavigate()
  const dispatch = useDispatch()

  /* Handlers */
  const onRemoveCategory = async (category: Category) => {
    const removedCategory = await removeCategoryById(
      user.accessToken,
      category.id
    )
    dispatch(removeCategory(removedCategory))
  }

  const onNavigateBack = () => {
    dispatch(setCategoryFilter(null))
    navigate(-1)
  }

  return (
    <>
      <nav className='top-bar'>
        <IoArrowBackOutline
          className='mr-4'
          size={24}
          onClick={onNavigateBack}
        />
        <h1 className='text-xl font-bold'>Categories</h1>
      </nav>
      <div>
        {categories.map((category: Category) => {
          /* Do not show remove button on "Others category" */
          const rightButton =
            category.name !== 'Others' ? (
              <BiTrashAlt
                size={24}
                onClick={() => onRemoveCategory(category)}
              />
            ) : undefined
          return (
            <Tile
              key={category.id}
              leftIcon={<MdLabelOutline size={24} />}
              title={category.name}
              rightIcon={rightButton}
              onClick={() => {}}
            />
          )
        })}
      </div>
    </>
  )
}
