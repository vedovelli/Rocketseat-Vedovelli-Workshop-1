import { useForm } from "@tanstack/react-form";
import { FormFieldWrapper } from "@pattern/form";
import { Button } from "@ui/button";
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
    onSubmit: async ({ value }) => {
      await onSubmit(value);
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
      <FormFieldWrapper form={form} name="theme" label="Theme" />
      <form.Field name="notifications">
        {(field) => (
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={!!field.state.value}
              onChange={(e) => field.handleChange(e.target.checked)}
            />
            <span>Notifications</span>
          </label>
        )}
      </form.Field>
      <Button type="submit">Save</Button>
    </form>
  );
}
