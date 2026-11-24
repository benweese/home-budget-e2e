# home-budget-e2e

[![OpenSSF Scorecard](https://api.scorecard.dev/projects/github.com/benweese/home-budget-e2e/badge)](https://scorecard.dev/viewer/?uri=github.com/benweese/home-budget-e2e)

Playwright end-to-end and accessibility tests for [home-budget](https://github.com/benweese/home-budget) (iPhone, iPad, desktop).

**Status: early — not ready to use.** The project is being set up; there are no tests yet.

## Claude Code

The repo uses the [benweese plugins](https://github.com/benweese/claude-plugins): qa, docs, workflow,
accessibility, privacy and guardrails (`.claude/settings.json`). Install them once from a terminal
(`claude plugin install <name>@benweese`), then start a new session.

- **qa** (`.claude/qa.json`): after a test file is edited, it's linted and checked with
  `playwright test --list`; after a green run, the tests are reviewed against the saved request. Saved
  requests live in `.claude/qa/` (gitignored).
- **Commit blockers:** `.claude/privacy.json` blocks personal data and `.claude/guardrails.json` blocks
  secrets before Claude commits. The privacy denylist lives outside the repo (a sibling folder, never
  committed); without it the scan says "denylist skipped" and still runs. For commits made outside Claude,
  run `install-privacy-git-hook` once, and again after each privacy plugin update.
- **`.claude/board.json` is local only** (gitignored): it's the maintainer's task-board config.
- Accessibility rules: WCAG 2.2 AA plus
  [home-budget's docs/accessibility.md](https://github.com/benweese/home-budget/blob/main/docs/accessibility.md).

## License

[MIT](LICENSE)
