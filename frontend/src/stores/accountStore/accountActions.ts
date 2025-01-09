import { StateCreator } from 'zustand';
import { TAccountState } from './accountState';
import { getCookie } from '../../utils/cookies';
import { fetchAuth } from '../../utils/fetchUtil';

export type TAccountActions = {
  createUser: (body: object) => Promise<boolean | undefined>;
  getUser: (id: number) => Promise<void>;
  getUsers: () => Promise<void>;
  getUsersStatistics: () => Promise<void>;
};

export type TAccountStore = TAccountState & TAccountActions;

export const createAccountActions: StateCreator<
  TAccountStore,
  [],
  [],
  TAccountActions
> = (set, get) => ({

  createUser: async (body: object) => {
    try {
      set({ isLoading: true });

      const result = await fetchAuth({
        api: 'user/create-user',
        method: 'POST',
        body: body,
      });

      if (result.ok) {
        const { data } = await result.json();
        set({ users: [...get().users, data], isLoading: false, message: '' });
        return true;
      } else {
        const data = await result.json();
        set({ isLoading: false, message: data.message });
        return false;
      }
    } catch (err) {
      console.error('Error', err);
      set({ isLoading: false });
    }
  },

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

      const result = await fetchAuth({
        api: 'user/get-users',
        method: 'GET',
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
