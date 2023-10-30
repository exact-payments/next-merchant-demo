import create from 'zustand';
import { Order } from '../types';

export type StoreItemProps = {
  itemnum: string;
  price: number;
};

interface ItemState {
  items: StoreItemProps[];
  order: Order | null;
  addItem: (item: StoreItemProps) => void;
  removeAllItems: () => void;
  setOrder: (order: Order) => void;
}

export const useCartState = create<ItemState>((set) => ({
  items: [],
  order: null,
  addItem: (item: StoreItemProps) => set((state) => ({ items: [...state.items, item] })),
  removeAllItems: () => set({ items: [] }),
  setOrder: (order: Order) => set({ order: order }),
}));
