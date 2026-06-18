/* global React */
// About screen.
(function () {
  const UC = window.UrloCreativoDesignSystem_098823;
  const { SectionTitle, Highlight, ProcessBar, TeamMember } = UC;
  const G = "138px";

  const TEAM = [
    { name: "Giulia", role: "Founder of Urlo Creativo — Designer, Project Manager" },
    { name: "Federica", role: "Graphic Designer, UI/UX Designer" },
    { name: "Martina", role: "Brand Identity Strategist, Copywriter, UX Writer" },
    { name: "Margherita", role: "Surface, Colour & Textile Designer" },
    { name: "Valentina", role: "Technical Designer & Product Developer" },
    { name: "Camilla", role: "Stylist" },
  ];
  const CORE = ["Fashion Designer", "Copy Writer", "Graphic Designer", "Stylist", "UI/UX Designer and Writer"];

  function AboutScreen({ onNavigate }) {
    return (
      <div style={{ background: "var(--uc-paper)", color: "var(--uc-ink)", fontFamily: "var(--font-sans)" }}>
        <section style={{ padding: `80px ${G} 0` }}>
          <h1 style={{ margin: 0, font: "var(--type-display)", fontSize: 72, textTransform: "uppercase", lineHeight: 1 }}>
            About the <Highlight>Agency</Highlight>
          </h1>
          <p style={{ font: "var(--type-body-bold)", fontSize: 20, lineHeight: 1.5, maxWidth: 720, marginTop: 24 }}>
            Urlo Creativo is a multidisciplinary creative agency dedicated to bringing out the hidden potential of brands. A flexible network of professionals working together depending on each project.
          </p>
        </section>

        <section style={{ padding: `48px ${G} 0` }}>
          <div style={{ height: 460, overflow: "hidden" }}>
            <img src="../../assets/people-team.jpg" alt="Team" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(1) blur(6px)", transform: "scale(1.05)" }} />
          </div>
        </section>

        <section style={{ background: "var(--uc-yellow)", margin: "64px 0", padding: `64px ${G}` }}>
          <p style={{ font: "var(--type-body-bold)", fontSize: 30, lineHeight: 1.4, maxWidth: 900, margin: 0 }}>
            Urlo Creativo is an agency dedicated to bringing out that potential. A <b>diverse team</b> of professionals operating as an open system, brought together based on the <b>project's needs.</b>
          </p>
        </section>

        <section style={{ padding: `0 ${G}` }}>
          <SectionTitle size={56}>Team core</SectionTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: 0, marginTop: 28, maxWidth: 520, borderLeft: "3px solid var(--uc-blue-deep)" }}>
            {CORE.map((c) => (
              <div key={c} style={{ font: "var(--type-body-bold)", letterSpacing: "0.02em", padding: "12px 18px", borderBottom: "1px solid var(--uc-gray-150)" }}>{c}</div>
            ))}
          </div>
        </section>

        <section style={{ padding: `80px ${G} 0` }}>
          <SectionTitle size={56}>How we work</SectionTitle>
          <div style={{ marginTop: 40 }}><ProcessBar /></div>
        </section>

        <section style={{ padding: `80px ${G} 0` }}>
          <SectionTitle size={56}>Mission</SectionTitle>
          <div style={{ display: "flex", gap: 56, marginTop: 28, alignItems: "flex-start", flexWrap: "wrap" }}>
            <p style={{ font: "var(--type-body)", fontSize: 22, lineHeight: 1.5, maxWidth: 420, margin: 0 }}>
              We love brands with personality. This is why we dig deep to bring it to the surface.
            </p>
          </div>
          <div style={{ marginTop: 32 }}>
            <span style={{ font: "var(--type-body-bold)", fontSize: 18 }}>
              <Highlight>WE DEVELOP IDEAS THROUGH WORDS AND IMAGES.</Highlight>
            </span>
          </div>
        </section>

        <section style={{ padding: `80px ${G} 100px` }}>
          <SectionTitle size={56}>People</SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 40, rowGap: 48, marginTop: 40 }}>
            {TEAM.map((m) => (
              <TeamMember key={m.name} name={m.name} role={m.role} photo="../../assets/people-team.jpg" />
            ))}
          </div>
        </section>

        <UC.ContactFooter onCta={() => onNavigate("Contact")} />
      </div>
    );
  }

  window.AboutScreen = AboutScreen;
})();
