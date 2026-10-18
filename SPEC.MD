# Ledger Lane: Spec

## Problem Statement

Intro accounting students learn journal entries from static worksheets: one transaction, one answer, no consequences. A mistake on line 3 never shows up later, so students rarely see how one wrong entry carries through to the trial balance and net income.

They also practice each topic in isolation. Recording transactions, adjusting entries (deferrals and accruals) and the closing entry are drilled separately, so the full accounting cycle never feels connected.

Students need repeatable, varied practice that runs a business through a whole period, keeps their own mistakes on the books, lets them correct those mistakes, and shows them at the end exactly where their books went wrong. It also has to work for a study group sharing one screen.

## Solution

Ledger Lane is a browser-based board game for 1–4 players on one screen (hot-seat). Each player keeps the books for their own copy of the same business, **Clipper Cafe**, through one quarter (Quick mode) or four quarters (Full Year mode).&#32;

Note: The game is built for several businesses as interchangeable skins picked at random at game start; the MVP ships with Clipper Cafe only, and more skins are a stretch goal.

- **The board** is a calendar track. Each month is 9 spaces, and each space shows only a difficulty tier (1, 2 or 3 points), never the kind of transaction. Players roll a 1–3 die 3 times per month, so everyone records exactly 3 transactions a month.
- **Recording an entry** works like a real journal. The player picks accounts from the full chart of accounts, adds debit and credit lines and types whole-dollar amounts. Running totals are shown, but nothing stops an unbalanced entry from being posted.
- **Wrong entries stay on the books.** The player immediately sees their entry next to the correct one, with a one-line reason, and the wrong version is posted to their ledger.
- **Quarter-End** has two steps. First, players may record correcting entries for earlier mistakes. Then everyone records the same 3 randomly drawn adjusting entries.
- **Closing** happens once, at the end of the game: one compound entry that closes all revenues and expenses directly to Retained Earnings, as in the course textbook (Libby, Ch. 4).
- **The audit** ends the game. Each player sees their score, their net income against the correct figure, their trial balance before closing next to the correct one with mismatches highlighted, whether their books balance, and every uncorrected mistake.

Amounts, the opening balance sheet and the adjustment draws are random each game, so the game can be replayed for study. A pass-the-device screen hides each player's ledger from the others.

## User Stories

**Setup**

1. As a player, I want to choose 1, 2, 3 or 4 players, so that I can study alone or with classmates.
2. As a player, I want to enter a name for each player, so that turns, scores and the audit say who is who.
3. As a player, I want to choose Quick (one quarter) or Full Year (four quarters), so that I can fit a game into the time I have.
4. As a player, I want every game to start Clipper Cafe with different opening balances, so that replays don't repeat the same numbers.
5. As a player, I want to see Clipper Cafe's opening balance sheet before play starts, so that I know what the business owns and owes.
6. As a player, I want all players to start from the same opening balance sheet, so that the game is fair.
7. As a player, I want a game in progress to survive a page refresh, so that I don't lose it by accident.
8. As a player, I want to start a new game at any time, so that I can abandon a game I don't want to finish.

**Board and turns**

9. As a player, I want to see the current month and quarter, so that I know where we are in the year.
10. As a player, I want each month shown as 9 spaces marked only with 1, 2 or 3 points, so that I know how hard the next transaction is without being told what kind it is.
11. As a player, I want to roll a 1–3 die exactly 3 times per month, so that I always record 3 transactions and never overshoot the month.
12. As a player, I want to see every player's token on the board, so that I can follow the race.
13. As a player, I want a "Pass to Player X, click when ready" screen between turns, so that nobody sees another player's ledger.
14. As a player, I want only my own ledger shown during my turn, so that I can't copy anyone.
15. As a player, I want to see each player's current score, so that the game feels competitive.
16. As a player, I want the game to move every player to Quarter-End after their third roll in the third month of a quarter, so that adjustments happen at the right time.

**Recording transactions**

