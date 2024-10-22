// Project files
import type CartItem from "types/CartItem";

export default function addToCart(cart: CartItem[], sku: string, id: string) {
  const itemExistInCart = cart.find((item) => item.sku === sku);

  if (itemExistInCart) {
    return cart.map((item) =>
      item.sku === sku ? { ...item, quantity: item.quantity + 1 } : item
    );
  }

  return [...cart, { id: parseInt(id), sku, quantity: 1 }];
}
