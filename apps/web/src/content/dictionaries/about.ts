import {
  placeholderBodyRichText,
  placeholderRichText,
  placeholderText,
} from "@/content/placeholders";

const aboutFallback = {
  // Sanity fallbacks
  title: placeholderRichText,
  intro: placeholderBodyRichText,
  statement: placeholderBodyRichText,
  teamCoreTitle: placeholderRichText,
  coreRoles: [placeholderText.role],
  processTitle: placeholderRichText,
  processStages: [placeholderText.label],
  processDescriptions: [placeholderText.body],
  missionTitle: placeholderRichText,
  mission: placeholderBodyRichText,
  missionHighlight: placeholderRichText,
  historyTitle: placeholderRichText,
  historyStart: placeholderText.label,
  historyNow: placeholderText.label,
  historyStartYear: placeholderText.year,
  historyNowYear: placeholderText.year,
  historyStartDescription: placeholderBodyRichText,
  historyNowDescription: placeholderBodyRichText,
  peopleTitle: placeholderRichText,
  team: [{ name: placeholderText.name, role: placeholderText.role }],
};

export const aboutDictionary = {
  it: aboutFallback,
  en: aboutFallback,
};