17. As a player, I want the transaction card described in plain business language (for example "A customer bought a $50 gift card"), so that I have to work out the accounts myself.
18. As a player, I want card amounts to be random within sensible ranges, so that I can't memorize answers.
19. As a player, I want all amounts to be whole dollars, so that rounding never decides whether I'm right.
20. As a player, I want to pick accounts from the full chart of accounts, so that choosing the right account is part of the test.
21. As a player, I want to add as many debit and credit lines as I need, so that I can record compound entries.
22. As a player, I want to remove or edit a line before posting, so that I can fix typos.
23. As a player, I want running debit and credit totals as I type, so that I can check my own work like an accountant.
24. As a player, I want to be allowed to post an entry where debits and credits differ, so that balancing is my responsibility.
25. As a player, I want my entry judged by its net effect on each account, so that line order or splitting a line doesn't make it wrong.
26. As a player, I want to earn the space's 1, 2 or 3 points for a correct entry, so that harder transactions are worth more.
27. As a player, I want to see "yours vs. correct" and a one-line reason when I'm wrong, so that I learn why immediately.
28. As a player, I want my wrong entry posted to my ledger anyway, so that my mistakes have real consequences.
29. As a player, I want to view my own ledger balances during my turn, so that I know the state of my books.

**Quarter-End: corrections**

30. As a player, I want to see a list of my uncorrected mistakes at Quarter-End, so that I can fix my books.
31. As a player, I want each mistake shown with the card text and my original entry but not the answer, so that fixing it tests my understanding.
32. As a player, I want to record a correcting entry for any mistake, so that I can practice how errors are fixed in real accounting.
33. As a player, I want my correction accepted if my original entry plus the correction equals the correct entry, so that any valid correction counts.
34. As a player, I want 1 point for each successful correction, so that fixing mistakes is rewarded without erasing the original penalty.
35. As a player, I want a wrong correction rejected without posting, so that a bad fix never makes my books worse.
36. As a player, I want 2 tries per mistake per Quarter-End, so that I can't guess endlessly or hold up the game.
37. As a player, I want a mistake I fail to fix to carry over to the next Quarter-End, so that I get another chance in Full Year mode. (Quick mode has only one Quarter-End, so unfixed mistakes go straight to the audit.)
38. As a player, I want to skip corrections, so that I can move on when I choose.
39. As a player, I want corrections handled before adjustments, so that my adjustments work from the cleanest books I can manage.

**Quarter-End: adjustments**

40. As a player, I want 3 adjustments drawn each Quarter-End from 8 types (deferred revenue earned, accrued revenue, supplies used, insurance expired, depreciation, accrued wages, accrued interest, accrued utilities), so that I practice the adjustments covered in class.
41. As a player, I want each draw to include at least one deferral and one accrual, so that I always practice both.
42. As a player, I want every player to get the same adjustment draw, so that the quarter is fair.
43. As a player, I want adjustment facts stated as they would be in a homework problem (for example "a count shows $900 of supplies remain"), so that I have to calculate the entry myself.
44. As a player, I want adjustments graded against my own ledger balances, so that an earlier mistake isn't punished twice.
45. As a player, I want adjustments scored on the same 1/2/3 tiers, so that harder calculations are worth more.
46. As a player, I want the same "yours vs. correct" feedback on adjustments, so that I learn from them too.

**Closing**

47. As a player, I want to record a single closing entry at the end of the game, so that I practice closing as my textbook teaches it.
48. As a player, I want closing to zero every revenue and expense account and send the difference to Retained Earnings, with no Income Summary, so that it matches my course.
49. As a player, I want my closing entry graded against my own ledger, so that I can close correctly even if earlier entries were wrong.
50. As a player, I want a correct closing entry to earn 3 points, so that the largest, most complex entry in the game (every revenue and expense account at once) earns the top tier.
51. As a player, I want a wrong or unbalanced closing entry to post as entered and score 0, so that it follows the same rules as every other entry.

**Audit and winning**

