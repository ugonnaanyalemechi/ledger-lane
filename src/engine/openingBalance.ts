import { CHART_OF_ACCOUNTS, type Balances } from './accounts'
import { pickStep, type Rng } from './random'

/**
 * Ranges are chosen so Retained Earnings is always positive:
 * assets are at least 33,700 and liabilities plus Common Stock at most 32,000.
 * Note Payable is a multiple of 200 so 3 months of 6% interest (1.5%) is whole dollars.
 */
export function generateOpeningBalances(rng: Rng): Balances {
  const equipment = pickStep(rng, 30000, 60000, 5000)
  const monthlyPremium = pickStep(rng, 100, 400, 25)
  const monthsOfCoverage = pickStep(rng, 12, 18, 1)

  const balances: Balances = Object.fromEntries(CHART_OF_ACCOUNTS.map((a) => [a.name, 0]))
  balances['Cash'] = pickStep(rng, 8000, 30000, 500)
  balances['Supplies'] = pickStep(rng, 500, 3000, 50)
  balances['Prepaid Insurance'] = monthlyPremium * monthsOfCoverage
  balances['Equipment'] = equipment
  balances['Accumulated Depreciation'] = pickStep(rng, 1000, equipment / 5, 500)
  balances['Note Payable'] = pickStep(rng, 4000, 12000, 200)
  balances['Deferred Revenue'] = pickStep(rng, 500, 2000, 100)
  balances['Common Stock'] = pickStep(rng, 10000, 18000, 1000)

  const assets =
    balances['Cash'] +
    balances['Supplies'] +
    balances['Prepaid Insurance'] +
    balances['Equipment'] -
    balances['Accumulated Depreciation']
  const liabilities = balances['Note Payable'] + balances['Deferred Revenue']
  balances['Retained Earnings'] = assets - liabilities - balances['Common Stock']
  return balances
}
