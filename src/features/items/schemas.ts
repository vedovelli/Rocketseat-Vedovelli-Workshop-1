import * as v from "valibot";

export const itemSchema = v.object({
  id: v.optional(v.string()),
  title: v.pipe(v.string(), v.minLength(1, "Title is required")),
});

export type ItemFormData = v.InferOutput<typeof itemSchema>;
