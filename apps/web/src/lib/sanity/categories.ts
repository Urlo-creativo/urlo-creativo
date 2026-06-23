import type { Locale } from "@/i18n/config";

export type CategoryValue =
  | "brand-identity"
  | "design-product"
  | "styling-art-direction";

type CategoryDefinition = {
  value: CategoryValue;
  labels: Record<Locale, string>;
};

/**
 * SINGLE SOURCE OF TRUTH for project categories on the web side.
 * Order here defines the order of the filter buttons and chips.
 *
 * NOTE: the Studio dropdown lives in `apps/studio/schemaTypes/project.ts`
 * (`CATEGORY_OPTIONS`). It is a separate package, so it can't import this file —
 * keep the `value` strings identical across both when adding/removing a category.
 */
export const CATEGORIES: CategoryDefinition[] = [
  {
    value: "brand-identity",
    labels: {
      it: "Identità del brand e comunicazione",
      en: "Brand Identity & Communication",
    },
  },
  {
    value: "design-product",
    labels: {
      it: "Design e sviluppo prodotto",
      en: "Design & Product Development",
    },
  },
  {
    value: "styling-art-direction",
    labels: {
      it: "Styling, shooting e art direction",
      en: "Styling / Shooting & Art Direction",
    },
  },
];

export const CATEGORY_ORDER: string[] = CATEGORIES.map(
  (category) => category.value,
);

export type CategoryLabels = Record<string, string>;
export type CategoryOption = { value: string; label: string };

/** Value → label map for a given locale. */
export function categoryLabelsFor(locale: Locale): CategoryLabels {
  return Object.fromEntries(
    CATEGORIES.map((category) => [category.value, category.labels[locale]]),
  );
}

const DEFAULT_LABELS = categoryLabelsFor("en");

export function categoryLabel(
  value: string,
  labels: CategoryLabels = DEFAULT_LABELS,
): string {
  return labels[value] ?? DEFAULT_LABELS[value] ?? value;
}

/**
 * Build the filter options from the categories actually used by the given
 * projects, ordered by the canonical order with any unknown values appended.
 */
export function getCategoryOptions(
  projects: { categories?: string[] | null }[],
  labels: CategoryLabels = DEFAULT_LABELS,
): CategoryOption[] {
  const used = new Set<string>();
  for (const project of projects) {
    for (const category of project.categories ?? []) used.add(category);
  }

  const ordered = [
    ...CATEGORY_ORDER.filter((value) => used.has(value)),
    ...[...used].filter((value) => !CATEGORY_ORDER.includes(value)).sort(),
  ];

  return ordered.map((value) => ({ value, label: categoryLabel(value, labels) }));
}
