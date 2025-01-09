import { TCredentials, TRegistrationForm } from '../../types/AuthTypes';

export type TAuthState = {
  profile: object;
  isAuthentic: boolean | null;
  token: string;
  refreshToken: string;
  credentials: TCredentials;
  registration: TRegistrationForm;
  isLoading: boolean;
  isError: boolean;
  message: string;
};

export const initialAuthState: TAuthState = {
  profile: {},
  isAuthentic: null,
  token: '',
  refreshToken: '',
  credentials: {
    username: '',
    password: '',
  },
  registration: {
    username: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
  },
  isLoading: false,
  isError: false,
  message: '',
};
