import { HighlightText, type HighlightTextProps } from "@/components/highlight-text";

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
};

function tokenClassName(token: RichTextToken) {
  // type-* wrappers are all weight-400, so regular tokens need no font-normal
  // counterweight — only bold/italic tokens emit their own utility.
  return [token.bold ? "font-bold" : "", token.italic ? "italic" : ""]
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

export function StructuredRichText({
  lines,
  className,
  as: Tag = "span",
}: StructuredRichTextProps) {
  return (
    <Tag className={className}>
      {lines.map((line, lineIndex) => (
        <span key={lineIndex}>
          {line.map((token, index) => renderToken(token, lineIndex, index))}
          {lineIndex < lines.length - 1 ? <br /> : null}
        </span>
      ))}
    </Tag>
  );
}
