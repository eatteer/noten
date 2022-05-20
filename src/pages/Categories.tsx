import { useRef } from 'react'
import { BiTrashAlt } from 'react-icons/bi'
import { IoArrowBackOutline } from 'react-icons/io5'
import { MdLabelOutline } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Modal } from '../components/Modal'
import { Tile } from '../components/Tile'
import { Category } from '../entities/Category'
import useModal from '../hooks/useModal'
import { removeCategory } from '../redux/categories/action-creators'
import { setCategoryFilter } from '../redux/category-filter/action-creators'
import { AppStore } from '../redux/store'
import { removeCategoryById } from '../services/categories-service'

export const Categories: React.FC = () => {
  const store = useSelector<AppStore, AppStore>((store) => store)
  const user = store.user!
  const { categories } = store

  /* Hooks */
  const categoryRef = useRef<Category>()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    isOpen: isOpenDeleteCategory,
    openModal: openDeleteCategory,
    closeModal: closeDeleteCategory,
  } = useModal()

  /* Handlers */
  const onOpenDeleteCategory = (category: Category) => {
    categoryRef.current = category
    openDeleteCategory()
  }

  const onRemoveCategory = async () => {
    const category = categoryRef.current
    const removedCategory = await removeCategoryById(
      user.accessToken,
      category!.id
    )
    dispatch(removeCategory(removedCategory))
    closeDeleteCategory()
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
                onClick={() => onOpenDeleteCategory(category)}
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
      <Modal isOpen={isOpenDeleteCategory} closeModal={closeDeleteCategory}>
        <div className='p-4'>
          <h2 className='text-xl font-bold'>Delete category</h2>
          <h2 className='mb-8'>
            Are you sure you want to delete this category? Your notes won't be
            deleted
          </h2>
          <div className='flex justify-end items-center space-x-4'>
            <button className='button light' onClick={closeDeleteCategory}>
              Cancel
            </button>
            <button className='button danger' onClick={onRemoveCategory}>
              Confirm
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}
