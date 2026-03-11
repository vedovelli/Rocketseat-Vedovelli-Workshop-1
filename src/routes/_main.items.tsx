import { createFileRoute } from "@tanstack/react-router";
import { ItemsList } from "@features/items/list";

export const Route = createFileRoute("/_main/items")({
  component: ItemsListPage,
});

function ItemsListPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-app-foreground">Itens</h1>
        <p className="text-app-muted mt-1">Lista de itens da aplicação.</p>
      </div>
      <div className="rounded-xl border border-app-border bg-app-surface p-6 shadow-sm">
        <ItemsList />
      </div>
    </div>
  );
}
