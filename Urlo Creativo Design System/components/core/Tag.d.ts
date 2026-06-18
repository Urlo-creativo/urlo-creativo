import * as React from "react";

/** Small outline pill for meta labels / filters. */
export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
  /** "outline" (default), "fill" (yellow), or "muted" (gray). */
  variant?: "outline" | "fill" | "muted";
  style?: React.CSSProperties;
}

export declare function Tag(props: TagProps): JSX.Element;
