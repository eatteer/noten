import { Navigate } from 'react-router-dom'

type Props = {
  children: JSX.Element
}

export const RequireAuth: React.FC<Props> = ({ children }) => {
  if (!localStorage.getItem('user')) {
    return <Navigate to='/signin' />
  }

  return children
}
