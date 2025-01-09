import { Outlet } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import { useAuthStore } from '../../stores/authStore';

const PublicRoute = () => {
  const { isAuthentic } = useAuthStore();

  if (isAuthentic) {
    return <PrivateRoute />;
  } else {
    return <Outlet />;
  }
};

export default PublicRoute;
