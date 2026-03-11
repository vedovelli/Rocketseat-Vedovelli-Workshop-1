import type { ReactNode } from "react";
import { Header } from "@ui/header";
import { Link, useRouterState } from "@tanstack/react-router";

type MainLayoutProps = {
  children: ReactNode;
  appVersion?: string;
};

const navLinks = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/items", label: "Items" },
  { to: "/settings", label: "Configurações" },
] as const;

function NavLink({ to, label }: { to: string; label: string }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isActive = pathname === to || (to !== "/dashboard" && pathname.startsWith(to));
  return (
    <Link
      to={to}
      className={
        isActive
          ? "text-app-primary font-medium"
          : "text-app-muted hover:text-app-foreground transition-colors"
      }
    >
      {label}
    </Link>
  );
}

export function MainLayout({ children, appVersion }: MainLayoutProps) {
  return (
    <div data-slot="main-layout" className="min-h-screen flex flex-col bg-app-bg">
      <Header className="flex items-center justify-between px-6 h-14 border-app-border bg-app-surface shadow-sm">
        <nav className="flex gap-6">
          {navLinks.map(({ to, label }) => (
            <NavLink key={to} to={to} label={label} />
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-sm text-app-muted hover:text-app-foreground">
            Entrar
          </Link>
          {appVersion ? <span className="text-xs text-app-muted">{appVersion}</span> : null}
        </div>
      </Header>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
