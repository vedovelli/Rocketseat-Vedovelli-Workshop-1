import { createQueryKeyStore } from "@lukemorales/query-key-factory";

export const queryKeys = createQueryKeyStore({
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
