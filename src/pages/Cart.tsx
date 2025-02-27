// Node modules
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Project files
import Spinner from "components/Spinner";
import { useCart } from "state/cartContext";
import type CartItem from "types/CartItem";
import type Product from "types/Product";

export default function Cart() {
  // Global state
  const { cart, setCart } = useCart();
  const navigate = useNavigate();

  // Local state
  const [products, setProducts] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Properties
  const numItemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

  // Methods
  useEffect(() => {
    async function fetchData() {
      try {
        const url =
          import.meta.env.VITE_APP_API_BASE_URL +
          "products?" +
          cart.map(({ id }) => "id=" + id).join("&");
        const data = await fetch(url);
        if (!data.ok) {
          throw new Error(`Product not found: ${data.status}`);
        }
        const products = await data.json();
        setProducts(products);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  function renderCartItem(cartItem: CartItem, product: Product) {
    const { sku, quantity } = cartItem;
    const { name, image, skus, price } = product;
    const matchingSku = skus.find((s) => s.sku === sku);
    if (!matchingSku) throw new Error("Sku not found");
    const { size } = matchingSku;

    return (
      <li key={sku} className="cart-item">
        <img src={`/images/${image}`} alt={name} />
        <div>
          <h3>{name}</h3>
          <p>${price}</p>
          <p>Size: {size}</p>
          <p>
            <select
              aria-label={`Select quantity for ${name} size ${size}`}
              onChange={(e) => {
                const quantity = parseInt(e.target.value);
                setCart((cart) =>
                  quantity === 0
                    ? cart.filter((i) => i.sku !== sku)
                    : cart.map((i) => (i.sku === sku ? { ...i, quantity } : i))
                );
              }}
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

  // Safeguards
  if (loading || !products) return <Spinner />;
  if (error) throw error;

  return (
    <section id="cart">
      <h1>
        {numItemsInCart === 0
          ? "Your cart is empty"
          : `${numItemsInCart} Item${numItemsInCart > 1 ? "s" : ""} in My Cart`}
      </h1>
      <ul>
        {cart.map((cartItem) => {
          const product = products.find((p) => p.id === cartItem.id);
          if (!product) throw new Error("Product not found");
          return renderCartItem(cartItem, product);
        })}
      </ul>
      {cart.length > 0 && (
        <button
          className="btn btn-primary"
          onClick={() => navigate("/checkout")}
        >
          Checkout
        </button>
      )}
    </section>
  );
}
