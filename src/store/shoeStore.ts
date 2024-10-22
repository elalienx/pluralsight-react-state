import { create } from "zustand";

// Project files
import type User from "types/User";

type State = {
  user: User | null;
};

type Action = {
  logIn: (user: User) => void;
  logOut: () => void;
};

const useShoeStore = create<State & Action>((set) => ({
  // State
  user: null,

  // Action
  logIn: (user) => set({ user }),
  logOut: () => set({ user: null }),
}));

export default useShoeStore;
