# Ledger Lane

Browser board game (1–4 players, hot-seat) players keep the books for Clipper Cafe through one quarter or a full year. Full design: `SPEC.MD`. Read the sections relevant to your task, not the whole file.

## Tech stack

- React 19, Vite 8, TypeScript 6. Static single-page app: no backend, database or log-in.
- Tests: Vitest.
- Deployed to GitHub Pages.

## Commands

- `npm run dev`: start the dev server
- `npm run build`: type-check and build (`tsc -b && vite build`)
- `npm run lint`: ESLint
- `npm test`: Vitest

Run build, lint and test before calling any task done.

## Architecture

- All game rules live in a pure engine with no React imports. The UI renders engine state and sends actions to it.
- The engine has two operations: create a game (player names, mode, seed) and apply an action to a state, returning the new state. Invalid actions are rejected with a reason and leave state unchanged.
- All randomness is seeded. Same seed plus same actions must give the same game.
- All amounts are whole dollars.
- Planned layout (adjust as it is built): `src/engine/` for rules, `src/content/` for company skins and card templates, `src/ui/` for screens.

## Testing

- Test only through the engine's create-game / apply-action interface. Never import engine internals in tests.
- Play short scripted games with a fixed seed and assert only what a player could observe: scores, ledger balances, phase, whose turn, mistake list, audit.
- A content test generates every card template and adjustment across many seeds and checks each expected entry is balanced and whole-dollar.

## Domain rules (do not "fix" these)

- Unbalanced entries are allowed; they post as entered and score 0.
- Grading compares net effect per account (debits minus credits), so line order and split lines don't matter.
- Adjustments and the closing entry are graded against the player's own ledger, so one mistake is penalized once.
- Closing goes directly to Retained Earnings. No Income Summary, no Dividends account.
- Account names follow Libby, *Financial Accounting*, Ch. 4.

## Boundaries

**Always**
- Update `SPEC.MD` first if a decision changes.

**Ask first**
- Adding a dependency.
- Changing scoring, grading rules, the chart of accounts or the adjustment table.
- Changing the engine's public interface.

**Never**
- Write card templates or their one-line reasons. The developer writes these. Build the template structure and validation only.
- Reach into engine internals from the UI or from tests.
- Commit secrets.