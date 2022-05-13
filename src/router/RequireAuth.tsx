import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

type Props = {
  children: JSX.Element
}

export const RequireAuth: React.FC<Props> = ({ children }) => {
  const user = useSelector<any, any>((store) => store.user)
  console.log(user)
  
  if (!user) {
    return <Navigate to='/signin' />
  }

  return children;
}
