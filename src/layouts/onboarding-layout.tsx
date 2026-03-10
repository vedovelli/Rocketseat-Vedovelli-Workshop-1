import type { ReactNode } from "react";

type OnboardingLayoutProps = {
  children: ReactNode;
};

export function OnboardingLayout({ children }: OnboardingLayoutProps) {
  return (
    <div data-slot="onboarding-layout" className="min-h-screen flex flex-col items-center justify-center bg-neutral-100 p-6">
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
