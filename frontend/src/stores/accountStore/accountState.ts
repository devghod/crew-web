import { TUser, TStatistics } from '../../types/AccountType';

export type AccountState = {
  user: object;
  users: TUser[];
  statistics: TStatistics;
  message: string;
  isLoading: boolean;
};

export const initialAccountState: AccountState = {
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
};
