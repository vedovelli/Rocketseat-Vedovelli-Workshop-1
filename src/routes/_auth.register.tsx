import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCallback, useContext, useState } from "react";
import { AuthContext } from "@core/auth-provider";
import { Button } from "@ui/button";
import { Input } from "@ui/input";

export const Route = createFileRoute("/_auth/register")({
  component: RegisterPage,
});

function RegisterPage() {
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
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Register</h1>
      <form className="space-y-3" onSubmit={handleSubmit}>
        <label className="block">
          <span className="text-sm text-neutral-600">Email</span>
          <Input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full"
          />
        </label>
        <label className="block">
          <span className="text-sm text-neutral-600">Password</span>
          <Input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full"
          />
        </label>
        <Button type="submit">Register</Button>
      </form>
    </div>
  );
}
