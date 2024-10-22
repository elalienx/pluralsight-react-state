// Node modules
import { ChangeEvent } from "react";

// Project files
import { useCart } from "state/cartContext";
import type CartItem from "types/CartItem";
import type Product from "types/Product";

interface Props {
  cartItem: CartItem;
  product: Product;
}

export default function ItemCart({ cartItem, product }: Props) {
  const { sku, quantity } = cartItem;
  const { name, image, skus, price } = product;

  // Global state
  const { setCart } = useCart();

  // Properties
  const matchingSku = skus.find((s) => s.sku === sku);

  // Safeguards
  if (!matchingSku) throw new Error("Sku not found");

  // Methods
  function onChange(event: ChangeEvent<HTMLSelectElement>) {
    const quantity = parseInt(event.target.value);

    setCart((cart) =>
      quantity === 0
        ? cart.filter((item) => item.sku !== sku)
        : cart.map((item) => (item.sku === sku ? { ...item, quantity } : item))
    );
  }

  return (
    <li key={sku} className="cart-item">
      <img src={`/images/${image}`} alt={name} />
      <div>
        <h3>{name}</h3>
        <p>${price}</p>
        <p>Size: {matchingSku.size}</p>
        <p>
          <select
            aria-label={`Select quantity for ${name} size ${matchingSku.size}`}
            onChange={(event) => onChange(event)}
            value={quantity}
          >
            <option value="0">Remove</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </p>
      </div>
    </li>
  );
}
