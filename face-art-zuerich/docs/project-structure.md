# Face Art Zürich — Projektstruktur

## Design-System (bestehend, verbindlich)
- **Farben**: Mint (#68A9A0), Creme (#F4F0E8), Off-White (#FAFAF8)
- **Typografie**: Cormorant Garamond (Headings) + Inter (Body)
- **Spacing**: 0.5rem-basiert (sp-1 bis sp-16)
- **Radius**: 10px / 5px
- **Max-Width**: 1200px
- **Shadows**: 3-stufig (sm, md, lg)

## Seiten
- `index.html` — Home (Hero-Accordion, Services, Galerie-Akkordeon, MSF-Teaser, Contact-Teaser, Footer)
- `about.html` — Über Isa
- `kinderschminken.html` — Kinderschminken (Galerie)
- `hochzeiten.html` — Hochzeiten (Galerie)
- `unternehmen.html` — Unternehmen (Galerie)
- `events.html` — Events (Galerie)
- `kontakt.html` — Kontakt

## Branch-Strategie (Git Flow)
- `main` — nur produktionsreifer Code
- `develop` — Integration aller Features
- `feature/*` — jedes Feature im eigenen Branch
- `hotfix/*` — dringende Bugfixes

## Commit-Konvention
- feat(section): neues Feature
- fix(component): Bugfix
- style(tokens): Design-Änderung
- a11y(component): Accessibility
- perf(images): Performance
- docs: Dokumentation
