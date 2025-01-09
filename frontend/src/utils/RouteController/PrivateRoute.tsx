import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from './Auth';
import { TAuthContext } from './AuthProvider';
import SuspenseLoader from '../../components/SuspenseLoader';
import { isDark, setIsDark } from '../darkMode';
import { useAuthStore } from '../../stores/authStore';

const PrivateRoute = () => {
  const { isAuthentic, isLoading } = useAuthStore();

  if (isLoading) {
    return <SuspenseLoader />;
  }

  if (isAuthentic) {
    const dark = isDark();
    setIsDark(dark);

    return <Outlet />;
  }

  return <Navigate to='/login' replace />;
};

export default PrivateRoute;
