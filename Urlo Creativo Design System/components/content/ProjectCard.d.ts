import * as React from "react";

/**
 * Portfolio item — sharp B&W image, bold caps caption, muted year.
 *
 * @startingPoint section="Content" subtitle="Portfolio project card" viewport="380x560"
 */
export interface ProjectCardProps extends React.HTMLAttributes<HTMLElement> {
  /** Image URL. */
  image: string;
  /** Project title (rendered uppercase). */
  title: string;
  /** Year / meta line. */
  year?: string | number;
  /** Greyscale until hover. Default true. */
  bw?: boolean;
  href?: string;
  style?: React.CSSProperties;
}

export declare function ProjectCard(props: ProjectCardProps): JSX.Element;
