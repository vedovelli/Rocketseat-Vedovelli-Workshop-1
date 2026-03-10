import { cx } from "@ui/variants";
import type { ComponentProps } from "react";

const badgeVariants = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium";

export function Badge({
  className,
  variant = "default",
  ...props
}: ComponentProps<"span"> & { variant?: "default" | "secondary" | "outline" }) {
  const variantClass =
    variant === "secondary"
      ? "bg-neutral-100 text-neutral-800"
      : variant === "outline"
        ? "border border-neutral-300"
        : "bg-neutral-900 text-white";
  return (
    <span
      data-slot="badge"
      data-variant={variant}
      className={cx(badgeVariants, variantClass, className)}
      {...props}
    />
  );
}
