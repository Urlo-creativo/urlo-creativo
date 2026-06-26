import { HighlightText, type HighlightTextProps } from "@/components/ui/highlight-text";

export type RichTextToken = {
  bold?: boolean;
  highlight?: HighlightTextProps["color"];
  italic?: boolean;
  text: string;
  trigger?: HighlightTextProps["trigger"];
};

type StructuredRichTextProps = {
  lines: RichTextToken[][];
  className?: string;
  as?: "p" | "h1" | "h2" | "h3" | "span";
  lineGap?: boolean;
};

function tokenClassName(token: RichTextToken) {
  return [token.bold ? "font-bold" : "font-normal", token.italic ? "italic" : ""]
    .filter(Boolean)
    .join(" ");
}

function renderToken(token: RichTextToken, lineIndex: number, index: number) {
  const className = tokenClassName(token);

  if (token.highlight) {
    return (
      <HighlightText
        key={`${lineIndex}-${index}`}
        color={token.highlight}
        trigger={token.trigger ?? "scroll"}
        className={className}
      >
        {token.text}
      </HighlightText>
    );
  }

  return (
    <span key={`${lineIndex}-${index}`} className={className}>
      {token.text}
    </span>
  );
}

function normalizeLines(lines: RichTextToken[][]): RichTextToken[][] {
  return lines.flatMap((line) => {
    const normalized: RichTextToken[][] = [];
    let currentLine: RichTextToken[] = [];

    for (const token of line) {
      const parts = token.text.split(/\r?\n/);

      parts.forEach((part, partIndex) => {
        if (partIndex > 0) {
          normalized.push(currentLine);
          currentLine = [];
        }

        if (part) {
          currentLine.push({ ...token, text: part });
        }
      });
    }

    normalized.push(currentLine);
    return normalized;
  });
}

export function StructuredRichText({
  lines,
  className,
  as: Tag = "span",
  lineGap = false,
}: StructuredRichTextProps) {
  const normalizedLines = normalizeLines(lines);

  return (
    <Tag className={className}>
      {normalizedLines.map((line, lineIndex) => (
        <span
          key={lineIndex}
          className={lineGap ? `block${lineIndex > 0 ? " mt-[0.6em]" : ""}` : undefined}
        >
          {line.map((token, index) => renderToken(token, lineIndex, index))}
          {!lineGap && lineIndex < normalizedLines.length - 1 ? <br /> : null}
        </span>
      ))}
    </Tag>
  );
}
