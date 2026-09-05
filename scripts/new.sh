#!/usr/bin/env bash
# Usage: npm run new -- <category> <kebab-name>
#   category: javascript | ui | algo | quiz | system-design
#   example:  npm run new -- javascript debounce
#             npm run new -- ui accordion
set -euo pipefail

CATEGORY="${1:-}"
NAME="${2:-}"
if [[ -z "$CATEGORY" || -z "$NAME" ]]; then
  echo "Usage: npm run new -- <javascript|ui|algo|quiz|system-design> <kebab-name>" >&2
  exit 1
fi

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TPL="$ROOT/templates"
DATE="$(date +%Y-%m-%d)"

# kebab-case -> camelCase / PascalCase
CAMEL="$(echo "$NAME" | awk -F- '{ s=$1; for(i=2;i<=NF;i++) s=s toupper(substr($i,1,1)) substr($i,2); print s }')"
PASCAL="$(echo "$NAME" | awk -F- '{ s=""; for(i=1;i<=NF;i++) s=s toupper(substr($i,1,1)) substr($i,2); print s }')"
TITLE="$(echo "$NAME" | awk -F- '{ s=""; for(i=1;i<=NF;i++) s=s (i>1?" ":"") toupper(substr($i,1,1)) substr($i,2); print s }')"

render() {
  sed -e "s/{{NAME}}/$NAME/g" \
      -e "s/{{FN}}/$CAMEL/g" \
      -e "s/{{COMPONENT}}/$PASCAL/g" \
      -e "s/{{TITLE}}/$TITLE/g" \
      -e "s/{{CATEGORY}}/$CATEGORY/g" \
      -e "s/{{DATE}}/$DATE/g" \
      "$1" > "$2"
}

case "$CATEGORY" in
  quiz|system-design)
    DEST="$ROOT/$CATEGORY/$NAME.md"
    [[ -e "$DEST" ]] && { echo "Already exists: $DEST" >&2; exit 1; }
    render "$TPL/$CATEGORY.md" "$DEST"
    echo "Created $DEST"
    ;;
  ui)
    DIR="$ROOT/ui/$NAME"
    [[ -e "$DIR" ]] && { echo "Already exists: $DIR" >&2; exit 1; }
    mkdir -p "$DIR"
    render "$TPL/README.md" "$DIR/README.md"
    render "$TPL/ui.tsx" "$DIR/$PASCAL.tsx"
    render "$TPL/ui.test.tsx" "$DIR/$PASCAL.test.tsx"
    echo "Created $DIR"
    ;;
  javascript|algo)
    DIR="$ROOT/$CATEGORY/$NAME"
    [[ -e "$DIR" ]] && { echo "Already exists: $DIR" >&2; exit 1; }
    mkdir -p "$DIR"
    render "$TPL/README.md" "$DIR/README.md"
    render "$TPL/javascript.ts" "$DIR/$NAME.ts"
    render "$TPL/javascript.test.ts" "$DIR/$NAME.test.ts"
    echo "Created $DIR"
    ;;
  *)
    echo "Unknown category: $CATEGORY" >&2
    exit 1
    ;;
esac
