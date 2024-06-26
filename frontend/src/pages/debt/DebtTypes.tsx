export type Debt = {
  name: string;
  amount: number;
  amount_remaining: number;
  date_created: string;
  due_date: string;
  status: 'Paid' | 'Unpaid';
  installment: 'None' | 'Daily' | 'Weekly' | '15 days' | 'Monthly';
  interest_rate: number; // 0, 1 or etc...
  method: 'None' | 'Full Paid' | 'Flat' | 'Diminishing'; // Fixed , Diminishing, 
};