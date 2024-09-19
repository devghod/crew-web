import { create } from 'zustand';
import { Credentials, RegistrationForm } from './LoginTypes';
import {
  setCookie,
  getCookie,
  deleteCookie,
} from '../../utils/cookies';
import { useAuth } from "../../utils/RouteController/AuthProvider";

export type LoginState = {
  isAuthentic: boolean;
  token: string;
  refreshToken: string;
  credentials: Credentials;
  registration: RegistrationForm;
  isLoading: boolean;
  isError: boolean;
  message: string;
  login: () => void;
  register: () => void;
};

export const useLoginStore = create<LoginState>()((set, get, store) => ({
  isAuthentic: false,
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
  message: "",
  
  login: async () => {
    try {
      set({ isLoading: true });
      const credentials = store.getState().credentials;
      const result = await fetch('http://localhost:4001/api/auth/login', 
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(credentials)
        });

        const { 
          success, 
          message, 
          token, 
          refreshToken 
        } = await result.json();
  
      if (success) {
        setCookie('token', token, '30'); 
        setCookie('refreshToken', refreshToken, '30');
        get().resetFormData();
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
      console.log(">", error);
    };
  },
  register: async () => {
    try {
      set({ isLoading: true });
      const registration = store.getState().registration;
      const result = await fetch('http://localhost:4001/api/auth/register', 
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(registration)
        });

        const { 
          success, 
          message, 
        } = await result.json();
  
      if (success) {
        get().resetFormDataRegistration();
        set({ message: message });
        set({ isError: false });
      } else {
        set({ message: message });
        set({ isError: true });
      }
      set({ isLoading: false });
    } catch(error) {
      set({ isLoading: false });
      console.log(">", error);
    }
  },
  verify: async (tokens) => {
    try {
      if (tokens.token && tokens.refreshToken) {
        const result = await fetch('http://localhost:4001/api/auth/verify', 
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(tokens)
          });

        const { 
          success, 
          message, 
          accessToken,
          refreshToken,
          profile,
        } = await result.json();

        if (success) {
          set({ isAuthentic: true });
          set({ message: message });
          set({ isError: false });
          set({ token: accessToken });
          set({ refreshToken: refreshToken });
          setCookie('token', accessToken, '30'); 
          setCookie('refreshToken', refreshToken, '30');
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
    } catch(error) {
      console.log("> " + error);
    }
  },

  logout: () => {
    set({ token: '' });
    set({ refreshToken: '' });
  },

  resetFormData: () => set({ credentials: { username: '', password: '' }}),
  resetFormDataRegistration: () => set({
    registration: {
      username: '',
      email: '',
      mobile: '',
      password: '',
      confirmPassword: '',
    }
  }),

  setFormData: (data) => set({ credentials: data }),
  setFormDataRegistration: (data) => set({ registration: data }),
  
}));
