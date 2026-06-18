import * as React from "react";

/**
 * Numbered, hairline-ruled service row (expandable). Use with ServiceItem
 * children for the sub-list.
 *
 * @startingPoint section="Content" subtitle="Numbered expandable service row" viewport="900x140"
 */
export interface ServiceRowProps {
  /** Row number — zero-padded to two digits. */
  number?: number | string;
  /** Row title (uppercased). */
  title: string;
  /** Sub-items (ServiceItem) revealed on click. */
  children?: React.ReactNode;
  defaultOpen?: boolean;
  style?: React.CSSProperties;
}
export interface ServiceItemProps {
  label: string;
  style?: React.CSSProperties;
}

export declare function ServiceRow(props: ServiceRowProps): JSX.Element;
export declare function ServiceItem(props: ServiceItemProps): JSX.Element;
