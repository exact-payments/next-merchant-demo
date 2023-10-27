import create from 'zustand';

export type StoreItemProps = {
  itemnum: string;
  price: number;
};

interface ItemState {
  items: StoreItemProps[];
  addItem: (item: StoreItemProps) => void;
  removeAllItems: () => void;
}

export const useCartState = create<ItemState>((set) => ({
  items: [],
  addItem: (item: StoreItemProps) => set((state) => ({ items: [...state.items, item] })),
  removeAllItems: () => set({ items: [] }),
}));
