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
import { addNotes } from './redux/notes/action-creators'
import { Categories } from './pages/Categories'
import { AvoidNavigateIfUser } from './router/AvoidNavigateIfUser'
import { Settings } from './pages/Settings'

function App() {
  // console.log('Rendering App')

  const user = useSelector<AppStore, User | null>((store) => store?.user)
  const dispatch = useDispatch()

  /* Load user from local storage */
  useEffect(() => {
    const rawUser = localStorage.getItem('user')
    if (rawUser) {
      ;(async function () {
        const user = JSON.parse(rawUser) as User
        dispatch(loginUser(user))
      })()
    }
  }, [])

  /* Once user is loaded, fetch all their categories and notes */
  useEffect(() => {
    if (user) {
      ;(async function () {
        const categories = await findAllCategories(user.accessToken)
        const notes = await findAllNotes(user.accessToken)
        dispatch(initCategories(categories))
        dispatch(addNotes(notes))
      })()
    }
  }, [user])

  /* Navigate from address bar re-mount the App */
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
        <Route
          path='/categories'
          element={
            <RequireAuth>
              <Categories />
            </RequireAuth>
          }
        />
        <Route
          path='/signin'
          element={
            <AvoidNavigateIfUser>
              <SignIn />
            </AvoidNavigateIfUser>
          }
        />
        <Route
          path='/signup'
          element={
            <AvoidNavigateIfUser>
              <SignUp />
            </AvoidNavigateIfUser>
          }
        />
        <Route
          path='/settings'
          element={
            <RequireAuth>
              <Settings />
            </RequireAuth>
          }
        />
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
