import type { Balances } from './accounts'
import { generateOpeningBalances } from './openingBalance'
import type { Rng } from './random'

export type Mode = 'Quick' | 'Full Year'

export interface GameConfig {
  playerNames: string[]
  mode: Mode
  seed: number
}

export interface Player {
  name: string
  /** The player's ledger balances. Every player starts from the shared opening balance sheet. */
  balances: Balances
}

export interface GameState {
  phase: 'Opening balance sheet'
  mode: Mode
  seed: number
  players: Player[]
  openingBalanceSheet: Balances
  rng: Rng
}

export type Action = { type: 'confirmHandoff' }

export type Result = { ok: true; state: GameState } | { ok: false; reason: string }

const MAX_PLAYERS = 4

export function createGame(config: GameConfig): Result {
  const { playerNames, mode, seed } = config
  if (playerNames.length < 1 || playerNames.length > MAX_PLAYERS) {
    return { ok: false, reason: `A game needs 1 to ${MAX_PLAYERS} players.` }
  }
  if (playerNames.some((name) => name.trim() === '')) {
    return { ok: false, reason: 'Player names cannot be empty.' }
  }
  if (mode !== 'Quick' && mode !== 'Full Year') {
    return { ok: false, reason: 'Mode must be Quick or Full Year.' }
  }
  if (!Number.isInteger(seed)) {
    return { ok: false, reason: 'Seed must be a whole number.' }
  }

  const rng: Rng = { state: seed | 0 }
  const openingBalanceSheet = generateOpeningBalances(rng)
  return {
    ok: true,
    state: {
      phase: 'Opening balance sheet',
      mode,
      seed,
      players: playerNames.map((name) => ({ name: name.trim(), balances: { ...openingBalanceSheet } })),
      openingBalanceSheet,
      rng,
    },
  }
}

/** No action is accepted yet; rejected actions leave the state unchanged. */
export function applyAction(state: GameState, action: Action): Result {
  return { ok: false, reason: `${action.type} is not allowed during ${state.phase}.` }
}
