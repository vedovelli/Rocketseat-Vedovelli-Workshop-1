import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCallback, useContext, useState } from "react";
import { AuthContext } from "@core/auth-provider";
import { Button } from "@ui/button";
import { Input } from "@ui/input";

export const Route = createFileRoute("/_auth/login")({
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!auth) return;
      await auth.login(email, password);
      navigate({ to: "/dashboard" });
    },
    [auth, email, password, navigate]
  );

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold text-app-foreground">Entrar</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <label className="block">
          <span className="text-sm font-medium text-app-foreground">Email</span>
          <Input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full border-app-border"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-app-foreground">Senha</span>
          <Input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full border-app-border"
          />
        </label>
        <Button type="submit" variant="primary" className="w-full">
          Entrar
        </Button>
      </form>
    </div>
  );
}
