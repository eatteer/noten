import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Home } from './pages/Home'
import { SignIn } from './pages/SignIn'
import { SignUp } from './pages/SignUp'
import 'react-toastify/dist/ReactToastify.css'
import { loginUser } from './redux/user/action-creators'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { User } from './entities/User'
import { findAllCategories } from './services/categories-service'
import { loadCategories } from './redux/categories/action-creators'
import { AppStore } from './redux/store'
import { Topbar } from './components/Topbar'

function App() {
  console.log('Rendering App')
  const user = useSelector<AppStore, User>((store) => store.user)
  const dispatch = useDispatch()

  useEffect(() => {
    const rawUser = localStorage.getItem('user')
    if (rawUser) {
      const _fetch = async () => {
        const user = JSON.parse(rawUser) as User
        dispatch(loginUser(user))
        const categories = await findAllCategories(user.accessToken)
        dispatch(loadCategories(categories))
      }
      _fetch()
    }
  }, [])

  useEffect(() => {
    if (user) {
      const _fetch = async () => {
        const categories = await findAllCategories(user.accessToken)
        dispatch(loadCategories(categories))
      }
      _fetch()
    }
  }, [user])

  return (
    <>
      <Topbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
