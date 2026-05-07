# Design Skills and Standards

This repo contains the single-page pedagogical demo behind [design.trilogyai.co](https://design.trilogyai.co/). It explains how design standards and agent skills can give coding agents better design memory, sharper defaults, and clearer review checks.

The page is intentionally small. It is a teaching surface for three ideas:

- **DESIGN.md** stores design facts in a portable file: YAML front matter for tokens, plus Markdown rationale for how the design system should be used.
- **Design tokens** are named design decisions such as colors, type, spacing, radii, and component values. They let an agent preserve intent instead of copying isolated CSS values.
- **OKLCH** is a CSS color format that separates lightness, chroma, and hue. It is useful for palettes because lightness steps behave more predictably than older color models.

## Skills Covered

The demo enumerates a small stack of design and frontend quality skills:

- `impeccable`
- `frontend-design`
- `make-interfaces-feel-better`
- `web-design-guidelines`
- `userinterface-wiki`
- `accessibility`
- `core-web-vitals`
- `react-best-practices`
- `imagegen`

The page presents these as a workflow: Impeccable supplies taste, refusal rules, and context loading; DESIGN.md supplies portable design memory; focused quality skills cover accessibility, Core Web Vitals, React performance, UI mechanics, and visual craft.

## DESIGN.md Linting

The repo includes a sample [DESIGN.md](./DESIGN.md). The page features the standard lint command:

```bash
npx @google/design.md lint DESIGN.md
```

That check catches invalid token values, missing foundations, broken references, and contrast issues before agents reuse bad design context.

## Development

```bash
npm install
npm run dev
npm run build
```

Firebase Hosting serves the production build from `dist/`.
