// Node modules
import { proxy, subscribe } from "valtio";

// Project files
import CartItem from "types/CartItem";
import addItemToCart from "./actions/addItemToCart";
import updateItemQuantity from "./actions/updateItemQuantity";

// Interfaces
interface CartState {
  cart: CartItem[];
}

// Properties
const storageKey = "valtio-cart";
const initialState: CartState = localStorage.getItem(storageKey)
  ? JSON.parse(localStorage.getItem(storageKey)!)
  : { cart: [] };

export const cartState = proxy<CartState>(initialState);

// Methods
subscribe(cartState, () => {
  localStorage.setItem(storageKey, JSON.stringify(cartState));
});

export function addItem(cart: CartItem[], id: number, sku: string) {
  cartState.cart = addItemToCart(cart, id, sku);
}

export function updateItem(cart: CartItem[], sku: string, quantity: number) {
  cartState.cart = updateItemQuantity(cart, sku, quantity);
}

export function emptyCart() {
  cartState.cart = [];
}
