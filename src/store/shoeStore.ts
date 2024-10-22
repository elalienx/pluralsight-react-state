import { create } from "zustand";

// Project files
import type User from "types/User";
import type CartItem from "types/CartItem";

interface State {
  cart: CartItem[];
  user: User | null;
}

interface Action {
  // Cart
  addItem: (item: CartItem) => void;
  emptyCart: () => void;

  // User
  logIn: (user: User) => void;
  logOut: () => void;
}

/**
 * Refactor make cart actions testable
 */
const useShoeStore = create<State & Action>((set) => ({
  // State
  cart: [],
  user: null,

  // Action
  addItem: (item) => set((state) => ({ cart: [...state.cart, item] })),
  emptyCart: () => set({ cart: [] }),

  logIn: (user) => set({ user }),
  logOut: () => set({ user: null }),
}));

export default useShoeStore;
