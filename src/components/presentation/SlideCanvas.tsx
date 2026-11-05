import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

export const SLIDE_WIDTH = 1920;
export const SLIDE_HEIGHT = 1080;

/**
 * Neutral base for everything a slide draws. Slides are authored against a
 * blank 1920x1080 sheet, not against this app's theme, so the wrapper pins the
 * inherited typography and colour rather than letting the shell's design
 * tokens reach the canvas.
 */
const canvasBase: CSSProperties = {
  width: SLIDE_WIDTH,
  height: SLIDE_HEIGHT,
  backgroundColor: "#ffffff",
  color: "#111111",
  fontFamily:
    'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  fontSize: "16px",
  fontWeight: 400,
  fontStyle: "normal",
  lineHeight: 1.4,
  letterSpacing: "normal",
  textAlign: "start",
  textTransform: "none",
  fontFeatureSettings: "normal",
  fontVariantNumeric: "normal",
  colorScheme: "light",
  direction: "ltr",
  isolation: "isolate",
};

interface SlideCanvasProps {
  children: ReactNode;
  /** Decorative thumbnails should not swallow pointer events. */
  interactive?: boolean;
  /**
   * `fit` (default) centres and scales the sheet inside its host. `native`
   * draws it 1:1 at the origin with no transform — required for PDF capture,
   * where a centring translate makes Chromium widen the page's content box
   * and print the whole document shrunk to fit.
   */
  mode?: "fit" | "native";
  className?: string;
  style?: CSSProperties;
  /** Accessible name for the rendered slide, when the canvas stands alone. */
  label?: string;
}

/**
 * Scales a fixed 1920x1080 sheet to the largest 16:9 rectangle that fits its
 * container. Slides never see the container size, so their pixel layout is the
 * same in a 240px thumbnail and on a projector.
 */
export function SlideCanvas({
  children,
  interactive = false,
  mode = "fit",
  className,
  style,
  label,
}: SlideCanvasProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  const measure = useCallback((width: number, height: number) => {
    if (width <= 0 || height <= 0) return;
    setScale(Math.min(width / SLIDE_WIDTH, height / SLIDE_HEIGHT));
  }, []);

  useEffect(() => {
    if (mode === "native") return;
    const host = hostRef.current;
    if (!host) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const { width, height } = entry.contentRect;
      measure(width, height);
    });

    observer.observe(host);
    const rect = host.getBoundingClientRect();
    measure(rect.width, rect.height);

    return () => observer.disconnect();
  }, [measure, mode]);

  const native = mode === "native";

  return (
    <div
      ref={hostRef}
      data-slide-canvas
      className={cn("relative overflow-hidden", !interactive && "pointer-events-none", className)}
      style={style}
      {...(label ? { role: "img", "aria-label": label } : {})}
    >
      <div
        className={cn("origin-center", !native && "absolute left-1/2 top-1/2")}
        style={{
          ...canvasBase,
          ...(native
            ? null
            : {
                transform: `translate(-50%, -50%) scale(${scale})`,
                visibility: scale > 0 ? "visible" : "hidden",
              }),
        }}
        aria-hidden={label ? true : undefined}
      >
        {children}
      </div>
    </div>
  );
}
