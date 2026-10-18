import { describe, expect, it } from 'vitest'
import {
  applyAction,
  CHART_OF_ACCOUNTS,
  createGame,
  type AccountName,
  type AccountType,
  type Action,
  type Balances,
  type Entry,
  type GameConfig,
  type GameState,
} from './index'

const config = { playerNames: ['Ana', 'Ben'], mode: 'Quick' as const, seed: 42 }

function newGame(overrides: Partial<typeof config> = {}) {
  const result = createGame({ ...config, ...overrides })
  if (!result.ok) throw new Error(result.reason)
  return result.state
}

const total = (balances: Balances, type: AccountType, contra = false) =>
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

  it('gives varied opening balances across many seeds', () => {
    const sheets = seeds.map((seed) => JSON.stringify(newGame({ seed }).openingBalanceSheet))
    expect(new Set(sheets).size).toBeGreaterThan(190)
  })

  it('does not wrap the top of the seed range back onto seed 0', () => {
    expect(newGame({ seed: 0xffffffff }).openingBalanceSheet).not.toEqual(
      newGame({ seed: 0 }).openingBalanceSheet,
    )
  })

  it('stores player names trimmed', () => {
    expect(newGame({ playerNames: ['  Ana ', 'Ben'] }).players.map((p) => p.name)).toEqual([
      'Ana',
      'Ben',
    ])
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
      const interestTimes1200 = note * 6 * 3 // dollars of interest = note * 6 * 3 / 1200
      expect(interestTimes1200 % 1200).toBe(0)
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
    ['a negative seed', { seed: -1 }],
    ['a seed above 32 bits', { seed: 2 ** 32 }],
    ['an unknown mode', { mode: 'Half Year' as unknown as GameConfig['mode'] }],
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

describe('recording an entry', () => {
  const submit = (state: GameState, lines: Entry, player = 0) => {
    const result = applyAction(state, { type: 'submitEntry', player, lines })
    if (!result.ok) throw new Error(result.reason)
    return result.state
  }
  const rejection = (state: GameState, action: Action) => {
    const before = structuredClone(state)
    const result = applyAction(state, action)
    expect(result.ok).toBe(false)
    if (!result.ok) expect(result.reason).not.toBe('')
    expect(state).toEqual(before)
  }
  /** True when a debit increases the account (assets and expenses, flipped for contra accounts). */
  const debitNormal = (name: string) => {
    const account = CHART_OF_ACCOUNTS.find((a) => a.name === name)!
    return (account.type === 'Asset' || account.type === 'Expense') !== !!account.contra
  }

  it('awards the tier points for a correct entry and posts it to the ledger', () => {
    const game = newGame()
    const { expectedEntry, tier } = game.currentCard
    const after = submit(game, expectedEntry)
    const ana = after.players[0]
    expect(ana.score).toBe(tier)
    expect(ana.mistakes).toEqual([])
    for (const { account, side, amount } of expectedEntry) {
      const sign = (side === 'Debit') === debitNormal(account) ? 1 : -1
      expect(ana.balances[account]).toBe(game.openingBalanceSheet[account] + sign * amount)
    }
    expect(ana.correctBalances).toEqual(ana.balances)
  })

  it('does not care about line order or split lines', () => {
    const game = newGame()
    const { expectedEntry, tier } = game.currentCard
    const [first, ...rest] = expectedEntry
    const split = [
      ...rest.reverse(),
      { ...first, amount: 1 },
      { ...first, amount: first.amount - 1 },
    ]
    const after = submit(game, split)
    expect(after.players[0].score).toBe(tier)
    expect(after.players[0].mistakes).toEqual([])
  })

  it('posts a wrong entry as entered, scores 0 and lists the mistake with the correct entry', () => {
    const game = newGame()
    const yours: Entry = [
      { account: 'Supplies Expense', side: 'Debit', amount: 400 },
      { account: 'Cash', side: 'Credit', amount: 400 },
    ]
    const after = submit(game, yours)
    const ana = after.players[0]
    expect(ana.score).toBe(0)
    expect(ana.balances['Supplies Expense']).toBe(400)
    expect(ana.balances['Rent Expense']).toBe(0)
    expect(ana.mistakes).toEqual([
      {
        cardId: game.currentCard.id,
        cardText: game.currentCard.text,
        yours,
        correct: game.currentCard.expectedEntry,
        reason: game.currentCard.reason,
      },
    ])
  })

  it('posts an unbalanced entry as entered and scores 0', () => {
    const game = newGame()
    const after = submit(game, [{ account: 'Rent Expense', side: 'Debit', amount: 400 }])
    const ana = after.players[0]
    expect(ana.score).toBe(0)
    expect(ana.balances['Rent Expense']).toBe(400)
    expect(ana.balances['Cash']).toBe(game.openingBalanceSheet['Cash'])
    expect(ana.mistakes).toHaveLength(1)
  })

  it('keeps the correct ledger on the expected entry whatever the player posted', () => {
    const game = newGame()
    const wrong = submit(game, [{ account: 'Advertising Expense', side: 'Debit', amount: 7 }])
    const right = submit(game, game.currentCard.expectedEntry)
    expect(wrong.players[0].correctBalances).toEqual(right.players[0].correctBalances)
    expect(wrong.players[0].balances).not.toEqual(wrong.players[0].correctBalances)
  })

  it('leaves other players untouched', () => {
    const game = newGame()
    const after = submit(game, game.currentCard.expectedEntry, 0)
    expect(after.players[1]).toEqual(game.players[1])
  })

  it.each([
    ['a fractional amount', 12.5],
    ['a negative amount', -400],
    ['a zero amount', 0],
    ['a non-numeric amount', Number.NaN],
  ])('rejects an entry with %s, giving a reason', (_label, amount) => {
    rejection(newGame(), {
      type: 'submitEntry',
      player: 0,
      lines: [
        { account: 'Rent Expense', side: 'Debit', amount },
        { account: 'Cash', side: 'Credit', amount: 400 },
      ],
    })
  })

  it('rejects an empty entry, an unknown account, an unknown player and a repeat', () => {
    const game = newGame()
    rejection(game, { type: 'submitEntry', player: 0, lines: [] })
    rejection(game, {
      type: 'submitEntry',
      player: 0,
      lines: [{ account: 'Goodwill' as AccountName, side: 'Debit', amount: 5 }],
    })
    rejection(game, { type: 'submitEntry', player: 2, lines: game.currentCard.expectedEntry })
    rejection(submit(game, game.currentCard.expectedEntry), {
      type: 'submitEntry',
      player: 0,
      lines: game.currentCard.expectedEntry,
    })
  })

  it('is repeatable: same seed and same actions give the same game', () => {
    const play = () => submit(newGame(), [{ account: 'Cash', side: 'Credit', amount: 3 }])
    expect(play()).toEqual(play())
  })
})
