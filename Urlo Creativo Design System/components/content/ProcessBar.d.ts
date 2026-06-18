import * as React from "react";

/**
 * The "HOW WE WORK" stage bar — caps labels over a continuous band of
 * process-accent colour blocks.
 *
 * @startingPoint section="Content" subtitle="Coloured process / stage bar" viewport="900x120"
 */
export interface ProcessStage {
  label: string;
  color: string;
}
export interface ProcessBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Stages left→right. Defaults to Discovery→Growth. */
  stages?: ProcessStage[];
  style?: React.CSSProperties;
}

export declare function ProcessBar(props: ProcessBarProps): JSX.Element;
