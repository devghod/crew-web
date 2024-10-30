import { TCredentials, TRegistrationForm } from '../../types/LoginTypes';

export type TLoginState = {
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

export const initialLoginState: TLoginState = {
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
