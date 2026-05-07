import { StrictMode, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowUpRight,
  Check,
  ChevronRight,
  ClipboardCheck,
  Code2,
  Copy,
  Gauge,
  Image,
  Keyboard,
  LayoutDashboard,
  Paintbrush,
  Sparkles,
  WandSparkles,
} from "lucide-react";
import heroWorkbench from "./assets/hero-workbench.webp";
import "./styles.css";

type SegmentKey = "judgment" | "format" | "pipeline";

type Skill = {
  name: string;
  sourceUrl: string;
  role: string;
  use: ReactNode;
  accent: "clay" | "cobalt" | "brass" | "fern";
};

const skills: Skill[] = [
  {
    name: "impeccable",
    sourceUrl: "https://github.com/pbakaus/impeccable",
    role: "Design judgment",
    use: "Loads PRODUCT.md and DESIGN.md, rejects common AI UI patterns, then pushes the interface toward a specific register.",
    accent: "clay",
  },
  {
    name: "frontend-design",
    sourceUrl: "https://github.com/anthropics/skills/tree/main/skills/frontend-design",
    role: "Visual direction",
    use: "Turns a brief into a distinctive working interface with a committed aesthetic instead of a neutral template.",
    accent: "brass",
  },
  {
    name: "make-interfaces-feel-better",
    sourceUrl: "https://github.com/jakubkrehel/make-interfaces-feel-better",
    role: "Craft details",
    use: "Adds the small things users feel: optical alignment, tactile buttons, exact transitions, and stable hit areas.",
    accent: "fern",
  },
  {
    name: "web-design-guidelines",
    sourceUrl: "https://github.com/vercel-labs/agent-skills/tree/main/skills/web-design-guidelines",
    role: "Implementation review",
    use: "Checks semantic HTML, focus states, image dimensions, reduced motion, and avoidable frontend mistakes.",
    accent: "cobalt",
  },
  {
    name: "userinterface-wiki",
    sourceUrl: "https://github.com/raphaelsalaja/userinterface-wiki",
    role: "UX mechanics",
    use: "Keeps motion, typography, interaction laws, and content handling tied to established interface rules.",
    accent: "brass",
  },
  {
    name: "accessibility",
    sourceUrl: "https://github.com/addyosmani/web-quality-skills/tree/main/skills/accessibility",
    role: "WCAG lens",
    use: "Checks that the page is perceivable, operable, understandable, and robust for assistive technology.",
    accent: "fern",
  },
  {
    name: "core-web-vitals",
    sourceUrl: "https://github.com/addyosmani/web-quality-skills/tree/main/skills/core-web-vitals",
    role: "Page quality",
    use: (
      <>
        Protects <MetricTip acronym="LCP" definition="Largest Contentful Paint measures when the main visible content finishes rendering." />,{" "}
        <MetricTip acronym="INP" definition="Interaction to Next Paint measures how quickly the page responds to user input." />, and{" "}
        <MetricTip acronym="CLS" definition="Cumulative Layout Shift measures unexpected movement in the page layout." /> with fast images, stable layout, and cheap interactions.
      </>
    ),
    accent: "cobalt",
  },
  {
    name: "react-best-practices",
    sourceUrl: "https://github.com/vercel-labs/agent-skills/tree/main/skills/react-best-practices",
    role: "React performance",
    use: "Avoids unnecessary re-renders, heavy client work, and bundle choices that slow a small SPA.",
    accent: "fern",
  },
  {
    name: "imagegen",
    sourceUrl: "https://github.com/openai/codex/tree/main/codex-rs/skills/src/assets/samples/imagegen",
    role: "Visual asset",
    use: "Creates a site-specific banner image so the page teaches with a concrete artifact, not a placeholder.",
    accent: "clay",
  },
];

const segments: Record<SegmentKey, { label: string; title: string; body: string }> = {
  judgment: {
    label: "01",
    title: "Impeccable supplies taste and refusal rules.",
    body:
      "It asks for product context, register, tokens, and a shape before code. Then it checks for slop patterns such as gradient text, glass panels, generic card grids, and unsupported copy.",
  },
  format: {
    label: "02",
    title: "DESIGN.md supplies portable design memory.",
    body:
      "Google's format combines YAML front matter for exact tokens with markdown sections for rationale. Agents get values and the reason those values exist.",
  },
  pipeline: {
    label: "03",
    title: "Together, they make agent output reviewable.",
    body:
      "DESIGN.md can be linted, diffed, and exported. Impeccable can use that context to critique, adapt, polish, and keep the UI from drifting across sessions.",
  },
};

