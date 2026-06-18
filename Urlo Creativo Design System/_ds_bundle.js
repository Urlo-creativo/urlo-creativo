/* @ds-bundle: {"format":3,"namespace":"UrloCreativoDesignSystem_098823","components":[{"name":"Logo","sourcePath":"components/brand/Logo.jsx"},{"name":"ContactFooter","sourcePath":"components/content/ContactFooter.jsx"},{"name":"ProcessBar","sourcePath":"components/content/ProcessBar.jsx"},{"name":"ProjectCard","sourcePath":"components/content/ProjectCard.jsx"},{"name":"ServiceRow","sourcePath":"components/content/ServiceRow.jsx"},{"name":"ServiceItem","sourcePath":"components/content/ServiceRow.jsx"},{"name":"TeamMember","sourcePath":"components/content/TeamMember.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Highlight","sourcePath":"components/core/Highlight.jsx"},{"name":"SectionTitle","sourcePath":"components/core/SectionTitle.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"NavBar","sourcePath":"components/navigation/NavBar.jsx"}],"sourceHashes":{"components/brand/Logo.jsx":"b20563e9fa62","components/content/ContactFooter.jsx":"985c45db0518","components/content/ProcessBar.jsx":"d37440a21a89","components/content/ProjectCard.jsx":"77160f752db0","components/content/ServiceRow.jsx":"3933794f2861","components/content/TeamMember.jsx":"30d8528245d6","components/core/Button.jsx":"2eb76a6c9a87","components/core/Highlight.jsx":"bcde0467c6a7","components/core/SectionTitle.jsx":"bce37a568e80","components/core/Tag.jsx":"da11b621dcb1","components/navigation/NavBar.jsx":"a2f56118842b","ui_kits/website/About.jsx":"d9df2c63d8dd","ui_kits/website/Contact.jsx":"1064c9f0ab11","ui_kits/website/Home.jsx":"54985686df3c","ui_kits/website/Projects.jsx":"271e64fd71ac","ui_kits/website/Services.jsx":"95fbc669e001"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.UrloCreativoDesignSystem_098823 = window.UrloCreativoDesignSystem_098823 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/brand/Logo.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Urlo Creativo logo. Renders the O-pictogram, the wordmark, or both
 * (the lockup). Image-based — uses the real brand PNGs from assets/.
 */
