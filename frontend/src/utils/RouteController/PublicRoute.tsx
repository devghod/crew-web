import { Outlet } from 'react-router-dom';
import { useAuth } from './Auth';
import PrivateRoute from './PrivateRoute';
import { TAuthContext } from './AuthProvider';

const PublicRoute = () => {
  const { isAuthenticated }: TAuthContext = useAuth();

  if (isAuthenticated) {
    return <PrivateRoute />;
  } else {
    return <Outlet />;
  }
};

export default PublicRoute;
