type CartAction =
  | { type: "add"; id: number; sku: string }
  | { type: "empty" }
  | { type: "updateQuantity"; sku: string; quantity: number };

export default CartAction;
