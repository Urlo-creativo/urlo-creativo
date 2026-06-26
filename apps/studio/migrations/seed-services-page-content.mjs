import { createReadStream, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { getCliClient } from "sanity/cli";

const apiVersion = process.env.SANITY_API_VERSION || "2026-06-18";
const client = getCliClient({ apiVersion }).withConfig({
  perspective: "raw",
  useCdn: false,
});
const shouldWrite = process.env.SEED_SERVICES_PAGE_WRITE === "1";
const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(scriptDir, "../../web/public");

const highlightMarks = {
  scroll: {
    blue: "highlightBlue",
    coral: "highlightCoral",
    orange: "highlightOrange",
    pink: "highlightPink",
    yellow: "highlightYellow",
  },
  load: {
    blue: "highlightLoadBlue",
    coral: "highlightLoadCoral",
    orange: "highlightLoadOrange",
    pink: "highlightLoadPink",
    yellow: "highlightLoadYellow",
  },
};

function highlightMarkFor(token) {
  if (!token.highlight) return null;
  const trigger = token.trigger === "scroll" ? "scroll" : "load";
  return highlightMarks[trigger][token.highlight];
}

function span(token, spanIndex) {
  const marks = [
    token.bold ? "strong" : null,
    token.italic ? "em" : null,
    highlightMarkFor(token),
  ].filter(Boolean);

  return {
    _key: `span-${spanIndex}`,
    _type: "span",
    text: token.text,
    marks,
  };
}

function tokensToBlocks(lines) {
  const blocks = [];
  let blockIndex = 0;
  let spanIndex = 0;

  for (const line of lines) {
    blocks.push({
      _key: `block-${blockIndex++}`,
      _type: "block",
      style: "normal",
      markDefs: [],
      children: line.length
        ? line.map((token) => span(token, spanIndex++))
        : [{ _key: `span-${spanIndex++}`, _type: "span", text: "", marks: [] }],
    });
  }

  return blocks;
}

function localizedRichText({ it, en }) {
  return {
    _type: "localizedRichText",
    it: tokensToBlocks(it),
    en: tokensToBlocks(en),
  };
}

function localizedString({ it, en }) {
  return {
    _type: "localizedString",
    it,
    en,
  };
}

function localizedText({ it, en }) {
  return {
    _type: "localizedText",
    it,
    en,
  };
}

function sameString(value) {
  return localizedString({ it: value, en: value });
}

function sameText(value) {
  return localizedText({ it: value, en: value });
}

function sameRichText(lines) {
  return localizedRichText({ it: lines, en: lines });
}

async function uploadedImage(relativePath, alt = "") {
  const filePath = path.join(publicDir, relativePath);
  const fallbackPath = path.join(publicDir, "placeholder-image.png");
  const uploadPath = existsSync(filePath) ? filePath : fallbackPath;

  if (!existsSync(uploadPath)) {
    throw new Error(`Missing image file: ${filePath}`);
  }

  const asset = await client.assets.upload("image", createReadStream(uploadPath), {
    filename: path.basename(uploadPath),
  });

  return {
    _type: "image",
    asset: { _type: "reference", _ref: asset._id },
    alt: sameString(alt),
  };
}

const content = {
  title: sameRichText([[{ text: "SERVICES" }]]),
  items: [
    {
      _key: "brand-identity",
      _type: "object",
      number: "01",
      title: sameString("Brand Identity & Communication"),
      variant: "structured",
      statement: sameRichText([
        [
          { text: "We " },
          { text: "identify", highlight: "blue", trigger: "load" },
          { text: " the brand and define its " },
          { text: "personality.", highlight: "pink", trigger: "load" },
        ],
      ]),
      detailGroups: [
        {
          _key: "brand-strategy",
          _type: "object",
          title: sameRichText([
            [{ text: "Brand strategy", highlight: "blue", trigger: "load" }],
          ]),
          itemsText: sameText(
            [
              "Brand analysis and context",
              "Positioning definition",
              "Tone of voice construction",
            ].join("\n"),
          ),
          items: [
            sameString("Brand analysis and context"),
            sameString("Positioning definition"),
            sameString("Tone of voice construction"),
          ],
        },
        {
          _key: "visual-identity",
          _type: "object",
          title: sameRichText([
            [{ text: "Visual identity", highlight: "pink", trigger: "load" }],
          ]),
          itemsText: sameText(
            ["Logo development", "Visual systems", "Guidelines", "Brand book"].join(
              "\n",
            ),
          ),
          items: [
            sameString("Logo development"),
            sameString("Visual systems"),
            sameString("Guidelines"),
            sameString("Brand book"),
          ],
        },
        {
          _key: "communication",
          _type: "object",
          title: sameRichText([
            [{ text: "Communication", highlight: "yellow", trigger: "load" }],
          ]),
          itemsText: sameText(
            [
              "Website",
              "Newsletter",
              "Editorial content",
              "Digital and social communication",
            ].join("\n"),
          ),
          items: [
            sameString("Website"),
            sameString("Newsletter"),
            sameString("Editorial content"),
            sameString("Digital and social communication"),
          ],
        },
      ],
    },
    {
      _key: "design-product-development",
      _type: "object",
      number: "02",
      title: sameString("Design & Product Development"),
      variant: "media",
      detailsText: sameText(
        "Placeholder item",
      ),
      details: [
        sameString("Placeholder item"),
      ],
      media: {
        _type: "object",
        alt: sameString(""),
      },
      statement: sameRichText([
        [
          { text: "We " },
          { text: "design", highlight: "pink", trigger: "load" },
          { text: " collections," },
        ],
        [
          { text: "from the " },
          { text: "idea", bold: true },
          { text: " to " },
          { text: "product", bold: true },
        ],
        [{ text: "development.", bold: true }],
      ]),
    },
    {
      _key: "styling-shooting-art-direction",
      _type: "object",
      number: "03",
      title: sameString("Styling / Shooting & Art Direction"),
      variant: "gallery",
      statement: sameRichText([
        [
          { text: "We ", bold: true, italic: true },
          {
            text: "define",
            bold: true,
            italic: true,
            highlight: "coral",
            trigger: "load",
          },
          { text: " the brand’s", bold: true, italic: true },
        ],
        [{ text: "visual identity.", bold: true, italic: true }],
      ]),
      gallery: [
        { _key: "production", _type: "object", label: sameString("PRODUCTION") },
        {
          _key: "art-direction",
          _type: "object",
          label: sameString("ART DIRECTION"),
        },
        { _key: "styling", _type: "object", label: sameString("STYLING") },
        {
          _key: "photo-video",
          _type: "object",
          label: sameString("PHOTO AND VIDEO SHOOTINGS"),
        },
      ],
    },
  ],
  collaborationTitle: sameRichText([
    [{ text: "Collaboration", highlight: "coral", trigger: "load" }],
  ]),
  collaboration: sameRichText([
    [
      {
        text: "We suggest the right atmospheres, settings and faces for launch shootings.",
      },
    ],
  ]),
};

console.log(
  `${shouldWrite ? "Seeding" : "Dry run:"} services page content fields: ${Object.keys(
    content,
  ).join(", ")}`,
);

if (!shouldWrite) {
  console.log(
    "No writes performed. Run `npm run seed:services-page:write` from the repository root to write missing fields.",
  );
  process.exit(0);
}

await client.createIfNotExists({
  _id: "servicesPage",
  _type: "servicesPage",
});

await client.patch("servicesPage").setIfMissing(content).commit({
  visibility: "async",
});

const hasStatementImage = await client.fetch(
  `defined(*[_id == "servicesPage"][0].items[_key == "brand-identity"][0].statementImage.asset._ref)`,
);
const statementPatchFields = {
  'items[_key=="brand-identity"].statement': content.items[0].statement,
  'items[_key=="brand-identity"].detailGroups[_key=="brand-strategy"].itemsText':
    content.items[0].detailGroups[0].itemsText,
  'items[_key=="brand-identity"].detailGroups[_key=="visual-identity"].itemsText':
    content.items[0].detailGroups[1].itemsText,
  'items[_key=="brand-identity"].detailGroups[_key=="communication"].itemsText':
    content.items[0].detailGroups[2].itemsText,
  'items[_key=="design-product-development"].detailsText':
    content.items[1].detailsText,
};

if (!hasStatementImage) {
  statementPatchFields['items[_key=="brand-identity"].statementImage'] =
    await uploadedImage("placeholder-image.png");
}

await client
  .patch("servicesPage")
  .setIfMissing(statementPatchFields)
  .unset(["statement"])
  .commit({ visibility: "async" });

console.log("Services page content seeded to Sanity.");
