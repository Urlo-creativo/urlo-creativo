import type { SanityImageSource } from "@sanity/image-url";

export type SanityClient = {
  _id: string;
  name: string;
  logo: SanityImageSource;
  url?: string;
  order?: number;
};

export const clientsQuery = `*[_type == "client"] | order(order asc) {
  _id,
  name,
  logo,
  url
}`;

// ---------------------------------------------------------------------------
// Projects
// ---------------------------------------------------------------------------

// Category values + labels have a single source of truth in `./categories`.
// Re-exported here so existing imports from "@/lib/sanity/queries" keep working.
export {
  CATEGORIES,
  CATEGORY_ORDER,
  categoryLabel,
  categoryLabelsFor,
  getCategoryOptions,
} from "./categories";
export type {
  CategoryLabels,
  CategoryOption,
  CategoryValue,
} from "./categories";

/** Resolved image shape returned by the queries below. */
export type SanityImage = {
  alt: string | null;
  hotspot?: { x: number; y: number } | null;
  crop?: { top: number; bottom: number; left: number; right: number } | null;
  asset: {
    _id: string;
    url: string;
    metadata: {
      dimensions: { width: number; height: number; aspectRatio: number };
      lqip?: string;
    };
  } | null;
};

// Portable Text resolved from a `localizedRichText` field. Blocks are simple
// paragraphs whose spans may carry `strong` / `em` decorators or reference a
// `highlight` annotation in `markDefs`.
export type PortableSpan = {
  _key: string;
  _type: "span";
  text: string;
  marks?: string[];
};

export type HighlightMarkDef = {
  _key: string;
  _type: "highlight";
  color?: "blue" | "coral" | "orange" | "pink" | "yellow";
  trigger?: "load" | "scroll" | "static";
};

export type PortableBlock = {
  _key: string;
  _type: "block";
  style?: string;
  children: PortableSpan[];
  markDefs?: HighlightMarkDef[];
};

export type PortableRichTextValue = PortableBlock[] | string | null;

export type ProjectMediaItem = {
  _key: string;
  mediaType: "image" | "video";
  image: SanityImage | null;
  videoUrl: string | null;
  videoFile: { url: string; mimeType: string | null } | null;
  poster: SanityImage | null;
  caption: string | null;
};

export type ProjectMediaLayout =
  | "oneColumnCollage"
  | "twoColumnGrid"
  | "masonry"
  | "compactThreeColumnGrid";

export type ProjectMediaPlacement =
  | "afterConcept"
  | "afterResponsibilities"
  | "afterOutcome"
  | "behindTheScenes";

export type ProjectMediaSection = {
  _key: string;
  placement: ProjectMediaPlacement;
  internalLabel: string | null;
  layout: ProjectMediaLayout;
  mediaItems: ProjectMediaItem[];
};

export type ProjectCredit = {
  _key: string;
  role: string;
  name: string | null;
  handle: string | null;
  url: string | null;
};

export type HomePageContent = {
  heroKicker: PortableRichTextValue;
  heroTitle: PortableRichTextValue;
  heroSubheading: PortableRichTextValue;
  mission: PortableRichTextValue;
  potentialTitle: PortableRichTextValue;
  methodSteps: Array<{
    _key: string;
    title: string;
    items: string[] | null;
  }> | null;
  methodologyLabel: PortableRichTextValue;
  methodology: PortableRichTextValue;
  projectsTitle: PortableRichTextValue;
  selectedClients: PortableRichTextValue;
  teamTitle: PortableRichTextValue;
  teamIntro: PortableRichTextValue;
};

export type ProjectListItem = {
  _id: string;
  clientName: string;
  projectName: string | null;
  slug: string;
  year: string | null;
  categories: string[] | null;
  excerpt: string | null;
  coverImage: SanityImage | null;
  featured: boolean | null;
};

export type Project = ProjectListItem & {
  titleGraphic: SanityImage | null;
  season: string | null;
  roles: string[] | null;
  heroMedia: ProjectMediaItem | null;
  challenge: PortableRichTextValue;
  concept: PortableRichTextValue;
  process: PortableRichTextValue;
  responsibilities: string[] | null;
  outcome: PortableRichTextValue;
  credits: ProjectCredit[] | null;
  projectContentSections: ProjectMediaSection[] | null;
};

