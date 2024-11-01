import { StateCreator } from 'zustand';
import { TLoginState } from './loginState';
import { setCookie, deleteCookie } from '../../utils/cookies';
import { TCredentials, TRegistrationForm } from '../../types/LoginTypes';

export type TLoginActions = {
  verify: (tokens: {
    token?: string | null;
    refreshToken?: string | null;
  }) => void;
  logout: () => void;
  login: () => void;
  register: () => void;
  resetFormData: () => void;
  resetFormDataRegistration: () => void;
  setFormData: (data: TCredentials) => void;
  setFormDataRegistration: (data: TRegistrationForm) => void;
};

export type TLoginStore = TLoginState & TLoginActions;

export const createLoginActions: StateCreator<
  TLoginStore,
  [],
  [],
  TLoginActions
> = (set, get, store) => ({
  login: async () => {
    try {
      set({ isLoading: true });
      const credentials = store.getState().credentials;
      const result = await fetch('http://localhost:4001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const { success, message, token, refreshToken, profile } =
        await result.json();

      // custom delay
      const myDelay = new Promise((resolve, reject) => {
        const success = true;

        setTimeout(() => {
          if (success) {
            resolve('Operation completed successfully!');
          } else {
            reject('Operation failed.');
          }
        }, 5000);
      });

      if (success) {
        await myDelay;
        setCookie('token', token, 30);
        setCookie('refreshToken', refreshToken, 30);
        get().resetFormData();
        set({ profile: profile });
        set({ token: token });
        set({ refreshToken: refreshToken });
        set({ message: message });
        set({ isError: false });
        set({ isAuthentic: true });
      } else {
        deleteCookie('token');
        deleteCookie('refreshToken');
        set({ token: '' });
        set({ refreshToken: '' });
        set({ message: message });
        set({ isError: true });
        set({ isAuthentic: false });
      }

      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      set({ isAuthentic: false });
      console.log('>', error);
    }
  },
  register: async () => {
    try {
      set({ isLoading: true });
      const registration = store.getState().registration;
      const result = await fetch('http://localhost:4001/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registration),
      });

      const { success, message } = await result.json();

      if (success) {
        get().resetFormDataRegistration();
        set({ message: message });
        set({ isError: false });
      } else {
        set({ message: message });
        set({ isError: true });
      }
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      console.log('>', error);
    }
  },
  verify: async (tokens: {
    token?: string | null;
    refreshToken?: string | null;
  }) => {
    try {
      if (tokens.token && tokens.refreshToken) {
        const result = await fetch('http://localhost:4001/api/auth/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(tokens),
        });

        const { success, message, accessToken, refreshToken, profile } =
          await result.json();

        if (success) {
          set({ profile: profile });
          set({ isAuthentic: true });
          set({ message: message });
          set({ isError: false });
          set({ token: accessToken });
          set({ refreshToken: refreshToken });
          setCookie('token', accessToken, 30);
          setCookie('refreshToken', refreshToken, 30);
        } else {
          deleteCookie('token');
          deleteCookie('refreshToken');
          set({ isAuthentic: false });
          set({ message: message });
          set({ isError: true });
          set({ token: '' });
          set({ refreshToken: '' });
        }
      }
    } catch (error) {
      console.log('> ' + error);
    }
  },
  logout: () => {
    set({ token: '' });
    set({ refreshToken: '' });
  },
  resetFormData: () => set({ credentials: { username: '', password: '' } }),
  resetFormDataRegistration: () =>
    set({
      registration: {
        username: '',
        email: '',
        mobile: '',
        password: '',
        confirmPassword: '',
      },
    }),
  setFormData: (data: TCredentials) => set({ credentials: data }),
  setFormDataRegistration: (data: TRegistrationForm) =>
    set({ registration: data }),
});
