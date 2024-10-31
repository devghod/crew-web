import { create } from 'zustand';
import { TLoginState, initialLoginState } from './loginState';
import { TLoginActions, createLoginActions } from './loginActions';

export type LoginStore = TLoginState & TLoginActions;

export const useLoginStore = create<LoginStore>()((set, get, store) => ({
  ...initialLoginState,
  ...createLoginActions(set, get, store),
}));
