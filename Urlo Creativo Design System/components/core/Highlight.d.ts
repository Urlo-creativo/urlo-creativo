import * as React from "react";

/**
 * The signature marker-pen highlight — yellow block, yellow underline,
 * or a coloured process-accent highlight. Inline; wraps a word/phrase.
 */
export interface HighlightProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
  /** "fill" (block, default), "underline" (bar), or "text" (accent block). */
  mode?: "fill" | "underline" | "text";
  /** Accent colour. Default yellow; pass a process accent for "text". */
  color?: string;
  style?: React.CSSProperties;
}

export declare function Highlight(props: HighlightProps): JSX.Element;
