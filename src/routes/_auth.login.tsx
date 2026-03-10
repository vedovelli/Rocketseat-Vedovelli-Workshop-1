import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "@ui/button";
import { Input } from "@ui/input";

export const Route = createFileRoute("/_auth/login")({
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Log in</h1>
      <form
        className="space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          navigate({ to: "/dashboard" });
        }}
      >
        <label className="block">
          <span className="text-sm text-neutral-600">Email</span>
          <Input type="email" name="email" className="mt-1 block w-full" />
        </label>
        <label className="block">
          <span className="text-sm text-neutral-600">Password</span>
          <Input type="password" name="password" className="mt-1 block w-full" />
        </label>
        <Button type="submit">Log in</Button>
      </form>
    </div>
  );
}
