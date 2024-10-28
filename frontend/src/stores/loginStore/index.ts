import { create } from 'zustand';
import { LoginState, initialLoginState } from './loginState';
import { LoginActions, createLoginActions } from './loginActions';

export type LoginStore = LoginState & LoginActions;

export const useLoginStore = create<LoginStore>()((set, get, store) => ({
  ...initialLoginState,
  ...createLoginActions(set, get, store),
}));
