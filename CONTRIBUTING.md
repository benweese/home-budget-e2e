# Contributing

## Pull request titles

PRs are **squash-merged**, so the PR title becomes the one commit on `main`, and the release tooling builds the
changelog and the next version from it. Titles must be [Conventional Commits](https://www.conventionalcommits.org/)
(a required check enforces this):

```
type(optional-scope)!: short summary in the imperative
```

| Type | Use it for | In the changelog |
| --- | --- | --- |
| `feat` | a new user-visible feature | Features (minor bump) |
| `fix` | a bug fix | Bug fixes (patch bump) |
| `perf` | a speed or size improvement | Performance |
| `revert` | undoing an earlier change | Reverts |
| `docs` | documentation only | Documentation |
| `refactor`, `test`, `build`, `ci`, `chore` | everything else | hidden |

- Scope is optional, lowercase, with dashes: `feat(worker): …`, `fix(ui-tokens): …`, `chore(deps): …`.
- `!` after the type or scope marks a breaking change: `feat(api)!: …`. Before 1.0.0 it bumps the minor version.
- Commit messages inside a branch don't matter; only the PR title reaches `main`.
