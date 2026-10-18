import { describe, expect, it } from 'vitest'
import { applyAction, CHART_OF_ACCOUNTS, createGame, type Balances } from './index'

const config = { playerNames: ['Ana', 'Ben'], mode: 'Quick' as const, seed: 42 }

function newGame(overrides: Partial<typeof config> = {}) {
  const result = createGame({ ...config, ...overrides })
  if (!result.ok) throw new Error(result.reason)
  return result.state
}

const total = (balances: Balances, type: string, contra = false) =>
  CHART_OF_ACCOUNTS.filter((a) => a.type === type && !!a.contra === contra).reduce(
    (sum, a) => sum + balances[a.name],
    0,
  )

const seeds = Array.from({ length: 200 }, (_, i) => i)

describe('creating a game', () => {
  it('gives identical games for the same config and seed', () => {
    expect(newGame()).toEqual(newGame())
  })

  it('gives different opening balances for different seeds', () => {
    expect(newGame({ seed: 1 }).openingBalanceSheet).not.toEqual(
      newGame({ seed: 2 }).openingBalanceSheet,
    )
  })

  it('starts every player from the same opening balance sheet', () => {
    const game = newGame({ playerNames: ['Ana', 'Ben', 'Cy', 'Di'] })
    expect(game.players.map((p) => p.name)).toEqual(['Ana', 'Ben', 'Cy', 'Di'])
    for (const player of game.players) {
      expect(player.balances).toEqual(game.openingBalanceSheet)
    }
  })

  it('opens with assets equal to liabilities plus equity and positive Retained Earnings', () => {
    for (const seed of seeds) {
      const b = newGame({ seed }).openingBalanceSheet
      const assets = total(b, 'Asset') - total(b, 'Asset', true)
      expect(assets).toBe(total(b, 'Liability') + total(b, 'Equity'))
      expect(b['Retained Earnings']).toBeGreaterThan(0)
    }
  })

  it('starts revenues and expenses at zero and keeps every amount a whole dollar', () => {
    for (const seed of seeds) {
      const b = newGame({ seed }).openingBalanceSheet
      expect(Object.keys(b).sort()).toEqual(CHART_OF_ACCOUNTS.map((a) => a.name).sort())
      for (const account of CHART_OF_ACCOUNTS) {
        expect(Number.isInteger(b[account.name])).toBe(true)
        expect(b[account.name]).toBeGreaterThanOrEqual(0)
        if (account.type === 'Revenue' || account.type === 'Expense') {
          expect(b[account.name]).toBe(0)
        }
      }
    }
  })

  it('sizes Note Payable so 3 months of 6% interest is whole dollars', () => {
    for (const seed of seeds) {
      const note = newGame({ seed }).openingBalanceSheet['Note Payable']
      expect(note).toBeGreaterThan(0)
      expect((note * 6 * 3) % 1200).toBe(0)
    }
  })

  it('opens with at least a year of prepaid insurance', () => {
    for (const seed of seeds) {
      const prepaid = newGame({ seed }).openingBalanceSheet['Prepaid Insurance']
      expect(prepaid).toBeGreaterThanOrEqual(12 * 100)
    }
  })

  it.each([
    ['no players', { playerNames: [] }],
    ['five players', { playerNames: ['a', 'b', 'c', 'd', 'e'] }],
    ['an empty name', { playerNames: ['Ana', ''] }],
    ['a blank name', { playerNames: ['Ana', '   '] }],
    ['a fractional seed', { seed: 1.5 }],
  ])('rejects a config with %s, giving a reason', (_label, overrides) => {
    const result = createGame({ ...config, ...overrides })
    expect(result.ok).toBe(false)
    if (!result.ok) expect(result.reason).not.toBe('')
  })
})

describe('applying an action', () => {
  it('rejects an action that is not allowed yet and leaves the state unchanged', () => {
    const game = newGame()
    const before = structuredClone(game)
    const result = applyAction(game, { type: 'confirmHandoff' })
    expect(result.ok).toBe(false)
    if (!result.ok) expect(result.reason).not.toBe('')
    expect(game).toEqual(before)
  })
})
