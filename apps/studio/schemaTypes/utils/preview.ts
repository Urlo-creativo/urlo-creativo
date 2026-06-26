type LocalizedTextLike = string | { it?: unknown; en?: unknown } | undefined;

type PortableTextBlock = {
  children?: Array<{ text?: string }>;
};

export function localizedPreviewText(value: LocalizedTextLike) {
  if (typeof value === "string") {
    return value;
  }

  if (!value || typeof value !== "object") {
    return undefined;
  }

  const italian = value.it;
  const english = value.en;

  if (typeof italian === "string") {
    return italian;
  }

  if (typeof english === "string") {
    return english;
  }

  return undefined;
}

export function localizedRichTextPreview(value: LocalizedTextLike) {
  if (!value || typeof value !== "object" || typeof value === "string") {
    return localizedPreviewText(value);
  }

  const blocks = Array.isArray(value.it)
    ? value.it
    : Array.isArray(value.en)
      ? value.en
      : [];

  const text = (blocks as PortableTextBlock[])
    .flatMap((block) => block.children ?? [])
    .map((child) => child.text)
    .filter(Boolean)
    .join("");

  return text || undefined;
}
