import { create } from 'zustand';
import { Credentials } from './LoginTypes';

export type LoginState = {
  credentials: Credentials;
  isLoading: boolean;
  isError: boolean;
  message: string;
  login: () => void;
};

export const useLoginStore = create<LoginState>()((set, get, store) => ({
  credentials: {
    username: '',
    password: '',
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
        // set((state) => ({ debts: [...state.debts, data] }));
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

  setFormData: (data) => set({ credentials: data }),
  
}));
