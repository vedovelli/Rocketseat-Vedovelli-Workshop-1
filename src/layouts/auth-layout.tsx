import type { ReactNode } from "react";

type AuthLayoutProps = {
  children: ReactNode;
  appVersion?: string;
};

export function AuthLayout({ children, appVersion }: AuthLayoutProps) {
  return (
    <div data-slot="auth-layout" className="min-h-screen flex flex-col items-center justify-center bg-neutral-50 p-4">
      {appVersion ? (
        <span className="absolute top-4 right-4 text-xs text-neutral-500">{appVersion}</span>
      ) : null}
      <div className="w-full max-w-sm">{children}</div>
    </div>
  );
}
