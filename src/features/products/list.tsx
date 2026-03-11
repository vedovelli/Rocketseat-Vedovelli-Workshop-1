import { Link } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";
import { DataGrid } from "@pattern/data-grid";
import { Badge } from "@ui/badge";
import { Button } from "@ui/button";
import { Loading } from "@ui/loading";
import { useProductsList } from "@features/products/hooks";
import type { ProductRecord } from "@core/queries";

const formatBRL = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

const productColumns: ColumnDef<ProductRecord>[] = [
  {
    accessorKey: "name",
    header: "Nome",
    cell: ({ row }) => (
      <Link
        to="/products/$productId"
        params={{ productId: row.original.id }}
        className="text-app-primary font-medium hover:underline"
      >
        {row.original.name}
      </Link>
    ),
  },
  {
    accessorKey: "category",
    header: "Categoria",
  },
  {
    accessorKey: "price",
    header: "Preço",
    cell: ({ row }) => formatBRL(row.original.price),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) =>
      row.original.status === "active" ? (
        <Badge variant="default">Ativo</Badge>
      ) : (
        <Badge variant="secondary">Inativo</Badge>
      ),
  },
];

export function ProductsList() {
  const { data, isLoading, error } = useProductsList();
  if (isLoading) return <Loading />;
  if (error) return <p className="text-red-600">Falha ao carregar produtos.</p>;
  if (!data?.length) return <p className="text-app-muted py-4">Nenhum produto cadastrado.</p>;
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Link to="/products/new">
          <Button variant="primary" size="sm">Novo Produto</Button>
        </Link>
      </div>
      <DataGrid columns={productColumns} data={data} getRowId={(row) => row.id} />
    </div>
  );
}
