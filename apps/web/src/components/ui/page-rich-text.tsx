import { PortableRichText } from "@/components/ui/portable-rich-text";
import { StructuredRichText, type RichTextToken } from "@/components/ui/rich-text";
import type { PortableRichTextValue } from "@/lib/sanity/queries";

// Renders editorial copy from Sanity (Portable Text / legacy string) and falls
// back to a local dictionary RichTextToken value when the Sanity field is empty.
// Shared by the home / services / about pages during the dictionary → Sanity
// migration.
export function hasPortableText(
  value: PortableRichTextValue | undefined,
): value is Exclude<PortableRichTextValue, null> {
  return Boolean(value && (!Array.isArray(value) || value.length > 0));
}

type PageRichTextProps = {
  as?: "p" | "h1" | "h2" | "h3" | "span";
  className?: string;
  value: PortableRichTextValue | undefined;
  fallback: RichTextToken[][];
};

export function PageRichText({
  as = "p",
  className,
  value,
  fallback,
}: PageRichTextProps) {
  if (hasPortableText(value)) {
    return <PortableRichText as={as} blocks={value} className={className} />;
  }

  return <StructuredRichText as={as} lines={fallback} className={className} />;
}
