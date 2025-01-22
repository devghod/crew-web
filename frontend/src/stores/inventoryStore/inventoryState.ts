import { TInventory } from '../../types/InventoryType';

export type TInventoryState = {
  inventory: {};
  inventories: TInventory[];
  message: string;
  isLoading: boolean;
  isLoadingInventory: boolean; 
};

export const initialInventoryState: TInventoryState = {
  inventory: {},
  inventories: [],
  message: '',
  isLoading: false,
  isLoadingInventory: false,
};
