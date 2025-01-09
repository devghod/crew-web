import { StateCreator } from 'zustand';
import { TAuthState } from './authState';
import { setCookie, deleteCookie } from '../../utils/cookies';
import { TCredentials, TRegistrationForm } from '../../types/AuthTypes';

export type TAuthActions = {
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

export type TAuthStore = TAuthState & TAuthActions;

type TTokens = {
  token?: string | null;
  refreshToken?: string | null;
}

export const createAuthActions: StateCreator<
  TAuthStore,
  [],
  [],
  TAuthActions
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

      const { 
        success, 
        message, 
        token, 
        refreshToken, 
        profile 
      } = await result.json();

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
        set({ 
          profile: profile,
          token: token,
          refreshToken: refreshToken,
          message: message,
          isError: false,
          isAuthentic: true 
        });
      } else {
        deleteCookie('token');
        deleteCookie('refreshToken');
        set({ 
          token: '',
          refreshToken: '',
          message: message,
          isError: true,
          isAuthentic: false 
        });
      }

      set({ isLoading: false });

    } catch (error) {
      set({ isLoading: false, isAuthentic: false });
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
        set({ message: message, isError: false });
      } else {
        set({ message: message, isError: true });
      }

      set({ isLoading: false });
    
    } catch (error) {
      set({ isLoading: false });
      console.log('>', error);
    }
  },
  
  verify: async (tokens: TTokens) => {
    try {
      set({ isLoading: true });

      if (!tokens.token || !tokens.refreshToken) {
        set({ isLoading: false });
        throw new Error('Empty Tokens!'); 
      }

      const result = await fetch('http://localhost:4001/api/auth/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tokens),
      });

      const { 
        success, 
        message, 
        accessToken, 
        refreshToken, 
        profile 
      } = await result.json();

      if (success) {
        set({ 
          profile: profile,
          isAuthentic: true,
          message: message,
          isError: false,
          token: accessToken,
          refreshToken: refreshToken,
          isLoading: false
        });
        setCookie('token', accessToken, 30);
        setCookie('refreshToken', refreshToken, 30);
      } else {
        deleteCookie('token');
        deleteCookie('refreshToken');
        set({ 
          isAuthentic: false,
          message: message,
          isError: true,
          token: '',
          refreshToken: '',
          isLoading: false
        });
      }
      
    } catch (error) {
      console.log('> ' + error);
    }
  },

  logout: () => {
    set({ 
      token: '',
      refreshToken: '',
      isLoading: false
    });
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
