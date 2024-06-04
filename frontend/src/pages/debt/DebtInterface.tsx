export interface Debt {
  id: number;
  name: string;
  amount: number;
  date_requested: string;
  due_date: string;
  status: 'Paid' | 'Unpaid';
};

export const debtors:Debt[] = [
  {
    id: 1,
    name: "Ben Mad",
    amount: 1000,
    date_requested: "2022-01-01",
    due_date: "2024-10-01",
    status: "Unpaid",
  },
  {
    id: 2,
    name: "Que Mad",
    amount: 2000,
    date_requested: "2022-01-01",
    due_date: "2024-10-01",
    status: "Paid",
  },
];