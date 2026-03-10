import type { ReactFormExtendedApi } from "@tanstack/react-form";
import { FormField, FormLabel, FormError, FormControl } from "@ui/form";
import { Input } from "@ui/input";

type FormFieldWrapperProps<TFormData> = {
  form: ReactFormExtendedApi<TFormData>;
  name: Extract<keyof TFormData, string>;
  label: string;
  render?: (props: {
    value: string;
    onChange: (v: string) => void;
    onBlur: () => void;
    error: string | undefined;
  }) => React.ReactNode;
};

export function FormFieldWrapper<TFormData>({
  form,
  name,
  label,
  render,
}: FormFieldWrapperProps<TFormData>) {
  return (
    <form.Field name={name as never}>
      {(field) => {
        const err = field.state.meta.errors?.[0];
        const error = typeof err === "string" ? err : undefined;
        return (
          <FormField>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              {render
                ? render({
                    value: String(field.state.value ?? ""),
                    onChange: (v) => field.handleChange(v as never),
                    onBlur: field.handleBlur,
                    error,
                  })
                : (
                    <Input
                      name={String(field.name)}
                      value={String(field.state.value ?? "")}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value as never)}
                      aria-invalid={!!error}
                    />
                  )}
            </FormControl>
            {error ? <FormError>{error}</FormError> : null}
          </FormField>
        );
      }}
    </form.Field>
  );
}
