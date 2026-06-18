/* global React */
// Projects screen — portfolio grid with filter tags.
(function () {
  const UC = window.UrloCreativoDesignSystem_098823;
  const { SectionTitle, ProjectCard, Tag } = UC;
  const G = "138px";

  const IMAGES = [
    "../../assets/project-kappa-ducati.png",
    "../../assets/project-colmar.png",
    "../../assets/project-rossignol.png",
  ];
  const ALL = [
    { title: "Kappa × Ducati", year: "2026", cat: "Art direction" },
    { title: "Colmar Sport", year: "2026", cat: "Brand identity" },
    { title: "JCC × Rossignol", year: "2026", cat: "Product" },
    { title: "Velasca", year: "2025", cat: "Brand identity" },
    { title: "OVS Editorial", year: "2025", cat: "Art direction" },
    { title: "Kappa FW26", year: "2025", cat: "Product" },
  ];
  const FILTERS = ["All", "Brand identity", "Art direction", "Product"];

  function ProjectsScreen({ onNavigate }) {
    const [filter, setFilter] = React.useState("All");
    const shown = ALL.filter((p) => filter === "All" || p.cat === filter);

    return (
      <div style={{ background: "var(--uc-paper)", color: "var(--uc-ink)", fontFamily: "var(--font-sans)" }}>
        <section style={{ padding: `80px ${G} 32px` }}>
          <SectionTitle size={88}>Projects</SectionTitle>
          <div style={{ display: "flex", gap: 10, marginTop: 28, flexWrap: "wrap" }}>
            {FILTERS.map((f) => (
              <span key={f} onClick={() => setFilter(f)} style={{ cursor: "pointer" }}>
                <Tag variant={filter === f ? "fill" : "outline"}>{f}</Tag>
              </span>
            ))}
          </div>
        </section>

        <section style={{ padding: `20px ${G} 100px` }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 40, rowGap: 56 }}>
            {shown.map((p, i) => (
              <ProjectCard key={p.title} image={IMAGES[i % IMAGES.length]} title={p.title} year={`${p.cat} — ${p.year}`} href="#" />
            ))}
          </div>
        </section>

        <UC.ContactFooter onCta={() => onNavigate("Contact")} />
      </div>
    );
  }

  window.ProjectsScreen = ProjectsScreen;
})();
