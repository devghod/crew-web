import { Outlet, Navigate } from 'react-router-dom';
import SuspenseLoader from '../../components/SuspenseLoader';
import { isDark, setIsDark } from '../darkMode';
import { useAuthStore } from '../../stores/authStore';

const PrivateRoute = () => {
  const { isAuthentic, isLoading } = useAuthStore();

console.log('Private', isAuthentic, isLoading)

  if (isLoading) {
    return <SuspenseLoader />;
  }

  if (isAuthentic || isAuthentic === null) {
    const dark = isDark();
    setIsDark(dark);
    return <Outlet />;
  }

  return <Navigate to='/login' replace />;
};

export default PrivateRoute;
