import { Link } from "@tanstack/react-router";

export function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 bg-app-bg">
      <h1 className="text-2xl font-semibold text-app-foreground">Página não encontrada</h1>
      <Link to="/dashboard" className="text-app-primary font-medium hover:underline">
        Ir para o Dashboard
      </Link>
    </div>
  );
}
