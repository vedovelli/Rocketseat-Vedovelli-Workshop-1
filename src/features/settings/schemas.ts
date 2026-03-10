import * as v from "valibot";

export const preferencesSchema = v.object({
  theme: v.optional(v.picklist(["light", "dark"] as const)),
  notifications: v.optional(v.boolean()),
});

export type PreferencesFormData = v.InferOutput<typeof preferencesSchema>;
