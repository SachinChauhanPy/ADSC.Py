# Fimo project

This is a Fimo project — a content + media + forms + analytics platform for web applications with a CMS
dashboard. Fimo owns everything after the build: content, editing, environments, and hosting stay
editable by the whole team.

When asked to create or manage an agent in this project, use Fimo's agent workflow.

## Load the Fimo skills before doing Fimo work

Before writing schema-driven code, running CLI/deploy workflows, or migrating content, load only the
skill relevant to the task:

```bash
pnpm exec fimo skills get fimo-code   # match the lockfile; code + framework APIs come from this project runtime
npx fimo@latest skills get fimo-cli   # operational workflows: push, deploy, labels, domains
```

Use `npm exec fimo`, `yarn fimo`, or `bunx --no-install fimo` instead of `pnpm exec fimo` when that
matches the project lockfile. Add `--ref <doc>` for one reference at a time. Do not load `fimo-cli` for
a code-only task, or use `npx fimo@latest` for project-local code generation and validation.

## Critical: never hardcode user-facing things

Fimo's whole point is that editors change content in the dashboard, not in code. Anything hardcoded
breaks that. Load `fimo-code` for the exact primitives, but the rule is:

- **Content** → declare a schema, use its generated client, and render with the active framework adapter. Never `const posts = [...]` in JSX.
- **Strings** → `t('key')` + `fimo labels set`. Never `<h1>Welcome</h1>`.
- **Media** → `<Image>` / `<Video>` from the active framework adapter. Never `<img src>` for tracked media.
- **Forms** → the generated Zod schema + `submitX` helper. Never hand-roll fetch/validation.

## Development loop

1. Start the dev server with the project's package manager (`pnpm dev`, `npm run dev`, …) — live reload on localhost.
2. Make edits; the running server shows them instantly. No deploy needed to see local changes.
3. When a unit of work is done, **offer** to deploy: `fimo deploy` for a hosted preview / shareable link, or `fimo deploy --publish` to go live. Only after the developer confirms — never deploy on your own.

## Project rules

- **Deploy is on-demand**, not a save step. Batch related edits into one deploy.
- Do not add a second deploy tool (Vercel, Netlify, etc.).
- **Never edit `.fimo/project.json`** — it links this folder to the remote project.
- The scaffolded homepage is disposable starter content. Replace it on the first real generation.
- **Secrets live in the Fimo dashboard**, not in a committed `.env`.
- When scripting, pass flags to `fimo` commands (`fimo deploy -m "…"`, `fimo delete -y`) — bare interactive forms hang in non-TTY shells.
