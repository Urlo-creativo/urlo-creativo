import { getCliClient } from "sanity/cli";

const apiVersion = process.env.SANITY_API_VERSION || "2026-06-18";
const client = getCliClient({ apiVersion }).withConfig({
  perspective: "raw",
  useCdn: false,
});
const shouldWrite =
  process.env.MIGRATE_PROJECT_RESPONSIBILITIES_TEXT_WRITE === "1";

const docs =
  await client.fetch(`*[_type == "project" && defined(responsibilities)]{
  _id,
  clientName,
  projectName,
  responsibilities
}`);

function label(value) {
  if (typeof value === "string") return value;
  if (!value) return "";
  return value.it || value.en || JSON.stringify(value);
}

function linesForLocale(items, locale) {
  return items
    .map((item) => {
      if (typeof item === "string") return item;
      return item?.[locale] || "";
    })
    .map((line) => line.trim())
    .filter(Boolean)
    .join("\n");
}

const migrations = docs
  .filter((doc) => Array.isArray(doc.responsibilities))
  .map((doc) => ({
    _id: doc._id,
    label: [label(doc.clientName), label(doc.projectName)]
      .filter(Boolean)
      .join(" / "),
    responsibilities: {
      _type: "localizedText",
      it: linesForLocale(doc.responsibilities, "it"),
      en: linesForLocale(doc.responsibilities, "en"),
    },
  }));

if (migrations.length === 0) {
  console.log("No project responsibilities need migration.");
  process.exit(0);
}

console.log(
  `${shouldWrite ? "Migrating" : "Dry run:"} ${migrations.length} project document${
    migrations.length === 1 ? "" : "s"
  }.`,
);

for (const migration of migrations) {
  console.log(`- ${migration._id}: ${migration.label || "Untitled project"}`);
}

if (!shouldWrite) {
  console.log(
    "No writes performed. Run `npm run migrate:project-responsibilities-text:write` from the repository root to migrate data.",
  );
  process.exit(0);
}

let transaction = client.transaction();

for (const migration of migrations) {
  transaction = transaction.patch(migration._id, (patch) =>
    patch.set({ responsibilities: migration.responsibilities }),
  );
}

await transaction.commit({ visibility: "async" });
console.log("Project responsibilities migrated to localized multiline text.");
