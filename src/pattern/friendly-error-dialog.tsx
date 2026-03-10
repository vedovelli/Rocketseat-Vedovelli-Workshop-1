import {
  DialogRoot,
  DialogTrigger,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  DialogDescription,
} from "@ui/dialog";
type FriendlyErrorDialogProps = {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  title: string;
  description: string;
  triggerLabel?: string;
  children?: React.ReactNode;
};

export function FriendlyErrorDialog({
  open,
  defaultOpen,
  onOpenChange,
  title,
  description,
  triggerLabel = "View details",
  children,
}: FriendlyErrorDialogProps) {
  return (
    <DialogRoot open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      {children ?? <DialogTrigger>{triggerLabel}</DialogTrigger>}
      <DialogBackdrop />
      <DialogPanel>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogPanel>
    </DialogRoot>
  );
}
