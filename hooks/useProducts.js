"use client";
import { useQuery } from "@tanstack/react-query";

export function useProducts(searchTerm) {
  return useQuery({
    queryKey: ["products", searchTerm],
    queryFn: async () => {
      const res = await fetch("https://api.escuelajs.co/api/v1/products");
      const data = await res.json();

      if (!searchTerm) return data;
      return data.filter(
        (p) =>
          p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    },
  });
}
