export interface Debt {
  id: number;
  name: string;
  amount: number;
  date_requested: string;
  due_date: string;
  status: 'Paid' | 'Unpaid';
};