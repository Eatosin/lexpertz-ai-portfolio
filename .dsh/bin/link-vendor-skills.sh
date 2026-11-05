#!/usr/bin/env bash
# Toggle DSH discovery of the vendored claude-blog skill suite.
#
# DSH only scans direct children of a skill root, and .opencode/vendor/ is
# gitignored (cloned on demand — see docs/process/blog-pipeline.md). These
# aliases are generated, never committed, and listed in .gitignore.
#
#   bash .dsh/bin/link-vendor-skills.sh on    # add 32 blog-* skill aliases
#   bash .dsh/bin/link-vendor-skills.sh off   # remove them
#
# Each skill description is advertised once per session, so leave this off
# unless you are working on the blog pipeline.
set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
src="$root/.opencode/vendor/claude-blog/skills"
dest="$root/.dsh/skills"
alias_target="../../.opencode/vendor/claude-blog/skills"

case "${1:-on}" in
  on)
    if [ ! -d "$src" ]; then
      echo "missing $src — clone the blog suite first (docs/process/blog-pipeline.md)" >&2
      exit 1
    fi
    count=0
    for d in "$src"/*/; do
      name="$(basename "$d")"
      ln -sfn "$alias_target/$name" "$dest/$name"
      count=$((count + 1))
    done
    echo "linked $count vendor skills into .dsh/skills (gitignored)"
    ;;
  off)
    removed=0
    while IFS= read -r link; do
      rm -f -- "$link"
      removed=$((removed + 1))
    done < <(find "$dest" -maxdepth 1 -type l -name 'blog*')
    echo "removed $removed vendor skill links"
    ;;
  *)
    echo "usage: $0 [on|off]" >&2
    exit 2
    ;;
esac
