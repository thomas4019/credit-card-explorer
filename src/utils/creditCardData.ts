export type SpendCategory = 'dining' | 'flights' | 'hotels' | 'otherTravel' | 'groceries' | 'other'
export type CardKey = 'chase' | 'amex' | 'sapphire' | 'sapphirereserve' | 'citi' | 'savor' | 'venturex'

export const cardOptions: { key: CardKey; label: string }[] = [
  { key: 'chase', label: 'Chase Freedom Unlimited' },
  { key: 'amex', label: 'Amex Gold' },
  { key: 'sapphire', label: 'Chase Sapphire Preferred' },
  { key: 'sapphirereserve', label: 'Chase Sapphire Reserve' },
  { key: 'citi', label: 'Citibank Double Cash' },
  { key: 'savor', label: 'Capital One Savor' },
  { key: 'venturex', label: 'Capital One Venture X' },
]

export const rewardRates: Record<CardKey, Record<SpendCategory, number>> = {
  chase: {
    dining: 3,
    flights: 1.5,
    hotels: 1.5,
    otherTravel: 1.5,
    groceries: 1.5,
    other: 1.5,
  },
  amex: {
    dining: 4,
    flights: 3,
    hotels: 1,
    otherTravel: 1,
    groceries: 4,
    other: 1,
  },
  sapphire: {
    dining: 3,
    flights: 2,
    hotels: 2,
    otherTravel: 2,
    groceries: 1,
    other: 1,
  },
  sapphirereserve: {
    dining: 3,
    flights: 4,
    hotels: 4,
    otherTravel: 1,
    groceries: 1,
    other: 1,
  },
  citi: {
    dining: 2,
    flights: 2,
    hotels: 2,
    otherTravel: 2,
    groceries: 2,
    other: 2,
  },
  savor: {
    dining: 3,
    flights: 1,
    hotels: 1,
    otherTravel: 1,
    groceries: 3,
    other: 1,
  },
  venturex: {
    dining: 2,
    flights: 2,
    hotels: 2,
    otherTravel: 2,
    groceries: 2,
    other: 2,
  },
}

export const annualFees: Record<CardKey, number> = {
  chase: 0,
  amex: 320,
  sapphire: 99,
  sapphirereserve: 759,
  citi: 0,
  savor: 0,
  venturex: 395,
}

export const otherBenefits: Record<CardKey, number> = {
  chase: 0,
  amex: 220,
  sapphire: 0,
  sapphirereserve: 300,
  citi: 0,
  savor: 0,
  venturex: 400,
}

export const pointValue: Record<CardKey, number> = {
  chase: 0.015,
  amex: 0.015,
  sapphire: 0.015,
  sapphirereserve: 0.015,
  citi: 0.01,
  savor: 0.01,
  venturex: 0.0125,
}

export const spendCategories: { key: SpendCategory; label: string }[] = [
  { key: 'dining', label: 'Dining' },
  { key: 'flights', label: 'Flights' },
  { key: 'hotels', label: 'Hotels' },
  { key: 'otherTravel', label: 'Other Travel' },
  { key: 'groceries', label: 'Groceries' },
  { key: 'other', label: 'Other' },
]

export const defaultSpend: Record<SpendCategory, number> = {
  dining: 500,
  flights: 300,
  hotels: 200,
  otherTravel: 167,
  groceries: 500,
  other: 1000,
}
