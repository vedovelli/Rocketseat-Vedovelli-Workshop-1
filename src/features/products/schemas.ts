import * as v from "valibot";

export const productSchema = v.object({
  id: v.optional(v.string()),
  name: v.pipe(v.string(), v.minLength(1, "Nome é obrigatório")),
  description: v.pipe(v.string(), v.minLength(1, "Descrição é obrigatória")),
  price: v.pipe(v.number(), v.minValue(0.01, "Preço deve ser maior que zero")),
  category: v.pipe(v.string(), v.minLength(1, "Categoria é obrigatória")),
  status: v.picklist(["active", "inactive"] as const),
});

export type ProductFormData = v.InferOutput<typeof productSchema>;
