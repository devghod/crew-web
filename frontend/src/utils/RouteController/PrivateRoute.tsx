import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import {
  setCookie,
  getCookie,
  deleteCookie,
} from './cookies';

const PrivateRoute = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;