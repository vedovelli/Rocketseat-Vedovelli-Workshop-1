import { Component, type ReactNode } from "react";
import { FriendlyErrorDialog } from "@pattern/friendly-error-dialog";

type Props = { children: ReactNode; fallbackTitle?: string };
type State = { hasError: boolean; error: Error | null };

export class WidgetBoundary extends Component<Props, State> {
  override state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  override render() {
    if (this.state.hasError && this.state.error) {
      return (
        <FriendlyErrorDialog
          defaultOpen
          title={this.props.fallbackTitle ?? "Something went wrong"}
          description={this.state.error.message}
        />
      );
    }
    return this.props.children;
  }
}
