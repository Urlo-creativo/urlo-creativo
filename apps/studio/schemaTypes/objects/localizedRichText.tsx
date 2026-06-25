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
  triggerLabel: "S" | "L";
}> = [
  { title: "Scroll giallo", value: "highlightYellow", color: "yellow", triggerLabel: "S" },
  { title: "Scroll rosa", value: "highlightPink", color: "pink", triggerLabel: "S" },
  { title: "Scroll blu", value: "highlightBlue", color: "blue", triggerLabel: "S" },
  { title: "Scroll corallo", value: "highlightCoral", color: "coral", triggerLabel: "S" },
  { title: "Scroll arancione", value: "highlightOrange", color: "orange", triggerLabel: "S" },
  { title: "Load giallo", value: "highlightLoadYellow", color: "yellow", triggerLabel: "L" },
  { title: "Load rosa", value: "highlightLoadPink", color: "pink", triggerLabel: "L" },
  { title: "Load blu", value: "highlightLoadBlue", color: "blue", triggerLabel: "L" },
  { title: "Load corallo", value: "highlightLoadCoral", color: "coral", triggerLabel: "L" },
  { title: "Load arancione", value: "highlightLoadOrange", color: "orange", triggerLabel: "L" },
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

function createHighlightIcon(color: HighlightColor, triggerLabel: "S" | "L") {
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
        {triggerLabel}
      </span>
    );
  };
}

// One paragraph block. Bold / Italic and Highlights are decorators. S icons
// render with the scroll trigger; L icons render with the load trigger.
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
          icon: createHighlightIcon(option.color, option.triggerLabel),
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
      title: "Italiano",
      type: "array",
      of: richTextBlocks(),
    }),
    defineField({
      name: "en",
      title: "English",
      type: "array",
      of: richTextBlocks(),
    }),
  ],
});
