import type { RichTextToken } from "@/components/ui/rich-text";

export const PLACEHOLDER_IMAGE = "/placeholder-image.png";
export const PLACEHOLDER_ALT = "Placeholder image";

export const placeholderText = {
  title: "Placeholder title",
  subtitle: "Placeholder subtitle",
  body: "Placeholder text.",
  cta: "Placeholder CTA >",
  label: "Placeholder label",
  item: "Placeholder item",
  name: "Placeholder name",
  role: "Placeholder role",
  year: "0000",
};

export const placeholderRichText = [
  [{ text: placeholderText.title }],
] satisfies RichTextToken[][];

export const placeholderBodyRichText = [
  [{ text: placeholderText.body }],
] satisfies RichTextToken[][];

export const placeholderTwoLineRichText = [
  [{ text: `${placeholderText.title}\n${placeholderText.subtitle}` }],
] satisfies RichTextToken[][];
