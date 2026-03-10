import { cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

export { cva };
export const cx = (...inputs: (string | undefined)[]) => twMerge(...inputs);

export function compose<T extends string>(...fns: ((v: T) => string)[]) {
  return (variant: T) => fns.map((fn) => fn(variant)).filter(Boolean).join(" ");
}
