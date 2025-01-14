import { Outlet, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { useEffect } from 'react';

const PublicRoute = () => {
  const { isAuthentic } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthentic) navigate('/dashboard');
  }, [isAuthentic, navigate]);

  return !isAuthentic ? <Outlet /> : null; 
};

export default PublicRoute;
