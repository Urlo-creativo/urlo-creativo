/* global React */
// Contact screen — a fuller contact page with an inquiry form.
(function () {
  const UC = window.UrloCreativoDesignSystem_098823;
  const { SectionTitle, Button } = UC;
  const G = "138px";

  function Field({ label, ...rest }) {
    return (
      <label style={{ display: "block" }}>
        <span style={{ font: "var(--type-caption)", letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--uc-gray-500)" }}>{label}</span>
        <input {...rest} style={{ display: "block", width: "100%", marginTop: 8, padding: "10px 0", background: "transparent", border: "none", borderBottom: "1px solid var(--uc-black)", font: "var(--type-body)", color: "var(--uc-ink)", outline: "none" }} />
      </label>
    );
  }

  function ContactScreen() {
    const [sent, setSent] = React.useState(false);
    return (
      <div style={{ background: "var(--uc-paper)", color: "var(--uc-ink)", fontFamily: "var(--font-sans)" }}>
        <section style={{ padding: `80px ${G} 40px` }}>
          <SectionTitle size={120}>Contact</SectionTitle>
        </section>

        <section style={{ padding: `0 ${G} 100px`, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 96, alignItems: "start" }}>
          <div style={{ font: "var(--type-body)", fontSize: 18, lineHeight: 1.6 }}>
            <div style={{ font: "var(--type-body-bold)", marginBottom: 18 }}>GET IN TOUCH</div>
            <div>Via Barona 25</div>
            <div>20142 — Milano</div>
            <div style={{ marginTop: 18 }}>+39 3703028027</div>
            <div>contact@urlocreativo.com</div>
            <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 6 }}>
              <a href="#" style={{ font: "var(--type-body-bold)", color: "var(--uc-black)", textDecoration: "none" }}>Instagram</a>
              <a href="#" style={{ font: "var(--type-body-bold)", color: "var(--uc-black)", textDecoration: "none" }}>LinkedIn</a>
            </div>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            <Field label="Name" placeholder="Your name" required />
            <Field label="Email" type="email" placeholder="you@studio.com" required />
            <Field label="Project" placeholder="Tell us about your brand" />
            <div style={{ marginTop: 8 }}>
              <Button variant="solid" type="submit">{sent ? "Thank you — we'll be in touch" : "Book a consultation"}</Button>
            </div>
          </form>
        </section>

        <div style={{ background: "var(--uc-yellow)", height: 220, display: "flex", alignItems: "center", padding: `0 ${G}` }}>
          <div style={{ font: "var(--type-h3)", fontSize: 30, fontWeight: 700 }}>
            Every brand has a <span style={{ fontStyle: "italic" }}>potential.</span>
          </div>
        </div>
      </div>
    );
  }

  window.ContactScreen = ContactScreen;
})();
