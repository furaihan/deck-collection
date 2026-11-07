import { createHighlighter, renderTokens } from "@tanstack/highlight/core";
import type { HighlightDecoration, HighlightRenderNode } from "@tanstack/highlight/core";
import { json } from "@tanstack/highlight/languages/json";
import { shell } from "@tanstack/highlight/languages/shell";
import { ts } from "@tanstack/highlight/languages/ts";
import { tsx } from "@tanstack/highlight/languages/tsx";
import type { CSSProperties, ReactNode } from "react";
import { C, CODE, FONT } from "./theme";

/**
 * One highlighter, built once. Languages are registered individually — the
 * package's root entry would pull all eighty and the deck needs four.
 */
const highlighter = createHighlighter({ languages: [ts, tsx, json, shell] });

/** Gutter geometry, in px. */
const GUTTER = 52;
const GUTTER_GAP = 20;

/** Row treatments a decoration can ask for. */
const TONE: Record<string, CSSProperties> = {
  "is-focus": { background: "rgba(255,61,127,0.13)" },
  "is-mark": {
    background: "rgba(255,204,122,0.20)",
    boxShadow: "inset 0 -2px 0 rgba(255,204,122,0.85)",
  },
};

export interface FitInput {
  code: string;
  /** Width of the printed field, in px. */
  width: number;
  /** Largest size the block may use. */
  size?: number;
  lineNumbers?: boolean;
}

/**
 * The fit rule, in one place.
 *
 * Every glyph of the bundled mono face — space included — is exactly
 * `CODE.advance` ems wide, so the width one line needs at a given size is
 * `chars * advance * size`. Inverting that gives the largest size whose longest
 * line still fits. No measuring, no scrollbar, no surprise in the PDF.
 */
export function fitSize({ code, width, size = CODE.size, lineNumbers = true }: FitInput) {
  const lines = code.trimEnd().split("\n");
  const gutter = lineNumbers ? GUTTER + GUTTER_GAP : 0;
  const inner = width - CODE.padX * 2 - gutter;
  const longest = lines.reduce((n, line) => Math.max(n, line.length), 0);
  const fontSize = Math.min(size, Math.floor(inner / Math.max(1, longest * CODE.advance)));
  return { fontSize, longest, inner, fits: fontSize >= CODE.min };
}

export interface CodeBlockProps extends Omit<FitInput, "code"> {
  code: string;
  lang?: "ts" | "tsx" | "json" | "shell";
  lineNumbers?: boolean;
  /** Line numbers (one-based) to light up. */
  focus?: readonly number[];
  /** The one fragment to underline, named by the line it sits on. */
  mark?: { line: number; text: string };
  /** Filename shown in the block's head. */
  title?: string;
  style?: CSSProperties;
}

/**
 * A code block that cannot overflow its box.
 *
 * On a fixed 1920x1080 sheet a scrollbar is not an option: `overflow-x: auto`
 * prints as a line cut in half, and shrinking to a default size prints 14px
 * type. So the size is solved from the content instead, and a block whose text
 * cannot fit at the deck's floor throws at render rather than printing badly.
 *
 * Tokens come from `renderTokens`, which returns plain data — no HTML string,
 * no `dangerouslySetInnerHTML`, and no CSS variables to leak out of the deck.
 */
