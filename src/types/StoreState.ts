// Project files
import type CartItem from "./CartItem";
import type User from "./User";

export default interface State {
  cart: CartItem[];
  user: User | null;
}
