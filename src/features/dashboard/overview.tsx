import { Link } from "@tanstack/react-router";

const stats = [
  { label: "Itens cadastrados", value: "12", href: "/items", color: "bg-app-primary-muted text-app-primary" },
  { label: "Em andamento", value: "3", href: "/items", color: "bg-app-accent-muted text-app-accent" },
  { label: "Concluídos este mês", value: "8", href: "/items", color: "bg-app-primary-muted text-app-primary" },
];

export function DashboardOverview() {
  return (
    <div data-slot="dashboard-overview" className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-app-foreground">Dashboard</h1>
        <p className="text-app-muted mt-1">Visão geral da sua aplicação.</p>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map(({ label, value, href, color }) => (
          <Link
            key={label}
            to={href}
            className="rounded-xl border border-app-border bg-app-surface p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <p className="text-sm font-medium text-app-muted">{label}</p>
            <p className="mt-2 text-3xl font-bold text-app-foreground">{value}</p>
            <span className={`mt-2 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${color}`}>
              Ver detalhes
            </span>
          </Link>
        ))}
      </section>

      <section className="rounded-xl border border-app-border bg-app-surface p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-app-foreground">Atividade recente</h2>
        <ul className="mt-4 space-y-3">
          <li className="flex items-center gap-3 border-b border-app-border pb-3 last:border-0 last:pb-0">
            <span className="h-2 w-2 rounded-full bg-app-primary" />
            <span className="text-app-foreground">Item &quot;Documentação&quot; criado</span>
            <span className="ml-auto text-sm text-app-muted">há 2h</span>
          </li>
          <li className="flex items-center gap-3 border-b border-app-border pb-3 last:border-0 last:pb-0">
            <span className="h-2 w-2 rounded-full bg-app-accent" />
            <span className="text-app-foreground">Item &quot;API&quot; atualizado</span>
            <span className="ml-auto text-sm text-app-muted">ontem</span>
          </li>
          <li className="flex items-center gap-3 border-b border-app-border pb-3 last:border-0 last:pb-0">
            <span className="h-2 w-2 rounded-full bg-app-primary" />
            <span className="text-app-foreground">Configurações salvas</span>
            <span className="ml-auto text-sm text-app-muted">há 3 dias</span>
          </li>
        </ul>
      </section>

      <section className="rounded-xl border border-app-border bg-app-surface p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-app-foreground">Ações rápidas</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            to="/items"
            className="rounded-lg bg-app-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-app-primary-hover"
          >
            Ver todos os itens
          </Link>
          <Link
            to="/settings"
            className="rounded-lg border border-app-border bg-app-surface px-4 py-2 text-sm font-medium text-app-foreground transition-colors hover:bg-app-bg"
          >
            Configurações
          </Link>
        </div>
      </section>
    </div>
  );
}
