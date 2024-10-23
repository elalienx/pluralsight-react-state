// Node modules
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import toast from "react-hot-toast";

// Project files
import cartAtom from "atoms/cartAtom";
import Spinner from "components/Spinner";
import PageNotFound from "pages/PageNotFound";
import addItemToCart from "scripts/addItemToCart";
import type Product from "types/Product";

export default function Detail() {
  // Global state
  const [cart, setCart] = useAtom(cartAtom);
  const { id } = useParams();
  const navigate = useNavigate();

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

  function onAddToCart(productId: number) {
    // Safeguard
    if (!sku) return alert("Select size.");

    // Properties
    const newCart = addItemToCart(cart, productId, sku);

    setCart(newCart);
    toast("Added to cart", { icon: "🛒" });
    navigate("/shoes");
  }

  // Safeguards
  if (loading) return <Spinner />;
  if (!product || !id) return <PageNotFound />;
  if (error) throw error;

  // Properties
  const productId = parseInt(id);

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
          onClick={() => onAddToCart(productId)}
        >
          Add to cart
        </button>
      </p>
      <img src={`/images/${product.image}`} alt={product.category} />
    </div>
  );
}
