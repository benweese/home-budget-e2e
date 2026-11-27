# home-budget-e2e

[![OpenSSF Scorecard](https://api.scorecard.dev/projects/github.com/benweese/home-budget-e2e/badge)](https://scorecard.dev/viewer/?uri=github.com/benweese/home-budget-e2e)

Playwright end-to-end and accessibility tests for [home-budget](https://github.com/benweese/home-budget) (iPhone, iPad, desktop).

## Run the tests

Needs Node 24 and a built [home-budget](https://github.com/benweese/home-budget) checkout next to this repo
(`npm ci && npm run app:build` there). Playwright starts its `wrangler dev` itself; nothing touches production.

```sh
npm ci
npm test                 # all projects: iphone (WebKit), ipad (WebKit), desktop (Chromium)
npm test -- --project=desktop
npm run test:docker      # same suite in the official Playwright image (for Linux distros WebKit doesn't support)
APP_DIR=/path/to/home-budget npm test
```

| Project   | Device               | Covers                                                    |
| --------- | -------------------- | --------------------------------------------------------- |
| `iphone`  | iPhone 15 (WebKit)   | smoke, axe, Increase Contrast, 310% text, 1-column layout |
| `ipad`    | iPad Pro 11 (WebKit) | smoke, axe, 2-column layout                               |
| `desktop` | Chromium, 1280×800   | smoke, axe, forced colours, 3-column layout               |

Tests are numbered (`#0001`) and tagged (`@smoke`, `@a11y`, `@layout`; `@iphone-only` / `@desktop-only` pick
the project). Accessibility scans use [playwright-test-commons](https://github.com/benweese/playwright-test-commons)'
`expectNoA11yViolations`. Every run prints the home-budget commit it tested.

## Claude Code

The repo uses the [benweese plugins](https://github.com/benweese/claude-plugins): qa, docs, workflow,
accessibility, privacy and guardrails (`.claude/settings.json`). Install them once from a terminal
(`claude plugin install <name>@benweese`), then start a new session.

- **qa** (`.claude/qa.json`): after a test file is edited, it's linted and checked with
  `playwright test --list`; after a green run, the tests are reviewed against the saved request. Saved
  requests live in `.claude/qa/` (gitignored).
- **Commit blockers:** `.claude/privacy.json` blocks personal data and `.claude/guardrails.json` blocks
  secrets before Claude commits. The repo's config names no denylist: the maintainer's denylist is never
  committed and applies from their own setup; every clone runs the built-in checks. For commits made outside Claude,
  run `install-privacy-git-hook` once, and again after each privacy plugin update.
- **`.claude/board.json` is local only** (gitignored): it's the maintainer's task-board config.
- Accessibility rules: WCAG 2.2 AA plus
  [home-budget's docs/accessibility.md](https://github.com/benweese/home-budget/blob/main/docs/accessibility.md).

## License

[MIT](LICENSE)
