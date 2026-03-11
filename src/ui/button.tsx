import { Button as BaseButton } from "@base-ui/react/button";
import { cx } from "@ui/variants";
import { buttonVariants } from "@ui/button.variants";
import type { ComponentProps } from "react";

type ButtonProps = ComponentProps<typeof BaseButton> & {
  variant?: "default" | "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
};

export function Button({
  className,
  variant,
  size,
  ...props
}: ButtonProps) {
  return (
    <BaseButton
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cx(buttonVariants({ variant, size }), typeof className === "string" ? className : "")}
      {...props}
    />
  );
}
