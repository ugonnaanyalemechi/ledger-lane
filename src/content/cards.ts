import type { EntryLine } from '../engine/entry'

export type Tier = 1 | 2 | 3

export interface TransactionCard {
  id: string
  /** Plain business language. It never names the accounts. */
  text: string
  tier: Tier
  expectedEntry: EntryLine[]
  /** One line shown when the player's entry is wrong. */
  reason: string
}

export const HARD_CODED_CARD: TransactionCard = {
  id: 'rent-paid-cash',
  text: 'Clipper Cafe paid $400 in cash for this month’s rent.',
  tier: 1,
  expectedEntry: [
    { account: 'Rent Expense', side: 'Debit', amount: 400 },
    { account: 'Cash', side: 'Credit', amount: 400 },
  ],
  reason:
    'Rent used up this month is an expense, so Rent Expense is debited; paying cash lowers Cash, so Cash is credited.',
}
