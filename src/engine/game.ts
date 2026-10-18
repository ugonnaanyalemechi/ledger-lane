import { HARD_CODED_CARD, type TransactionCard } from '../content/cards'
import type { Balances } from './accounts'
import { entryProblem, postEntry, sameNetEffect, type Entry } from './entry'
import { generateOpeningBalances } from './openingBalance'
import type { Rng } from './random'

export type Mode = 'Quick' | 'Full Year'

export type Phase = 'Opening balance sheet'

export interface GameConfig {
  playerNames: string[]
  mode: Mode
  seed: number
}

/** A wrongly recorded card, kept as the player's entry next to the correct one. */
export interface Mistake {
  cardId: string
  cardText: string
  yours: Entry
  correct: Entry
  reason: string
}

export interface Player {
  name: string
  /** What the player posted. Every player starts from the shared opening balance sheet. */
  balances: Balances
  /** What the player should have posted for the same cards. */
  correctBalances: Balances
  score: number
  /** Cards the player has recorded, with the points each earned. */
  recorded: { cardId: string; points: number }[]
  mistakes: Mistake[]
}

export interface GameState {
  phase: Phase
  mode: Mode
  seed: number
  players: Player[]
  openingBalanceSheet: Balances
  currentCard: TransactionCard
  rng: Rng
}

export type Action =
  | { type: 'confirmHandoff' }
  | { type: 'submitEntry'; player: number; lines: Entry }

export type Result = { ok: true; state: GameState } | { ok: false; reason: string }

const MAX_PLAYERS = 4
const MAX_SEED = 0xffffffff

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
  if (!Number.isInteger(seed) || seed < 0 || seed > MAX_SEED) {
    return { ok: false, reason: `Seed must be a whole number from 0 to ${MAX_SEED}.` }
  }

  // Generation advances this local generator; the state keeps its own copy of where it ended.
  const rng: Rng = { state: seed | 0 }
  const openingBalanceSheet = generateOpeningBalances(rng)
  return {
    ok: true,
    state: {
      phase: 'Opening balance sheet',
      mode,
      seed,
      players: playerNames.map((name) => ({
        name: name.trim(),
        balances: { ...openingBalanceSheet },
        correctBalances: { ...openingBalanceSheet },
        score: 0,
        recorded: [],
        mistakes: [],
      })),
      openingBalanceSheet,
      currentCard: HARD_CODED_CARD,
      rng: { ...rng },
    },
  }
}

export function applyAction(state: GameState, action: Action): Result {
  if (action.type === 'submitEntry') return submitEntry(state, action.player, action.lines)
  return { ok: false, reason: `${action.type} is not allowed during ${state.phase}.` }
}

function submitEntry(state: GameState, playerIndex: number, lines: Entry): Result {
  const player = state.players[playerIndex]
  if (!player) return { ok: false, reason: 'There is no such player.' }
  const { currentCard: card } = state
  if (player.recorded.some((r) => r.cardId === card.id)) {
    return { ok: false, reason: `${player.name} has already recorded this card.` }
  }
  const problem = entryProblem(lines)
  if (problem) return { ok: false, reason: problem }

  const correct = sameNetEffect(lines, card.expectedEntry)
  const points = correct ? card.tier : 0
  const updated: Player = {
    ...player,
    balances: postEntry(player.balances, lines),
    correctBalances: postEntry(player.correctBalances, card.expectedEntry),
    score: player.score + points,
    recorded: [...player.recorded, { cardId: card.id, points }],
    mistakes: correct
      ? player.mistakes
      : [
          ...player.mistakes,
          {
            cardId: card.id,
            cardText: card.text,
            yours: lines.map((line) => ({ ...line })),
            correct: card.expectedEntry.map((line) => ({ ...line })),
            reason: card.reason,
          },
        ],
  }
  return {
    ok: true,
    state: { ...state, players: state.players.map((p, i) => (i === playerIndex ? updated : p)) },
  }
}
