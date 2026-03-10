import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { AuthProvider } from "@core/auth-provider";
import { Toaster } from "@ui/toaster";
import { NotFoundPage } from "@layouts/pages/not-found-page";
import type { QueryClient } from "@tanstack/react-query";

type RouterContext = {
  queryClient: QueryClient;
};

function RootComponent() {
  return (
    <AuthProvider>
      <Outlet />
      <Toaster />
    </AuthProvider>
  );
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
  notFoundComponent: NotFoundPage,
});
