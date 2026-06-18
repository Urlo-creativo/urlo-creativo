/* global React */
// Services screen.
(function () {
  const UC = window.UrloCreativoDesignSystem_098823;
  const { SectionTitle, Highlight, ServiceRow, ServiceItem } = UC;
  const G = "138px";

  function ServicesScreen({ onNavigate }) {
    return (
      <div style={{ background: "var(--uc-paper)", color: "var(--uc-ink)", fontFamily: "var(--font-sans)" }}>
        <section style={{ padding: `80px ${G} 40px` }}>
          <SectionTitle size={88}>Services</SectionTitle>
        </section>

        <section style={{ padding: `0 ${G}` }}>
          <ServiceRow number={1} title="Brand identity & communication" defaultOpen>
            <ServiceItem label="Brand strategy" />
            <ServiceItem label="Visual identity" />
            <ServiceItem label="Communication" />
          </ServiceRow>

          {/* accent statement panel */}
          <div style={{ background: "var(--uc-yellow)", margin: "0 -138px", padding: "120px 138px", display: "flex", justifyContent: "center" }}>
            <p style={{ font: "var(--type-body-bold)", fontSize: 36, lineHeight: 1.3, maxWidth: 460, margin: 0 }}>
              We <Highlight mode="text" color="var(--uc-blue)">identify</Highlight> the brand and define its <Highlight mode="text" color="var(--uc-pink)">personality.</Highlight>
            </p>
          </div>

          <ServiceRow number={2} title="Design & product development">
            <ServiceItem label="Product & packaging" />
            <ServiceItem label="Digital & web" />
            <ServiceItem label="Editorial design" />
          </ServiceRow>
          <ServiceRow number={3} title="Styling / shooting & art direction">
            <ServiceItem label="Art direction" />
            <ServiceItem label="Styling" />
            <ServiceItem label="Photography & shooting" />
          </ServiceRow>
          <div style={{ borderTop: "1px solid var(--uc-black)" }} />
        </section>

        <div style={{ height: 100 }} />
        <UC.ContactFooter onCta={() => onNavigate("Contact")} />
      </div>
    );
  }

  window.ServicesScreen = ServicesScreen;
})();
