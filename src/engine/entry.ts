import { CHART_OF_ACCOUNTS, findAccount, normalSide, type AccountName, type Balances, type Side } from './accounts'

export interface EntryLine {
  account: AccountName
  side: Side
  amount: number
}

export type Entry = EntryLine[]

/** Debits minus credits per account, with accounts that net to zero left out. */
export type NetEffect = Partial<Record<AccountName, number>>

/** Returns the reason an entry cannot be posted, or null if it can. Balance is not checked. */
export function entryProblem(lines: Entry): string | null {
  if (lines.length === 0) return 'An entry needs at least one line.'
  for (const line of lines) {
    if (!CHART_OF_ACCOUNTS.some((a) => a.name === line.account)) {
      return `"${line.account}" is not an account in the chart of accounts.`
    }
    if (line.side !== 'Debit' && line.side !== 'Credit') {
      return 'Each line must be a debit or a credit.'
    }
    if (!Number.isInteger(line.amount) || line.amount <= 0) {
      return 'Amounts must be whole dollars greater than zero.'
    }
  }
  return null
}

export function netEffect(lines: Entry): NetEffect {
  const net: NetEffect = {}
  for (const { account, side, amount } of lines) {
    net[account] = (net[account] ?? 0) + (side === 'Debit' ? amount : -amount)
  }
  for (const account of Object.keys(net) as AccountName[]) {
    if (net[account] === 0) delete net[account]
  }
  return net
}

export function sameNetEffect(a: Entry, b: Entry): boolean {
  const x = netEffect(a)
  const y = netEffect(b)
  const accounts = new Set([...Object.keys(x), ...Object.keys(y)]) as Set<AccountName>
  return [...accounts].every((account) => (x[account] ?? 0) === (y[account] ?? 0))
}

/** Posts every line as entered, whether or not the entry balances. */
export function postEntry(balances: Balances, lines: Entry): Balances {
  const posted = { ...balances }
  for (const { account, side, amount } of lines) {
    const normal = normalSide(findAccount(account))
    posted[account] += side === normal ? amount : -amount
  }
  return posted
}
