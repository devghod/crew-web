export type User = {
  _id: string;
  username: string;
  email: string;
  status: string;
};

export type Statistics = {
  _id?: null;
  totalCount?: number;
  activeCount?: number;
  inactiveCount?: number;
  softDeleteCount?: number;
  holdCount?: number;
};