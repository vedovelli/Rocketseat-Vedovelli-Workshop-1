import { createFileRoute } from "@tanstack/react-router";
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
    <div>
      <h1 className="text-xl font-semibold">{data.title}</h1>
      <p className="text-neutral-600">ID: {data.id}</p>
    </div>
  );
}
