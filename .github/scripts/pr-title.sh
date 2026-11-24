#!/usr/bin/env bash
# Checks a PR title is a Conventional Commit. Usage: pr-title.sh "<title>". Exit 0 = OK, 1 = not OK.
# Used by .github/workflows/pr-title.yml; the table in pr-title.test.sh keeps the pattern from regressing.
set -euo pipefail
title="${1-}"
pattern='^(feat|fix|perf|refactor|docs|test|build|ci|chore|revert)(\([a-z0-9-]+\))?!?: [^ ].*$'
if [[ "$title" =~ $pattern ]]; then
  echo "OK: $title"
else
  echo "::error::PR title isn't a Conventional Commit: \"$title\". Use type(scope)?: summary, e.g. \"feat(worker): add health route\". Types: feat fix perf refactor docs test build ci chore revert. The scope is optional, lowercase, letters/digits/dashes. See CONTRIBUTING.md."
  exit 1
fi
