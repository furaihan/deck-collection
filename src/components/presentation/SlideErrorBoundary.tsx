import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  /** Named in the fallback so a reader knows which deck broke. */
  title: string;
  slug?: string;
  onError?: (error: Error) => void;
  fallback?: (error: Error) => ReactNode;
}

interface State {
  error: Error | null;
}

/**
 * Confines a render failure to one deck (or one slide). A broken presentation
 * must never take the library down with it, so this boundary is placed around
 * every deck that renders slides.
 */
export class SlideErrorBoundary extends Component<Props, State> {
  override state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  override componentDidCatch(error: Error, info: ErrorInfo) {
    this.props.onError?.(error);
    console.error(`Presentation "${this.props.slug ?? this.props.title}" failed to render.`, error, info.componentStack);
  }

  override render() {
    const { error } = this.state;
    if (!error) return this.props.children;
    if (this.props.fallback) return this.props.fallback(error);
    return (
      <div role="alert" className="p-4 text-sm">
        <p className="font-semibold">{this.props.title}</p>
        <p className="mt-1 opacity-70">{error.message}</p>
      </div>
    );
  }
}