function Logo({
  variant = "lockup",
  // "lockup" | "wordmark" | "mark"
  height = 52,
  color,
  // optional ink tint via CSS filter for the mark
  basePath = "",
  // prefix to assets/ (e.g. "../../")
  style = {},
  ...rest
}) {
  const mark = `${basePath}assets/logo-mark.png`;
  const wordmark = `${basePath}assets/logo-wordmark.png`;
  const imgBase = {
    display: "block",
    height,
    width: "auto"
  };
  if (variant === "mark") {
    return /*#__PURE__*/React.createElement("img", _extends({
      src: mark,
      alt: "Urlo Creativo",
      style: {
        ...imgBase,
        ...style
      }
    }, rest));
  }
  if (variant === "wordmark") {
    return /*#__PURE__*/React.createElement("img", _extends({
      src: wordmark,
      alt: "Urlo Creativo",
      style: {
        ...imgBase,
        ...style
      }
    }, rest));
  }
  // lockup — the wordmark PNG already contains mark + type
  return /*#__PURE__*/React.createElement("img", _extends({
    src: wordmark,
    alt: "Urlo Creativo",
    style: {
      ...imgBase,
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Logo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Logo.jsx", error: String((e && e.message) || e) }); }

// components/content/ProcessBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const DEFAULT_STAGES = [{
  label: "DISCOVERY",
  color: "var(--stage-discovery)"
}, {
  label: "STRATEGY",
  color: "var(--stage-strategy)"
}, {
  label: "IDENTITY",
  color: "var(--stage-identity)"
}, {
  label: "DEVELOPMENT",
  color: "var(--stage-development)"
}, {
  label: "PRODUCTION",
  color: "var(--stage-production)"
}, {
  label: "GROWTH",
  color: "var(--stage-growth)"
}];

/**
 * ProcessBar — the studio's "HOW WE WORK" stage bar: a row of caps
 * labels above a continuous band of process-accent colour blocks.
 */
function ProcessBar({
  stages = DEFAULT_STAGES,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      width: "100%",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      borderTop: "1px solid var(--uc-black)",
      paddingTop: 10
    }
  }, stages.map(s => /*#__PURE__*/React.createElement("div", {
    key: s.label,
    style: {
      flex: 1,
      font: "var(--type-body-bold)",
      fontSize: 13,
      letterSpacing: "0.04em",
      color: "var(--uc-black)"
    }
  }, s.label))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      height: 16,
      marginTop: 8
    }
  }, stages.map(s => /*#__PURE__*/React.createElement("div", {
    key: s.label,
    style: {
      flex: 1,
      background: s.color
    }
  }))));
}
Object.assign(__ds_scope, { ProcessBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/ProcessBar.jsx", error: String((e && e.message) || e) }); }

// components/content/ProjectCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * ProjectCard — a portfolio item: a sharp-cornered (no radius, no
 * shadow) image with a bold caption and a muted year beneath. Images
 * are typically black-and-white. Hover lifts the image slightly via
 * a subtle desaturate→full transition.
 */
function ProjectCard({
  image,
  title,
  year,
  bw = true,
  // render image black-and-white until hover
  href,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const Wrap = href ? "a" : "div";
  return /*#__PURE__*/React.createElement(Wrap, _extends({
    href: href,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "block",
      textDecoration: "none",
      color: "inherit",
      cursor: href ? "pointer" : "default",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      aspectRatio: "357 / 440",
      overflow: "hidden",
      background: "var(--uc-gray-100)"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: title,
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block",
      filter: bw && !hover ? "grayscale(1)" : "grayscale(0)",
      transform: hover ? "scale(1.03)" : "scale(1)",
      transition: "filter var(--dur-slow) var(--ease-out), transform var(--dur-slow) var(--ease-out)"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-body-bold)",
      letterSpacing: "0.02em",
      marginTop: 16,
      textTransform: "uppercase",
      color: "var(--uc-black)"
    }
  }, title), year != null && /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-body)",
      color: "var(--uc-gray-300)",
      marginTop: 4
    }
  }, year));
}
Object.assign(__ds_scope, { ProjectCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/ProjectCard.jsx", error: String((e && e.message) || e) }); }

// components/content/ServiceRow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * ServiceRow — a numbered service entry separated by hairline rules,
 * as on the Services page ("01 BRAND IDENTITY & COMMUNICATION").
 * Expandable: pass children to reveal sub-items on click.
 */
function ServiceRow({
  number,
  title,
  children,
  defaultOpen = false,
  style = {},
  ...rest
}) {
  const [open, setOpen] = React.useState(defaultOpen);
  const interactive = !!children;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      borderTop: "1px solid var(--uc-black)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("button", {
    onClick: () => interactive && setOpen(o => !o),
    style: {
      width: "100%",
      display: "flex",
      alignItems: "baseline",
      gap: 18,
      background: "none",
      border: "none",
      padding: "28px 0",
      cursor: interactive ? "pointer" : "default",
      textAlign: "left"
    }
  }, number != null && /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-h4)",
      fontWeight: 700,
      color: "var(--uc-black)",
      letterSpacing: "0.02em"
    }
  }, String(number).padStart(2, "0")), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-h4)",
      fontWeight: 700,
      fontSize: 30,
      color: "var(--uc-black)",
      textTransform: "uppercase",
      letterSpacing: "0.01em",
      flex: 1
    }
  }, title), interactive && /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-h4)",
      color: "var(--uc-black)",
      transform: open ? "rotate(45deg)" : "none",
      transition: "transform var(--dur)"
    }
  }, "+")), interactive && open && /*#__PURE__*/React.createElement("div", {
    style: {
      paddingBottom: 32,
      display: "flex",
      flexDirection: "column",
      gap: 28
    }
  }, children));
}

/** A sub-item within a ServiceRow (e.g. BRAND STRATEGY / VISUAL IDENTITY). */
function ServiceItem({
  label,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      font: "var(--type-body-bold)",
      letterSpacing: "0.04em",
      textTransform: "uppercase",
      color: "var(--uc-black)",
      ...style
    }
  }, rest), label);
}
Object.assign(__ds_scope, { ServiceRow, ServiceItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/ServiceRow.jsx", error: String((e && e.message) || e) }); }

// components/content/TeamMember.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * TeamMember — a person on the People page: B&W portrait, bold caps
 * name, muted role caption. The studio is "proudly powered by women."
 */
function TeamMember({
  photo,
  name,
  role,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      flexDirection: "column",
      ...style
    }
  }, rest), photo && /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      aspectRatio: "1 / 1.18",
      overflow: "hidden",
      background: "var(--uc-gray-100)",
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: photo,
    alt: name,
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      filter: "grayscale(1)",
      display: "block"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-body-bold)",
      fontSize: 13,
      letterSpacing: "0.06em",
      textTransform: "uppercase",
      color: "var(--uc-black)"
    }
  }, name), role && /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-caption)",
      letterSpacing: "0.04em",
      textTransform: "uppercase",
      color: "var(--uc-gray-400)",
      marginTop: 6,
      maxWidth: 220
    }
  }, role));
}
Object.assign(__ds_scope, { TeamMember });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/TeamMember.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Urlo Creativo button — a fully-round pill. Default is the outline
 * (2px ink ring) that fills with ink on hover. The studio uses these
 * for "Contact", "Book a consultation", "Discover our services", etc.
 */
