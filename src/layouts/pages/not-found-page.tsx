import { Link } from "@tanstack/react-router";

export function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
      <h1 className="text-2xl font-semibold">Not found</h1>
      <Link to="/" className="text-blue-600 hover:underline">Go home</Link>
    </div>
  );
}
