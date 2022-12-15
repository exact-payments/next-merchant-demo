import create from 'zustand';

interface ItemState {
  items: string[];
  addItem: (item: string) => void;
}
export const useCartState = create<ItemState>((set) => ({
  items: [],
  addItem: (item: string) => set((state) => ({ items: [...state.items, item] })),
  removeAllItems: () => set({ items: [] }),
}));
