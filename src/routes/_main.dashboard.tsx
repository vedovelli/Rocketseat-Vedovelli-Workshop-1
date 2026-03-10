import { createFileRoute } from "@tanstack/react-router";
import { DashboardOverview } from "@features/dashboard/overview";

export const Route = createFileRoute("/_main/dashboard")({
  component: DashboardPage,
});

function DashboardPage() {
  return <DashboardOverview />;
}
