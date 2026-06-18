import * as React from "react";

/**
 * Big bold caps section title with an optional italic accent word —
 * the studio's house headline ("EVERY BRAND HAS A *POTENTIAL*").
 *
 * @startingPoint section="Core" subtitle="Display section headline + italic accent" viewport="700x180"
 */
export interface SectionTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children?: React.ReactNode;
  /** Italic accent word appended after the caps run. */
  accent?: string;
  /** Yellow underline on the accent word. Default false. */
  underline?: boolean;
  /** Font size in px. Default 96. */
  size?: number;
  color?: string;
  /** Heading tag. Default "h2". */
  as?: any;
  style?: React.CSSProperties;
}

export declare function SectionTitle(props: SectionTitleProps): JSX.Element;