const implementationHint = `impeccable skill from https://github.com/pbakaus/impeccable
make-interfaces-feel-better from https://github.com/jakubkrehel/make-interfaces-feel-better
web-design-guidelines from https://github.com/vercel-labs/agent-skills/tree/main/skills/web-design-guidelines
userinterface-wiki from https://github.com/raphaelsalaja/userinterface-wiki
accessibility, best-practices, core-web-vitals, performance, and seo from https://github.com/addyosmani/web-quality-skills/tree/main/skills
react-best-practices
imagegen from https://github.com/openai/codex/tree/main/codex-rs/skills/src/assets/samples/imagegen

Google's DESIGN.md standard https://github.com/google-labs-code/design.md
(can be aligned with impeccable's DESIGN.md)`;

const implementationPrompt = `Install and make use of the following skills:

${implementationHint}`;

function App() {
  const [activeSegment, setActiveSegment] = useState<SegmentKey>("judgment");
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const selected = segments[activeSegment];
  const groupedSkills = useMemo(
    () => ({
      craft: skills.filter((skill) => ["impeccable", "frontend-design", "make-interfaces-feel-better", "imagegen"].includes(skill.name)),
      quality: skills.filter((skill) => ["web-design-guidelines", "userinterface-wiki", "accessibility"].includes(skill.name)),
      performance: skills.filter((skill) => ["core-web-vitals", "react-best-practices"].includes(skill.name)),
    }),
    [],
  );

  const copyImplementationPrompt = async () => {
    try {
      await navigator.clipboard.writeText(implementationPrompt);
      setCopiedPrompt(true);
      window.setTimeout(() => setCopiedPrompt(false), 1800);
    } catch {
      setCopiedPrompt(false);
    }
  };

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <header className="topbar" aria-label="Site navigation">
        <a className="brand-mark" href="#hero" translate="no">
          <span>IM</span>
          <strong>DESIGN.md</strong>
        </a>
        <nav aria-label="Page sections">
          <a href="#alignment">Alignment</a>
          <a href="#linting">Lint</a>
          <a href="#skills">Skills</a>
          <a href="#implementation">Prompt</a>
        </nav>
      </header>

      <main id="main">
        <section className="hero" id="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">Impeccable + DESIGN.md</p>
            <h1 id="hero-title">Design Skills and Standards</h1>
            <p className="lede">
              DESIGN.md stores the design system. Impeccable and focused frontend skills use that memory to shape, audit, and polish interfaces before they drift into agent-made sameness.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#alignment">
                See The Connection
                <ChevronRight aria-hidden="true" size={18} />
              </a>
              <a
                className="button secondary"
                href="https://github.com/google-labs-code/design.md"
                target="_blank"
                rel="noreferrer"
              >
                Open DESIGN.md
                <ArrowUpRight aria-hidden="true" size={17} />
              </a>
            </div>
          </div>
          <figure className="hero-media">
            <img
              src={heroWorkbench}
              width="1672"
              height="941"
              fetchPriority="high"
              alt="Illustrated design-system workbench with token sheets, color chips, contrast gauges, motion strips, and a DESIGN.md page inspected by Impeccable."
            />
          </figure>
        </section>

        <section className="standard-strip" aria-label="DESIGN.md format summary">
          <div>
            <span className="strip-label">DESIGN.md</span>
            <p>YAML tokens at the top. Markdown rationale below. CLI checks for broken references, missing foundations, section order, and contrast issues.</p>
            <p>
              <a href="https://www.designtokens.org/" target="_blank" rel="noreferrer">
                Tokens
              </a>{" "}
              are named design decisions such as color, spacing, type, and radius.{" "}
              <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/oklch" target="_blank" rel="noreferrer">
                OKLCH
              </a>{" "}
              is a CSS color format that separates lightness, chroma, and hue for more predictable palettes.
            </p>
          </div>
          <div>
            <span className="strip-label clay">Impeccable</span>
            <p>
              <a href="https://impeccable.style/" target="_blank" rel="noreferrer">
                Impeccable
              </a>{" "}
              adds a context loader, register choice, anti-pattern bans, and polish, audit, adapt, clarify, typeset, and performance commands for frontend work.
            </p>
          </div>
        </section>

        <section className="alignment" id="alignment" aria-labelledby="alignment-title">
          <div className="section-kicker">Alignment</div>
          <h2 id="alignment-title">One file stores facts. One skill protects craft.</h2>
          <div className="alignment-grid">
            <div className="control-panel" aria-label="Alignment selector">
              {(Object.keys(segments) as SegmentKey[]).map((key) => (
                <button
                  className={key === activeSegment ? "segment active" : "segment"}
                  key={key}
                  type="button"
                  aria-pressed={key === activeSegment}
                  onClick={() => setActiveSegment(key)}
                >
                  <span>{segments[key].label}</span>
                  {segments[key].title}
                </button>
              ))}
            </div>
            <article className="selected-panel" aria-live="polite">
              <p className="panel-number">{selected.label}</p>
              <h3>{selected.title}</h3>
              <p>{selected.body}</p>
            </article>
          </div>
        </section>

        <section className="linting" id="linting" aria-labelledby="linting-title">
          <div>
            <div className="section-kicker">DESIGN.md Component</div>
            <h2 id="linting-title">Lint the design file like source code.</h2>
            <p>
              The standard ships with a CLI check. It catches invalid token values, missing foundations, broken references, and contrast issues before an agent copies bad context into the UI.
            </p>
          </div>
          <div className="lint-card">
            <div className="lint-card-heading">
              <Code2 aria-hidden="true" size={22} />
              <span>Sample command</span>
            </div>
            <code>npx @google/design.md lint DESIGN.md</code>
          </div>
        </section>

        <section className="skills" id="skills" aria-labelledby="skills-title">
          <div className="section-kicker">Skill Map</div>
          <h2 id="skills-title">The skill stack, in plain terms.</h2>
          <div className="skill-columns">
            <SkillGroup
              icon={<WandSparkles aria-hidden="true" size={22} />}
              title="Craft"
              skills={groupedSkills.craft}
            />
            <SkillGroup
              icon={<ClipboardCheck aria-hidden="true" size={22} />}
              title="Quality"
              skills={groupedSkills.quality}
            />
            <SkillGroup
              icon={<Gauge aria-hidden="true" size={22} />}
              title="Speed"
              skills={groupedSkills.performance}
            />
          </div>
        </section>

        <section className="evidence" aria-labelledby="evidence-title">
          <div>
            <div className="section-kicker">Design Moves Used Here</div>
            <h2 id="evidence-title">Each requested skill leaves a visible trace.</h2>
          </div>
          <ul className="evidence-list">
            <li>
              <Paintbrush aria-hidden="true" size={20} />
              <span>Distinctive art direction, tinted paper, and a generated hero image.</span>
            </li>
            <li>
              <LayoutDashboard aria-hidden="true" size={20} />
              <span>Full-width bands and annotated rows instead of a same-sized card wall.</span>
            </li>
            <li>
              <Keyboard aria-hidden="true" size={20} />
              <span>Semantic landmarks, skip link, focus rings, alt text, and keyboard-friendly controls.</span>
            </li>
            <li>
              <Image aria-hidden="true" size={20} />
              <span>Explicit image dimensions and a preloaded above-fold asset to reduce layout shift.</span>
            </li>
            <li>
              <Sparkles aria-hidden="true" size={20} />
              <span>Short explanations written for readers, not for a generic landing page.</span>
            </li>
          </ul>
        </section>

        <section className="adoption" aria-labelledby="adoption-title">
          <div className="section-kicker">Adoption Model</div>
          <h2 id="adoption-title">Explicit when you need it. Useful by default.</h2>
          <p>
            Skill commands and DESIGN.md linting can be run intentionally during shaping, review, and release. The defaults still matter: once the skills are installed, agents begin reading the context, applying the rules, and nudging work toward better design without requiring a new ritual for every task.
          </p>
        </section>

        <section className="implementation" id="implementation" aria-labelledby="implementation-title">
          <div className="section-kicker">Implementation Hint</div>
          <h2 id="implementation-title">Prompt the agent with the sources.</h2>
          <p>
            Use this block when you want another coding agent to install the same skills, read the same standards, and keep Impeccable aligned with Google's DESIGN.md format.
          </p>
          <div className="hint-shell">
            <button
              className="copy-button"
              type="button"
              aria-label={copiedPrompt ? "Prompt copied" : "Copy implementation prompt"}
              onClick={copyImplementationPrompt}
            >
              {copiedPrompt ? <Check aria-hidden="true" size={20} /> : <Copy aria-hidden="true" size={20} />}
            </button>
            <pre className="hint-block">
              <code>{implementationPrompt}</code>
            </pre>
          </div>
          <p className="copy-status" aria-live="polite">
            {copiedPrompt ? "Prompt copied to clipboard." : ""}
          </p>
        </section>
      </main>
    </>
  );
}

function MetricTip({ acronym, definition }: { acronym: string; definition: string }) {
  const tooltipId = `${acronym.toLowerCase()}-definition`;

  return (
    <abbr className="metric-tip" tabIndex={0} aria-label={`${acronym}: ${definition}`} aria-describedby={tooltipId}>
      {acronym}
      <span className="metric-tip-bubble" id={tooltipId} role="tooltip">
        {definition}
      </span>
    </abbr>
  );
}

function SkillGroup({ icon, title, skills: groupSkills }: { icon: ReactNode; title: string; skills: Skill[] }) {
  return (
    <section className="skill-group" aria-labelledby={`${title.toLowerCase()}-skills`}>
      <h3 id={`${title.toLowerCase()}-skills`}>
        {icon}
        {title}
      </h3>
      <ol>
        {groupSkills.map((skill) => (
          <li key={skill.name} className={`skill-row ${skill.accent}`}>
            <div>
              <a href={skill.sourceUrl} target="_blank" rel="noreferrer" translate="no">
                {skill.name}
                <ArrowUpRight aria-hidden="true" size={14} />
              </a>
              <span>{skill.role}</span>
            </div>
            <p>{skill.use}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
