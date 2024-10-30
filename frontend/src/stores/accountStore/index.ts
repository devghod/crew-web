import { create } from 'zustand';
import { TAccountState, initialAccountState } from './accountState';
import { TAccountActions, createAccountActions } from './accountActions';

export type TAccountStore = TAccountState & TAccountActions;

export const useAccountStore = create<TAccountStore>()((set, get, store) => ({
  ...initialAccountState,
  ...createAccountActions(set, get, store),
}));
