import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { productDetailQueryOptions } from "@core/queries";
import { ProductForm } from "@features/products/form";
import { Loading } from "@ui/loading";

export const Route = createFileRoute("/_main/products/$productId")({
  component: ProductDetailPage,
  loader: async ({ context, params }) => {
    await context.queryClient.prefetchQuery(productDetailQueryOptions(params.productId));
  },
});

function ProductDetailPage() {
  const { productId } = Route.useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useQuery(productDetailQueryOptions(productId));
  if (isLoading) return <Loading />;
  if (error || !data) return <p className="text-red-600">Falha ao carregar produto.</p>;
  return (
    <div className="rounded-xl border border-app-border bg-app-surface p-6 shadow-sm">
      <h1 className="text-2xl font-bold text-app-foreground mb-6">Editar Produto</h1>
      <ProductForm
        defaultValues={data}
        isEdit
        onSubmit={async () => {
          await navigate({ to: "/products" });
        }}
      />
    </div>
  );
}
