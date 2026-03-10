import type { ReactNode } from "react";
import { Header } from "@ui/header";
import { Link } from "@tanstack/react-router";

type MainLayoutProps = {
  children: ReactNode;
  appVersion?: string;
};

export function MainLayout({ children, appVersion }: MainLayoutProps) {
  return (
    <div data-slot="main-layout" className="min-h-screen flex flex-col">
      <Header className="flex items-center justify-between px-4 h-14">
        <nav className="flex gap-4">
          <Link to="/dashboard" className="text-neutral-700 hover:text-neutral-900">Dashboard</Link>
          <Link to="/items" className="text-neutral-700 hover:text-neutral-900">Items</Link>
          <Link to="/settings" className="text-neutral-700 hover:text-neutral-900">Settings</Link>
        </nav>
        {appVersion ? <span className="text-xs text-neutral-500">{appVersion}</span> : null}
      </Header>
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
