import { useContext } from 'react';
import { AuthContext, TAuthContext } from './AuthProvider';

export const useAuth = () => {
  const context = useContext<TAuthContext | null | unknown>(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
