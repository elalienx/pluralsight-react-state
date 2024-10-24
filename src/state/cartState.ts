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
export const cartState = proxy<CartState>({ cart: [] });

// Methods
export function addItem(cart: CartItem[], id: number, sku: string) {
  cartState.cart = addItemToCart(cart, id, sku);
}

export function updateItem(cart: CartItem[], sku: string, quantity: number) {
  cartState.cart = updateItemQuantity(cart, sku, quantity);
}

export function emptyCart() {
  cartState.cart = [];
}
