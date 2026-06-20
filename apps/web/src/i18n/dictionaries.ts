import { dictionaries, type Dictionary } from "@/content/dictionaries";
import type { Locale } from "./config";

// Data-access wrapper over the local content store (@/content/dictionaries).
// Swap the implementation here (e.g. fetch from Sanity with a local fallback)
// without touching the pages/components that call getDictionary.
export type { Dictionary };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
