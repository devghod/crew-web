import React from "react";
import { useLoginStore } from "../../pages/login/LoginState";
import {
  setCookie,
  getCookie,
  deleteCookie,
} from '../../utils/cookies';

const AuthContext = React.createContext<unknown>(undefined);

export const AuthProvider = ({ children }: any) => {

  const { 
    token, 
    refreshToken, 
    isAuthentic, 
    verify, 
    logout: signout 
  } = useLoginStore();

  const [ isLoading, setIsLoading ] = React.useState(false);

  React.useEffect(() => {
    const checkCookie = async () => {
      setIsLoading(true);
      const tokenc = getCookie('token');
      const refreshToken = getCookie('refreshToken');
      await verify({ 'token': tokenc, 'refreshToken': refreshToken });
      setIsLoading(false);
    }
    checkCookie();
  }, []);

  const login = () => {
    let tokenc = getCookie('token');
    let refreshTokenc = getCookie('refreshToken');
    const tempToken = token || tokenc || '';
    const tempRefreshToken = refreshToken || refreshTokenc || '';
    setCookie('token', tempToken, '30'); 
    setCookie('refreshToken', tempRefreshToken, '30');
  };

  const logout = () => {
    deleteCookie('token'); 
    deleteCookie('refreshToken');
    signout();
  };

  const isAuthenticated = isAuthentic;
  
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};