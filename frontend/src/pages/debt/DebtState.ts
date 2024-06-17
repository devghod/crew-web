import { create } from 'zustand';
import { Debt } from './DebtTypes';

export interface DebtState {
  debts: Debt[];
  debtTotal: number;
  isLoading: boolean;
};

export const useDebtStore = create<DebtState>()((set, get, store) => ({
  debts: [],
  debtTotal: 0,
  isLoading: false,
  getDebt: async (id: number) => {
    try {
      set((state) => ({ isLoading: true }));
      const debt = get().debts.find((debt) => debt.id === id);
      set((state) => ({ isLoading: false }));
      return { data: debt };
    } catch (err) {
      console.log("Error", err);
      set(() => ({ isLoading: false }));
    };
  },
  getDebts: async () => {
    try {
      set((state) => ({ isLoading: true }));
      const result = await fetch('http://localhost:4001/api/debt/get-debts');
      if (result.ok) {
        const { data, total } = await result.json();
        set(() => ({
          debts: data,
          debtTotal: total,
        }));
      };
      set(() => ({ isLoading: false }));
      return { data: get().debts };
    } catch (err) {
      set(() => ({ isLoading: false }));
    };
  },
  setDebtTotal: () => set((state) => ({ debtTotal: state.debts.length })),
  newDebt: async (debt: Debt) => {
    // set((state) => ({ debts: [...state.debts, debt] }));
    // get().setDebtTotal();
    try {
      set((state) => ({ isLoading: true }));
      const result = await fetch('http://localhost:4001/api/debt/post-debt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(debt)
      });
      if (result.ok) {
        const { data } = await result.json();
        set((state) => ({ debts: [...state.debts, data] }));
      };
      set(() => ({ isLoading: false }));
      get().setDebtTotal();
    } catch (error) {
      set(() => ({ isLoading: false }));
    };
  },
  deleteDebt: (id: number) => {
    set((state) => ({ debts: state.debts.filter((debt) => debt._id != id)}));
    get().setDebtTotal();
  },
  updateDebt: (debt: Debt) => {
    set((state) => ({ 
      debts: state.debts.map(data => {
        if (data._id === debt._id) {
          return { ...debt };
        } else {
          return data;
        };
      })
    }));
    get().setDebtTotal();
  },
  updateStatusDebt: (id: number) => {
    set((state) => ({ 
      debts: state.debts.map(debt => {
        if (debt._id === id) {
          const temp = debt.status = status === "Paid" ? "Unpaid" : "Paid";
          return { ...debt, status: temp };
        } else {
          return debt;
        };
      })
    }));
  },
}));
