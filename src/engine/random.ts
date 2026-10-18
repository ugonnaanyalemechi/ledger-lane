/** Seeded generator (mulberry32). The state is a single integer so it can live in game state. */
export interface Rng {
  state: number
}

export function nextFloat(rng: Rng): number {
  rng.state = (rng.state + 0x6d2b79f5) | 0
  let t = rng.state
  t = Math.imul(t ^ (t >>> 15), t | 1)
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296
}

/** A random multiple of `step` between `min` and `max`, inclusive. */
export function pickStep(rng: Rng, min: number, max: number, step: number): number {
  const steps = Math.floor((max - min) / step)
  return min + Math.floor(nextFloat(rng) * (steps + 1)) * step
}
