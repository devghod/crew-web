import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from './Auth';
import { TAuthContext } from './AuthProvider';
import SuspenseLoader from '../../components/SuspenseLoader';
import { isDark } from '../darkMode';

const PrivateRoute = () => {
  const { isAuthenticated, isLoading }: TAuthContext = useAuth();

  if (isLoading) {
    return <SuspenseLoader />;
  }

  if (isAuthenticated) {
    return (
      <div className={`${isDark() ? 'dark' : ''}`}>
        <Outlet />
      </div>
    );
  } else {
    return <Navigate to='/login' replace />;
  }
};

export default PrivateRoute;
