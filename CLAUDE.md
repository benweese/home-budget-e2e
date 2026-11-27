# home-budget-e2e

Private; may go public once a gitleaks scan, secret scanning + push protection and code scanning are on (Ben
decides). Playwright end-to-end and accessibility tests for
[home-budget](https://github.com/benweese/home-budget) (iPhone, iPad, desktop). Read README.md first.

## Rules

- **Public code, no personal data:** no real amounts, names, account or card numbers, emails, addresses or
  production domains in tests, fixtures, snapshots, docs or commits. Test data is fictional.
- **One exception:** the app's name "Budget Ben" (the owner's first name, chosen as the brand) may appear in
  tests and snapshots, e.g. checking the page title. No other real names, ever.
- **No references to private trackers** in commits, PRs or code (no issue numbers from elsewhere).
  Branches use this repo's own issue numbers.
- Tests run against home-budget's local `wrangler dev` (later the demo), **never production**.
- Locators: role / label first; `data-testid` only where a role or label is ambiguous.
- Accessibility target: WCAG 2.2 AA plus home-budget's docs/accessibility.md. Reports say "no automated
  violations found", never "accessible".

## Tests

- `playwright.config.ts`: projects iphone / ipad (WebKit) and desktop (Chromium); `webServer` starts home-budget's
  `wrangler dev` from `APP_DIR` (default `../home-budget`, built first). Device-only tests use the
  `@iphone-only` / `@desktop-only` tags (no `test.skip`). Number new tests after the highest `#NNNN`.
- WebKit isn't supported on every Linux distro: use `npm run test:docker` (image pinned in
  `.github/docker/playwright`, must match `@playwright/test`).
- Before every PR: `npm run lint`, `npm run typecheck`, `npm run format:check`, `npm test` (or test:docker).

## Workflow

- PR titles are Conventional Commits; squash merge only.
- Claude plugins (benweese marketplace): qa (test-file hook + auto review on, `.claude/qa.json`), docs,
  workflow, accessibility, privacy, guardrails — see README.
- `.claude/board.json`, `.claude/privacy.json` and `.claude/qa/` (saved requirements) are local only
  (gitignored); never commit them.
- A privacy or secret block on commit is a real finding: fix the line, never bypass it.
