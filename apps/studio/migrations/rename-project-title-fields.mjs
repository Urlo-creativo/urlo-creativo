import { getCliClient } from "sanity/cli";

const apiVersion = process.env.SANITY_API_VERSION || "2026-06-18";
const client = getCliClient({ apiVersion }).withConfig({
  perspective: "raw",
  useCdn: false,
});
const shouldWrite = process.env.MIGRATE_PROJECT_FIELDS_WRITE === "1";

const query = `*[_type == "project" && (defined(title) || defined(subtitle))]{
  _id,
  title,
  subtitle,
  clientName,
  projectName
}`;

function hasValue(value) {
  return value !== undefined && value !== null;
}

function label(value) {
  if (typeof value === "string") return value;
  if (!value) return "";
  return value.it || value.en || JSON.stringify(value);
}

const docs = await client.fetch(query);

if (docs.length === 0) {
  console.log("No project documents need migration.");
  process.exit(0);
}

console.log(
  `${shouldWrite ? "Migrating" : "Dry run:"} ${docs.length} project document${
    docs.length === 1 ? "" : "s"
  }.`,
);

for (const doc of docs) {
  const set = {};

  if (!hasValue(doc.clientName) && hasValue(doc.title)) {
    set.clientName = doc.title;
  }

  if (!hasValue(doc.projectName) && hasValue(doc.subtitle)) {
    set.projectName = doc.subtitle;
  }

  const displayClient = label(set.clientName ?? doc.clientName ?? doc.title);
  const displayProject = label(set.projectName ?? doc.projectName ?? doc.subtitle);
  console.log(`- ${doc._id}: ${[displayClient, displayProject].filter(Boolean).join(" / ")}`);
}

if (!shouldWrite) {
  console.log(
    "No writes performed. Run `npm run migrate:project-fields:write` from the repository root to migrate data.",
  );
  process.exit(0);
}

let transaction = client.transaction();

for (const doc of docs) {
  const set = {};

  if (!hasValue(doc.clientName) && hasValue(doc.title)) {
    set.clientName = doc.title;
  }

  if (!hasValue(doc.projectName) && hasValue(doc.subtitle)) {
    set.projectName = doc.subtitle;
  }

  transaction = transaction.patch(doc._id, (patch) => {
    const next = Object.keys(set).length > 0 ? patch.set(set) : patch;
    return next.unset(["title", "subtitle"]);
  });
}

await transaction.commit({ visibility: "async" });
console.log("Project title fields migrated to clientName/projectName.");
