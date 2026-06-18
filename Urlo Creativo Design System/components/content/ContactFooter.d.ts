import * as React from "react";

/**
 * Full-bleed yellow contact footer — giant CONTACT title, address +
 * contacts, social links, and a "Book a consultation" pill.
 *
 * @startingPoint section="Content" subtitle="Yellow contact footer panel" viewport="1280x420"
 */
export interface ContactFooterProps extends React.HTMLAttributes<HTMLElement> {
  address?: string[];
  phone?: string;
  email?: string;
  socials?: string[];
  cta?: string;
  onCta?: () => void;
  style?: React.CSSProperties;
}

export declare function ContactFooter(props: ContactFooterProps): JSX.Element;
