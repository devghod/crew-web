import { create } from 'zustand';
import { AccountState, initialAccountState } from './accountState';
import { AccountActions, createAccountActions } from './accountActions';

export type AccountStore = AccountState & AccountActions;

export const useAccountStore = create<AccountStore>()((set, get, store) => ({
  ...initialAccountState,
  ...createAccountActions(set, get, store),
}));
