import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const PrivateRoute = () => {
  const { isAuthenticated }: any = useAuth();

  if (isAuthenticated) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" replace />;
  };
};

export default PrivateRoute;