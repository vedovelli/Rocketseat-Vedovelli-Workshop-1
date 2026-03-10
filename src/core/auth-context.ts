import type { createContext } from "react";

export type AuthUser = {
  id: string;
  email: string;
};

export type AuthContextValue = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

export type AuthContextType = ReturnType<typeof createContext<AuthContextValue | null>>;
