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
import { initCategories } from './redux/categories/action-creators'
import { AppStore } from './redux/store'
import { RequireAuth } from './router/RequireAuth'
import { findAllNotes } from './services/notes-services'
import { loadNotes } from './redux/notes/action-creators'

function App() {
  console.log('Rendering App')
  const user = useSelector<AppStore, User>((store) => store.user)
  const dispatch = useDispatch()

  /* Init user from local storage */
  useEffect(() => {
    const rawUser = localStorage.getItem('user')
    if (rawUser) {
      const _ = async () => {
        const user = JSON.parse(rawUser) as User
        dispatch(loginUser(user))
      }
      _()
    }
  }, [])

  /* Once user is loaded, get their categories and all notes */
  useEffect(() => {
    if (user) {
      const _ = async function () {
        const categories = await findAllCategories(user.accessToken)
        const notes = await findAllNotes(user.accessToken)
        dispatch(initCategories(categories))
        dispatch(loadNotes(notes))
      }
      _()
    }
  }, [user])

  return (
    <>
      <Routes>
        <Route
          path='/'
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
