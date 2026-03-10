import type { FormApi } from "@tanstack/react-form";
import { safeParse } from "valibot";
import type { BaseSchema } from "valibot";
import type { BaseIssue } from "valibot";

export function createFormSubmitHandler<TFormData>(
  schema: BaseSchema<unknown, TFormData, BaseIssue<unknown>>,
  onSubmit: (data: TFormData) => void | Promise<void>
) {
  return async (formApi: FormApi<TFormData, undefined>) => {
    const raw = formApi.state.values;
    const result = safeParse(schema, raw);
    if (!result.success && result.issues) {
      result.issues.forEach((issue: BaseIssue<unknown>) => {
        const path = issue.path?.map((p) => String("key" in p ? (p as { key: string | number }).key : "")).filter(Boolean).join(".");
        if (path) {
          formApi.setFieldMeta(path as never, (prev) => ({
            ...prev,
            errors: [issue.message] as never,
          }));
        }
      });
      return;
    }
    if (result.success) await onSubmit(result.output as TFormData);
  };
}
