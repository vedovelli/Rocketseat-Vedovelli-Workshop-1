import { createContext, useCallback, useMemo, useState } from "react";
import { useSessionStore } from "@core/session-store";
import type { AuthContextValue, AuthUser } from "@core/auth-context";

export const AuthContext = createContext<AuthContextValue | null>(null);

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading] = useState(true);
  const setToken = useSessionStore((s) => s.setToken);
  const clearSession = useSessionStore((s) => s.clear);

  const login = useCallback(
    async (email: string, _password: string) => {
      setToken("mock-token");
      setUser({ id: "1", email });
    },
    [setToken]
  );

  const logout = useCallback(() => {
    clearSession();
    setUser(null);
  }, [clearSession]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      logout,
    }),
    [user, isLoading, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
