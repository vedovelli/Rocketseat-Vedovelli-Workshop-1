import type { ComponentProps } from "react";

export function Header({ className, ...props }: ComponentProps<"header">) {
  return (
    <header
      data-slot="header"
      className={className ?? "border-b border-neutral-200 bg-white"}
      {...props}
    />
  );
}
