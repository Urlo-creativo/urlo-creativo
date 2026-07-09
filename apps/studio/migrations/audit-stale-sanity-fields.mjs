import { getCliClient } from "sanity/cli";

const apiVersion = process.env.SANITY_API_VERSION || "2026-06-18";
const client = getCliClient({ apiVersion }).withConfig({
  perspective: "raw",
  useCdn: false,
});

const systemFields = new Set([
  "_id",
  "_type",
  "_createdAt",
  "_updatedAt",
  "_rev",
  "_system",
]);

const topLevelFields = {
  homePage: new Set([
    "heroKicker",
    "heroMedia",
    "heroGradientOverlayEnabled",
    "heroTextColor",
    "heroTitle",
    "heroSubheading",
    "mission",
    "potentialTitle",
    "methodSteps",
    "methodologyLabel",
    "methodology",
    "projectsTitle",
    "selectedClients",
    "teamTitle",
    "teamImage",
    "teamIntro",
  ]),
  servicesPage: new Set(["title", "items", "collaborationTitle", "collaboration"]),
  aboutPage: new Set([
    "title",
    "intro",
    "heroImage",
    "statement",
    "teamCoreTitle",
    "coreRoles",
    "processTitle",
    "processSteps",
    "missionTitle",
    "mission",
    "missionImage",
    "missionHighlight",
    "historyTitle",
    "historyImage",
    "historyItems",
    "peopleTitle",
  ]),
  person: new Set(["name", "role", "photo", "order"]),
  client: new Set(["name", "logo", "url", "order"]),
  project: new Set([
    "clientName",
    "projectName",
    "titleGraphic",
    "slug",
    "year",
    "season",
    "categories",
    "roles",
    "excerpt",
    "coverImage",
    "heroMedia",
    "challenge",
    "concept",
    "process",
    "responsibilities",
    "outcome",
    "projectContentSections",
    "credits",
    "featured",
    "order",
  ]),
};

const serviceItemFields = new Set([
  "_key",
  "_type",
  "number",
  "title",
  "previewImage",
  "variant",
  "detailGroups",
  "detailsText",
  "media",
  "statement",
  "statementImage",
  "gallery",
]);

const serviceVariantFields = {
  structured: new Set([
    "_key",
    "_type",
    "number",
    "title",
    "previewImage",
    "variant",
    "detailGroups",
    "statement",
    "statementImage",
  ]),
  media: new Set([
    "_key",
    "_type",
    "number",
    "title",
    "previewImage",
    "variant",
    "detailsText",
    "media",
    "statement",
  ]),
  gallery: new Set([
    "_key",
    "_type",
    "number",
    "title",
    "previewImage",
    "variant",
    "statement",
    "gallery",
  ]),
};

const detailGroupFields = new Set(["_key", "_type", "title", "itemsText"]);
const galleryItemFields = new Set(["_key", "_type", "label", "image", "alt"]);

function unknownKeys(value, allowed) {
  if (!value || typeof value !== "object") return [];
  return Object.keys(value).filter(
    (key) => !systemFields.has(key) && !allowed.has(key),
  );
}

function report(issue, details) {
  console.log(JSON.stringify({ issue, ...details }));
}

const docs = await client.fetch(
  `*[_type in ["homePage", "servicesPage", "aboutPage", "person", "client", "project"]]`,
);

for (const doc of docs) {
  const allowed = topLevelFields[doc._type];
  if (!allowed) continue;

  for (const field of unknownKeys(doc, allowed)) {
    report("unknownTopLevelField", {
      documentId: doc._id,
      documentType: doc._type,
      path: field,
    });
  }

  if (doc._type !== "servicesPage") continue;

  for (const [itemIndex, item] of (doc.items ?? []).entries()) {
    for (const field of unknownKeys(item, serviceItemFields)) {
      report("unknownServiceItemField", {
        documentId: doc._id,
        itemIndex,
        itemKey: item?._key,
        path: `items[${itemIndex}].${field}`,
      });
    }

    const variantAllowed = serviceVariantFields[item?.variant];
    if (variantAllowed) {
      for (const field of unknownKeys(item, variantAllowed)) {
        report("hiddenByServiceVariant", {
          documentId: doc._id,
          itemIndex,
          itemKey: item?._key,
          variant: item?.variant,
          path: `items[${itemIndex}].${field}`,
        });
      }
    }

    for (const [groupIndex, group] of (item?.detailGroups ?? []).entries()) {
      for (const field of unknownKeys(group, detailGroupFields)) {
        report("unknownServiceDetailGroupField", {
          documentId: doc._id,
          itemIndex,
          itemKey: item?._key,
          groupIndex,
          groupKey: group?._key,
          path: `items[${itemIndex}].detailGroups[${groupIndex}].${field}`,
        });
      }
    }

    for (const [galleryIndex, galleryItem] of (item?.gallery ?? []).entries()) {
      for (const field of unknownKeys(galleryItem, galleryItemFields)) {
        report("unknownServiceGalleryItemField", {
          documentId: doc._id,
          itemIndex,
          itemKey: item?._key,
          galleryIndex,
          galleryKey: galleryItem?._key,
          path: `items[${itemIndex}].gallery[${galleryIndex}].${field}`,
        });
      }
    }
  }
}
