import { create } from 'zustand';
import { TInventoryState, initialInventoryState } from './inventoryState';
import { TInventoryActions, createInventoryActions } from './inventoryActions';

export type TInventoryStore = TInventoryState & TInventoryActions;

export const useInventoryStore = create<TInventoryStore>()(
  (set, get, store) => ({
    ...initialInventoryState,
    ...createInventoryActions(set, get, store),
  }),
);
