import { cx } from "@ui/variants";
import { inputVariants } from "@ui/input.variants";
import type { ComponentProps } from "react";

type InputProps = ComponentProps<"input"> & {
  size?: "sm" | "md" | "lg";
};

export function Input({ className, size, ...props }: InputProps) {
  return (
    <input
      data-slot="input"
      data-size={size}
      className={cx(inputVariants({ size }), className)}
      {...props}
    />
  );
}