52. As a player, I want an audit screen for each player at the end, so that I can review how my books turned out.
53. As a player, I want my total score shown, so that I know how I did.
54. As a player, I want my net income next to the correct net income, so that I see the effect of my mistakes on profit.
55. As a player, I want my trial balance before closing shown next to the correct one with mismatched accounts highlighted, so that I can see exactly which accounts are off.
56. As a player, I want a clear "Do your books balance?" result, so that I know if I ever posted an unbalanced entry.
57. As a player, I want every remaining uncorrected mistake listed as "yours vs. correct", including closing, so that I can study them.
58. As a player, I want the winner to be the highest score, with higher correct net income breaking ties, so that the result is clear.
59. As a player, I want a final standings screen for all players, so that we can compare results.

**Instructor and developer**

60. As an instructor, I want account names and the closing method to match the textbook, so that I can judge the game against what was taught.
61. As an instructor, I want to finish a Quick game in about 10–15 minutes, so that I can see every concept in one sitting.
62. As the developer, I want card content written once as templates with blanks, so that adding another company later is a data change, not new code.
63. As the developer, I want every template checked automatically for balanced, whole-dollar answers, so that a bad card never reaches a player.
64. As the developer, I want randomness driven by a seed, so that I can replay any game exactly while testing.

## Implementation Decisions

**Platform**

- A static single-page app built with React and Vite. There is no backend, database or log-in. TypeScript will be used.
- Deployed to GitHub Pages. AWS hosting is optional.
- The whole game state is saved to the browser's local storage after every action, under a versioned key, and restored on load. An unreadable or old-version save is discarded and a new game starts.

**Architecture: a pure game engine behind one interface**

- All rules live in a game engine with no UI code. React screens only render engine state and send player actions to it.
- The engine exposes two operations: *create a game* from a config (player names, mode, seed) and *apply an action* to a state, returning the new state. Invalid actions (e.g. rolling during Quarter-End) are rejected with a reason and leave the state unchanged.
- Create-game validation: 1 to 4 players, no empty or whitespace-only names (names are stored trimmed), mode Quick or Full Year, seed a whole number from 0 to 4294967295 (32 bits, so distinct seeds never collide).
- Actions: roll die, submit entry, submit correction, skip corrections, submit adjustment, submit closing entry, confirm pass-screen handoff.
- All randomness (dice, card amounts, opening balances, adjustment draws, space layout) comes from a seeded random generator inside the state, so the same seed and the same actions always produce the same game.
- Game phases, in order: Setup → Opening balance sheet → Months (rolling and transactions) → Quarter-End (corrections, then adjustments) → repeat for remaining quarters → Closing → Audit → Standings.

**Engine modules**

- **Ledger**: posts journal entries and reports account balances. Accepts unbalanced entries.
- **Grader**: decides whether an entry is correct by comparing the *net effect per account* (debits minus credits) of the player's entry with the expected entry. Line order, splitting a line and zero-amount lines don't matter. Corrections use the same check on the original entry plus the correction.
- **Card generator**: turns a card template plus the company skin plus seeded amounts into a card's text, its expected entry and its one-line reason.
- **Opening balance generator**: produces the shared opening balance sheet with random amounts and fixed accounts.
- **Adjustment drawer**: draws the shared Quarter-End adjustments and their facts.
- **Audit builder**: produces each player's audit and the final standings.

**Two ledgers per player**

- The engine keeps each player's *actual* ledger (what they posted) and a *correct* ledger (what they should have posted for the same cards and adjustments).
- The correct ledger drives the audit's comparison columns, "correct net income" and the tiebreaker.

**Grading rules**

- Transactions are graded against the facts on the card.
- Adjustments and the closing entry are graded against the player's own actual ledger balances, so an earlier mistake is penalized only once.
- The audit compares the actual and correct ledgers.
- All amounts are whole dollars. Generated amounts are chosen so every calculation (quarterly interest, quarterly depreciation, insurance per quarter) comes out whole. Amount fields accept whole numbers only.

**Scoring**

- Correct transaction or adjustment: the space's or adjustment's tier value (1, 2 or 3).
- Wrong entry, including an unbalanced one: 0 points. It is posted as entered and added to the player's mistake list.
- Successful correction: 1 point. The mistake is removed from the list; the original card's points stay lost.
- Correct closing entry: 3 points. A wrong closing entry posts as entered and scores 0.
- Winner: highest total score. Tiebreaker: higher net income in the correct ledger. If still tied, the tied players share the win (extended tiebreakers are a stretch goal).

