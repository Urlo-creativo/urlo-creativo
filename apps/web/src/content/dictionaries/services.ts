import {
  placeholderBodyRichText,
  placeholderRichText,
  placeholderText,
} from "@/content/placeholders";

const servicesFallback = {
  // Sanity fallbacks
  title: placeholderRichText,
  items: [
    {
      number: "01",
      title: placeholderText.title,
      details: [
        {
          title: placeholderRichText,
          items: [placeholderText.item],
        },
      ],
      statement: placeholderBodyRichText,
    },
  ],
  collaborationTitle: placeholderRichText,
  collaboration: placeholderBodyRichText,
};

export const servicesDictionary = {
  it: servicesFallback,
  en: servicesFallback,
};
