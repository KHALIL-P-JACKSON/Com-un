# Com-un

A React + TypeScript + Vite starter connecting small businesses, churches, schools, and organizations with their community.

## Run locally

Use **Node 24 LTS** and npm:

```sh
npm ci
npm run dev
```

The app includes a searchable community feed, internship discovery, a Leaflet/OpenStreetMap event map with an accessible companion list, details, and browser-local saves. All Atlanta organizations and listings are **illustrative**. No backend, accounts, real registrations, or applications are connected. Map tiles require internet access and are subject to OpenStreetMap's usage policy; use an appropriate tile provider before scaling.

## Quality bar

```sh
npm run check
npx playwright install chromium
npm run test:e2e
```

CI runs on every push, every PR target branch, and merge-queue groups. It enforces formatting, zero-warning lint, strict TypeScript, **80% coverage for each metric per source file**, production build, desktop/mobile browser flows, automated WCAG AA scans, and high/critical dependency auditing. Coverage and browser reports are retained as build artifacts. `Quality gate` fails if any dependency job fails or is skipped, giving branch rules one stable required check.

## GitHub activation

The files alone do not enable repository settings or install GitHub Apps. After pushing the starter:

1. Install [CodeRabbit](https://github.com/apps/coderabbitai) for this repository. `.coderabbit.yaml` enables PR reviews against **all target branches**, including drafts and incremental pushes. CodeRabbit reviews pull requests, not standalone branch pushes. It generates PR summaries via the template's `@coderabbitai summary` placeholder. Feature availability depends on the installed plan.
2. Import `.github/rulesets/default-branch.json` in **Settings → Rules → Rulesets** (or use the GitHub API). It requires a PR, resolved review threads, an up-to-date passing `Quality gate`, linear history, and blocks force-push/deletion. Human approvals start at zero for solo development; require one when another maintainer joins. Ruleset availability depends on repository visibility and GitHub plan. Run CI once first so the check exists.
3. Enable squash merging and automatic branch deletion in repository settings. Disable other merge methods to keep linear history. Enable Dependabot alerts/security updates and private vulnerability reporting where available.
4. For GitHub Pages CD, select **Settings → Pages → Source: GitHub Actions**, and set the repository Actions variable **`ENABLE_PAGES=true`**. Permit deployment from the default branch in the `github-pages` environment. A successful push to the default branch then deploys the exact checked build, using job-scoped Pages/OIDC permissions. For a custom domain or root deployment, adjust `VITE_BASE_PATH` in CI. GitHub Pages publication is a public website on eligible repositories; enabling it is an explicit hosting decision.

Dependabot checks npm and Actions every Monday at **09:00 America/New_York** (GitHub may also run an initial check when the config is added). Minor/patch updates are grouped; major updates remain separate except coordinated React and Vitest packages, which update together to avoid incompatible peers. Actions are pinned to immutable SHAs, which Dependabot can update. Local hooks run staged lint/formatting and pre-push checks. See [CONTRIBUTING.md](CONTRIBUTING.md) for the team workflow and [SECURITY.md](SECURITY.md) for reporting.

## Project structure

`src/data.ts` holds typed demo content and filtering, `src/saved.ts` handles resilient local persistence, `src/EventMap.tsx` renders the map, and `src/App.tsx` composes the views. Unit/integration tests live beside source; `e2e/` holds browser tests. `.github/` contains workflows, dependency updates, templates, ownership, and an importable ruleset.

Next product decisions: real listings and moderation, verified organizations, authentication, internship applications, location search, and a production map provider. This starter deliberately leaves those integrations open.
