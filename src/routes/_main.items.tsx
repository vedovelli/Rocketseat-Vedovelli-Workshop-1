import { createFileRoute } from "@tanstack/react-router";
import { ItemsList } from "@features/items/list";

export const Route = createFileRoute("/_main/items")({
  component: ItemsListPage,
});

function ItemsListPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Items</h1>
      <ItemsList />
    </div>
  );
}
