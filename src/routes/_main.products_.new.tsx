import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ProductForm } from "@features/products/form";

export const Route = createFileRoute("/_main/products_/new")({
  component: NewProductPage,
});

function NewProductPage() {
  const navigate = useNavigate();
  return (
    <div className="rounded-xl border border-app-border bg-app-surface p-6 shadow-sm">
      <h1 className="text-2xl font-bold text-app-foreground mb-6">Novo Produto</h1>
      <ProductForm
        onSubmit={async () => {
          await navigate({ to: "/products" });
        }}
      />
    </div>
  );
}
