import { StructuredRichText, type RichTextToken } from "@/components/ui/rich-text";
import type {
  HighlightMarkDef,
  PortableBlock,
  PortableSpan,
} from "@/lib/sanity/queries";

const quickHighlightColors = {
  highlightYellow: "yellow",
  highlightPink: "pink",
  highlightBlue: "blue",
  highlightCoral: "coral",
  highlightOrange: "orange",
} as const;

function getQuickHighlightColor(marks: string[]) {
  const mark = marks.find((item) => item in quickHighlightColors);
  if (!mark) return undefined;
  return quickHighlightColors[mark as keyof typeof quickHighlightColors];
}

// Map a Portable Text span (Bold / Italic / Highlight marks) onto the shared
// RichTextToken shape so Sanity rich text renders through the same
// StructuredRichText pipeline used across the site.
function spanToToken(
  span: PortableSpan,
  markDefsByKey: Map<string, HighlightMarkDef>,
): RichTextToken {
  const marks = span.marks ?? [];
  const highlight = marks
    .map((mark) => markDefsByKey.get(mark))
    .find((markDef) => markDef?._type === "highlight");
  const quickHighlightColor = getQuickHighlightColor(marks);

  return {
    text: span.text,
    bold: marks.includes("strong"),
    italic: marks.includes("em"),
    highlight:
      highlight?.color ??
      quickHighlightColor ??
      (marks.includes("highlight") ? "yellow" : undefined),
    trigger:
      highlight?.trigger ??
      (quickHighlightColor || marks.includes("highlight") ? "scroll" : undefined),
  };
}

type PortableRichTextProps = {
  // Accepts a plain string too: content authored before the field became rich
  // text resolves to a string, and should keep rendering until re-authored.
  blocks: PortableBlock[] | string | null | undefined;
  as?: "p" | "span";
  className?: string;
};

export function PortableRichText({
  blocks,
  as = "p",
  className,
}: PortableRichTextProps) {
  if (!blocks) return null;

  // Legacy plain-string value: render its lines, preserving newlines.
  if (typeof blocks === "string") {
    if (!blocks.trim()) return null;
    const lines = blocks.split("\n").map((line) => [{ text: line }]);
    return <StructuredRichText as={as} lines={lines} className={className} />;
  }

  if (blocks.length === 0) return null;
  // Each block is a paragraph → one line; StructuredRichText separates them.
  const lines = blocks.map((block) => {
    const markDefsByKey = new Map(
      (block.markDefs ?? []).map((markDef) => [markDef._key, markDef]),
    );
    return block.children.map((span) => spanToToken(span, markDefsByKey));
  });
  return <StructuredRichText as={as} lines={lines} className={className} />;
}
