import { createReadStream, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { getCliClient } from "sanity/cli";

const apiVersion = process.env.SANITY_API_VERSION || "2026-06-18";
const client = getCliClient({ apiVersion }).withConfig({
  perspective: "raw",
  useCdn: false,
});
const shouldWrite = process.env.SEED_HOME_PAGE_WRITE === "1";
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
  heroKicker: localizedRichText({
    it: [[{ text: "URLO CREATIVO È UN HUB MULTIDISCIPLINARE\nidentità di brand · design · sviluppo prodotto · art direction" }]],
    en: [[{ text: "URLO CREATIVO IS A MULTIDISCIPLINARY STUDIO\nbrand identity • design • product development • art direction" }]],
  }),
  heroMedia: {
    _type: "projectMediaItem",
    mediaType: "image",
    image: await uploadedImage("placeholder-image.png"),
  },
  heroGradientOverlayEnabled: true,
  heroTextColor: "white",
  heroTitle: localizedRichText({
    it: [[{ text: "URLO CREATIVO" }]],
    en: [[{ text: "URLO CREATIVO" }]],
  }),
  heroSubheading: localizedRichText({
    it: [[{ text: "DOVE I BRAND PRENDONO FORMA" }]],
    en: [[{ text: "WHERE BRANDS TAKE SHAPE" }]],
  }),
  mission: localizedRichText({
    it: [
      [
        {
          text: "Aiutiamo i brand a costruire identità, prodotti ed esperienze che le persone possano riconoscere, vivere e ricordare.\n\nAttraverso ",
        },
        {
          text: "strategia, design, sviluppo prodotto e comunicazione.",
          bold: true,
        },
      ],
    ],
    en: [
      [
        { text: "Urlo Creativo is a " },
        { text: "multidisciplinary creative agency", bold: true },
        { text: " dedicated to bringing out the " },
        { text: "full potential", bold: true },
        { text: " of brands." },
      ],
    ],
  }),
  potentialTitle: localizedRichText({
    it: [
      [
        { text: " DAL ", bold: true },
        { text: "POTENZIALE", bold: true, highlight: "pink" },
      ],
      [
        { text: "ALLA ", bold: true },
        { text: "FORMA", italic: true, highlight: "yellow" },
      ],
    ],
    en: [
      [
        { text: "EVERY", bold: true, highlight: "pink" },
        { text: " BRAND", bold: true },
      ],
      [
        { text: "HAS A ", bold: true },
        { text: "POTENTIAL", italic: true, highlight: "yellow" },
      ],
    ],
  }),
  methodSteps: [
    {
      _key: "identify",
      _type: "object",
      title: localizedString({ it: "1.IDENTIFICARE", en: "1.IDENTIFY" }),
      items: [
        localizedString({
          it: "Cosa guida il brand",
          en: "What drives the brand",
        }),
        localizedString({
          it: "Dove vuole andare",
          en: "Where it wants to go",
        }),
        localizedString({
          it: "A chi si vuole rivolgere",
          en: "Who it wants to speak to",
        }),
      ],
    },
    {
      _key: "define",
      _type: "object",
      title: localizedString({ it: "2.DEFINE", en: "2.DEFINE" }),
      items: [
        localizedString({ it: "Identità visiva", en: "Visual identity" }),
        localizedString({ it: "Identità verbale", en: "Verbal identity" }),
        localizedString({
          it: "Posizionamento strategico",
          en: "Strategic positioning",
        }),
      ],
    },
    {
      _key: "express",
      _type: "object",
      title: localizedString({ it: "3.ESPRIMERE", en: "3.EXPRESS" }),
      items: [
        localizedString({
          it: "Design e sviluppo del prodotto",
          en: "Product development",
        }),
        localizedString({ it: "Comunicazione", en: "Communication" }),
        localizedString({ it: "Presenza digitale", en: "Digital presence" }),
      ],
    },
  ],
  methodologyLabel: localizedRichText({
    it: [[{ text: "Il nostro metodo", highlight: "yellow" }]],
    en: [[{ text: "Methodology", highlight: "yellow" }]],
  }),
  methodology: localizedRichText({
    it: [
      [
        {
          text: "Ogni progetto riunisce prospettive, competenze e discipline diverse.\n\n",
          bold: true,
        },
        {
          text: " Non seguiamo una formula fissa, ma costruiamo il team attorno alle esigenze del brand, creando una direzione condivisa che guidi il processo in ogni sua fase. \n\n",
        },
        {
          text: "Lavoriamo a stretto contatto con i nostri clienti: questo ci aiuta a ",
        },
        { text: "far emergere l’unicità del brand ", bold: true },
        { text: "e a meglio valorizzarla.\n\n" },
        { text: "Così nasce un " },
        { text: "ecosistema coerente", bold: true },
        {
          text: ", in cui ciò che un brand dice, crea e mostra diventa parte della stessa storia.",
        },
      ],
    ],
    en: [
      [
        { text: "At " },
        { text: "Urlo Creativo,", bold: true },
        { text: " we start by understanding each " },
        { text: "brand's context", bold: true },
        { text: ", " },
        { text: "goals", bold: true },
        { text: ", and " },
        { text: "audience", bold: true },
        { text: " to uncover its core " },
        { text: "potential", bold: true },
        {
          text: ". We then define a clear positioning and build a coherent identity that guides every creative decision. Through a flexible, ",
        },
        { text: "multidisciplinary", bold: true },
        {
          text: " approach, we transform strategy into visuals, products, and communication, supporting brands with solutions that evolve over time.",
        },
      ],
    ],
  }),
  projectsTitle: localizedRichText({
    it: [[{ text: "ALCUNI PROGETTI" }]],
    en: [[{ text: "PROJECTS" }]],
  }),
  selectedClients: localizedRichText({
    it: [
      [
        { text: "LA SELEZIONE DEI ", bold: true },
        { text: "CLIENTI", italic: true },
      ],
    ],
    en: [
      [
        { text: "SELECTED", bold: true },
        { text: " " },
        { text: "CLIENTS", italic: true },
      ],
    ],
  }),
  teamTitle: localizedRichText({
    it: [[{ text: "LE PERSONE" }]],
    en: [[{ text: "PEOPLE" }]],
  }),
  teamImage: await uploadedImage("placeholder-image.png"),
  teamIntro: localizedRichText({
    it: [
      [
        { text: "Urlo Creativo è una " },
        {
          text: "rete connessa di professioniste indipendenti.\n\n",
          bold: true,
          highlight: "orange",
        },
        {
          text: "Ogni membro porta con sé un background, una prospettiva e un’area di competenza diversa, dando vita a un ",
        },
        {
          text: "collettivo che cresce\t ed evolve attraverso la collaborazione.",
          bold: true,
        },
      ],
    ],
    en: [
      [
        {
          text: "Urlo Creativo is proudly powered by women in bonded.",
          highlight: "orange",
        },
        {
          text: " In an industry where female voices are still underrepresented, we bring together a diverse network of creative professionals who lead with vision, sensitivity, and strength. Our approach is collaborative, intuitive, and driven by a shared commitment to shaping meaningful and impactful brands.",
        },
      ],
    ],
  }),
};

console.log(
  `${shouldWrite ? "Seeding" : "Dry run:"} homepage content fields: ${Object.keys(
    content,
  ).join(", ")}`,
);

if (!shouldWrite) {
  console.log(
    "No writes performed. Run `npm run seed:home-page:write` from the repository root to write missing fields.",
  );
  process.exit(0);
}

await client.createIfNotExists({
  _id: "homePage",
  _type: "homePage",
});

await client.patch("homePage").setIfMissing(content).commit({
  visibility: "async",
});

console.log("Homepage content seeded to Sanity.");
