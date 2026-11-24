#!/usr/bin/env bash
# Table test for pr-title.sh: titles that must pass and titles that must fail.
set -uo pipefail
here="$(cd "$(dirname "$0")" && pwd)"
pass=(
  "feat(worker): add health route"
  "fix: handle an empty list"
  "feat(api)!: drop v0 routes"
  "chore(deps): bump wrangler from 4.166.0 to 4.167.0"
  "chore(deps-dev): bump the dev-tools group with 3 updates"
  "chore(main): release 0.1.0"
  "ci: fail the Claude review job when its token is missing"
)
fail=(
  "Update README"
  "feat: "
  "feat:no space"
  "Feat: capital type"
  "fix(Worker): capital scope"
  "feature: unknown type"
  ""
)
bad=0
for t in "${pass[@]}"; do "$here/pr-title.sh" "$t" >/dev/null || { echo "should pass: \"$t\""; bad=1; }; done
for t in "${fail[@]}"; do "$here/pr-title.sh" "$t" >/dev/null 2>&1 && { echo "should fail: \"$t\""; bad=1; }; done
[ $bad -eq 0 ] && echo "pr-title table: ${#pass[@]} pass, ${#fail[@]} fail, all as expected"
exit $bad