**Board and turns**

- Each month is 9 spaces, each showing only a tier. Space tiers are random per game (seeded) and the same for all players.
- A turn is one player's full month: 3 rolls of a 1–3 die, recording the card on each space landed on. After the third roll, play passes to the next player.
- After every player finishes month 3 of a quarter, the game enters Quarter-End.
- A pass screen ("Pass to Player X, click when ready") sits between every player's turn, including Quarter-End and closing. It hides the previous player's ledger. With one player, it is skipped.

**Quarter-End**

1. Corrections: the player sees each uncorrected mistake as card text plus their original entry, never the answer. A correct correction is posted. A wrong one is rejected and not posted. 2 tries per mistake per Quarter-End; after that it carries over. The player may skip at any time. Mistakes on adjustments can be corrected too.
2. Adjustments: 3 drawn from 8 types, with at least one deferral and one accrual, the same draw and the same stated facts for every player.

| Adjustment | Kind | Tier | Fact shown to the player |
| --- | --- | --- | --- |
| Gift cards / prepaid catering earned | Deferral | 2 | Amount earned this quarter |
| Insurance expired | Deferral | 2 | Months of coverage used and monthly premium |
| Depreciation | Deferral | 2 | Annual depreciation |
| Supplies used | Deferral | 3 | Physical count of supplies remaining |
| Accrued revenue (catering billed next quarter) | Accrual | 2 | Amount earned, not yet billed |
| Accrued wages | Accrual | 1 | Wages earned, not yet paid |
| Accrued utilities | Accrual | 1 | Bill amount, not yet received |
| Accrued interest | Accrual | 3 | Note balance, annual rate, months accrued |

- Stated facts must be valid for every player. For example, the gift cards earned and the supplies count can't exceed the lowest balance across all players' actual and correct ledgers. Because grading uses net effect, an unusual balance caused by a player's earlier mistake is still graded consistently.

**Closing**

- Once, after the final Quarter-End. One compound entry closes every revenue and expense account directly to Retained Earnings. No Income Summary.
- Declared dividends are debited directly to Retained Earnings, so there's no Dividends account to close.

**Content data (company skin and templates)**

- One company skin, Clipper Cafe, holds the business name and the words that fill template blanks. A second company later is a new skin file.
- Each card template holds: text with blanks, tier, amount ranges, the expected entry as a function of the amounts, and the one-line reason. About 30 templates for the MVP, spread across all three tiers. Tier reflects the reasoning required, not the category, so every category has easy and hard cards.
- Goods consumed are recorded as Supplies. There is no inventory or cost of goods sold.

**Chart of accounts (full list always shown, textbook names)**

| Type | Accounts |
| --- | --- |
| Assets | Cash, Accounts Receivable, Supplies, Prepaid Insurance, Equipment, Accumulated Depreciation |
| Liabilities | Accounts Payable, Wages Payable, Utilities Payable, Interest Payable, Deferred Revenue, Note Payable |
| Equity | Common Stock, Retained Earnings |
| Revenue | Sales Revenue, Catering Revenue |
| Expenses | Wages Expense, Rent Expense, Utilities Expense, Supplies Expense, Insurance Expense, Depreciation Expense, Interest Expense, Advertising Expense |

**Opening balance sheet**

- Fixed accounts with random amounts: Cash, Supplies, Prepaid Insurance (a whole number of months of premium, enough for 4 quarters), Equipment, Accumulated Depreciation, Note Payable (6% annual, sized so 3 months of interest is a whole dollar amount), Deferred Revenue, Common Stock, Retained Earnings.
- Retained Earnings is set last so Assets = Liabilities + Equity. Ranges are chosen so it is always positive. Every other account in the chart starts at zero; revenues and expenses start at zero because the prior year was already closed.

**Screens**

