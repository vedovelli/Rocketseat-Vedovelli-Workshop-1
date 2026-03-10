import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "@ui/button";
import { Input } from "@ui/input";

export const Route = createFileRoute("/_auth/register")({
  component: RegisterPage,
});

function RegisterPage() {
  const navigate = useNavigate();
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Register</h1>
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
        <Button type="submit">Register</Button>
      </form>
    </div>
  );
}
