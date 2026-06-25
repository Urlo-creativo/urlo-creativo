import { getCliClient } from "sanity/cli";

const apiVersion = process.env.SANITY_API_VERSION || "2026-06-18";
const client = getCliClient({ apiVersion }).withConfig({
  perspective: "raw",
  useCdn: false,
});
const shouldWrite = process.env.MIGRATE_SERVICES_GALLERY_ITEMS_WRITE === "1";

const doc = await client.fetch(`*[_id == "servicesPage"][0]{
  _id,
  items
}`);

if (!doc) {
  console.log("No servicesPage document found.");
  process.exit(0);
}

let changed = false;
const items = (doc.items ?? []).map((item) => {
  if (item?.variant !== "gallery") return item;

  const labels = item.galleryLabels ?? [];
  const existingGallery = item.gallery ?? [];
  const gallery = existingGallery.length
    ? existingGallery
    : labels.map((label, index) => ({
        _key: `gallery-${index}`,
        _type: "object",
        label,
      }));

  changed = changed || labels.length > 0 || item.details?.length > 0;

  const { details, galleryLabels, ...nextItem } = item;
  return {
    ...nextItem,
    gallery,
  };
});

if (!changed) {
  console.log("No services gallery items need migration.");
  process.exit(0);
}

console.log(
  `${shouldWrite ? "Migrating" : "Dry run:"} services gallery labels into gallery items.`,
);

if (!shouldWrite) {
  console.log(
    "No writes performed. Run `npm run migrate:services-gallery-items:write` from the repository root to migrate data.",
  );
  process.exit(0);
}

await client.patch("servicesPage").set({ items }).commit({ visibility: "async" });
console.log("Services gallery items migrated.");
