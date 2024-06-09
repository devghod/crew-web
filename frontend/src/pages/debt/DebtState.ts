import { create } from 'zustand';
import { Debt } from './DebtInterface';

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
      // const fetchData = await apiFetch.get<IUser>(GET_ARTICLES, {});
      // set(() => ({
      //   isLoading: false,
      //   articles: fetchData,
      // }));
      set(() => ({ isLoading: false }));
      return { data: get().debts };
    } catch (err) {
      set(() => ({ isLoading: false }));
    };
  },
  setDebtTotal: () => set((state) => ({ debtTotal: state.debts.length })),
  newDebt: (debt: Debt) => {
    set((state) => ({ debts: [...state.debts, debt] }));
    get().setDebtTotal();
  },
  deleteDebt: (id: number) => {
    set((state) => ({ debts: state.debts.filter((debt) => debt.id != id)}));
    get().setDebtTotal();
  },
  updateDebt: (debt: Debt) => {
    set((state) => ({ 
      debts: { ...state.debts, debt }
    }));
    get().setDebtTotal();
  },
  updateStatusDebt: (id: number) => {
    set((state) => ({ 
      debts: state.debts.map(debt => {
        if (debt.id === id) {
          const temp = debt.status = status === "Paid" ? "Unpaid" : "Paid";
          return { ...debt, status: temp };
        } else {
          return debt;
        };
      })
    }));
  },
}));
