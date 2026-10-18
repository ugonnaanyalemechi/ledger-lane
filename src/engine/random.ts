/** Seeded generator (mulberry32). The state is a single integer so it can live in game state. */
export interface Rng {
  state: number
}

/**
 * A float in [0, 1). Advances `rng` in place, so callers pass a copy of any
 * state they must leave unchanged.
 */
export function nextFloat(rng: Rng): number {
  // 0x6d2b79f5 is mulberry32's fixed step; `| 0` keeps the state a 32-bit integer.
  rng.state = (rng.state + 0x6d2b79f5) | 0
  let t = rng.state
  t = Math.imul(t ^ (t >>> 15), t | 1)
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
  // Divide the unsigned 32-bit result by 2^32 to land in [0, 1).
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296
}

/** A random multiple of `step` between `min` and `max`, inclusive. */
export function pickStep(rng: Rng, min: number, max: number, step: number): number {
  const steps = Math.floor((max - min) / step)
  return min + Math.floor(nextFloat(rng) * (steps + 1)) * step
}
