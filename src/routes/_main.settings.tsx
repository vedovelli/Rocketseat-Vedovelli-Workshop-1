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
    <div>
      <h1 className="text-xl font-semibold mb-4">Settings</h1>
      <PreferencesForm onSubmit={handleSubmit} />
    </div>
  );
}
