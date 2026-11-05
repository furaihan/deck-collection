import { useEffect, useState } from "react";
import type { PresentationEntry, SlideList } from "./types";

type State =
  | { status: "loading" }
  | { status: "ready"; slides: SlideList }
  | { status: "error"; error: Error };

/**
 * Loads a deck's slide array. Rejections here are what the per-deck error
 * boundary catches, so a broken deck stays a broken card and nothing else.
 */
export function useSlides(entry: PresentationEntry): State {
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    let active = true;
    setState({ status: "loading" });

    entry
      .load()
      .then((mod) => {
        if (!active) return;
        const slides = mod.default;
        if (!Array.isArray(slides) || slides.length === 0) {
          throw new Error(
            `Presentation.tsx in "${entry.slug}" must default-export a non-empty array of slide components.`,
          );
        }
        setState({ status: "ready", slides });
      })
      .catch((cause: unknown) => {
        if (!active) return;
        setState({
          status: "error",
          error: cause instanceof Error ? cause : new Error(String(cause)),
        });
      });

    return () => {
      active = false;
    };
  }, [entry]);

  return state;
}
