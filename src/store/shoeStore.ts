import { create } from "zustand";

// Project files
import addToCart from "./actions/addToCart";
import type User from "types/User";
import type CartItem from "types/CartItem";

interface State {
  cart: CartItem[];
  user: User | null;
}

interface Action {
  // Cart
  addItem: (sku: string, id: string) => void;
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
  addItem: (sku, id) => set((state) => ({ cart: addToCart(state.cart, sku, id) })),
  emptyCart: () => set({ cart: [] }),

  logIn: (user) => set({ user }),
  logOut: () => set({ user: null }),
}));

export default useShoeStore;
