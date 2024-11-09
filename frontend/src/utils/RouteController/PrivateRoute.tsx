import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from './Auth';
import { TAuthContext } from './AuthProvider';
import SuspenseLoader from '../../components/SuspenseLoader';
import { isDark, setIsDark } from '../darkMode';

const PrivateRoute = () => {
  const { isAuthenticated, isLoading }: TAuthContext = useAuth();

  if (isLoading) {
    return <SuspenseLoader />;
  }

  if (isAuthenticated) {
    const dark = isDark();
    setIsDark(dark);

    return <Outlet />;
  } else {
    return <Navigate to='/login' replace />;
  }
};

export default PrivateRoute;
