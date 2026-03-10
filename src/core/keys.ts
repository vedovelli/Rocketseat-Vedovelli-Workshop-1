import { createQueryKeys } from "@lukemorales/query-key-factory";

export const queryKeys = createQueryKeys({
  items: {
    all: null,
    detail: (id: string) => ({ queryKey: [id] }),
    list: (params?: { page?: number }) => ({ queryKey: [params] }),
  },
  profile: {
    all: null,
  },
});

export type QueryKeys = typeof queryKeys;
