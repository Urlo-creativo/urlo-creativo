import type { Locale } from "@/i18n/config";

import { aboutDictionary } from "./about";
import { common } from "./common";
import { contactDictionary } from "./contact";
import { homeDictionary } from "./home";
import { projectsDictionary } from "./projects";
import { servicesDictionary } from "./services";

// Local content store: the migration-era source of truth and the fallback once
// pages start reading from Sanity. Split per page so each block can move to the
// CMS independently. The accessor lives in `@/i18n/dictionaries`.
export const dictionaries = {
  it: {
    metadata: common.it.metadata,
    nav: common.it.nav,
    home: homeDictionary.it,
    projects: projectsDictionary.it,
    contact: contactDictionary.it,
    footer: common.it.footer,
    about: aboutDictionary.it,
    services: servicesDictionary.it,
  },
  en: {
    metadata: common.en.metadata,
    nav: common.en.nav,
    home: homeDictionary.en,
    projects: projectsDictionary.en,
    contact: contactDictionary.en,
    footer: common.en.footer,
    about: aboutDictionary.en,
    services: servicesDictionary.en,
  },
} satisfies Record<Locale, object>;

export type Dictionary = (typeof dictionaries)[Locale];
