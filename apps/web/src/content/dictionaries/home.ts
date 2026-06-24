import type { RichTextToken } from "@/components/ui/rich-text";

// ⚠️ IT — Italian copy. Currently an English placeholder; translate each string.
const homeIt = {
  // buttons
  contactCta: "Prenota una consulenza >",
  discoverServices: "Scopri i servizi >",
  seeAllProjects: "Guarda tutti i progetti >",
  whatWeDo: "What we do",
  learnMore: "Scopri di più >",
  // Sanity content
  heroKicker: [
    [{ text: "Lorem ipsum\nDolor sit amet" }],
  ] satisfies RichTextToken[][],
  heroTitle: [
    [{ text: "Lorem ipsum" }],
  ] satisfies RichTextToken[][],
  heroSubheading: [
    [{ text: "Dolor sit amet" }],
  ] satisfies RichTextToken[][],
  mission: [
    [{ text: "Lorem ipsum dolor sit amet." }],
  ] satisfies RichTextToken[][],
  potentialTitle: [
    [{ text: "Lorem" }],
    [{ text: "Ipsum" }],
  ] satisfies RichTextToken[][],
  method: {
    identify: {
      title: "1.LOREM",
      items: ["Lorem ipsum", "Dolor sit", "Amet"],
    },
    define: {
      title: "2.IPSUM",
      items: ["Lorem ipsum", "Dolor sit", "Amet"],
    },
    express: {
      title: "3.DOLOR",
      items: ["Lorem ipsum", "Dolor sit", "Amet"],
    },
  },
  projectsTitle: [
    [{ text: "Lorem ipsum" }],
  ] satisfies RichTextToken[][],
  methodologyLabel: [
    [{ text: "Lorem ipsum" }],
  ] satisfies RichTextToken[][],
  methodology: [
    [{ text: "Lorem ipsum dolor sit amet." }],
  ] satisfies RichTextToken[][],
  selectedClients: [
    [{ text: "Lorem ipsum" }],
  ] satisfies RichTextToken[][],
  teamTitle: [
    [{ text: "Lorem ipsum" }],
  ] satisfies RichTextToken[][],
  teamIntro: [
    [{ text: "Lorem ipsum dolor sit amet." }],
  ] satisfies RichTextToken[][],
};

// EN — English copy.
const homeEn = {
  // buttons
  contactCta: "Contact",
  discoverServices: "Discover our services",
  seeAllProjects: "See all projects",
  whatWeDo: "What we do",
  learnMore: "Learn More",
  // Sanity content
  heroKicker: [
    [{ text: "Lorem ipsum\nDolor sit amet" }],
  ] satisfies RichTextToken[][],
  heroTitle: [
    [{ text: "Lorem ipsum" }],
  ] satisfies RichTextToken[][],
  heroSubheading: [
    [{ text: "Dolor sit amet" }],
  ] satisfies RichTextToken[][],
  mission: [
    [{ text: "Lorem ipsum dolor sit amet." }],
  ] satisfies RichTextToken[][],
  potentialTitle: [
    [{ text: "Lorem" }],
    [{ text: "Ipsum" }],
  ] satisfies RichTextToken[][],
  method: {
    identify: {
      title: "1.LOREM",
      items: ["Lorem ipsum", "Dolor sit", "Amet"],
    },
    define: {
      title: "2.IPSUM",
      items: ["Lorem ipsum", "Dolor sit", "Amet"],
    },
    express: {
      title: "3.DOLOR",
      items: ["Lorem ipsum", "Dolor sit", "Amet"],
    },
  },
  projectsTitle: [
    [{ text: "Lorem ipsum" }],
  ] satisfies RichTextToken[][],
  methodologyLabel: [
    [{ text: "Lorem ipsum" }],
  ] satisfies RichTextToken[][],
  methodology: [
    [{ text: "Lorem ipsum dolor sit amet." }],
  ] satisfies RichTextToken[][],
  selectedClients: [
    [{ text: "Lorem ipsum" }],
  ] satisfies RichTextToken[][],
  teamTitle: [
    [{ text: "Lorem ipsum" }],
  ] satisfies RichTextToken[][],
  teamIntro: [
    [{ text: "Lorem ipsum dolor sit amet." }],
  ] satisfies RichTextToken[][],
};

export const homeDictionary = { it: homeIt, en: homeEn };
