# Website UI kit — Urlo Creativo

A click-through recreation of the studio's marketing site, composed from the
design-system primitives (no re-implemented components).

## Screens
- **Home** (`Home.jsx`) — hero wordmark, intro, "Every brand has a *potential*" +
  3-step methodology, projects grid, methodology copy, **Selected Clients** strip on
  yellow, **People** (blurred team photo), and the contact footer.
- **Services** (`Services.jsx`) — numbered, expandable `ServiceRow`s with a full-bleed
  yellow accent statement ("We *identify* the brand and define its *personality.*").
- **Projects** (`Projects.jsx`) — filterable portfolio grid of `ProjectCard`s.
- **About** (`About.jsx`) — About the *Agency*, team-core list, **How we work**
  `ProcessBar`, mission, and the **People** grid.
- **Contact** (`Contact.jsx`) — giant CONTACT, details column, and an inquiry form.

## Run
Open `index.html`. The pill `NavBar` switches screens via React state. It loads the
compiled bundle (`_ds_bundle.js`), the client-logo bundle
(`assets/clients/Components.bundle.js`), then each screen file. Each screen registers
itself on `window` (e.g. `window.HomeScreen`) and the `App` composes them.

## Notes
- Imagery is the real B&W project / team photography from the brand file.
- Client logos (Colmar, Velasca, OVS, Kappa, Ducati, Rossignol) render from
  `window.Component1`.
