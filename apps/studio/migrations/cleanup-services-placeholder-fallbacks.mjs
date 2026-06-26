import { getCliClient } from "sanity/cli";

const apiVersion = process.env.SANITY_API_VERSION || "2026-06-18";
const client = getCliClient({ apiVersion }).withConfig({
  perspective: "raw",
  useCdn: false,
});
const shouldWrite = process.env.CLEANUP_SERVICES_PLACEHOLDERS_WRITE === "1";

const staleDetails = await client.fetch(`*[_id == "servicesPage"][0]{
  "detailsText": items[_key == "design-product-development"][0].detailsText,
  "details": items[_key == "design-product-development"][0].details,
  "legacyDetailGroupItems": items[_key == "brand-identity"][0].detailGroups[]{
    _key,
    items
  }[defined(items)]
}`);

console.log("Current 02 service seeded details:", JSON.stringify(staleDetails, null, 2));

if (!shouldWrite) {
  console.log(
    "No writes performed. Run `npm run cleanup:services-placeholders:write` from the repository root to remove these seeded detail fields.",
  );
  process.exit(0);
}

await client
  .patch("servicesPage")
  .unset([
    "statement",
    'items[_key=="brand-identity"].detailGroups[_key=="brand-strategy"].items',
    'items[_key=="brand-identity"].detailGroups[_key=="visual-identity"].items',
    'items[_key=="brand-identity"].detailGroups[_key=="communication"].items',
    'items[_key=="design-product-development"].detailsText',
    'items[_key=="design-product-development"].details',
    'items[_key=="styling-shooting-art-direction"].details',
    'items[_key=="styling-shooting-art-direction"].galleryLabels',
  ])
  .commit({ visibility: "async" });

console.log("Removed seeded detail fields from service 02.");
