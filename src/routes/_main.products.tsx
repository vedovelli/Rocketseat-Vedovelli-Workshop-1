import { createFileRoute } from "@tanstack/react-router";
import { ProductsList } from "@features/products/list";
import { productsQueryOptions } from "@core/queries";

export const Route = createFileRoute("/_main/products")({
  component: ProductsListPage,
  loader: async ({ context }) => {
    await context.queryClient.prefetchQuery(productsQueryOptions);
  },
});

function ProductsListPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-app-foreground">Produtos</h1>
        <p className="text-app-muted mt-1">Gerencie os produtos da aplicação.</p>
      </div>
      <div className="rounded-xl border border-app-border bg-app-surface p-6 shadow-sm">
        <ProductsList />
      </div>
    </div>
  );
}
