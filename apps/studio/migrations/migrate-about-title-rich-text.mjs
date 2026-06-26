import { getCliClient } from "sanity/cli";

const apiVersion = process.env.SANITY_API_VERSION || "2026-06-18";
const client = getCliClient({ apiVersion }).withConfig({
  perspective: "raw",
  useCdn: false,
});
const shouldWrite = process.env.MIGRATE_ABOUT_TITLE_RICH_TEXT_WRITE === "1";

const fields = [
  "teamCoreTitle",
  "processTitle",
  "missionTitle",
  "peopleTitle",
];

function block(text, index = 0) {
  return {
    _key: `block-${index}`,
    _type: "block",
    style: "normal",
    markDefs: [],
    children: [
      {
        _key: `span-${index}`,
        _type: "span",
        text: text || "",
        marks: [],
      },
    ],
  };
}

function stringToRichText(value) {
  return {
    _type: "localizedRichText",
    it: [block(value?.it ?? value?.en ?? "")],
    en: [block(value?.en ?? value?.it ?? "")],
  };
}

const aboutPages = await client.fetch(
  `*[_id in ["aboutPage", "drafts.aboutPage"]]{
    _id,
    teamCoreTitle,
    processTitle,
    missionTitle,
    peopleTitle
  }`,
);

if (!aboutPages.length) {
  console.log("No aboutPage document found.");
  process.exit(0);
}

const patches = [];

for (const aboutPage of aboutPages) {
  const set = {};

  for (const field of fields) {
    const value = aboutPage[field];
    if (!value || value._type === "localizedRichText") continue;
    set[field] = stringToRichText(value);
  }

  if (Object.keys(set).length > 0) {
    patches.push({ id: aboutPage._id, set });
  }
}

if (patches.length === 0) {
  console.log("No about page title fields need rich-text migration.");
  process.exit(0);
}

console.log(
  `${shouldWrite ? "Migrating" : "Dry run:"} about page title fields in ${patches
    .map((patch) => patch.id)
    .join(", ")}`,
);

if (!shouldWrite) {
  console.log(
    "No writes performed. Run `npm run migrate:about-title-rich-text:write` from the repository root to migrate data.",
  );
  process.exit(0);
}

for (const patch of patches) {
  await client.patch(patch.id).set(patch.set).commit({ visibility: "async" });
}

console.log("About page title fields migrated to localizedRichText.");
