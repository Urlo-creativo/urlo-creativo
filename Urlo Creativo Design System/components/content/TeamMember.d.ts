import * as React from "react";

/**
 * Team member — B&W portrait, caps name, muted role.
 *
 * @startingPoint section="Content" subtitle="Team member portrait card" viewport="320x420"
 */
export interface TeamMemberProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Portrait image URL. */
  photo?: string;
  /** Name (uppercased). */
  name: string;
  /** Role / title caption. */
  role?: string;
  style?: React.CSSProperties;
}

export declare function TeamMember(props: TeamMemberProps): JSX.Element;
