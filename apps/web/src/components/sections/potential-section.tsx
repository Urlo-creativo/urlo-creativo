import Link from "next/link";

import { MethodSteps } from "@/components/sections/method-steps";

type MethodStep = {
  items: string[];
  title: string;
};

type PotentialSectionProps = {
  heading: React.ReactNode;
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
      {heading}

      <MethodSteps steps={steps} />

      <Link href={ctaHref} className="pill-button mt-16">
        {ctaLabel}
      </Link>
    </div>
  );
}
