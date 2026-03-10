import { useQuery } from "@tanstack/react-query";
import { itemsQueryOptions } from "@core/queries";

export function useItemsList() {
  return useQuery(itemsQueryOptions);
}
