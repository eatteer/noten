import { FC } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { User } from '../entities/User'
import { AppStore } from '../redux/store'

type Props = {
  children: JSX.Element
}

export const AvoidNavigateIfUser: FC<Props> = ({ children }) => {
  // const user = useSelector<AppStore, User | null>((store) => store.user)
  /* Navigate from address bar re-mount the App */

  if (localStorage.getItem('user')) {
    return <Navigate to='/' replace />
  }

  return children
}
