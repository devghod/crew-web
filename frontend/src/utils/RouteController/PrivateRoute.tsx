import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from './Auth';
import { TAuthContext } from './AuthProvider';
import SuspenseLoader from '../../components/SuspenseLoader';

const PrivateRoute = () => {
  const { isAuthenticated, isLoading }: TAuthContext = useAuth();

  if (isLoading) {
    return <SuspenseLoader />;
  }

  if (isAuthenticated || isAuthenticated == null) {
    return <Outlet />;
  } else {
    return <Navigate to='/login' replace />;
  }
};

export default PrivateRoute;
