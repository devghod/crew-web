export type Debt = {
  id: number;
  name: string;
  amount: number;
  amount_remaining: number;
  date_requested: string;
  due_date: string;
  status: 'Paid' | 'Unpaid';
};