import { StateCreator } from 'zustand';
import { TInventoryState } from './inventoryState';
import { getCookie, fetchAuth, debounce } from '../../utils';

export type TInventoryActions = {
  getInventory: (inventoryId: string) => Promise<void>;
  getInventories: () => Promise<void>;
};

export type TInventoryStore = TInventoryState & TInventoryActions;

export const createInventoryActions: StateCreator<
  TInventoryStore,
  [],
  [],
  TInventoryActions
> = (set, get) => ({

  getInventory: async (inventoryId: string) => {
    try {
      if (!inventoryId) throw new Error('No inventory ID assigned!');

      set({ isLoading: true });

      const result = await fetchAuth({
        api: `inventory/get-inventory/${inventoryId}`,
        method: 'GET',
      });

      const { success, data, message } = await result.json();

      // await debounce(() => console.log('3s delay'), 3000);

      if (!result.ok || !success) {
        set({ message: message });
      };

      set({ inventory: data, isLoading: false });
    } catch (err) {
      console.error('Error', err);
      set({ isLoading: false });
    }
  },

  getInventories: async () => {
    try {
      set({ isLoading: true });

      const result = await fetchAuth({
        api: 'inventory/get-inventories',
        method: 'GET',
      });

      const { success, data, message } = await result.json();

      // await debounce(() => console.log('3s delay'), 3000);

      if (!result.ok || !success) {
        set({ message: message });
      }

      set({ inventories: data, isLoading: false });
    } catch (err) {
      console.error('Error', err);
      set({ isLoading: false });
    }
  },

});
