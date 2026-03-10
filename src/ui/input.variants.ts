import { cva } from "@ui/variants";

export const inputVariants = cva(
  "flex h-10 w-full rounded-md border border-neutral-300 bg-transparent px-3 py-2 text-sm placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "h-8 px-2 text-xs",
        md: "h-10 px-3 text-sm",
        lg: "h-11 px-4 text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);
