import { queryOptions } from "@tanstack/react-query";
import { queryKeys } from "@core/keys";

type ItemRecord = { id: string; title: string };

async function fetchItems(): Promise<ItemRecord[]> {
  const res = await fetch("/api/items");
  if (!res.ok) throw new Error("Failed to fetch items");
  return res.json();
}

export const itemsQueryOptions = queryOptions({
  queryKey: queryKeys.items.list().queryKey,
  queryFn: fetchItems,
  staleTime: 60_000,
  gcTime: 5 * 60_000,
});

export const itemDetailQueryOptions = (id: string) =>
  queryOptions({
    queryKey: queryKeys.items.detail(id).queryKey,
    queryFn: async (): Promise<ItemRecord> => {
      const res = await fetch(`/api/items/${id}`);
      if (!res.ok) throw new Error("Failed to fetch item");
      return res.json();
    },
    enabled: !!id,
    staleTime: 60_000,
  });
