import { create } from 'zustand';
import { TUser, TStatistics } from '../types/AccountType';
import { getCookie } from '../utils/cookies';

export type AccountState = {
  user: object;
  users: TUser[];
  statistics: TStatistics;
  message: string;
  isLoading: boolean;
  getUser: (id: number) => void;
  getUsers: () => void;
  getUsersStatistics: () => void;
};

export const useAccountStore = create<AccountState>()((set, get) => ({
  user: {},
  users: [],
  statistics: {
    _id: null,
    totalCount: 0,
    activeCount: 0,
    inactiveCount: 0,
    softDeleteCount: 0,
    holdCount: 0,
  },
  message: '',
  isLoading: false,
  getUser: async (id: number) => {
    try {
      set({ isLoading: true });
      const result = await fetch(
        `http://localhost:4001/api/user/get-user/${id}`,
      );

      if (result.ok) {
        await result.json();
        set({ isLoading: false });
      }
      set({ isLoading: false });
    } catch (err) {
      console.log('Error', err);
      set({ isLoading: false });
    }
  },
  getUsers: async () => {
    try {
      set({ isLoading: true });
      const token = getCookie('token');
      const authToken = `Bearer ${token}`;

      const result = await fetch('http://localhost:4001/api/user/get-users', {
        method: 'GET',
        headers: {
          Authorization: authToken,
          'Content-Type': 'application/json',
        },
      });

      const { success, data, message } = await result.json();

      if (result.ok && success) {
        get().getUsersStatistics();
        set(() => ({ users: data }));
        set(() => ({ isLoading: false }));
      } else {
        set({ message: message });
      }
    } catch (err) {
      set(() => ({ isLoading: false }));
    }
  },
  getUsersStatistics: async () => {
    try {
      const token = getCookie('token');
      const authToken = `Bearer ${token}`;

      const result = await fetch(
        'http://localhost:4001/api/user/get-users-statistics',
        {
          method: 'GET',
          headers: {
            Authorization: authToken,
            'Content-Type': 'application/json',
          },
        },
      );

      const { success, data, message } = await result.json();

      if (result.ok && success) {
        set(() => ({ statistics: data }));
        set(() => ({ isLoading: false }));
      } else {
        set({ message: message });
      }
    } catch (err) {
      console.log(`Error ${err}`);
    }
  },
}));
