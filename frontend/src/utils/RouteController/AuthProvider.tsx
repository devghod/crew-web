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

  React.useEffect(() => {
    const checkCookie = () => {
      const tokenc = getCookie('token');
      const refreshToken = getCookie('refreshToken');
      verify({ 'token': tokenc, 'refreshToken': refreshToken });
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
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
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