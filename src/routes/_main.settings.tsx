import { createFileRoute } from "@tanstack/react-router";
import { PreferencesForm } from "@features/settings/preferences-form";
import type { PreferencesFormData } from "@features/settings/schemas";

export const Route = createFileRoute("/_main/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const handleSubmit = async (_data: PreferencesFormData) => {
    // persist or API call
  };
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-app-foreground">Configurações</h1>
        <p className="text-app-muted mt-1">Preferências da aplicação.</p>
      </div>
      <div className="rounded-xl border border-app-border bg-app-surface p-6 shadow-sm">
        <PreferencesForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
