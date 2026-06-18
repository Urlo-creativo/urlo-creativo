import * as React from "react";

/**
 * Urlo Creativo logo — O-pictogram, wordmark, or the full lockup.
 *
 * @startingPoint section="Brand" subtitle="Studio logo, mark + wordmark" viewport="700x160"
 */
export interface LogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Which form to render. Default "lockup". */
  variant?: "lockup" | "wordmark" | "mark";
  /** Rendered height in px. Default 52. */
  height?: number;
  /** Path prefix to reach assets/ from the consuming file, e.g. "../../". */
  basePath?: string;
  style?: React.CSSProperties;
}

export declare function Logo(props: LogoProps): JSX.Element;
