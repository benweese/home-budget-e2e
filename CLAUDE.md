# home-budget-e2e

Public repo: Playwright end-to-end and accessibility tests for
[home-budget](https://github.com/benweese/home-budget) (iPhone, iPad, desktop). Read README.md first.

## Rules

- **Public code, no personal data:** no real amounts, names, account or card numbers, emails, addresses or
  production domains in tests, fixtures, snapshots, docs or commits. Test data is fictional.
- **No references to private trackers** in commits, PRs or code (no issue numbers from elsewhere).
- Tests run against home-budget's local `wrangler dev` (later the demo), **never production**.
- Locators: role / label first; `data-testid` only where a role or label is ambiguous.
- Accessibility target: WCAG 2.2 AA plus home-budget's docs/accessibility.md. Reports say "no automated
  violations found", never "accessible".

## Workflow

- PR titles are Conventional Commits; squash merge only.
- Claude plugins (benweese marketplace): qa (test-file hook + auto review on, `.claude/qa.json`), docs,
  workflow, accessibility, privacy, guardrails — see README.
- `.claude/board.json` and `.claude/qa/` (saved requirements) are local only (gitignored); never commit them.
- A privacy or secret block on commit is a real finding: fix the line, never bypass it.
