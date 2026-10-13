# Contributing to Com-un

Use Node 24 LTS (see `.nvmrc`) and `npm ci`. Run `npm run dev` for the app. Before your first browser test, run `npx playwright install chromium`.

Create a short-lived branch (`feat/community-search`, `fix/map-controls`, or `codex/...`), keep changes focused, and open a PR. Explain the problem, include relevant screenshots, and link the issue. Use a conventional title such as `feat: add organization profiles`; squash merging keeps history readable. CodeRabbit generates a summary; still fill in the problem and validation evidence yourself.

`npm run check` runs formatting, lint, TypeScript, coverage, and a production build. `npm run test:e2e` checks real browser flows on desktop and mobile, including automated accessibility checks. CI also audits all dependencies for high/critical vulnerabilities. Required coverage is **80% for statements, branches, functions, and lines, per source file**. Only the bootstrapping entry and tests are excluded. Do not lower coverage or add exclusions to get a PR through; test meaningful behavior and failure paths.

Pre-commit formats and lints staged files. Pre-push runs `npm run check`. Hooks are a convenience; CI remains the enforcement boundary. Fork PRs run with read-only permissions and no deployment credentials. We intentionally do not auto-approve or auto-merge dependency updates.

Use sample content without presenting it as verified. The current listings do not represent actual events, employers, or internship offers. Keep category labels visible, map discovery accessible through its list, and controls usable by keyboard. Browser saves are local, not accounts.

Update CODEOWNERS as the team grows. Ask for review, resolve conversations, and merge only after `Quality gate` passes. For the first solo-maintainer phase, the ruleset's one-review requirement may need an explicit team decision; GitHub authors cannot approve their own PRs.
