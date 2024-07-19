import { create } from 'zustand';
import { Debt } from './DebtTypes';

export type DebtState = {
  debts: Debt[];
  debtStats: object;
  isLoading: boolean;
};

export const useDebtStore = create<DebtState>()((set, get, store) => ({
  debts: [],
  debtStats: {
    total: 0,
    paid: 0,
    unpaid: 0,
  },
  isLoading: false,
  getDebt: async (id: number) => {
    try {
      set((state) => ({ isLoading: true }));
      const result = await fetch(`http://localhost:4001/api/debt/get-debt/${id}`);
      if (result.ok) {
        const { data } = await result.json();
        set((state) => ({ isLoading: false }));
        return { data: data };
      };
      set((state) => ({ isLoading: false }));
      return { data: null };
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
        const { data } = await result.json();
        set(() => ({ debts: data }));
        get().setDebtStats();
      };
      setTimeout(() => {
        set(() => ({ isLoading: false }));
        return { data: get().debts };
      }, 3000);
    } catch (err) {
      set(() => ({ isLoading: false }));
    };
  },
  setDebtStats: async () => {
    try {
      const result = await fetch(`http://localhost:4001/api/debt/get-debts-stats`);
      if (result.ok) {
        const { data } = await result.json();
        set(() => ({ debtStats: data }));
        return { data: data };
      };
      return { 
        data: {
          total: 0,
          paid: 0,
          unpaid: 0,
        }
      };
    } catch (error) {
      console.log("Error", err);
      set(() => ({ isLoading: false }));
    };
  },
  newDebt: async (debt: Debt) => {
    try {
      set((state) => ({ isLoading: true }));
      const result = await fetch('http://localhost:4001/api/debt/post-debt', 
        {
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
      get().setDebtStats();
    } catch (error) {
      set(() => ({ isLoading: false }));
    };
  },
  deleteDebt: async (id: number) => {
    try {
      set((state) => ({ isLoading: true }));
      const result = await fetch(`http://localhost:4001/api/debt/delete-debt/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
        });
      if (result.ok) {
        set((state) => ({ debts: state.debts.filter((debt) => debt._id != id)}));
        get().setDebtStats();
        set((state) => ({ isLoading: false }));
      };
      set((state) => ({ isLoading: false }));
      return { data: null };
    } catch (err) {
      console.log("Error", err);
      set(() => ({ isLoading: false }));
    };
  },
  updateDebt: async (debt: Debt) => {
    try {
      set((state) => ({ isLoading: true }));
      let id = debt._id;
      const result = await fetch(`http://localhost:4001/api/debt/put-debt/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(debt)
        });
      if (result.ok) {
        const { data } = await result.json();
        set((state) => ({ 
          debts: state.debts.map(curr => {
            if (curr._id === data._id) {
              return { ...data };
            } else {
              return curr;
            };
          })
        }));
      };
      set(() => ({ isLoading: false }));
      get().setDebtStats();
    } catch (error) {
      set(() => ({ isLoading: false }));
    };
  },
  updateStatusDebt: async (id: number) => {
    try {
      set((state) => ({ isLoading: true }));
      const result = await fetch(`http://localhost:4001/api/debt/put-debt/status/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
        });
      if (result.ok) {
        const { data } = await result.json();
        set((state) => ({ 
          debts: state.debts.map(debt => {
            if (debt._id === id) {
              // const temp = debt.status = status === "Paid" ? "Unpaid" : "Paid";
              // return { ...debt, status: temp };
              return { ...data };
            } else {
              return debt;
            };
          })
        }));
      };
      set(() => ({ isLoading: false }));
    } catch (error) {
      set(() => ({ isLoading: false }));
    };
  },
}));
