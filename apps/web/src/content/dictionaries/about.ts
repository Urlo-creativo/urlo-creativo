import type { RichTextToken } from "@/components/ui/rich-text";

const placeholderRichText = [
  [{ text: "Lorem ipsum" }],
] satisfies RichTextToken[][];

const placeholderBody = [
  [{ text: "Lorem ipsum dolor sit amet." }],
] satisfies RichTextToken[][];

const aboutIt = {
  // Sanity content
  title: placeholderRichText,
  intro: placeholderBody,
  statement: placeholderBody,
  teamCoreTitle: "Lorem ipsum",
  coreRoles: ["Lorem ipsum", "Dolor sit", "Amet"],
  processTitle: "Lorem ipsum",
  processStages: ["Lorem", "Ipsum", "Dolor"],
  processDescriptions: [
    "Lorem ipsum dolor sit amet.",
    "Lorem ipsum dolor sit amet.",
    "Lorem ipsum dolor sit amet.",
  ],
  missionTitle: "Lorem ipsum",
  mission: placeholderBody,
  missionHighlight: placeholderRichText,
  historyTitle: placeholderRichText,
  historyStart: "Lorem",
  historyNow: "Ipsum",
  historyStartYear: "2024",
  historyNowYear: "2026",
  historyStartDescription: placeholderBody,
  historyNowDescription: placeholderBody,
  peopleTitle: "Lorem ipsum",
  team: [
    { name: "Lorem", role: "Lorem ipsum" },
    { name: "Ipsum", role: "Dolor sit" },
    { name: "Dolor", role: "Amet" },
  ],
};

const aboutEn = {
  // Sanity content
  title: placeholderRichText,
  intro: placeholderBody,
  statement: placeholderBody,
  teamCoreTitle: "Lorem ipsum",
  coreRoles: ["Lorem ipsum", "Dolor sit", "Amet"],
  processTitle: "Lorem ipsum",
  processStages: ["Lorem", "Ipsum", "Dolor"],
  processDescriptions: [
    "Lorem ipsum dolor sit amet.",
    "Lorem ipsum dolor sit amet.",
    "Lorem ipsum dolor sit amet.",
  ],
  missionTitle: "Lorem ipsum",
  mission: placeholderBody,
  missionHighlight: placeholderRichText,
  historyTitle: placeholderRichText,
  historyStart: "Lorem",
  historyNow: "Ipsum",
  historyStartYear: "2024",
  historyNowYear: "2026",
  historyStartDescription: placeholderBody,
  historyNowDescription: placeholderBody,
  peopleTitle: "Lorem ipsum",
  team: [
    { name: "Lorem", role: "Lorem ipsum" },
    { name: "Ipsum", role: "Dolor sit" },
    { name: "Dolor", role: "Amet" },
  ],
};

export const aboutDictionary = { it: aboutIt, en: aboutEn };
