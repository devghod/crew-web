export type TUser = {
  _id: string;
  username: string;
  email: string;
  status: string;
  date_created: string;
};

export type TStatistics = {
  _id?: null;
  totalCount?: number;
  activeCount?: number;
  inactiveCount?: number;
  softDeleteCount?: number;
  holdCount?: number;
};
