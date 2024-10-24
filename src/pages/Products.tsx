// Node modules
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Project files
import Spinner from "components/Spinner";
import PageNotFound from "pages/PageNotFound";
import type Product from "types/Product";
import ItemProduct from "components/ItemProduct";

export default function Products() {
  // Global state
  const { category } = useParams();

  // Local state
  const queryClient = useQueryClient();
  const queryKey = ["products", category];
  const { data, isLoading, error } = useQuery({
    queryKey: queryKey,
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

  const deleteProduct = useMutation({
    mutationFn: async (id: number) => {
      const baseURL = import.meta.env.VITE_APP_API_BASE_URL;
      const options = { method: "DELETE" };
      const response = await fetch(baseURL + "products/" + id, options);

      if (!response.ok) throw response;
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKey });
    },
  });

  // Safeguards
  if (isLoading) return <Spinner />;
  if (!data || data.length === 0) return <PageNotFound />;
  if (error) throw error;

  // Properties
  const products: Product[] = data;
  const filteredProducts = size
    ? products.filter((p) => p.skus.find((s) => s.size === parseInt(size)))
    : products;

  // Components
  const Items = filteredProducts.map((item) => (
    <ItemProduct
      key={item.id}
      item={item}
      category={category}
      onDelete={deleteProduct}
    />
  ));

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
      <section id="products">{Items}</section>
    </>
  );
}
