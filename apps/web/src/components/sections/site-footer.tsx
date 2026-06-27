import type { Dictionary } from "@/i18n/dictionaries";

type SiteFooterProps = {
  footer: Dictionary["footer"];
};

export function SiteFooter({ footer }: SiteFooterProps) {
  return (
    <section className="section-y-lg bg-yellow">
      <div className="page-shell">
        <h2 className="type-display mb-16 font-bold uppercase">
          {footer.title}
        </h2>

        <div className="grid gap-12 md:grid-cols-2">
          <p className="type-body-lg whitespace-pre-line">
            {footer.address}
          </p>
          <div className="type-body-lg flex flex-col gap-8 font-bold">
            {footer.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="subtle-link focus-ring flex min-h-11 items-center"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>

        <a href={footer.emailHref} className="pill-button stack-lg">
          {footer.ctaLabel}
        </a>
      </div>
    </section>
  );
}
