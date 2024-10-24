// Node modules
import { proxy } from "valtio";

// Project files
import CartItem from "types/CartItem";
import addItemToCart from "./actions/addItemToCart";
import updateItemQuantity from "./actions/updateItemQuantity";

// Interfaces
interface CartState {
  cart: CartItem[];
}

// Properties
export const userState = proxy<CartState>({ cart: [] });

// Methods
export function addItem(cart: CartItem[], id: number, sku: string) {
  userState.cart = addItemToCart(cart, id, sku);
}

export function updateItem(cart: CartItem[], sku: string, quantity: number) {
  userState.cart = updateItemQuantity(cart, sku, quantity);
}
