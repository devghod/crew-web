import { TInventory } from '../../types/InventoryType';

export type TInventoryState = {
  inventories: TInventory[];
  message: string;
  isLoading: boolean;
};

export const initialInventoryState: TInventoryState = {
  inventories: [],
  message: '',
  isLoading: false,
};
