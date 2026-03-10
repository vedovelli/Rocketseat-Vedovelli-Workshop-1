import { Dialog } from "@base-ui/react/dialog";
import { cx } from "@ui/variants";
import type { ComponentProps } from "react";

export function DialogRoot(props: ComponentProps<typeof Dialog.Root>) {
  return <Dialog.Root data-slot="dialog" {...props} />;
}

export function DialogTrigger(props: ComponentProps<typeof Dialog.Trigger>) {
  return <Dialog.Trigger {...props} />;
}

export function DialogBackdrop({
  className,
  ...props
}: ComponentProps<typeof Dialog.Backdrop>) {
  return (
    <Dialog.Backdrop
      className={cx(
        "fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        typeof className === "string" ? className : ""
      )}
      {...props}
    />
  );
}

export function DialogPanel({
  className,
  ...props
}: ComponentProps<typeof Dialog.Popup>) {
  return (
    <Dialog.Popup
      className={cx(
        "fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 border border-neutral-200 bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        typeof className === "string" ? className : ""
      )}
      {...props}
    />
  );
}

export function DialogTitle(props: ComponentProps<typeof Dialog.Title>) {
  return <Dialog.Title className="text-lg font-semibold" {...props} />;
}

export function DialogDescription(
  props: ComponentProps<typeof Dialog.Description>
) {
  return (
    <Dialog.Description className="text-sm text-neutral-500" {...props} />
  );
}
