import * as React from "react";

/**
 * Pill button — outline (fills on hover), solid ink, or ghost (yellow on hover).
 *
 * @startingPoint section="Core" subtitle="Pill buttons — outline / solid / ghost" viewport="700x150"
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  /** Visual style. Default "outline". */
  variant?: "outline" | "solid" | "ghost";
  /** Size. Default "md". */
  size?: "sm" | "md" | "lg";
  /** Element/component to render as. Default "button". */
  as?: any;
  style?: React.CSSProperties;
}

export declare function Button(props: ButtonProps): JSX.Element;
