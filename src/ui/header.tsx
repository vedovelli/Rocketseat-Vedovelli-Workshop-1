import type { ComponentProps } from "react";

export function Header({ className, ...props }: ComponentProps<"header">) {
  return (
    <header
      data-slot="header"
      className={className ?? "border-b border-app-border bg-app-surface"}
      {...props}
    />
  );
}
