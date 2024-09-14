import { create } from 'zustand';
import { Credentials } from './LoginTypes';

export type LoginState = {
  credentials: Credentials;
  isLoading: boolean;
};

export const useLoginStore = create<LoginState>()((set, get, store) => ({
  credentials: {},
  isLoading: false,
  
  login: async (credentials: Credentials) => {
    try {
      set((state) => ({ isLoading: true }));
      const result = await fetch('http://localhost:4001/api/auth/login', 
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(credentials)
        });

      console.log(">>",result) 
      // if (result.ok) {
      //   const { data } = await result.json();
      //   set((state) => ({ debts: [...state.debts, data] }));
      // };
      set(() => ({ isLoading: false }));
      get().setDebtStats();
    } catch (error) {
      set(() => ({ isLoading: false }));
    };
  },
  
}));
