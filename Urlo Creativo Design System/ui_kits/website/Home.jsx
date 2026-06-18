/* global React */
// Home screen — the long-scroll marketing homepage.
(function () {
  const UC = window.UrloCreativoDesignSystem_098823;
  const { SectionTitle, Highlight, Button, ProjectCard } = UC;
  const G = "138px"; // page gutter

  const METHOD = [
    { n: "1.IDENTIFY", lines: ["What drives the brand", "Where it wants to go", "Who it wants to speak to"] },
    { n: "2.DEFINE", lines: ["Visual identity", "Verbal identity", "Strategic positioning"] },
    { n: "3.EXPRESS", lines: ["Product development", "Communication", "Digital presence"] },
  ];

  const PROJECTS = [
    { image: "../../assets/project-kappa-ducati.png", title: "Kappa × Ducati", year: "2026" },
    { image: "../../assets/project-colmar.png", title: "Colmar Sport", year: "2026" },
    { image: "../../assets/project-rossignol.png", title: "JCC × Rossignol", year: "2026" },
  ];

  function HomeScreen({ onNavigate }) {
    return (
      <div style={{ background: "var(--uc-paper)", color: "var(--uc-ink)", fontFamily: "var(--font-sans)" }}>
        {/* HERO */}
        <section style={{ height: 760, position: "relative", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(120% 90% at 50% 30%, #ffffff 0%, var(--uc-paper) 60%, #f3f1e8 100%)" }} />
          <div style={{ position: "relative", textAlign: "center" }}>
            <div style={{ font: "var(--type-display)", fontSize: 116, color: "#ECEAE0", letterSpacing: "0.02em", lineHeight: 1 }}>URLO CREATIVO</div>
            <div style={{ font: "var(--type-h4)", fontWeight: 700, color: "#D7D5CB", letterSpacing: "0.22em", marginTop: 18 }}>WHERE BRANDS TAKE SHAPE</div>
          </div>
        </section>

        {/* INTRO */}
        <section style={{ padding: `60px ${G}` }}>
          <p style={{ font: "var(--type-body-bold)", fontSize: 22, lineHeight: 1.5, maxWidth: 720, margin: 0 }}>
            Urlo Creativo is a multidisciplinary creative agency dedicated to bringing out the full potential of brands. A flexible network of professionals working together depending on each project.
          </p>
          <div style={{ marginTop: 28 }}>
            <Button variant="outline" onClick={() => onNavigate("Contact")}>Contact</Button>
          </div>
        </section>

        {/* POTENTIAL + METHODOLOGY */}
        <section style={{ padding: `60px ${G}` }}>
          <SectionTitle size={72} accent="Potential" underline>Every brand has a</SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 48, marginTop: 56, maxWidth: 1040 }}>
            {METHOD.map((m) => (
              <div key={m.n}>
                <div style={{ font: "var(--type-body-bold)", letterSpacing: "0.04em", marginBottom: 22 }}>{m.n}</div>
                {m.lines.map((l) => (
                  <div key={l} style={{ font: "var(--type-body)", color: "var(--uc-gray-700)", marginBottom: 14 }}>{l}</div>
                ))}
              </div>
            ))}
          </div>
          <div style={{ marginTop: 40 }}>
            <Button variant="outline" size="sm" onClick={() => onNavigate("Services")}>Discover our services</Button>
          </div>
        </section>

        {/* PROJECTS */}
        <section style={{ padding: `60px ${G}` }}>
          <SectionTitle size={72}>Projects</SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 36, marginTop: 48 }}>
            {PROJECTS.map((p) => (
              <ProjectCard key={p.title} {...p} href="#" />
            ))}
          </div>
          <div style={{ marginTop: 40 }}>
            <Button variant="outline" size="sm" onClick={() => onNavigate("Projects")}>See all projects</Button>
          </div>
        </section>

        {/* METHODOLOGY copy */}
        <section style={{ padding: `60px ${G}` }}>
          <div style={{ font: "var(--type-h4)", marginBottom: 22 }}>
            <Highlight mode="underline">Methodology</Highlight>
          </div>
          <p style={{ font: "var(--type-body-bold)", fontSize: 32, lineHeight: 1.35, maxWidth: 1080, margin: 0 }}>
            At Urlo Creativo, we start by understanding each brand's context, goals, and audience to uncover its core potential. We then define a clear positioning and build a coherent identity that guides every creative decision.
          </p>
          <div style={{ marginTop: 36 }}>
            <Button variant="outline" size="sm" onClick={() => onNavigate("Services")}>What we do</Button>
          </div>
        </section>

        {/* SELECTED CLIENTS */}
        <section style={{ paddingTop: 40 }}>
          <div style={{ padding: `0 ${G}` }}>
            <SectionTitle size={72} accent="Clients">Selected</SectionTitle>
          </div>
          <div style={{ background: "var(--uc-yellow)", marginTop: 48, padding: "26px 40px", overflow: "hidden" }}>
            {window.Component1 ? <window.Component1 /> : null}
          </div>
        </section>

        {/* PEOPLE */}
        <section style={{ padding: `80px ${G} 0` }}>
          <SectionTitle size={72}>People</SectionTitle>
          <div style={{ height: 520, marginTop: 32, overflow: "hidden" }}>
            <img src="../../assets/people-team.jpg" alt="Team" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(1) blur(7px)", transform: "scale(1.05)" }} />
          </div>
          <p style={{ font: "var(--type-body-bold)", fontSize: 30, lineHeight: 1.4, maxWidth: 1160, marginTop: 44 }}>
            Urlo Creativo is proudly powered by women. In an industry where female voices are still underrepresented, we bring together a diverse network of creative professionals who lead with vision, sensitivity, and strength.
          </p>
          <div style={{ margin: "32px 0 80px" }}>
            <Button variant="outline" size="sm" onClick={() => onNavigate("About Us")}>Learn more</Button>
          </div>
        </section>

        <UC.ContactFooter onCta={() => onNavigate("Contact")} />
      </div>
    );
  }

  window.HomeScreen = HomeScreen;
})();
