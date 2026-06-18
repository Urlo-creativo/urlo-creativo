type RichTextProps = {
  text: string;
  className?: string;
  as?: "p" | "h1" | "h2" | "h3" | "span";
};

// Supported inline markers:
//   **text**   → bold
//   *text*     → italic
//   ***text*** → bold + italic
// Match *** before ** before * so longer patterns aren't consumed first.
export function RichText({ text, className, as: Tag = "p" }: RichTextProps) {
  const parts = text.split(/(\*\*\*.*?\*\*\*|\*\*.*?\*\*|\*.*?\*)/g);
  return (
    <Tag className={className}>
      {parts.map((part, i) => {
        if (part.startsWith("***") && part.endsWith("***"))
          return <strong key={i}><em>{part.slice(3, -3)}</em></strong>;
        if (part.startsWith("**") && part.endsWith("**"))
          return <strong key={i}>{part.slice(2, -2)}</strong>;
        if (part.startsWith("*") && part.endsWith("*"))
          return <em key={i}>{part.slice(1, -1)}</em>;
        return part;
      })}
    </Tag>
  );
}
