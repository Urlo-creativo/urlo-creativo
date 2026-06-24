import { StructuredRichText, type RichTextToken } from "@/components/ui/rich-text";
import type {
  HighlightMarkDef,
  PortableBlock,
  PortableSpan,
} from "@/lib/sanity/queries";

const quickHighlightMarks = {
  highlightYellow: { color: "yellow", trigger: "scroll" },
  highlightPink: { color: "pink", trigger: "scroll" },
  highlightBlue: { color: "blue", trigger: "scroll" },
  highlightCoral: { color: "coral", trigger: "scroll" },
  highlightOrange: { color: "orange", trigger: "scroll" },
  highlightLoadYellow: { color: "yellow", trigger: "load" },
  highlightLoadPink: { color: "pink", trigger: "load" },
  highlightLoadBlue: { color: "blue", trigger: "load" },
  highlightLoadCoral: { color: "coral", trigger: "load" },
  highlightLoadOrange: { color: "orange", trigger: "load" },
} as const;

function getQuickHighlightMark(marks: string[]) {
  const mark = marks.find((item) => item in quickHighlightMarks);
  if (!mark) return undefined;
  return quickHighlightMarks[mark as keyof typeof quickHighlightMarks];
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
  const quickHighlight = getQuickHighlightMark(marks);

  return {
    text: span.text,
    bold: marks.includes("strong"),
    italic: marks.includes("em"),
    highlight:
      highlight?.color ??
      quickHighlight?.color ??
      (marks.includes("highlight") ? "yellow" : undefined),
    trigger:
      highlight?.trigger ??
      quickHighlight?.trigger ??
      (marks.includes("highlight") ? "scroll" : undefined),
  };
}

type PortableRichTextProps = {
  // Accepts a plain string too: content authored before the field became rich
  // text resolves to a string, and should keep rendering until re-authored.
  blocks: PortableBlock[] | string | null | undefined;
  as?: "p" | "h1" | "h2" | "h3" | "span";
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
    return (
      <StructuredRichText
        as={as}
        lines={lines}
        className={className}
        lineGap={lines.length > 1}
      />
    );
  }

  if (blocks.length === 0) return null;
  // Each block is a paragraph → one line; StructuredRichText separates them.
  const lines = blocks.map((block) => {
    const markDefsByKey = new Map(
      (block.markDefs ?? []).map((markDef) => [markDef._key, markDef]),
    );
    return block.children.map((span) => spanToToken(span, markDefsByKey));
  });
  return (
    <StructuredRichText
      as={as}
      lines={lines}
      className={className}
      lineGap={lines.length > 1}
    />
  );
}
