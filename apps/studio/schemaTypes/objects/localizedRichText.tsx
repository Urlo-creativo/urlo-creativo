import { type ReactNode } from "react";
import { defineArrayMember, defineField, defineType } from "sanity";

// Brand highlight colours (match apps/web tokens) for the editor preview.
const HIGHLIGHT_COLORS = {
  yellow: "hsla(56, 69%, 81%, 1)",
  pink: "hsla(358, 58%, 80%, 1)",
  blue: "hsla(204, 39%, 70%, 1)",
  coral: "hsla(10, 73%, 61%, 1)",
  orange: "hsla(36, 84%, 67%, 1)",
} as const;

type HighlightColor = keyof typeof HIGHLIGHT_COLORS;

const QUICK_HIGHLIGHT_OPTIONS: Array<{
  title: string;
  value: string;
  color: HighlightColor;
}> = [
  { title: "Evid. giallo", value: "highlightYellow", color: "yellow" },
  { title: "Evid. rosa", value: "highlightPink", color: "pink" },
  { title: "Evid. blu", value: "highlightBlue", color: "blue" },
  { title: "Evid. corallo", value: "highlightCoral", color: "coral" },
  { title: "Evid. arancione", value: "highlightOrange", color: "orange" },
];

function HighlightPreview({
  children,
  color,
}: {
  children: ReactNode;
  color: HighlightColor;
}) {
  const value = HIGHLIGHT_COLORS[color];
  return (
    <span
      style={{
        backgroundImage: `linear-gradient(${value}, ${value})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left 0 bottom 0.08em",
        backgroundSize: "100% 0.5em",
      }}
    >
      {children}
    </span>
  );
}

function createHighlightDecorator(color: HighlightColor) {
  return function HighlightDecorator(props: { children: ReactNode }) {
    return <HighlightPreview color={color}>{props.children}</HighlightPreview>;
  };
}

function createHighlightIcon(color: HighlightColor) {
  return function HighlightIcon() {
    return (
      <span
        style={{
          alignItems: "center",
          background: HIGHLIGHT_COLORS[color],
          border: "1px solid rgba(0, 0, 0, 0.55)",
          borderRadius: 2,
          color: "#000",
          display: "inline-flex",
          fontSize: 10,
          fontWeight: 700,
          height: 14,
          justifyContent: "center",
          lineHeight: 1,
          width: 14,
        }}
      >
        H
      </span>
    );
  };
}

// One paragraph block. Bold / Italic and Highlights are decorators. Highlight
// marks render on the site through StructuredRichText with the scroll trigger.
const richTextBlocks = () => [
  defineArrayMember({
    type: "block",
    styles: [{ title: "Normale / Normal", value: "normal" }],
    lists: [],
    marks: {
      decorators: [
        { title: "Grassetto / Bold", value: "strong" },
        { title: "Corsivo / Italic", value: "em" },
        ...QUICK_HIGHLIGHT_OPTIONS.map((option) => ({
          title: option.title,
          value: option.value,
          component: createHighlightDecorator(option.color),
          icon: createHighlightIcon(option.color),
        })),
      ],
      annotations: [],
    },
  }),
];

export const localizedRichTextType = defineType({
  name: "localizedRichText",
  title: "Testo formattato localizzato / Localized rich text",
  type: "object",
  fields: [
    defineField({
      name: "it",
      title: "Italiano / Italian",
      type: "array",
      of: richTextBlocks(),
    }),
    defineField({
      name: "en",
      title: "English / Inglese",
      type: "array",
      of: richTextBlocks(),
    }),
  ],
});
