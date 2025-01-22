import { StateCreator } from 'zustand';
import { TInventoryState } from './inventoryState';
import { fetchAuth } from '../../utils';

export type TInventoryActions = {
  getInventories: () => Promise<void>;
  getInventory: (inventoryId: string) => Promise<void>;
  setInventoryClear: () => void;
  putInventoryQuantity: ({
    form,
    inventoryId
  } : {
    form: {
      user_id: string; 
      quantity: number;
    },
    inventoryId: string;
  }) => Promise<boolean>;
};

export type TInventoryStore = TInventoryState & TInventoryActions;

export const createInventoryActions: StateCreator<
  TInventoryStore,
  [],
  [],
  TInventoryActions
> = (set, get) => ({

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

  getInventory: async (inventoryId: string) => {
    try {
      if (!inventoryId) throw new Error('No inventory ID assigned!');

      set({ isLoadingInventory: true });

      const result = await fetchAuth({
        api: `inventory/get-inventory/${inventoryId}`,
        method: 'GET',
      });

      const { success, data, message } = await result.json();

      // await debounce(() => console.log('3s delay'), 3000);

      if (!result.ok || !success) {
        set({ message: message });
      };

      set({ inventory: data, isLoadingInventory: false });
    } catch (err) {
      console.error('Error', err);
      set({ isLoadingInventory: false });
    }
  },

  setInventoryClear: () => (set({ inventory: {} })),

  putInventoryQuantity: async ({
    inventoryId,
    form,
  } : {
    inventoryId: string;
    form: {
      user_id: string; 
      quantity: number;
    };
  }) => {
    try {
      if (!form?.user_id || !form?.quantity) {
        throw new Error('Check field requirements.');
      };

      const result = await fetchAuth({
        api: `inventory/update-inventory-stock/${inventoryId}`,
        method: 'PUT',
        body: form
      });

      const { success, message } = await result.json();

      if (!result.ok || !success) {
        set({ message: message });
      };

      get().getInventories();
      get().setInventoryClear();
      set({ isLoadingInventory: false });

      return true;
    } catch (error) {
      console.error('Error', error);
      set({ isLoadingInventory: false });
      return false;
    }
  },

});
