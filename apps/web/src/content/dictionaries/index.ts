import type { Locale } from "@/i18n/config";

import { common } from "./common";
import { homeDictionary } from "./home";
import { servicesDictionary } from "./services";
import { projectsDictionary } from "./projects";
import { aboutDictionary } from "./about";
import { contactDictionary } from "./contact";

// Local content store: the migration-era source of truth and the fallback once
// pages start reading from Sanity. Split per page so each block can move to the
// CMS independently. The accessor lives in `@/i18n/dictionaries`.
export const dictionaries = {
  it: {
    metadata: common.it.metadata,
    nav: common.it.nav,
    home: homeDictionary.it,
    services: servicesDictionary.it,
    projects: projectsDictionary.it,
    about: aboutDictionary.it,
    contact: contactDictionary.it,
    footer: common.it.footer,
  },
  en: {
    metadata: common.en.metadata,
    nav: common.en.nav,
    home: homeDictionary.en,
    services: servicesDictionary.en,
    projects: projectsDictionary.en,
    about: aboutDictionary.en,
    contact: contactDictionary.en,
    footer: common.en.footer,
  },
} satisfies Record<Locale, object>;

export type Dictionary = (typeof dictionaries)[Locale];
