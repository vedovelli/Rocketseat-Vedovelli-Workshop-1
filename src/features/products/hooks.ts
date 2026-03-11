import { useQuery } from "@tanstack/react-query";
import { productsQueryOptions, productDetailQueryOptions } from "@core/queries";

export function useProductsList() {
  return useQuery(productsQueryOptions);
}

export function useProductDetail(id: string) {
  return useQuery(productDetailQueryOptions(id));
}
