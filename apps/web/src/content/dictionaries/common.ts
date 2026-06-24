// Site-wide content (nav, footer) plus per-locale metadata. nav/footer IT are
// currently English placeholders — translate them. Footer and contact share the
// same address block; dedupe into one `contactInfo` source when this moves to
// Sanity.

// ⚠️ IT — Italian copy. Currently an English placeholder; translate each string.
const commonIt = {
  metadata: {
    description:
      "Urlo Creativo è uno studio creativo multidisciplinare con base a Milano, attivo in brand identity, design, product development e art direction.",
  },
  nav: {
    home: "Home",
    services: "Services",
    projects: "Projects",
    about: "About Us",
    contact: "Contact",
  },
  footer: {
    title: "Contact",
    address:
      "Via Corrado II il Salico, 28\nMilan | 20141\n\n+39 3703028027\ninfo@consulenzecreativeperetto.com",
    socials: [
      { label: "LinkedIn", href: "https://www.linkedin.com" },
      { label: "Instagram", href: "https://www.instagram.com" },
    ],
    ctaLabel: "Book a consultation",
    emailHref: "mailto:info@consulenzecreativeperetto.com",
  },
};

// EN — English copy.
const commonEn = {
  metadata: {
    description:
      "Urlo Creativo is a Milan-based multidisciplinary creative studio working across brand identity, design, product development, and art direction.",
  },
  nav: {
    home: "Home",
    services: "Services",
    projects: "Projects",
    about: "About Us",
    contact: "Contact",
  },
  footer: {
    title: "Contact",
    address:
      "Via Corrado II il Salico, 28\nMilan | 20141\n\n+39 3703028027\ninfo@consulenzecreativeperetto.com",
    socials: [
      { label: "LinkedIn", href: "https://www.linkedin.com" },
      { label: "Instagram", href: "https://www.instagram.com" },
    ],
    ctaLabel: "Book a consultation",
    emailHref: "mailto:info@consulenzecreativeperetto.com",
  },
};

export const common = { it: commonIt, en: commonEn };
