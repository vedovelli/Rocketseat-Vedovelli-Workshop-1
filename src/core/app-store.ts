import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type AppState = {
  mockApi: boolean;
  setMockApi: (value: boolean) => void;
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      mockApi: true,
      setMockApi: (mockApi) => set({ mockApi }),
    }),
    {
      name: "app-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ mockApi: s.mockApi }),
    }
  )
);
