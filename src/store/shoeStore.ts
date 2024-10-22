import { create } from "zustand";

// Project files
import type User from "types/User";
import type CartItem from "types/CartItem";

type State = {
  cart: CartItem[];
  user: User | null;
};

type Action = {
  // Cart


  // User
  logIn: (user: User) => void;
  logOut: () => void;
};

const useShoeStore = create<State & Action>((set) => ({
  // State
  cart: [],
  user: null,

  // Action
  logIn: (user) => set({ user }),
  logOut: () => set({ user: null }),
}));

export default useShoeStore;
