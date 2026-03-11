import { useItemsList } from "@features/items/hooks";
import { Loading } from "@ui/loading";
import { Link } from "@tanstack/react-router";

export function ItemsList() {
  const { data, isLoading, error } = useItemsList();
  if (isLoading) return <Loading />;
  if (error) return <p className="text-red-600">Falha ao carregar itens.</p>;
  if (!data?.length) return <p className="text-app-muted py-4">Nenhum item cadastrado.</p>;
  return (
    <ul className="divide-y divide-app-border">
      {data.map((item) => (
        <li key={item.id}>
          <Link
            to="/items/$itemId"
            params={{ itemId: item.id }}
            className="block py-3 text-app-primary font-medium transition-colors hover:text-app-primary-hover hover:underline"
          >
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
