export const supportedLocales = [
  { id: "it", title: "Italiano", label: "IT" },
  { id: "en", title: "English", label: "EN" },
] as const;

export const locales = supportedLocales.map((locale) => locale.id) as [
  (typeof supportedLocales)[number]["id"],
  ...(typeof supportedLocales)[number]["id"][],
];

export type Locale = (typeof supportedLocales)[number]["id"];

export const defaultLocale: Locale = "it";

export const localeLabels: Record<Locale, string> = Object.fromEntries(
  supportedLocales.map((locale) => [locale.id, locale.label]),
) as Record<Locale, string>;
