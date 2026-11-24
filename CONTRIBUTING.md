# Contributing

## Pull request titles

PRs are **squash-merged**, so the PR title becomes the one commit on `main`. This repo has no releases; titles
follow [Conventional Commits](https://www.conventionalcommits.org/) so the history reads the same as
[home-budget](https://github.com/benweese/home-budget)'s (a required check enforces this):

```
type(optional-scope)!: short summary in the imperative
```

- Types: `feat`, `fix`, `perf`, `refactor`, `docs`, `test`, `build`, `ci`, `chore`, `revert`. New or changed
  tests are usually `test:`; a fix to a flaky test is `fix:`.
- Scope is optional, lowercase, with dashes: `test(cara-page): …`, `chore(deps): …`.
- `!` marks a breaking change (e.g. a renamed fixture other suites rely on).
- Commit messages inside a branch don't matter; only the PR title reaches `main`.
