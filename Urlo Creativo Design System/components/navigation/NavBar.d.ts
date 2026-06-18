import * as React from "react";

/**
 * Floating pill navigation — logo mark, centred links, language toggle.
 *
 * @startingPoint section="Navigation" subtitle="Floating pill site nav" viewport="1100x110"
 */
export interface NavBarProps extends React.HTMLAttributes<HTMLElement> {
  /** Nav labels. Defaults to the site's five sections. */
  items?: string[];
  /** Currently active label. */
  active?: string;
  /** Language toggle text, e.g. "IT". Pass null to hide. */
  lang?: string | null;
  /** Called with the clicked label. */
  onNavigate?: (label: string) => void;
  /** Path prefix to reach assets/ (for the logo). */
  basePath?: string;
  style?: React.CSSProperties;
}

export declare function NavBar(props: NavBarProps): JSX.Element;
