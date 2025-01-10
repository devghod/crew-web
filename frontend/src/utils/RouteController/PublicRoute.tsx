import { Outlet, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { useEffect } from 'react';

const PublicRoute = () => {
  const { isAuthentic, isLoading } = useAuthStore();
  const navigate = useNavigate();

  console.log('Public', isAuthentic, isLoading)

  useEffect(() => {
    if (isAuthentic) navigate('/dashboard');
  }, [isAuthentic, navigate]);

  return !isAuthentic ? <Outlet /> : null; 
};

export default PublicRoute;
