import { cva } from "@ui/variants";

export const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-neutral-900 text-white hover:bg-neutral-800",
        primary: "bg-app-primary text-white hover:bg-app-primary-hover",
        secondary: "bg-neutral-100 text-neutral-900 hover:bg-neutral-200",
        outline: "border border-app-border bg-transparent hover:bg-app-bg",
        ghost: "hover:bg-neutral-100",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-sm",
        lg: "h-11 px-6 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);
