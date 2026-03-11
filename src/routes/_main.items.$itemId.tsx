import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { itemDetailQueryOptions } from "@core/queries";
import { Loading } from "@ui/loading";

export const Route = createFileRoute("/_main/items/$itemId")({
  component: ItemDetailPage,
  loader: async ({ context, params }) => {
    await context.queryClient.prefetchQuery(itemDetailQueryOptions(params.itemId));
  },
});

function ItemDetailPage() {
  const { itemId } = Route.useParams();
  const { data, isLoading, error } = useQuery(itemDetailQueryOptions(itemId));
  if (isLoading) return <Loading />;
  if (error || !data) return <p className="text-red-600">Failed to load item.</p>;
  return (
    <div className="space-y-4">
      <Link to="/items" className="text-sm text-app-primary hover:underline">
        ← Voltar aos itens
      </Link>
      <div className="rounded-xl border border-app-border bg-app-surface p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-app-foreground">{data.title}</h1>
        <p className="text-app-muted mt-2">ID: {data.id}</p>
      </div>
    </div>
  );
}
