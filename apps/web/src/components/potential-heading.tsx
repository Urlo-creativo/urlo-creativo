import Link from "next/link";

import { MethodSteps } from "@/components/method-steps";
import {
  StructuredRichText,
  type RichTextToken,
} from "@/components/rich-text";

type MethodStep = {
  items: string[];
  title: string;
};

type PotentialSectionProps = {
  heading: RichTextToken[][];
  ctaHref: string;
  ctaLabel: string;
  steps: MethodStep[];
};

export function PotentialSection({
  heading,
  ctaHref,
  ctaLabel,
  steps,
}: PotentialSectionProps) {
  return (
    <div>
      <StructuredRichText
        as="h2"
        lines={heading}
        className="text-[clamp(56px,6.7vw,96px)] uppercase leading-none tracking-normal"
      />

      <MethodSteps steps={steps} />

      <Link href={ctaHref} className="pill-button mt-16">
        {ctaLabel}
      </Link>
    </div>
  );
}