function Button({
  children,
  variant = "outline",
  // "outline" | "solid" | "ghost"
  size = "md",
  // "sm" | "md" | "lg"
  as = "button",
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const Tag = as;
  const sizes = {
    sm: {
      fontSize: 14,
      padding: "7px 18px"
    },
    md: {
      fontSize: 16,
      padding: "10px 26px"
    },
    lg: {
      fontSize: 18,
      padding: "13px 34px"
    }
  }[size];
  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    fontFamily: "var(--font-sans)",
    fontWeight: 400,
    lineHeight: 1,
    letterSpacing: "0.02em",
    borderRadius: "var(--radius-pill)",
    cursor: "pointer",
    border: "none",
    textDecoration: "none",
    whiteSpace: "nowrap",
    transition: "background var(--dur) var(--ease-out), color var(--dur) var(--ease-out), opacity var(--dur)",
    ...sizes
  };
  const variants = {
    outline: {
      background: hover ? "var(--uc-black)" : "transparent",
      color: hover ? "var(--uc-paper)" : "var(--uc-black)",
      boxShadow: "var(--ring-ink)"
    },
    solid: {
      background: "var(--uc-black)",
      color: "var(--uc-paper)",
      opacity: hover ? 0.88 : 1
    },
    ghost: {
      background: hover ? "var(--uc-yellow)" : "transparent",
      color: "var(--uc-black)",
      boxShadow: "none"
    }
  }[variant];
  return /*#__PURE__*/React.createElement(Tag, _extends({
    style: {
      ...base,
      ...variants,
      ...style
    },
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false)
  }, rest), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/content/ContactFooter.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * ContactFooter — the full-bleed yellow contact panel that closes
 * every page: giant CONTACT title, address + contacts column, social
 * links column, and a "Book a consultation" pill.
 */
function ContactFooter({
  address = ["Via Barona 25", "20142 — Milano"],
  phone = "+39 3703028027",
  email = "contact@urlocreativo.com",
  socials = ["LinkedIn", "Instagram"],
  cta = "Book a consultation",
  onCta,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("footer", _extends({
    style: {
      background: "var(--uc-yellow)",
      color: "var(--uc-black)",
      padding: "96px var(--page-gutter)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: "var(--type-display)",
      textTransform: "uppercase",
      letterSpacing: "0.01em"
    }
  }, "Contact"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 96,
      marginTop: 40,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-body)",
      lineHeight: 1.5
    }
  }, address.map(l => /*#__PURE__*/React.createElement("div", {
    key: l
  }, l)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16
    }
  }, phone), /*#__PURE__*/React.createElement("div", null, email)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, socials.map(s => /*#__PURE__*/React.createElement("a", {
    key: s,
    href: "#",
    style: {
      font: "var(--type-body-bold)",
      color: "var(--uc-black)",
      textDecoration: "none"
    }
  }, s)))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 40
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "outline",
    onClick: onCta
  }, cta)));
}
Object.assign(__ds_scope, { ContactFooter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/ContactFooter.jsx", error: String((e && e.message) || e) }); }

// components/core/Highlight.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Highlight — the studio's signature marker-pen accent. Three modes:
 *  • "fill"      → yellow block behind the text (default)
 *  • "underline" → thick yellow bar under the baseline
 *  • "text"      → coloured highlight using a process accent
 * Inline; wrap a word or phrase inside running copy or a headline.
 */
function Highlight({
  children,
  mode = "fill",
  // "fill" | "underline" | "text"
  color = "var(--uc-yellow)",
  style = {},
  ...rest
}) {
  const base = {
    fontFamily: "inherit",
    fontWeight: "inherit",
    color: "inherit"
  };
  if (mode === "underline") {
    return /*#__PURE__*/React.createElement("span", _extends({
      style: {
        ...base,
        backgroundImage: `linear-gradient(${color}, ${color})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "0 88%",
        backgroundSize: "100% 0.42em",
        ...style
      }
    }, rest), children);
  }

  // fill / text — a solid block of accent behind the word
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      ...base,
      background: color,
      boxDecorationBreak: "clone",
      WebkitBoxDecorationBreak: "clone",
      padding: "0.02em 0.12em",
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Highlight });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Highlight.jsx", error: String((e && e.message) || e) }); }

// components/core/SectionTitle.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * SectionTitle — the big bold caps statement the studio opens every
 * section with (PROJECTS, SELECTED CLIENTS, CONTACT, "EVERY BRAND
 * HAS A POTENTIAL"). Supports an italic accent word and an optional
 * yellow underline on a chosen word.
 */
function SectionTitle({
  children,
  accent,
  // optional italic accent word appended
  underline = false,
  // yellow underline on the accent word
  size = 96,
  color = "var(--uc-ink)",
  as = "h2",
  style = {},
  ...rest
}) {
  const Tag = as;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    style: {
      margin: 0,
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: size,
      lineHeight: 1,
      letterSpacing: "0.01em",
      color,
      textTransform: "uppercase",
      ...style
    }
  }, rest), children, accent != null && /*#__PURE__*/React.createElement(React.Fragment, null, " ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontStyle: "italic",
      fontWeight: 700
    }
  }, underline ? /*#__PURE__*/React.createElement(__ds_scope.Highlight, {
    mode: "underline"
  }, accent) : accent)));
}
Object.assign(__ds_scope, { SectionTitle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/SectionTitle.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Tag — a small outline pill used for meta labels and filters. Same
 * round language as Button but quieter. Optional yellow "fill".
 */
function Tag({
  children,
  variant = "outline",
  // "outline" | "fill" | "muted"
  style = {},
  ...rest
}) {
  const variants = {
    outline: {
      background: "transparent",
      color: "var(--uc-black)",
      boxShadow: "var(--ring-ink-1)"
    },
    fill: {
      background: "var(--uc-yellow)",
      color: "var(--uc-black)",
      boxShadow: "none"
    },
    muted: {
      background: "transparent",
      color: "var(--uc-gray-500)",
      boxShadow: "inset 0 0 0 1px var(--uc-gray-200)"
    }
  }[variant];
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      fontFamily: "var(--font-sans)",
      fontWeight: 400,
      fontSize: 13,
      letterSpacing: "0.04em",
      lineHeight: 1,
      padding: "6px 13px",
      borderRadius: "var(--radius-pill)",
      whiteSpace: "nowrap",
      ...variants,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/navigation/NavBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * NavBar — the floating, fully-round pill navigation that sits at the
 * top of every page. Logo mark on the left, centred links, optional
 * language toggle on the right.
 */
function NavBar({
  items = ["Home", "Projects", "About Us", "Services", "Contact"],
  active = "Home",
  lang = "IT",
  onNavigate,
  basePath = "",
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("nav", _extends({
    style: {
      display: "flex",
      alignItems: "center",
      gap: 24,
      height: 64,
      padding: "0 28px",
      background: "rgba(250,250,250,0.92)",
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
      borderRadius: "var(--radius-pill)",
      boxShadow: "inset 0 0 0 1px var(--uc-gray-100)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.Logo, {
    variant: "mark",
    height: 30,
    basePath: basePath
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 40,
      margin: "0 auto"
    }
  }, items.map(label => {
    const isActive = label === active;
    return /*#__PURE__*/React.createElement("a", {
      key: label,
      href: "#",
      onClick: e => {
        e.preventDefault();
        onNavigate && onNavigate(label);
      },
      style: {
        font: "var(--type-body)",
        color: isActive ? "var(--uc-black)" : "var(--uc-gray-600)",
        fontWeight: isActive ? 700 : 400,
        textDecoration: "none",
        letterSpacing: "0.02em",
        paddingBottom: 2,
        borderBottom: isActive ? "1.5px solid var(--uc-black)" : "1.5px solid transparent",
        transition: "color var(--dur)"
      }
    }, label);
  })), lang && /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-body)",
      color: "var(--uc-black)",
      letterSpacing: "0.04em"
    }
  }, lang));
}
Object.assign(__ds_scope, { NavBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/NavBar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/About.jsx
try { (() => {
/* global React */
// About screen.
(function () {
  const UC = window.UrloCreativoDesignSystem_098823;
  const {
    SectionTitle,
    Highlight,
    ProcessBar,
    TeamMember
  } = UC;
  const G = "138px";
  const TEAM = [{
    name: "Giulia",
    role: "Founder of Urlo Creativo — Designer, Project Manager"
  }, {
    name: "Federica",
    role: "Graphic Designer, UI/UX Designer"
  }, {
    name: "Martina",
    role: "Brand Identity Strategist, Copywriter, UX Writer"
  }, {
    name: "Margherita",
    role: "Surface, Colour & Textile Designer"
  }, {
    name: "Valentina",
    role: "Technical Designer & Product Developer"
  }, {
    name: "Camilla",
    role: "Stylist"
  }];
  const CORE = ["Fashion Designer", "Copy Writer", "Graphic Designer", "Stylist", "UI/UX Designer and Writer"];
  function AboutScreen({
    onNavigate
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        background: "var(--uc-paper)",
        color: "var(--uc-ink)",
        fontFamily: "var(--font-sans)"
      }
    }, /*#__PURE__*/React.createElement("section", {
      style: {
        padding: `80px ${G} 0`
      }
    }, /*#__PURE__*/React.createElement("h1", {
      style: {
        margin: 0,
        font: "var(--type-display)",
        fontSize: 72,
        textTransform: "uppercase",
        lineHeight: 1
      }
    }, "About the ", /*#__PURE__*/React.createElement(Highlight, null, "Agency")), /*#__PURE__*/React.createElement("p", {
      style: {
        font: "var(--type-body-bold)",
        fontSize: 20,
        lineHeight: 1.5,
        maxWidth: 720,
        marginTop: 24
      }
    }, "Urlo Creativo is a multidisciplinary creative agency dedicated to bringing out the hidden potential of brands. A flexible network of professionals working together depending on each project.")), /*#__PURE__*/React.createElement("section", {
      style: {
        padding: `48px ${G} 0`
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        height: 460,
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: "../../assets/people-team.jpg",
      alt: "Team",
      style: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        filter: "grayscale(1) blur(6px)",
        transform: "scale(1.05)"
      }
    }))), /*#__PURE__*/React.createElement("section", {
      style: {
        background: "var(--uc-yellow)",
        margin: "64px 0",
        padding: `64px ${G}`
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        font: "var(--type-body-bold)",
        fontSize: 30,
        lineHeight: 1.4,
        maxWidth: 900,
        margin: 0
      }
    }, "Urlo Creativo is an agency dedicated to bringing out that potential. A ", /*#__PURE__*/React.createElement("b", null, "diverse team"), " of professionals operating as an open system, brought together based on the ", /*#__PURE__*/React.createElement("b", null, "project's needs."))), /*#__PURE__*/React.createElement("section", {
      style: {
        padding: `0 ${G}`
      }
    }, /*#__PURE__*/React.createElement(SectionTitle, {
      size: 56
    }, "Team core"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 0,
        marginTop: 28,
        maxWidth: 520,
        borderLeft: "3px solid var(--uc-blue-deep)"
      }
    }, CORE.map(c => /*#__PURE__*/React.createElement("div", {
      key: c,
      style: {
        font: "var(--type-body-bold)",
        letterSpacing: "0.02em",
        padding: "12px 18px",
        borderBottom: "1px solid var(--uc-gray-150)"
      }
    }, c)))), /*#__PURE__*/React.createElement("section", {
      style: {
        padding: `80px ${G} 0`
      }
    }, /*#__PURE__*/React.createElement(SectionTitle, {
      size: 56
    }, "How we work"), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 40
      }
    }, /*#__PURE__*/React.createElement(ProcessBar, null))), /*#__PURE__*/React.createElement("section", {
      style: {
        padding: `80px ${G} 0`
      }
    }, /*#__PURE__*/React.createElement(SectionTitle, {
      size: 56
    }, "Mission"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 56,
        marginTop: 28,
        alignItems: "flex-start",
        flexWrap: "wrap"
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        font: "var(--type-body)",
        fontSize: 22,
        lineHeight: 1.5,
        maxWidth: 420,
        margin: 0
      }
    }, "We love brands with personality. This is why we dig deep to bring it to the surface.")), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 32
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        font: "var(--type-body-bold)",
        fontSize: 18
      }
    }, /*#__PURE__*/React.createElement(Highlight, null, "WE DEVELOP IDEAS THROUGH WORDS AND IMAGES.")))), /*#__PURE__*/React.createElement("section", {
      style: {
        padding: `80px ${G} 100px`
      }
    }, /*#__PURE__*/React.createElement(SectionTitle, {
      size: 56
    }, "People"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 40,
        rowGap: 48,
        marginTop: 40
      }
    }, TEAM.map(m => /*#__PURE__*/React.createElement(TeamMember, {
      key: m.name,
      name: m.name,
      role: m.role,
      photo: "../../assets/people-team.jpg"
    })))), /*#__PURE__*/React.createElement(UC.ContactFooter, {
      onCta: () => onNavigate("Contact")
    }));
  }
  window.AboutScreen = AboutScreen;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/About.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Contact.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* global React */
// Contact screen — a fuller contact page with an inquiry form.
(function () {
  const UC = window.UrloCreativoDesignSystem_098823;
  const {
    SectionTitle,
    Button
  } = UC;
  const G = "138px";
  function Field({
    label,
    ...rest
  }) {
    return /*#__PURE__*/React.createElement("label", {
      style: {
        display: "block"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        font: "var(--type-caption)",
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        color: "var(--uc-gray-500)"
      }
    }, label), /*#__PURE__*/React.createElement("input", _extends({}, rest, {
      style: {
        display: "block",
        width: "100%",
        marginTop: 8,
        padding: "10px 0",
        background: "transparent",
        border: "none",
        borderBottom: "1px solid var(--uc-black)",
        font: "var(--type-body)",
        color: "var(--uc-ink)",
        outline: "none"
      }
    })));
  }
  function ContactScreen() {
    const [sent, setSent] = React.useState(false);
    return /*#__PURE__*/React.createElement("div", {
      style: {
        background: "var(--uc-paper)",
        color: "var(--uc-ink)",
        fontFamily: "var(--font-sans)"
      }
    }, /*#__PURE__*/React.createElement("section", {
      style: {
        padding: `80px ${G} 40px`
      }
    }, /*#__PURE__*/React.createElement(SectionTitle, {
      size: 120
    }, "Contact")), /*#__PURE__*/React.createElement("section", {
      style: {
        padding: `0 ${G} 100px`,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 96,
        alignItems: "start"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        font: "var(--type-body)",
        fontSize: 18,
        lineHeight: 1.6
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        font: "var(--type-body-bold)",
        marginBottom: 18
      }
    }, "GET IN TOUCH"), /*#__PURE__*/React.createElement("div", null, "Via Barona 25"), /*#__PURE__*/React.createElement("div", null, "20142 \u2014 Milano"), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 18
      }
    }, "+39 3703028027"), /*#__PURE__*/React.createElement("div", null, "contact@urlocreativo.com"), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 28,
        display: "flex",
        flexDirection: "column",
        gap: 6
      }
    }, /*#__PURE__*/React.createElement("a", {
      href: "#",
      style: {
        font: "var(--type-body-bold)",
        color: "var(--uc-black)",
        textDecoration: "none"
      }
    }, "Instagram"), /*#__PURE__*/React.createElement("a", {
      href: "#",
      style: {
        font: "var(--type-body-bold)",
        color: "var(--uc-black)",
        textDecoration: "none"
      }
    }, "LinkedIn"))), /*#__PURE__*/React.createElement("form", {
      onSubmit: e => {
        e.preventDefault();
        setSent(true);
      },
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 28
      }
    }, /*#__PURE__*/React.createElement(Field, {
      label: "Name",
      placeholder: "Your name",
      required: true
    }), /*#__PURE__*/React.createElement(Field, {
      label: "Email",
      type: "email",
      placeholder: "you@studio.com",
      required: true
    }), /*#__PURE__*/React.createElement(Field, {
      label: "Project",
      placeholder: "Tell us about your brand"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 8
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "solid",
      type: "submit"
    }, sent ? "Thank you — we'll be in touch" : "Book a consultation")))), /*#__PURE__*/React.createElement("div", {
      style: {
        background: "var(--uc-yellow)",
        height: 220,
        display: "flex",
        alignItems: "center",
        padding: `0 ${G}`
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        font: "var(--type-h3)",
        fontSize: 30,
        fontWeight: 700
      }
    }, "Every brand has a ", /*#__PURE__*/React.createElement("span", {
      style: {
        fontStyle: "italic"
      }
    }, "potential."))));
  }
  window.ContactScreen = ContactScreen;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Contact.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Home.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* global React */
// Home screen — the long-scroll marketing homepage.
(function () {
  const UC = window.UrloCreativoDesignSystem_098823;
  const {
    SectionTitle,
    Highlight,
    Button,
    ProjectCard
  } = UC;
  const G = "138px"; // page gutter

  const METHOD = [{
    n: "1.IDENTIFY",
    lines: ["What drives the brand", "Where it wants to go", "Who it wants to speak to"]
  }, {
    n: "2.DEFINE",
    lines: ["Visual identity", "Verbal identity", "Strategic positioning"]
  }, {
    n: "3.EXPRESS",
    lines: ["Product development", "Communication", "Digital presence"]
  }];
  const PROJECTS = [{
    image: "../../assets/project-kappa-ducati.png",
    title: "Kappa × Ducati",
    year: "2026"
  }, {
    image: "../../assets/project-colmar.png",
    title: "Colmar Sport",
    year: "2026"
  }, {
    image: "../../assets/project-rossignol.png",
    title: "JCC × Rossignol",
    year: "2026"
  }];
  function HomeScreen({
    onNavigate
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        background: "var(--uc-paper)",
        color: "var(--uc-ink)",
        fontFamily: "var(--font-sans)"
      }
    }, /*#__PURE__*/React.createElement("section", {
      style: {
        height: 760,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        inset: 0,
        background: "radial-gradient(120% 90% at 50% 30%, #ffffff 0%, var(--uc-paper) 60%, #f3f1e8 100%)"
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        textAlign: "center"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        font: "var(--type-display)",
        fontSize: 116,
        color: "#ECEAE0",
        letterSpacing: "0.02em",
        lineHeight: 1
      }
    }, "URLO CREATIVO"), /*#__PURE__*/React.createElement("div", {
      style: {
        font: "var(--type-h4)",
        fontWeight: 700,
        color: "#D7D5CB",
        letterSpacing: "0.22em",
        marginTop: 18
      }
    }, "WHERE BRANDS TAKE SHAPE"))), /*#__PURE__*/React.createElement("section", {
      style: {
        padding: `60px ${G}`
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        font: "var(--type-body-bold)",
        fontSize: 22,
        lineHeight: 1.5,
        maxWidth: 720,
        margin: 0
      }
    }, "Urlo Creativo is a multidisciplinary creative agency dedicated to bringing out the full potential of brands. A flexible network of professionals working together depending on each project."), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 28
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "outline",
      onClick: () => onNavigate("Contact")
    }, "Contact"))), /*#__PURE__*/React.createElement("section", {
      style: {
        padding: `60px ${G}`
      }
    }, /*#__PURE__*/React.createElement(SectionTitle, {
      size: 72,
      accent: "Potential",
      underline: true
    }, "Every brand has a"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 48,
        marginTop: 56,
        maxWidth: 1040
      }
    }, METHOD.map(m => /*#__PURE__*/React.createElement("div", {
      key: m.n
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        font: "var(--type-body-bold)",
        letterSpacing: "0.04em",
        marginBottom: 22
      }
    }, m.n), m.lines.map(l => /*#__PURE__*/React.createElement("div", {
      key: l,
      style: {
        font: "var(--type-body)",
        color: "var(--uc-gray-700)",
        marginBottom: 14
      }
    }, l))))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 40
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "outline",
      size: "sm",
      onClick: () => onNavigate("Services")
    }, "Discover our services"))), /*#__PURE__*/React.createElement("section", {
      style: {
        padding: `60px ${G}`
      }
    }, /*#__PURE__*/React.createElement(SectionTitle, {
      size: 72
    }, "Projects"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 36,
        marginTop: 48
      }
    }, PROJECTS.map(p => /*#__PURE__*/React.createElement(ProjectCard, _extends({
      key: p.title
    }, p, {
      href: "#"
    })))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 40
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "outline",
      size: "sm",
      onClick: () => onNavigate("Projects")
    }, "See all projects"))), /*#__PURE__*/React.createElement("section", {
      style: {
        padding: `60px ${G}`
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        font: "var(--type-h4)",
        marginBottom: 22
      }
    }, /*#__PURE__*/React.createElement(Highlight, {
      mode: "underline"
    }, "Methodology")), /*#__PURE__*/React.createElement("p", {
      style: {
        font: "var(--type-body-bold)",
        fontSize: 32,
        lineHeight: 1.35,
        maxWidth: 1080,
        margin: 0
      }
    }, "At Urlo Creativo, we start by understanding each brand's context, goals, and audience to uncover its core potential. We then define a clear positioning and build a coherent identity that guides every creative decision."), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 36
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "outline",
      size: "sm",
      onClick: () => onNavigate("Services")
    }, "What we do"))), /*#__PURE__*/React.createElement("section", {
      style: {
        paddingTop: 40
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: `0 ${G}`
      }
    }, /*#__PURE__*/React.createElement(SectionTitle, {
      size: 72,
      accent: "Clients"
    }, "Selected")), /*#__PURE__*/React.createElement("div", {
      style: {
        background: "var(--uc-yellow)",
        marginTop: 48,
        padding: "26px 40px",
        overflow: "hidden"
      }
    }, window.Component1 ? /*#__PURE__*/React.createElement(window.Component1, null) : null)), /*#__PURE__*/React.createElement("section", {
      style: {
        padding: `80px ${G} 0`
      }
    }, /*#__PURE__*/React.createElement(SectionTitle, {
      size: 72
    }, "People"), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 520,
        marginTop: 32,
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: "../../assets/people-team.jpg",
      alt: "Team",
      style: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        filter: "grayscale(1) blur(7px)",
        transform: "scale(1.05)"
      }
    })), /*#__PURE__*/React.createElement("p", {
      style: {
        font: "var(--type-body-bold)",
        fontSize: 30,
        lineHeight: 1.4,
        maxWidth: 1160,
        marginTop: 44
      }
    }, "Urlo Creativo is proudly powered by women. In an industry where female voices are still underrepresented, we bring together a diverse network of creative professionals who lead with vision, sensitivity, and strength."), /*#__PURE__*/React.createElement("div", {
      style: {
        margin: "32px 0 80px"
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "outline",
      size: "sm",
      onClick: () => onNavigate("About Us")
    }, "Learn more"))), /*#__PURE__*/React.createElement(UC.ContactFooter, {
      onCta: () => onNavigate("Contact")
    }));
  }
  window.HomeScreen = HomeScreen;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Home.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Projects.jsx
try { (() => {
/* global React */
// Projects screen — portfolio grid with filter tags.
(function () {
  const UC = window.UrloCreativoDesignSystem_098823;
  const {
    SectionTitle,
    ProjectCard,
    Tag
  } = UC;
  const G = "138px";
  const IMAGES = ["../../assets/project-kappa-ducati.png", "../../assets/project-colmar.png", "../../assets/project-rossignol.png"];
  const ALL = [{
    title: "Kappa × Ducati",
    year: "2026",
    cat: "Art direction"
  }, {
    title: "Colmar Sport",
    year: "2026",
    cat: "Brand identity"
  }, {
    title: "JCC × Rossignol",
    year: "2026",
    cat: "Product"
  }, {
    title: "Velasca",
    year: "2025",
    cat: "Brand identity"
  }, {
    title: "OVS Editorial",
    year: "2025",
    cat: "Art direction"
  }, {
    title: "Kappa FW26",
    year: "2025",
    cat: "Product"
  }];
  const FILTERS = ["All", "Brand identity", "Art direction", "Product"];
  function ProjectsScreen({
    onNavigate
  }) {
    const [filter, setFilter] = React.useState("All");
    const shown = ALL.filter(p => filter === "All" || p.cat === filter);
    return /*#__PURE__*/React.createElement("div", {
      style: {
        background: "var(--uc-paper)",
        color: "var(--uc-ink)",
        fontFamily: "var(--font-sans)"
      }
    }, /*#__PURE__*/React.createElement("section", {
      style: {
        padding: `80px ${G} 32px`
      }
    }, /*#__PURE__*/React.createElement(SectionTitle, {
      size: 88
    }, "Projects"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 10,
        marginTop: 28,
        flexWrap: "wrap"
      }
    }, FILTERS.map(f => /*#__PURE__*/React.createElement("span", {
      key: f,
      onClick: () => setFilter(f),
      style: {
        cursor: "pointer"
      }
    }, /*#__PURE__*/React.createElement(Tag, {
      variant: filter === f ? "fill" : "outline"
    }, f))))), /*#__PURE__*/React.createElement("section", {
      style: {
        padding: `20px ${G} 100px`
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 40,
        rowGap: 56
      }
    }, shown.map((p, i) => /*#__PURE__*/React.createElement(ProjectCard, {
      key: p.title,
      image: IMAGES[i % IMAGES.length],
      title: p.title,
      year: `${p.cat} — ${p.year}`,
      href: "#"
    })))), /*#__PURE__*/React.createElement(UC.ContactFooter, {
      onCta: () => onNavigate("Contact")
    }));
  }
  window.ProjectsScreen = ProjectsScreen;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Projects.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Services.jsx
try { (() => {
/* global React */
// Services screen.
(function () {
  const UC = window.UrloCreativoDesignSystem_098823;
  const {
    SectionTitle,
    Highlight,
    ServiceRow,
    ServiceItem
  } = UC;
  const G = "138px";
  function ServicesScreen({
    onNavigate
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        background: "var(--uc-paper)",
        color: "var(--uc-ink)",
        fontFamily: "var(--font-sans)"
      }
    }, /*#__PURE__*/React.createElement("section", {
      style: {
        padding: `80px ${G} 40px`
      }
    }, /*#__PURE__*/React.createElement(SectionTitle, {
      size: 88
    }, "Services")), /*#__PURE__*/React.createElement("section", {
      style: {
        padding: `0 ${G}`
      }
    }, /*#__PURE__*/React.createElement(ServiceRow, {
      number: 1,
      title: "Brand identity & communication",
      defaultOpen: true
    }, /*#__PURE__*/React.createElement(ServiceItem, {
      label: "Brand strategy"
    }), /*#__PURE__*/React.createElement(ServiceItem, {
      label: "Visual identity"
    }), /*#__PURE__*/React.createElement(ServiceItem, {
      label: "Communication"
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        background: "var(--uc-yellow)",
        margin: "0 -138px",
        padding: "120px 138px",
        display: "flex",
        justifyContent: "center"
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        font: "var(--type-body-bold)",
        fontSize: 36,
        lineHeight: 1.3,
        maxWidth: 460,
        margin: 0
      }
    }, "We ", /*#__PURE__*/React.createElement(Highlight, {
      mode: "text",
      color: "var(--uc-blue)"
    }, "identify"), " the brand and define its ", /*#__PURE__*/React.createElement(Highlight, {
      mode: "text",
      color: "var(--uc-pink)"
    }, "personality."))), /*#__PURE__*/React.createElement(ServiceRow, {
      number: 2,
      title: "Design & product development"
    }, /*#__PURE__*/React.createElement(ServiceItem, {
      label: "Product & packaging"
    }), /*#__PURE__*/React.createElement(ServiceItem, {
      label: "Digital & web"
    }), /*#__PURE__*/React.createElement(ServiceItem, {
      label: "Editorial design"
    })), /*#__PURE__*/React.createElement(ServiceRow, {
      number: 3,
      title: "Styling / shooting & art direction"
    }, /*#__PURE__*/React.createElement(ServiceItem, {
      label: "Art direction"
    }), /*#__PURE__*/React.createElement(ServiceItem, {
      label: "Styling"
    }), /*#__PURE__*/React.createElement(ServiceItem, {
      label: "Photography & shooting"
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        borderTop: "1px solid var(--uc-black)"
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 100
      }
    }), /*#__PURE__*/React.createElement(UC.ContactFooter, {
      onCta: () => onNavigate("Contact")
    }));
  }
  window.ServicesScreen = ServicesScreen;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Services.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Logo = __ds_scope.Logo;

__ds_ns.ContactFooter = __ds_scope.ContactFooter;

__ds_ns.ProcessBar = __ds_scope.ProcessBar;

__ds_ns.ProjectCard = __ds_scope.ProjectCard;

__ds_ns.ServiceRow = __ds_scope.ServiceRow;

__ds_ns.ServiceItem = __ds_scope.ServiceItem;

__ds_ns.TeamMember = __ds_scope.TeamMember;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Highlight = __ds_scope.Highlight;

__ds_ns.SectionTitle = __ds_scope.SectionTitle;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.NavBar = __ds_scope.NavBar;

})();
