import React, { ReactNode } from 'react';
import { useLoginStore } from '../../stores/loginStore';
import { setCookie, getCookie, deleteCookie } from '../../utils/cookies';

export const AuthContext = React.createContext<unknown>(undefined);

type TAuthProvider = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: TAuthProvider) => {
  const {
    token,
    refreshToken,
    isAuthentic,
    verify,
    logout: signout,
  } = useLoginStore();

  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    const checkCookie = async () => {
      setIsLoading(true);
      const tempToken = getCookie('token');
      const tokenc: string | null =
        typeof tempToken === 'string' && tempToken != '' ? tempToken : null;
      const tempRefreshToken = getCookie('refreshToken');
      const refreshTokenc: string | null =
        typeof tempRefreshToken === 'string' && tempRefreshToken != ''
          ? tempRefreshToken
          : null;

      type Verify = {
        token: string | null;
        refreshToken: string | null;
      };

      const tokens: Verify = {
        token: tokenc,
        refreshToken: refreshTokenc,
      };

      verify(tokens);
      setIsLoading(false);
    };
    checkCookie();
  }, [verify]);

  const loginAuth = () => {
    const tokenc = getCookie('token');
    const refreshTokenc = getCookie('refreshToken');
    const tempToken = token || tokenc || '';
    const tempRefreshToken = refreshToken || refreshTokenc || '';
    setCookie('token', tempToken, 30);
    setCookie('refreshToken', tempRefreshToken, 30);
  };

  const logout = () => {
    deleteCookie('token');
    deleteCookie('refreshToken');
    signout();
  };

  const isAuthenticated = isAuthentic;

  const params: TAuthContext = {
    isAuthenticated,
    loginAuth,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={params}>{children}</AuthContext.Provider>;
};

export type TAuthContext = {
  isAuthenticated?: boolean | null;
  loginAuth?: () => void;
  logout?: () => void;
  isLoading?: boolean;
};
