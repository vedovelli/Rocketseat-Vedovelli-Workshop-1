import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type ColumnDef,
  type RowData,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";
import { cx } from "@ui/variants";

type DataGridProps<T extends RowData> = {
  columns: ColumnDef<T>[];
  data: T[];
  getRowId?: (row: T) => string;
  className?: string;
};

export function DataGrid<T extends RowData>({
  columns,
  data,
  getRowId,
  className,
}: DataGridProps<T>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    ...(getRowId ? { getRowId } : {}),
  });
  const parentRef = useRef<HTMLDivElement>(null);
  const rows = table.getRowModel().rows;
  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 40,
    overscan: 5,
  });

  return (
    <div
      ref={parentRef}
      data-slot="data-grid"
      className={cx("h-[400px] overflow-auto", className)}
      role="table"
      aria-rowcount={rows.length}
    >
      <div
        style={{ height: `${virtualizer.getTotalSize()}px`, position: "relative" }}
      >
        {virtualizer.getVirtualItems().map((virtualRow) => {
          const row = rows[virtualRow.index];
          if (!row) return null;
          return (
            <div
              key={row.id}
              data-slot="data-grid-row"
              role="row"
              className="absolute left-0 top-0 flex w-full border-b border-neutral-200"
              style={{
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              {row.getVisibleCells().map((cell) => (
                <div
                  key={cell.id}
                  data-slot="data-grid-cell"
                  role="cell"
                  className="flex items-center px-4 py-2"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
