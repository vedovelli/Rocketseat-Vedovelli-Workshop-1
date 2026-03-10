import { Outlet, createRootRoute } from "@tanstack/react-router";
import { AuthProvider } from "@core/auth-provider";

function RootComponent() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: () => <div>Not found</div>,
});
