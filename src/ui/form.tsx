import type { ComponentProps } from "react";

export function FormField({ children }: { children: React.ReactNode }) {
  return <div data-slot="form-field" className="space-y-2">{children}</div>;
}

export function FormLabel({
  className,
  ...props
}: ComponentProps<"label">) {
  return (
    <label
      data-slot="form-label"
      className={`block text-sm font-medium text-neutral-700 ${className ?? ""}`}
      {...props}
    />
  );
}

export function FormError({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      data-slot="form-error"
      role="alert"
      className={`text-sm text-red-600 ${className ?? ""}`}
      {...props}
    />
  );
}

export function FormControl({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div data-slot="form-control" className={className ?? ""} {...props} />
  );
}
