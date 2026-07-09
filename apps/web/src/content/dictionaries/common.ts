// Site-wide content (nav, footer) plus per-locale metadata. Footer and contact
// share the same address block; dedupe into one `contactInfo` source when this
// moves to Sanity.

// IT — Italian copy.
const commonIt = {
  metadata: {
    description:
      "Urlo Creativo è uno studio creativo multidisciplinare con base a Milano, attivo in brand identity, design, product development e art direction.",
  },
  nav: {
    home: "Home",
    services: "Servizi",
    projects: "Progetti",
    about: "Chi siamo",
    contact: "Contatti",
    skipToContent: "Vai al contenuto",
    menuOpen: "Apri il menu",
    menuClose: "Chiudi il menu",
    mainNav: "Navigazione principale",
  },
  footer: {
    title: "CONTATTI",
    address:
      "Via Luigi Alamanni, 8\n20141 – Milan\n\n+39 3703028027\ninfo@consulenzecreativeperetto.com",
    socials: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/urlo-creativo-clothing-design-studio-b72629329/?skipRedirect=true" },
      { label: "Instagram", href: "https://www.instagram.com/urlocreativo/" },
    ],
    ctaLabel: "Prenota una consulenza",
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
    skipToContent: "Skip to content",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    mainNav: "Main navigation",
  },
  footer: {
    title: "CONTACT",
    address:
      "Via Luigi Alamanni, 8\n20141 – Milan\n\n+39 3703028027\ninfo@consulenzecreativeperetto.com",
    socials: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/urlo-creativo-clothing-design-studio-b72629329/?skipRedirect=true" },
      { label: "Instagram", href: "https://www.instagram.com/urlocreativo/" },
    ],
    ctaLabel: "Book a consultation",
    emailHref: "mailto:info@consulenzecreativeperetto.com",
  },
};

export const common = { it: commonIt, en: commonEn };
