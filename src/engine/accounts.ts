export type AccountType = 'Asset' | 'Liability' | 'Equity' | 'Revenue' | 'Expense'

export interface Account {
  name: string
  type: AccountType
  /** Contra accounts carry the opposite of their type's normal side. */
  contra?: boolean
}

/** Textbook chart of accounts (Libby, Financial Accounting, Ch. 4). */
export const CHART_OF_ACCOUNTS: readonly Account[] = [
  { name: 'Cash', type: 'Asset' },
  { name: 'Accounts Receivable', type: 'Asset' },
  { name: 'Supplies', type: 'Asset' },
  { name: 'Prepaid Insurance', type: 'Asset' },
  { name: 'Equipment', type: 'Asset' },
  { name: 'Accumulated Depreciation', type: 'Asset', contra: true },
  { name: 'Accounts Payable', type: 'Liability' },
  { name: 'Wages Payable', type: 'Liability' },
  { name: 'Utilities Payable', type: 'Liability' },
  { name: 'Interest Payable', type: 'Liability' },
  { name: 'Deferred Revenue', type: 'Liability' },
  { name: 'Note Payable', type: 'Liability' },
  { name: 'Common Stock', type: 'Equity' },
  { name: 'Retained Earnings', type: 'Equity' },
  { name: 'Sales Revenue', type: 'Revenue' },
  { name: 'Catering Revenue', type: 'Revenue' },
  { name: 'Wages Expense', type: 'Expense' },
  { name: 'Rent Expense', type: 'Expense' },
  { name: 'Utilities Expense', type: 'Expense' },
  { name: 'Supplies Expense', type: 'Expense' },
  { name: 'Insurance Expense', type: 'Expense' },
  { name: 'Depreciation Expense', type: 'Expense' },
  { name: 'Interest Expense', type: 'Expense' },
  { name: 'Advertising Expense', type: 'Expense' },
]

/** Balances in whole dollars, shown on each account's normal side. */
export type Balances = Record<string, number>
