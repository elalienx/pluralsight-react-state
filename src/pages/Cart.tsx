// Node modules
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";

// Project files
import cartAtom from "atoms/cartAtom";
import Spinner from "components/Spinner";
import ItemCart from "components/ItemCart";
import type Product from "types/Product";

export default function Cart() {
  // Global state
  const [cart] = useAtom(cartAtom);
  const navigate = useNavigate();

  // Local state
  const { data, isLoading, error } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      // Properties
      const baseURL = import.meta.env.VITE_APP_API_BASE_URL;
      const productList = cart.map(({ id }) => "id=" + id).join("&");
      const data = await fetch(baseURL + "products?" + productList);

      // Safeguard
      if (!data.ok) throw new Error(`Product not found: ${data.status}`);

      return data.json();
    },
  });

  // Safeguards
  if (isLoading || !data) return <Spinner />;
  if (error) throw error;

  // Properties
  const products: Product[] = data;
  const numItemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

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
            <ItemCart
              key={cartItem.sku}
              cartItem={cartItem}
              product={product}
            />
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
