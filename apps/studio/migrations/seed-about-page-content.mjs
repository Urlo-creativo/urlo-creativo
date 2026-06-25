import { createReadStream, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { getCliClient } from "sanity/cli";

const apiVersion = process.env.SANITY_API_VERSION || "2026-06-18";
const client = getCliClient({ apiVersion }).withConfig({
  perspective: "raw",
  useCdn: false,
});
const shouldWrite = process.env.SEED_ABOUT_PAGE_WRITE === "1";
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
  const trigger = token.trigger === "load" ? "load" : "scroll";
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
  let children = [];

  function pushBlock() {
    blocks.push({
      _key: `block-${blockIndex++}`,
      _type: "block",
      style: "normal",
      markDefs: [],
      children:
        children.length > 0
          ? children
          : [{ _key: `span-${spanIndex++}`, _type: "span", text: "", marks: [] }],
    });
    children = [];
  }

  for (const line of lines) {
    for (const token of line) {
      const parts = token.text.split(/\r?\n/);
      parts.forEach((part, partIndex) => {
        if (partIndex > 0) pushBlock();
        if (part) children.push(span({ ...token, text: part }, spanIndex++));
      });
    }
    pushBlock();
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

function sameString(value) {
  return localizedString({ it: value, en: value });
}

function slugify(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function uploadedImage(relativePath, alt = "") {
  const filePath = path.join(publicDir, relativePath);

  if (!existsSync(filePath)) {
    throw new Error(`Missing image file: ${filePath}`);
  }

  const asset = await client.assets.upload("image", createReadStream(filePath), {
    filename: path.basename(filePath),
  });

  return {
    _type: "image",
    asset: { _type: "reference", _ref: asset._id },
    alt: sameString(alt),
  };
}

const people = [
  {
    name: "Giulia",
    role: "Founder of Urlo Creativo, Graphic Designer, Project Manager",
    photo: "about/giulia.png",
  },
  {
    name: "Federica",
    role: "Graphic Designer, UI/UX Designer",
    photo: "about/federica.png",
  },
  {
    name: "Martina",
    role: "Brand Identity Strategist, Copywriter, UX Writer",
    photo: "about/martina.png",
  },
  {
    name: "Margherita",
    role: "Surface, Colour and Textile Designer",
    photo: "about/margherita.png",
  },
  {
    name: "Valentina",
    role: "Technical Designer and Product Developer",
    photo: "about/valentina.png",
  },
  {
    name: "Camilla",
    role: "Stylist",
    photo: "about/camilla.png",
  },
];

async function buildAboutContent() {
  const coreRoleImages = await Promise.all(
    [
      "about/team-core-1.png",
      "about/team-core-2.png",
      "about/team-core-3.png",
      "about/team-core-4.png",
      "about/team-core-5.png",
    ].map((image) => uploadedImage(image)),
  );

  return {
    title: localizedRichText({
      it: [
        [{ text: "ABOUT THE", bold: true }],
        [{ text: "AGENCY", bold: true, highlight: "yellow", trigger: "load" }],
      ],
      en: [
        [{ text: "ABOUT THE", bold: true }],
        [{ text: "AGENCY", bold: true, highlight: "yellow", trigger: "load" }],
      ],
    }),
    intro: localizedRichText({
      it: [
        [
          {
            text: "Urlo Creativo is a multidisciplinary creative agency dedicated to bringing out the hidden potential of brands. A flexible network of professionals working together depending on each project.",
          },
        ],
      ],
      en: [
        [
          {
            text: "Urlo Creativo is a multidisciplinary creative agency dedicated to bringing out the hidden potential of brands. A flexible network of professionals working together depending on each project.",
          },
        ],
      ],
    }),
    heroImage: await uploadedImage("projects/people-team.jpg"),
    statement: localizedRichText({
      it: [
        [
          { text: "Urlo Creativo", bold: true },
          { text: " is an agency dedicated to bringing out that potential. A " },
          { text: "diverse team", bold: true },
          {
            text: " of professionals operating as an open system, brought together based on the ",
          },
          { text: "project's needs", bold: true },
          { text: "." },
        ],
      ],
      en: [
        [
          { text: "Urlo Creativo", bold: true },
          { text: " is an agency dedicated to bringing out that potential. A " },
          { text: "diverse team", bold: true },
          {
            text: " of professionals operating as an open system, brought together based on the ",
          },
          { text: "project's needs", bold: true },
          { text: "." },
        ],
      ],
    }),
    teamCoreTitle: sameString("TEAM CORE"),
    coreRoles: [
      "Fashion Designer",
      "Copy Writer",
      "Graphic Designer",
      "Stylist",
      "UI/UX Designer and Writer",
    ].map((role, index) => ({
      _key: slugify(role),
      _type: "object",
      role: sameString(role),
      image: coreRoleImages[index],
    })),
    processTitle: sameString("HOW WE WORK"),
    processSteps: [
      ["Discovery", "Brand, context and objective analysis.", "pink"],
      ["Strategy", "Positioning, narrative and communication strategy.", "deepBlue"],
      ["Identity", "Visual and verbal identity system.", "yellow"],
      ["Development", "Design and production of brand materials.", "coral"],
      ["Production", "Execution across all touchpoints.", "blue"],
      ["Growth", "Ongoing support and brand evolution.", "orange"],
    ].map(([stage, description, color]) => ({
      _key: slugify(stage),
      _type: "object",
      stage: sameString(stage),
      description: sameString(description),
      color,
    })),
    missionTitle: sameString("MISSION"),
    mission: localizedRichText({
      it: [
        [
          {
            text: "We love brands with personality. This is why we dig deep to bring it to the surface.",
          },
        ],
      ],
      en: [
        [
          {
            text: "We love brands with personality. This is why we dig deep to bring it to the surface.",
          },
        ],
      ],
    }),
    missionImage: await uploadedImage("about/mission.jpg"),
    missionHighlight: localizedRichText({
      it: [
        [
          {
            text: "WE DEVELOP IDEAS THROUGH WORDS AND IMAGES.",
            bold: true,
            highlight: "yellow",
            trigger: "scroll",
          },
        ],
      ],
      en: [
        [
          {
            text: "WE DEVELOP IDEAS THROUGH WORDS AND IMAGES.",
            bold: true,
            highlight: "yellow",
            trigger: "scroll",
          },
        ],
      ],
    }),
    historyTitle: localizedRichText({
      it: [
        [
          {
            text: "HISTORY/VALUE",
            bold: true,
            highlight: "yellow",
            trigger: "scroll",
          },
        ],
      ],
      en: [
        [
          {
            text: "HISTORY/VALUE",
            bold: true,
            highlight: "yellow",
            trigger: "scroll",
          },
        ],
      ],
    }),
    historyImage: await uploadedImage("about/history-value.png"),
    historyItems: [
      {
        _key: "begin",
        _type: "object",
        label: sameString("Begin"),
        year: "2024",
        description: localizedRichText({
          it: [
            [
              {
                text: "Urlo Creativo was founded as a clothing design studio based on Giulia Peretto's vision. The idea was to ",
              },
              { text: "subvert traditional work methods", bold: true },
              { text: " and create an ecosystem of capable, flexible, and " },
              { text: "ethical people", bold: true },
              { text: "." },
            ],
          ],
          en: [
            [
              {
                text: "Urlo Creativo was founded as a clothing design studio based on Giulia Peretto's vision. The idea was to ",
              },
              { text: "subvert traditional work methods", bold: true },
              { text: " and create an ecosystem of capable, flexible, and " },
              { text: "ethical people", bold: true },
              { text: "." },
            ],
          ],
        }),
      },
      {
        _key: "now",
        _type: "object",
        label: sameString("Now"),
        year: "2026",
        description: localizedRichText({
          it: [
            [
              { text: "Today it is a " },
              { text: "multidisciplinary hub", bold: true },
              { text: " with all the know-how necessary for " },
              { text: "brand development", bold: true },
              { text: "." },
            ],
          ],
          en: [
            [
              { text: "Today it is a " },
              { text: "multidisciplinary hub", bold: true },
              { text: " with all the know-how necessary for " },
              { text: "brand development", bold: true },
              { text: "." },
            ],
          ],
        }),
      },
    ],
    peopleTitle: sameString("PEOPLE"),
  };
}

console.log(
  `${shouldWrite ? "Seeding" : "Dry run:"} about page content and ${people.length} people`,
);

if (!shouldWrite) {
  console.log(
    "No writes performed. Run `npm run seed:about-page:write` from the repository root to write missing fields.",
  );
  process.exit(0);
}

await client.createIfNotExists({
  _id: "aboutPage",
  _type: "aboutPage",
});

const aboutContent = await buildAboutContent();
await client.patch("aboutPage").setIfMissing(aboutContent).commit({
  visibility: "async",
});

let processColorPatch = client.patch("aboutPage");
for (const step of aboutContent.processSteps) {
  processColorPatch = processColorPatch.setIfMissing({
    [`processSteps[_key=="${step._key}"].color`]: step.color,
  });
}
await processColorPatch.commit({ visibility: "async" });

for (const [index, person] of people.entries()) {
  const existing = await client.fetch(
    `*[_type == "person" && name == $name][0]{_id}`,
    { name: person.name },
  );
  const document = {
    _type: "person",
    name: person.name,
    role: sameString(person.role),
    photo: await uploadedImage(person.photo, `Portrait of ${person.name}`),
    order: index + 1,
  };

  if (existing?._id) {
    const { _type, ...missingFields } = document;
    await client.patch(existing._id).setIfMissing(missingFields).commit({
      visibility: "async",
    });
  } else {
    await client.create(document);
  }
}

console.log("About page content and people seeded to Sanity.");
