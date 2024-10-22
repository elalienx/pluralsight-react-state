// Node modules
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Project files
import Spinner from "components/Spinner";
import ItemCart from "components/ItemCart";
import { useCart } from "state/cartContext";
import type Product from "types/Product";

export default function Cart() {
  // Global state
  const { cart } = useCart();
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
        const baseURL = import.meta.env.VITE_APP_API_BASE_URL;
        const productList = cart.map(({ id }) => "id=" + id).join("&");
        const url = baseURL + "products?" + productList;
        const data = await fetch(url);

        // Safeguard
        if (!data.ok) throw new Error(`Product not found: ${data.status}`);

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
          const product = products.find((item) => item.id === cartItem.id);

          // Safeguard
          if (!product) throw new Error("Product not found");

          return (
            <ItemCart key={cartItem.id} cartItem={cartItem} product={product} />
          );
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
