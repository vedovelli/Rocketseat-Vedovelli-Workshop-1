import { useForm } from "@tanstack/react-form";
import { FormFieldWrapper } from "@pattern/form";
import { Button } from "@ui/button";
import { createFormSubmitHandler } from "@pattern/form.hooks";
import { preferencesSchema } from "@features/settings/schemas";
import type { PreferencesFormData } from "@features/settings/schemas";

type PreferencesFormProps = {
  defaultValues?: Partial<PreferencesFormData>;
  onSubmit: (data: PreferencesFormData) => void | Promise<void>;
};

export function PreferencesForm({ defaultValues, onSubmit }: PreferencesFormProps) {
  const form = useForm<PreferencesFormData>({
    defaultValues: {
      theme: defaultValues?.theme ?? "light",
      notifications: defaultValues?.notifications ?? false,
    },
    onSubmit: async () => {
      const handler = createFormSubmitHandler(preferencesSchema, onSubmit);
      await handler(form);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="space-y-4"
    >
      <FormFieldWrapper form={form} name="theme" label="Tema" />
      <form.Field name="notifications">
        {(field) => (
          <label className="flex items-center gap-2 text-app-foreground">
            <input
              type="checkbox"
              checked={!!field.state.value}
              onChange={(e) => field.handleChange(e.target.checked)}
              className="rounded border-app-border text-app-primary focus:ring-app-primary"
            />
            <span>Notificações</span>
          </label>
        )}
      </form.Field>
      <Button type="submit" variant="primary">Salvar</Button>
    </form>
  );
}
