# Dojo

Daily exercises to become a better software engineer. Problems are solved one at a time,
one commit per problem.

## Layout

| Folder           | Unit        | Files                                                  |
| ---------------- | ----------- | ------------------------------------------------------ |
| `javascript/`    | `<name>/`   | `README.md`, `<name>.ts`, `<name>.test.ts`             |
| `algo/`          | `<name>/`   | `README.md`, `<name>.ts`, `<name>.test.ts`             |
| `ui/`            | `<name>/`   | `README.md`, `<Component>.tsx`, `<Component>.test.tsx` |
| `quiz/`          | `<name>.md` | single markdown file                                   |
| `system-design/` | `<name>.md` | single markdown file                                   |

Create a problem with `npm run new -- <category> <kebab-name>`. Never create the files by hand.

## Commands

```bash
npm test                   # all tests
npm test -- <name>         # one problem
npm run test:watch -- <name>
npm run lint
npm run format
```

Plain JavaScript only (no TypeScript). Keep the JSDoc `@param` / `@returns` block on
solution functions. Tests use `@sinonjs/fake-timers` (pinned to v14) so GreatFrontEnd
test files can be pasted verbatim.

## Problem README format

Every problem README must follow exactly this structure, in this order. Do not add,
remove, or rename sections. Do not include a "Source" line or any link to where the
problem came from.

```markdown
# <Title>

- **Category**: <javascript | ui | algo | quiz | system-design>
- **Difficulty**: <Easy | Medium | Hard>
- **Date**: <YYYY-MM-DD>

## Problem

Short summary of the task in my own words. Never paste the original text in full.
Include Arguments / Returns / Examples subsections when the problem has them.

## Approach

How the solution works, in a few bullets. End with time and space complexity.

## Retrospective

**막힌 지점**: numbered list of what I got stuck on, what I wrongly assumed, and what
the correct mental model is.

**다시 볼 것**: concepts to review later.

## Follow-ups

- [ ] checklist of follow-up tasks from the problem, if any
```

- Problem section: English.
- Approach and Retrospective: Korean is fine.
- Retrospective must be based on what actually happened while solving, not generic notes.

## How to work with me

- I solve the problems myself. When I ask for help, give the smallest hint that unblocks
  me, not the answer. Escalate only if I ask again.
- Only write the solution file for me when I explicitly paste my code or ask you to.
- When I paste a problem or give a URL, set up the folder, write the README Problem
  section, and write tests from the examples. Then wait for my solution.
- After my solution passes, help me write the Retrospective from what I actually got
  stuck on during the session.

## Commits

- One problem per commit, message `feat(<category>): <name>`.
- Use `docs(...)` for README-only changes and `chore: ...` for tooling.
- Run `npm test` and `npm run lint` before committing.
- Push to `origin main` after each commit unless told otherwise.
