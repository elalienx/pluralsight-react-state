// Node modules
import { useQuery } from "@tanstack/react-query";

export function useGetProductById(id: string | undefined) {
  return useQuery({
    enabled: !!id,
    queryKey: ["product", id],
    queryFn: async () => {
      // Properties
      const baseURL = import.meta.env.VITE_APP_API_BASE_URL;
      const data = await fetch(baseURL + "products/" + id);

      // Safeguards
      if (!data.ok) throw new Error(`Product not found: ${data.status}`);

      return data.json();
    },
  });
}
