import { StateCreator } from 'zustand';
import { AccountState } from './accountState';
import { getCookie } from '../../utils/cookies';

export type AccountActions = {
  getUser: (id: number) => Promise<void>;
  getUsers: () => Promise<void>;
  getUsersStatistics: () => Promise<void>;
};

export type AccountStore = AccountState & AccountActions;

export const createAccountActions: StateCreator<
  AccountStore,
  [],
  [],
  AccountActions
> = (set, get) => ({
  getUser: async (id: number) => {
    try {
      set({ isLoading: true });
      const result = await fetch(
        `http://localhost:4001/api/user/get-user/${id}`,
      );

      if (result.ok) {
        const data = await result.json();
        set({ user: data, isLoading: false });
      } else {
        set({ isLoading: false });
      }
    } catch (err) {
      console.error('Error', err);
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
        set({ users: data, isLoading: false });
      } else {
        set({ message });
      }
    } catch (err) {
      console.error('Error', err);
      set({ isLoading: false });
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
        set({ statistics: data, isLoading: false });
      } else {
        set({ message });
      }
    } catch (err) {
      console.error('Error', err);
      set({ isLoading: false });
    }
  },
});
