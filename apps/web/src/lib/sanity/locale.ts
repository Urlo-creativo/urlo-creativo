import { defaultLocale, type Locale } from "@/i18n/config";

export function localeParams(locale: Locale) {
  return {
    locale,
    fallbackLocale: defaultLocale,
  };
}
