// Node modules
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import toast from "react-hot-toast";

// Project files
import cartAtom from "atoms/cartAtom";
import Spinner from "components/Spinner";
import PageNotFound from "pages/PageNotFound";
import addItemToCart from "scripts/addItemToCart";
import Product from "types/Product";
import { useGetProductById } from "queries/productQueries";

export default function Detail() {
  // Global state
  const [cart, setCart] = useAtom(cartAtom);
  const { id } = useParams();
  const navigate = useNavigate();

  // Local state
  const { data, isLoading, error } = useGetProductById(id);
  const [sku, setSku] = useState("");

  // Properties
  const productId = parseInt(id!);
  const product: Product = data;

  // Methods
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
  if (isLoading) return <Spinner />;
  if (!data || !id) return <PageNotFound />;
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
          onClick={() => onAddToCart(productId)}
        >
          Add to cart
        </button>
      </p>
      <img src={`/images/${product.image}`} alt={product.category} />
    </div>
  );
}
