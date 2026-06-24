import { getCliClient } from "sanity/cli";

const apiVersion = process.env.SANITY_API_VERSION || "2026-06-18";
const client = getCliClient({ apiVersion }).withConfig({
  perspective: "raw",
  useCdn: false,
});
const shouldWrite = process.env.MIGRATE_HOME_TITLE_RICH_TEXT_WRITE === "1";

const fields = ["heroTitle", "heroSubheading", "projectsTitle", "teamTitle"];

function block(text, keyPrefix) {
  return {
    _key: `${keyPrefix}-block`,
    _type: "block",
    style: "normal",
    markDefs: [],
    children: [
      {
        _key: `${keyPrefix}-span`,
        _type: "span",
        text,
        marks: [],
      },
    ],
  };
}

function richTextFromLocalizedString(value, fieldName) {
  if (!value || value._type === "localizedRichText") return null;

  if (typeof value === "string") {
    return {
      _type: "localizedRichText",
      it: [block(value, `${fieldName}-it`)],
      en: [block(value, `${fieldName}-en`)],
    };
  }

  const it = typeof value.it === "string" ? value.it : "";
  const en = typeof value.en === "string" ? value.en : it;

  if (!it && !en) return null;

  return {
    _type: "localizedRichText",
    it: [block(it || en, `${fieldName}-it`)],
    en: [block(en || it, `${fieldName}-en`)],
  };
}

const doc = await client.fetch(
  `*[_id == "homePage"][0]{
    _id,
    heroTitle,
    heroSubheading,
    projectsTitle,
    teamTitle
  }`,
);

if (!doc) {
  console.log("No homePage document found.");
  process.exit(0);
}

const set = {};

for (const field of fields) {
  const nextValue = richTextFromLocalizedString(doc[field], field);
  if (nextValue) {
    set[field] = nextValue;
  }
}

const fieldNames = Object.keys(set);

if (fieldNames.length === 0) {
  console.log("No homepage title fields need rich-text migration.");
  process.exit(0);
}

console.log(
  `${shouldWrite ? "Migrating" : "Dry run:"} homepage title fields: ${fieldNames.join(
    ", ",
  )}`,
);

if (!shouldWrite) {
  console.log(
    "No writes performed. Run `npm run migrate:home-title-rich-text:write` from the repository root to migrate data.",
  );
  process.exit(0);
}

await client.patch("homePage").set(set).commit({ visibility: "async" });
console.log("Homepage title fields migrated to rich text.");
