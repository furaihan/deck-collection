import type { ComponentType } from "react";

/** A slide is a plain React component drawn against a fixed 1920x1080 canvas. */
export type SlideComponent = ComponentType<Record<string, never>>;

/** The `Presentation.tsx` default export: slide components in presentation order. */
export type SlideList = readonly SlideComponent[];

export interface PresentationMeta {
  title: string;
  description: string;
  course?: string;
  /** ISO date, `YYYY-MM-DD`. */
  date: string;
  visibility: "public" | "private";
}

/** Metadata plus the slug derived from the directory name. */
export interface PresentationRecord extends PresentationMeta {
  slug: string;
}

export interface PresentationEntry extends PresentationRecord {
  load: () => Promise<{ default: SlideList }>;
}
