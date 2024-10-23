// Project files
import type CartItem from "types/CartItem";

function updateItemQuantity(cart: CartItem[], sku: string, quantity: number) {
  return quantity === 0
    ? cart.filter((item) => item.sku !== sku)
    : cart.map((item) => (item.sku === sku ? { ...item, quantity } : item));
}

export default updateItemQuantity;