export function CodeBlock({
  code,
  lang = "ts",
  width,
  size = CODE.size,
  lineNumbers = true,
  focus,
  mark,
  title,
  style,
}: CodeBlockProps) {
  const source = code.trimEnd();
  const lines = source.split("\n");
  const { fontSize, longest, fits } = fitSize({ code: source, width, size, lineNumbers });

  if (!fits) {
    throw new Error(
      `<CodeBlock${title ? ` "${title}"` : ""}> cannot fit ${longest} characters: ` +
        `the smallest printable size needs more than ${width}px. Widen the block, ` +
        "split the line, or shorten it.",
    );
  }

  const decorations: HighlightDecoration[] = [];
  for (const line of focus ?? []) decorations.push({ lines: line, className: "is-focus" });

  if (mark) {
    const line = lines[mark.line - 1] ?? "";
    const column = line.indexOf(mark.text);
    if (column < 0) {
      throw new Error(`<CodeBlock> mark "${mark.text}" is not on line ${mark.line}.`);
    }
    const start = lines
      .slice(0, mark.line - 1)
      .reduce((offset, text) => offset + text.length + 1, 0);
    const range: readonly [number, number] = [start + column, start + column + mark.text.length];
    decorations.push({ range, className: "is-mark" });
  }

  const wrapped = lineNumbers || decorations.length > 0;
  const nodes = renderTokens(highlighter.tokenize(source, { lang }).tokens, {
    lineNumbers: wrapped,
    decorations,
  });

  const lineHeight = Math.round(fontSize * CODE.lineHeight);
  const text: CSSProperties = {
    fontFamily: FONT.mono,
    fontSize,
    lineHeight: `${lineHeight}px`,
    whiteSpace: "pre",
    color: CODE.token.token,
  };

  return (
    <figure
      style={{
        width,
        margin: 0,
        background: C.slab,
        border: `1px solid ${C.slabRule}`,
        overflow: "hidden",
        ...style,
      }}
    >
      {title ? (
        <figcaption
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
            padding: `18px ${CODE.padX}px`,
            borderBottom: `1px solid ${C.slabRule}`,
          }}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              minWidth: 0,
              fontFamily: FONT.mono,
              fontSize: 18,
              letterSpacing: "0.08em",
              color: C.paper,
              lineHeight: 1,
              whiteSpace: "nowrap",
            }}
          >
            <span aria-hidden style={{ width: 7, height: 7, background: C.riso, flex: "none" }} />
            {title}
          </span>
          <span
            style={{
              fontFamily: FONT.mono,
              fontSize: 16,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: C.risoOnSlab,
              lineHeight: 1,
              flex: "none",
            }}
          >
            {lang}
          </span>
        </figcaption>
      ) : null}

      <div style={{ padding: `${CODE.padY}px ${CODE.padX}px` }}>
        {wrapped ? (
          nodes.map((node) => {
            if (node.type === "text") return null;
            const line = node.data?.line;
            if (!line) return null;

            const tone = node.classNames
              .map((name) => TONE[name])
              .filter((value): value is CSSProperties => Boolean(value))
              .reduce<CSSProperties>((all, part) => ({ ...all, ...part }), {});
            const lit = Boolean(tone.background);

            return (
              <div
                key={line}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  ...tone,
                  ...(lit ? { marginInline: -CODE.padX, paddingInline: CODE.padX } : null),
                }}
              >
                {lineNumbers ? (
                  <span
                    aria-hidden
                    style={{
                      width: GUTTER,
                      flex: "none",
                      paddingRight: GUTTER_GAP,
                      boxSizing: "content-box",
                      textAlign: "right",
                      paddingTop: Math.round(fontSize * 0.08),
                      fontFamily: FONT.mono,
                      fontSize: Math.round(fontSize * 0.76),
                      lineHeight: `${lineHeight}px`,
                      color: CODE.token.comment,
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {line}
                  </span>
                ) : null}
                <span style={{ ...text, minWidth: 0, flex: "1 1 auto" }}>
                  {node.children.map((child, index) => renderNode(child, `${line}.${index}`))}
                </span>
              </div>
            );
          })
        ) : (
          <span style={{ ...text, display: "block" }}>
            {nodes.map((child, index) => renderNode(child, `solo.${index}`))}
          </span>
        )}
      </div>
    </figure>
  );
}

/** Maps render nodes to React elements carrying the deck's token colours. */
function renderNode(node: HighlightRenderNode, key: string): ReactNode {
  if (node.type === "text") return node.value;

  const children = node.children.map((child, index) => renderNode(child, `${key}.${index}`));

  // Token spans carry `th-token` *and* their semantic class, so `th-token`
  // must never win the lookup — it is the base colour, not a token colour.
  const semantic = node.classNames
    .filter((name) => name.startsWith("th-"))
    .map((name) => name.slice(3))
    .find((name) => name !== "token" && name in CODE.token);

  if (semantic) {
    return (
      <span key={key} style={{ color: CODE.token[semantic as keyof typeof CODE.token] }}>
        {children}
      </span>
    );
  }

  const tone = node.classNames.map((name) => TONE[name]).find(Boolean);
  return (
    <span key={key} style={tone}>
      {children}
    </span>
  );
}
