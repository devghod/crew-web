import { create } from 'zustand';
import { Credentials, RegistrationForm } from './LoginTypes';

export type LoginState = {
  credentials: Credentials;
  registration: RegistrationForm;
  isLoading: boolean;
  isError: boolean;
  message: string;
  login: () => void;
  register: () => void;
};

export const useLoginStore = create<LoginState>()((set, get, store) => ({
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
        get().resetFormData();
        set({ message: message });
        set({ isError: false });
      } else {
        set({ message: message });
        set({ isError: true });
      }

      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
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
    }
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
