export {
  defaultLocale,
  localeLabels,
  locales,
  supportedLocales,
  type Locale,
} from "@urlo/shared/locales";

import { locales, type Locale } from "@urlo/shared/locales";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function localizedPath(locale: Locale, pathname = "/") {
  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `/${locale}${normalizedPath === "/" ? "" : normalizedPath}`;
}

export function switchLocalePath(pathname: string, locale: Locale) {
  const segments = pathname.split("/");
  const [, firstSegment, ...restSegments] = segments;

  if (isLocale(firstSegment)) {
    return localizedPath(locale, `/${restSegments.join("/")}`);
  }

  return localizedPath(locale, pathname);
}