// Shared GROQ fragments -----------------------------------------------------

const localizedValue = (field: string) => `"${field}": select(
  ${field}._type == "localizedString" || ${field}._type == "localizedText" || ${field}._type == "localizedRichText" =>
    coalesce(${field}[$locale], ${field}[$fallbackLocale], ${field}.it, ${field}.en),
  ${field}
)`;

const localizedValueWithFallback = (field: string, fallbackField: string) => `"${field}": select(
  defined(${field}) && (${field}._type == "localizedString" || ${field}._type == "localizedText" || ${field}._type == "localizedRichText") =>
    coalesce(${field}[$locale], ${field}[$fallbackLocale], ${field}.it, ${field}.en),
  defined(${field}) => ${field},
  defined(${fallbackField}) && (${fallbackField}._type == "localizedString" || ${fallbackField}._type == "localizedText" || ${fallbackField}._type == "localizedRichText") =>
    coalesce(${fallbackField}[$locale], ${fallbackField}[$fallbackLocale], ${fallbackField}.it, ${fallbackField}.en),
  ${fallbackField}
)`;

const localizedArray = (field: string) => `"${field}": ${field}[]{
  "value": select(
    @._type == "localizedString" || @._type == "localizedText" =>
      coalesce(@[$locale], @[$fallbackLocale], @.it, @.en),
    @
  )
}.value`;

const imageFragment = `{
  "alt": select(
    alt._type == "localizedString" || alt._type == "localizedText" =>
      coalesce(alt[$locale], alt[$fallbackLocale], alt.it, alt.en),
    alt
  ),
  hotspot,
  crop,
  asset->{
    _id,
    url,
    metadata { dimensions, lqip }
  }
}`;

const mediaItemFragment = `{
  _key,
  mediaType,
  image ${imageFragment},
  videoUrl,
  "videoFile": videoFile.asset->{ url, mimeType },
  poster ${imageFragment},
  ${localizedValue("caption")}
}`;

const mediaSectionFragment = `{
  _key,
  placement,
  internalLabel,
  layout,
  mediaItems[] ${mediaItemFragment}
}`;

const listFields = `
  _id,
  ${localizedValueWithFallback("clientName", "title")},
  ${localizedValueWithFallback("projectName", "subtitle")},
  "slug": slug.current,
  year,
  categories,
  ${localizedValue("excerpt")},
  coverImage ${imageFragment},
  featured
`;

export const projectsListQuery = `*[_type == "project" && defined(slug.current)]
  | order(order asc, year desc) {
  ${listFields}
}`;

export const featuredProjectsQuery = `*[_type == "project" && featured == true && defined(slug.current)]
  | order(order asc, year desc) {
  ${listFields}
}`;

export const projectBySlugQuery = `*[_type == "project" && slug.current == $slug][0]{
  ${listFields},
  titleGraphic ${imageFragment},
  season,
  ${localizedArray("roles")},
  heroMedia ${mediaItemFragment},
  ${localizedValue("challenge")},
  ${localizedValue("concept")},
  ${localizedValue("process")},
  ${localizedArray("responsibilities")},
  ${localizedValue("outcome")},
  credits[]{
    _key,
    ${localizedValue("role")},
    name,
    handle,
    url
  },
  projectContentSections[] ${mediaSectionFragment}
}`;

export const projectSlugsQuery = `*[_type == "project" && defined(slug.current)].slug.current`;

export const homePageQuery = `*[_id == "homePage"][0]{
  ${localizedValue("heroKicker")},
  ${localizedValue("heroTitle")},
  ${localizedValue("heroSubheading")},
  ${localizedValue("mission")},
  ${localizedValue("potentialTitle")},
  methodSteps[]{
    _key,
    ${localizedValue("title")},
    ${localizedArray("items")}
  },
  ${localizedValue("methodologyLabel")},
  ${localizedValue("methodology")},
  ${localizedValue("projectsTitle")},
  ${localizedValue("selectedClients")},
  ${localizedValue("teamTitle")},
  ${localizedValue("teamIntro")}
}`;
