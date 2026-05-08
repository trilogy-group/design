# Design Standards and Skills for Less Generic UI Agents

In a recent AI Center of Excellence Office Hours workshop, I wanted to answer a practical question: how do you get good interface design from an AI coding agent when you are not a designer?

That question matters because a lot of AI-generated web interfaces used to have the same tells. Purple gradients. Glassy panels. Repeated card grids. Big empty hero sections. It was the visual equivalent of filler prose: recognizable, overused, and weakly connected to the product being built.

I demoed a combination of agent skills and a design standard. Skills give the agent design habits. A `DESIGN.md` file gives the agent design memory. Together, they make UI work easier to brief, easier to review, and less likely to drift across sessions.

The demo site from the workshop is live at [design.trilogyai.co](https://design.trilogyai.co/), with source at [github.com/trilogy-group/design](https://github.com/trilogy-group/design).

The workshop recording is embedded here for readers who want to see the demo before reading the breakdown.

<iframe width="560" height="315" src="https://www.youtube.com/embed/j_ghsM_4MZY" title="Design Standards and Skills workshop recording" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Skills Give Agents Better Defaults

Agent skills are local instruction packages that an agent can discover and load when a task calls for them. They can include workflow rules, review checklists, examples, anti-patterns, scripts, and commands.

The important part is that skills do not have to be used only through explicit commands. If the skill is installed and discoverable, the agent can use it implicitly. You can ask for a page, a React component, a design review, or a polish pass, and the agent can pull in the right skill guidance through progressive disclosure.

For the workshop, I used a small stack of design and quality skills:

- [Impeccable](https://impeccable.style/) supplies taste, product context loading, register selection, and anti-pattern checks for frontend work.
- [frontend-design](https://github.com/anthropics/skills/tree/main/skills/frontend-design) helps turn a brief into a visually specific interface instead of a neutral template.
- [make-interfaces-feel-better](https://github.com/jakubkrehel/make-interfaces-feel-better) covers craft details like optical alignment, word wrapping, button tactility, and motion feel.
- [web-design-guidelines](https://github.com/vercel-labs/agent-skills/tree/main/skills/web-design-guidelines) checks practical implementation details such as semantic HTML, focus states, image dimensions, and avoidable frontend mistakes.
- [userinterface-wiki](https://github.com/raphaelsalaja/userinterface-wiki) brings interface principles for motion, typography, interaction, and content handling.
- [accessibility](https://github.com/addyosmani/web-quality-skills/tree/main/skills/accessibility) applies WCAG checks so the interface works with assistive technology.
- [core-web-vitals](https://github.com/addyosmani/web-quality-skills/tree/main/skills/core-web-vitals) focuses on LCP, INP, and CLS, which respectively measure main content render time, response to input, and unexpected layout movement.
- [react-best-practices](https://github.com/vercel-labs/agent-skills/tree/main/skills/react-best-practices) helps avoid unnecessary re-renders, heavy client work, and bundle choices that slow a small SPA.
- [imagegen](https://github.com/openai/codex/tree/main/codex-rs/skills/src/assets/samples/imagegen) lets the agent create a real visual asset instead of leaving a placeholder.

The result was a single-page React demo built in a few minutes from one prompt. The page had a generated hero image, semantic landmarks, explicit image dimensions, focus states, short teaching sections, and a visual system that felt like a printed design workbench rather than a generic SaaS template.

That is the point of the skill stack. It gives non-specialists access to expert design defaults. You still need taste and review, but the agent starts from a much better place.

## DESIGN.md Gives Agents Design Memory

Skills help the agent behave better. A design standard gives the agent something stable to read.

[Google Stitch](https://stitch.withgoogle.com/) is Google Labs' AI interface-design tool. Inside Stitch, `DESIGN.md` lets a project import and export design rules so the tool can generate UI that matches the brand instead of guessing. Google has since open-sourced the draft [DESIGN.md standard](https://github.com/google-labs-code/design.md), so the same file can be used by coding agents and other tools outside Stitch.

A `DESIGN.md` file describes a design system in a repo. The file starts with YAML front matter containing design facts: colors, typography, spacing, radius, and component tokens. Below that, Markdown explains the rationale: what the design should feel like, how the colors are used, what typography roles mean, and what to avoid.

That split is useful. Tokens give the agent exact values. Rationale gives the agent judgment.

Design tokens are named design decisions. A token might say that the primary action color is `clay`, the base background is `paper`, or the small radius is `4px`. Instead of copying one-off CSS values, the agent can reuse names that carry intent. A token says, in effect, "this value belongs to this role."

The workshop also introduced [OKLCH](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/oklch), a modern CSS color format that separates lightness, chroma, and hue. OKLCH makes it easier to create palettes where brightness behaves predictably across colors. That matters for contrast, hierarchy, and accessibility.

One caveat is already being addressed upstream: the Google DESIGN.md tooling started with conservative color support, while modern interface work increasingly uses OKLCH. [Issue #27](https://github.com/google-labs-code/design.md/issues/27) tracks OKLCH support, and an open PR is already working on it. For teams adopting the workflow now, the practical rule is simple: use OKLCH where it helps the implementation, keep `DESIGN.md` compatible with the current tooling, and expect the standard to get better here.

## Linting Makes Design Reviewable

One of the most interesting parts of DESIGN.md is that it can be linted.

The workshop demo used this command:

```bash
npx @google/design.md lint DESIGN.md
```

That moves design context closer to the kind of workflow engineers already understand. A design file can fail a check because it has invalid token values, missing foundations, broken references, section-order problems, or contrast issues. The useful check is simple: can agents and humans inspect the design context before it spreads through the product?

Once a repo has a `DESIGN.md`, design choices become diffable. If the accent color changes, the change is visible. If a component token disappears, a check can catch it. If a later agent starts inventing new colors, the design file gives the next agent a reason to pull the work back into the system.

This is where Impeccable and DESIGN.md fit well together. Impeccable can create and read `PRODUCT.md` and `DESIGN.md`, reject common UI anti-patterns, and run critique, audit, adapt, polish, and performance passes. DESIGN.md stores the facts and rationale those passes should respect.

## Automatic Defaults, Explicit Control

There are two layers to this setup.

The first layer is the normal workflow. Install the skills, then ask for the page, component, review, or fix in ordinary language. If the request is design-related, Impeccable's general invocation runs its setup gates: load `PRODUCT.md` and `DESIGN.md`, identify the right register, apply shared design laws, and pull in the brand or product reference for the surface being changed.

If `PRODUCT.md` is missing or empty, Impeccable treats that as a blocker and runs `teach` before continuing. That flow explores the repo, asks only for strategic facts it cannot infer, writes product context, refreshes the loader, and then resumes the original task. If `DESIGN.md` is missing, the skill nudges once to run `document`, which can scan the existing codebase for colors, typography, spacing, radii, and components, or seed a starter design file before implementation.

That was the behavior in the demo: support files and checks appeared as part of the agent doing the job, not because I hand-authored the setup sequence.

The installation prompt can be simple:

```text
Install and make use of the following skills:

impeccable skill from https://github.com/pbakaus/impeccable
make-interfaces-feel-better from https://github.com/jakubkrehel/make-interfaces-feel-better
web-design-guidelines from https://github.com/vercel-labs/agent-skills/tree/main/skills/web-design-guidelines
userinterface-wiki from https://github.com/raphaelsalaja/userinterface-wiki
accessibility, best-practices, core-web-vitals, performance, and seo from https://github.com/addyosmani/web-quality-skills/tree/main/skills
react-best-practices
imagegen from https://github.com/openai/codex/tree/main/codex-rs/skills/src/assets/samples/imagegen

Google's DESIGN.md standard https://github.com/google-labs-code/design.md
(can be aligned with impeccable's DESIGN.md)
```

That automatic layer is what makes skills especially useful. You do not need to remember every command. You do not need to know which checklist mentions focus states or which skill covers image dimensions. You do not need to explicitly request context files, design documentation, linting, critique, or polish before they can appear in the workflow. The agent can load the relevant guidance and choose the right supporting actions when the task points in that direction.

The second layer is explicit control. Impeccable also exposes named commands: `teach`, `document`, `shape`, `craft`, `critique`, `audit`, `polish`, `adapt`, `optimize`, `typeset`, `layout`, and several others. If the first word of the request matches a command, the agent loads that command reference and follows its workflow. `craft`, for example, requires a confirmed shape brief, visual direction when image generation is available, browser inspection, and at least one critique-and-fix loop unless the first pass has no material defects.

That explicit layer is useful for control and repeatability. A team can steer Impeccable's register choices, ask for a named audit, request a targeted polish pass, inspect the generated `PRODUCT.md` and `DESIGN.md`, or add `npx @google/design.md lint DESIGN.md` to CI. It is not a prerequisite for getting value.

## What Becomes Agentifiable

If agents can absorb so much expert design knowledge, do teams still need designers?

Frontend implementation is becoming agentifiable. CSS, HTML, React structure, image handling, accessibility checks, core web principles, and many craft details can now be handled by agents with the right skills and standards.

Design judgment still matters. A strong designer still matters for product taste, research, brand, hard tradeoffs, and choosing what the experience should be. Teams should expect agents to handle more of the translation from intent into interface, especially when the repo contains the right design memory.

The same pattern is starting to appear outside web UI. In the workshop, I closed with a short demo of a just-launched AI-assisted architectural design: sketch an idea, describe changes, and watch agents turn that intent into editable 3D structure. The details differ, but the direction is similar. The user spends less energy operating the tool and more energy specifying the desired outcome.

## A Practical Starting Point

For a product team, the smallest starting point is almost boring:

1. Install the design and quality skills where your agent can find them.
2. Keep asking for pages, components, and reviews in ordinary language.
3. Let the installed skills run their setup gates, ask for missing context when needed, create or refresh support files when the workflow calls for them, and apply their defaults.
4. Review the output and the generated artifacts the way you normally would, with the agent already carrying more design context than a bare prompt.

That is enough to begin. You do not have to manually add `PRODUCT.md`, write a `DESIGN.md`, run the linter, or remember the exact names of critique, polish, audit, adapt, or performance commands before the skills start helping. The defaults are part of the value.

The advanced workflow comes later. Once a product or team needs design memory across sessions, inspect the files and checks the agent has introduced, tighten them, and decide which parts should become team policy. That may include keeping `PRODUCT.md` and `DESIGN.md` under review, aligning `DESIGN.md` with Google's standard, and adding this command to CI:

```bash
npx @google/design.md lint DESIGN.md
```

At that point, the explicit Impeccable flows become useful for shaping a register, critiquing a design, adapting an existing interface, polishing details, and checking performance. The team can start with automatic help and grow into an interactive design workflow when the work deserves it.

That is the shift I wanted to show in the workshop. Better UI from agents comes from giving the agent better defaults, better memory, and better checks.
