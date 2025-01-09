import { create } from 'zustand';
import { TAuthState, initialAuthState } from './authState';
import { TAuthActions, createAuthActions } from './authActions';

export type AuthStore = TAuthState & TAuthActions;

export const useAuthStore = create<AuthStore>()((set, get, store) => ({
  ...initialAuthState,
  ...createAuthActions(set, get, store),
}));
