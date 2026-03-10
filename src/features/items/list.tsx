import { useItemsList } from "@features/items/hooks";
import { Loading } from "@ui/loading";
import { Link } from "@tanstack/react-router";

export function ItemsList() {
  const { data, isLoading, error } = useItemsList();
  if (isLoading) return <Loading />;
  if (error) return <p className="text-red-600">Failed to load items.</p>;
  if (!data?.length) return <p className="text-neutral-600">No items.</p>;
  return (
    <ul className="space-y-2">
      {data.map((item) => (
        <li key={item.id}>
          <Link to="/items/$itemId" params={{ itemId: item.id }} className="text-blue-600 hover:underline">
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
