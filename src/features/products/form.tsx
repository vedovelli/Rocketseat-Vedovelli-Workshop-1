import { useForm } from "@tanstack/react-form";
import { Link } from "@tanstack/react-router";
import { FormFieldWrapper } from "@pattern/form";
import { Button } from "@ui/button";
import { createFormSubmitHandler } from "@pattern/form.hooks";
import { productSchema } from "@features/products/schemas";
import type { ProductFormData } from "@features/products/schemas";

type ProductFormProps = {
  defaultValues?: Partial<ProductFormData>;
  onSubmit: (data: ProductFormData) => void | Promise<void>;
  isEdit?: boolean;
};

export function ProductForm({ defaultValues, onSubmit }: ProductFormProps) {
  const form = useForm<ProductFormData>({
    defaultValues: {
      id: defaultValues?.id ?? undefined,
      name: defaultValues?.name ?? "",
      description: defaultValues?.description ?? "",
      price: defaultValues?.price ?? 0,
      category: defaultValues?.category ?? "",
      status: defaultValues?.status ?? "active",
    },
    onSubmit: async () => {
      const handler = createFormSubmitHandler(productSchema, onSubmit);
      await handler(form);
    },
  });

  return (
    <div className="space-y-6">
      <Link to="/products" className="text-sm text-app-primary hover:underline">
        ← Voltar aos produtos
      </Link>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="space-y-4"
      >
        <FormFieldWrapper form={form} name="name" label="Nome" />
        <FormFieldWrapper form={form} name="description" label="Descrição" />
        <FormFieldWrapper form={form} name="category" label="Categoria" />
        <form.Field name="price">
          {(field) => {
            const err = field.state.meta.errors?.[0];
            const error = typeof err === "string" ? err : undefined;
            return (
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700">Preço</label>
                <div>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    name={String(field.name)}
                    value={field.state.value ?? 0}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(Number(e.target.value) as never)}
                    aria-invalid={!!error}
                    className="flex h-9 w-full rounded-md border border-neutral-300 bg-white px-3 py-1 text-sm shadow-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                {error ? <span role="alert" className="text-xs font-medium text-red-600">{error}</span> : null}
              </div>
            );
          }}
        </form.Field>
        <form.Field name="status">
          {(field) => {
            const err = field.state.meta.errors?.[0];
            const error = typeof err === "string" ? err : undefined;
            return (
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700">Status</label>
                <div>
                  <select
                    name={String(field.name)}
                    value={String(field.state.value ?? "active")}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value as never)}
                    aria-invalid={!!error}
                    className="flex h-9 w-full rounded-md border border-neutral-300 bg-white px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-0"
                  >
                    <option value="active">Ativo</option>
                    <option value="inactive">Inativo</option>
                  </select>
                </div>
                {error ? <span role="alert" className="text-xs font-medium text-red-600">{error}</span> : null}
              </div>
            );
          }}
        </form.Field>
        <Button type="submit" variant="primary">Salvar</Button>
      </form>
    </div>
  );
}
