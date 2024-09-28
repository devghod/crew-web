import { create } from 'zustand';
import { User } from './AccountType';
import {
  getCookie,
} from '../../utils/cookies';

export type AccountState = {
  user: object;
  users: User[];
  isLoading: boolean;
  getUser: (id: number) => void;
  getUsers: () => void;
};

export const useAccountStore = create<AccountState>()((set, get, store) => ({
  user: {},
  users: [],
  isLoading: false,
  getUser: async (id: number) => {
    try {
      set({ isLoading: true });
      const result = await fetch(`http://localhost:4001/api/user/get-user/${id}`);

      if (result.ok) {
        const { data } = await result.json();
        set({ isLoading: false });
      }
      set({ isLoading: false });
    } catch (err) {
      console.log("Error", err);
      set({ isLoading: false });
    };
  },
  getUsers: async () => {
    try {
      set({ isLoading: true });
      const token = getCookie('token');
      const authToken = `Bearer ${token}`;

      const result = await fetch('http://localhost:4001/api/user/get-users', {
        method: 'GET',
        headers: {
          'Authorization': authToken,
          'Content-Type': 'application/json'
        }
      });

      const { success, data, message } = await result.json();

      if (result.ok && success) {
        set(() => ({ users: data }));
        set(() => ({ isLoading: false }));
      }
    } catch (err) {
      set(() => ({ isLoading: false }));
    };
  },
}));
