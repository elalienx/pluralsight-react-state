// Node modules
import { proxy } from "valtio";

// Project files
import User from "types/User";

// Interfaces
interface UserState {
  user: User | null;
}

// Properties
export const userState = proxy<UserState>({ user: null });

// Methods
export function logIn(user: User): void {
  userState.user = user;
}

export function logOut(): void {
  userState.user = null;
}