- Setup, Opening balance sheet, Board, Entry builder (with running totals and the player's ledger), Feedback ("yours vs. correct" plus reason), Pass screen, Quarter-End corrections, Quarter-End adjustments, Closing, Audit (one per player), Standings.
- Visual theme: bank/ledger look (green-bar paper, monospace figures, "POSTED" stamps on submitted entries, red "ERROR" stamps on wrong ones) with free icon and token asset packs. The audit layout is to be finalized by the developer.

## Testing Decisions

The game is tested through one seam: the game engine's *create a game* and *apply an action* interface, in Vitest.

**What makes a good test**

- It plays a short scripted game with a fixed seed and asserts only on what a player could observe: scores, ledger balances, whose turn it is, the current phase, the mistake list, audit contents and standings.
- It never reaches into the engine's internal modules or private state, so the tests survive refactoring.
- It reads like a game situation, e.g. "seed 42, Quick game, Player 1 records the gift card sale as revenue → 0 points, and the mistake appears at Quarter-End."

**Behavior to cover**

- Turns: exactly 3 rolls per player per month; no overshooting; the phase moves to Quarter-End after month 3; pass-screen handoffs; 1-player games skip the pass screen.
- Grading: net-effect comparison (line order and split lines don't matter); unbalanced entries post and score 0; tier points awarded.
- Corrections: original plus correction equals correct → fixed and 1 point; wrong correction rejected and not posted; 2-try limit; carry-over to the next quarter; skipping.
- Adjustments: 3 drawn, at least one deferral and one accrual, identical for all players; graded against the player's own ledger.
- Closing: graded against the player's own ledger; zeroes revenues and expenses; Retained Earnings updated.
- Audit: pre-closing trial balance, actual vs. correct, with mismatches; "Do your books balance?"; net income vs. correct; missed entries; tiebreaker.
- Determinism: the same seed and actions produce the same game.
- Persistence: a saved state reloads to the same game.

**Content check**

- A test generates every card template and every adjustment type across many seeds and asserts each expected entry is balanced and uses only whole-dollar, positive amounts. This catches content mistakes before a player sees them.

**UI**

- No automated UI tests in the MVP. Screens are checked during development by having Claude Code drive the game in a browser through the Playwright MCP (e.g. "play a 2-player Quick game to the audit and report anything broken").

**Prior art**

- None. This is a new project, so these tests set the pattern.

## Out of Scope

**Not planned**

- Online multiplayer, accounts, log-in, a backend or a database.
- Inventory, cost of goods sold and merchandising entries.
- Income Summary closing and a separate Dividends account to close.
- Quarterly closing in Full Year mode.
- Automatic fixing of wrong entries.

**Stretch goals, in rough priority order**

1. Beginner mode: a narrowed account list and a highlight when debits and credits differ.
2. A live A = L + E bar that updates as entries post.
3. More company skins (fitness studio, food truck, indie game studio, tutoring center), picked at random at game start.
4. Dynamic adjustments generated from each player's own transaction history.
5. Full financial statements (income statement with EPS, statement of stockholders' equity, balance sheet) and ratios such as total asset turnover in the audit.
6. Local player profiles with score history and most-missed concepts, stored in the browser.
7. An automated Playwright end-to-end smoke test.
8. AWS deployment.
9. Extended tiebreakers: if score and correct net income are tied, fewer uncorrected mistakes at the audit wins; if that is tied too, the tied players settle it with one game of rock-paper-scissors.

## Further Notes

| Week | Build | Done when |
| --- | --- | --- |
| 1 | Engine skeleton, ledger, grader, a hard-coded opening balance sheet, first card templates, the entry builder screen | A player can record entries and see "yours vs. correct". This is a submittable fallback. |
| 2 | Board, die, turns, pass screen, scoring | A Quick game plays through its 3 months |
| 3 | Quarter-End (corrections, then adjustments), random opening balance sheet, closing, audit | A Quick game runs from setup to standings |
| 4 | Ledger styling, writing and checking all \~30 templates and their reasons, playtesting, deploy | The live link works for a classmate |

- Account names, the four adjustment types and the closing method follow the course textbook (Libby, *Financial Accounting* 12e, Ch. 4). The adjustment pool mirrors the class's Comet Coffee exercise, adapted to quarterly periods.
- Writing the card templates and their one-line reasons is the student's own work, since it demonstrates the accounting knowledge being graded.
- A Quick game should take about 10–15 minutes, which makes it the right mode for demoing.
