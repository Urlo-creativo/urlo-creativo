import type { Dictionary } from "@/i18n/dictionaries";

type SiteFooterProps = {
  footer: Dictionary["footer"];
};

export function SiteFooter({ footer }: SiteFooterProps) {
  return (
    <section className="bg-yellow py-20 md:py-[180px]">
      <div className="page-shell">
        <h2 className="mb-16 text-[clamp(64px,6.7vw,96px)] font-bold uppercase leading-none tracking-normal">
          {footer.title}
        </h2>

        <div className="grid gap-12 md:grid-cols-2">
          <p className="whitespace-pre-line text-[24px] leading-normal tracking-normal">
            {footer.address}
          </p>
          <div className="flex flex-col gap-8 text-[24px] font-bold leading-none tracking-normal">
            {footer.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="transition-opacity hover:opacity-60"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>

        <a href={footer.emailHref} className="pill-button mt-16">
          {footer.ctaLabel}
        </a>
      </div>
    </section>
  );
}
