// Node modules
import { create } from "zustand";
import { persist } from "zustand/middleware";

// Project files
import type Actions from "types/StoreActions";
import type State from "types/StoreState";
import addItem from "./actions/addItem";
import updateItemQt from "./actions/removeItem";

const persistOptions = { name: "zustand-store" };
const useShoeStore = create<State & Actions>()(
  persist(
    (set) => ({
      // State
      cart: [],
      user: null,

      // Actions
      addItem: (sku, id) =>
        set((state) => ({ cart: addItem(state.cart, sku, id) })),

      updateItemQuantity: (sku, quantity) =>
        set((state) => ({ cart: updateItemQt(state.cart, sku, quantity) })),

      emptyCart: () => set({ cart: [] }),

      logIn: (user) => set({ user }),

      logOut: () => set({ user: null }),
    }),
    persistOptions
  )
);

export default useShoeStore;
