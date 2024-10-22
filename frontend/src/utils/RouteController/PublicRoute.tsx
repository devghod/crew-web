import { Outlet } from 'react-router-dom'
import { useAuth } from './AuthProvider'
import PrivateRoute from './PrivateRoute'

const PublicRoute = () => {
  const { isAuthenticated }: any = useAuth()

  if (isAuthenticated) {
    return <PrivateRoute />
  } else {
    return <Outlet />
  }
}

export default PublicRoute
