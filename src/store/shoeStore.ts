// Node modules
import { create } from "zustand";
import { persist } from "zustand/middleware";

// Project files
import type Actions from "types/StoreActions";
import type State from "types/StoreState";
import addItem from "./actions/addItem";
import updateItem from "./actions/updateItemQuantity";

const persistOptions = { name: "zustand-store" };
const useShoeStore = create<State & Actions>()(
  persist(
    (set) => ({
      // State
      cart: [],
      user: null,

      // Actions
      addItem: (id, sku) =>
        set((state) => ({ cart: addItem(state.cart, id, sku) })),

      updateItemQuantity: (sku, quantity) =>
        set((state) => ({ cart: updateItem(state.cart, sku, quantity) })),

      emptyCart: () => set({ cart: [] }),

      logIn: (user) => set({ user }),

      logOut: () => set({ user: null }),
    }),
    persistOptions
  )
);

export default useShoeStore;
