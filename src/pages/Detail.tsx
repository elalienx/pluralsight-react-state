// Node modules
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

// Project files
import Spinner from "components/Spinner";
import { useCart } from "state/cartContext";
import PageNotFound from "pages/PageNotFound";
import type Product from "types/Product";

export default function Detail() {
  // Global state
  const { setCart } = useCart();
  const { id } = useParams();

  // Local state
  const [sku, setSku] = useState("");
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Methods
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetch(
          import.meta.env.VITE_APP_API_BASE_URL + `products/${id}`
        );
        if (!data.ok) {
          throw new Error(`Product not found: ${data.status}`);
        }
        const product = await data.json();
        setProduct(product);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  function onAddToCart(id: string) {
    // Safeguard
    if (!sku) return alert("Select size.");

    const newItem = { id: parseInt(id), sku, quantity: 1 };

    setCart((cart) => {
      const itemExistInCart = cart.find((item) => item.sku === sku);

      if (itemExistInCart) {
        return cart.map((item) =>
          item.sku === sku ? { ...item, quantity: item.quantity + 1 } : item
        );
      }

      return [...cart, newItem];
    });

    toast("Added to cart", { icon: "🛒" });
  }

  // Safeguards
  if (loading) return <Spinner />;
  if (!product || !id) return <PageNotFound />;
  if (error) throw error;

  return (
    <div id="detail">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p id="price">${product.price}</p>

      <select id="size" value={sku} onChange={(e) => setSku(e.target.value)}>
        <option value="">What size?</option>
        {product.skus.map((item) => (
          <option key={item.sku} value={item.sku}>
            {item.size}
          </option>
        ))}
      </select>

      <p>
        <button
          disabled={!sku}
          className="btn btn-primary"
          onClick={() => onAddToCart(id)}
        >
          Add to cart
        </button>
      </p>
      <img src={`/images/${product.image}`} alt={product.category} />
    </div>
  );
}
