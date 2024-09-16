import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import {
  setCookie,
  getCookie,
  deleteCookie,
} from './cookies';

const PublicRoute = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/dashboard" /> : <Outlet />;
};

export default PublicRoute;