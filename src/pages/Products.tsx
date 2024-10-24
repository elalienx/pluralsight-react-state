// Node modules
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

// Project files
import Spinner from "components/Spinner";
import PageNotFound from "pages/PageNotFound";
import type Product from "types/Product";

export default function Products() {
  // Global state
  const { category } = useParams();

  // Local state
  const { data, isLoading, error } = useQuery({
    queryKey: ["products", category],
    queryFn: async () => {
      // Properties
      const baseURL = import.meta.env.VITE_APP_API_BASE_URL;
      const data = await fetch(baseURL + "products");

      // Safeguards
      if (!data.ok) throw new Error(`Products not found: ${data.status}`);

      return data.json();
    },
  });
  const [size, setSize] = useState("");

  // Methods
  function renderProduct(p: Product) {
    return (
      <div key={p.id} className="product">
        <Link to={`/${category}/${p.id}`}>
          <img src={`/images/${p.image}`} alt={p.name} />
          <h3>{p.name}</h3>
          <p>${p.price}</p>
        </Link>
      </div>
    );
  }

  // Safeguards
  if (isLoading) return <Spinner />;
  if (!data || data.length === 0) return <PageNotFound />;
  if (error) throw error;

  // Properties
  const products: Product[] = data;
  const filteredProducts = size
    ? products.filter((p) => p.skus.find((s) => s.size === parseInt(size)))
    : products;

  return (
    <>
      <section id="filters">
        <label htmlFor="size">Filter by Size:</label>{" "}
        <select
          id="size"
          value={size}
          onChange={(e) => setSize(e.target.value)}
        >
          <option value="">All sizes</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
        </select>
        {size && <h2>Found {filteredProducts.length} items</h2>}
      </section>
      <section id="products">{filteredProducts.map(renderProduct)}</section>
    </>
  );
}
