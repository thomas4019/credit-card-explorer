export type SpendCategory = 'dining' | 'flights' | 'hotels' | 'otherTravel' | 'groceries' | 'gas' | 'other'
export type CardKey = 'chase' | 'amex' | 'sapphire' | 'sapphirereserve' | 'citi' | 'citipremier' | 'savor' | 'venturex' | 'amexbluecash'

// Cards that should be hidden from the maximizer interface
// These cards will still have all their data available for calculations,
// but won't appear in the card selection dropdown or card impact analysis
export const hiddenCards: CardKey[] = ['citipremier']

// All available cards (including hidden ones)
export const allCardOptions: { key: CardKey; label: string }[] = [
  { key: 'chase', label: 'Chase Freedom Unlimited' },
  { key: 'amex', label: 'Amex Gold' },
  { key: 'sapphire', label: 'Chase Sapphire Preferred' },
  { key: 'sapphirereserve', label: 'Chase Sapphire Reserve' },
  { key: 'citi', label: 'Citibank Double Cash' },
  { key: 'citipremier', label: 'Citi Premier' },
  { key: 'savor', label: 'Capital One Savor' },
  { key: 'venturex', label: 'Capital One Venture X' },
  { key: 'amexbluecash', label: 'Amex Blue Cash Preferred' },
]

// Visible cards for the maximizer interface (filtered from hidden cards)
export const cardOptions: { key: CardKey; label: string }[] = allCardOptions.filter(
  card => !hiddenCards.includes(card.key)
)

// Utility function to check if a card is hidden
export const isCardHidden = (cardKey: CardKey): boolean => {
  return hiddenCards.includes(cardKey)
}

export const rewardRates: Record<CardKey, Record<SpendCategory, number>> = {
  chase: {
    dining: 3,
    flights: 1.5,
    hotels: 1.5,
    otherTravel: 1.5,
    groceries: 1.5,
    gas: 1.5,
    other: 1.5,
  },
  amex: {
    dining: 4,
    flights: 3,
    hotels: 1,
    otherTravel: 1,
    groceries: 4,
    gas: 1,
    other: 1,
  },
  sapphire: {
    dining: 3,
    flights: 2,
    hotels: 2,
    otherTravel: 2,
    groceries: 1,
    gas: 1,
    other: 1,
  },
  sapphirereserve: {
    dining: 3,
    flights: 4,
    hotels: 4,
    otherTravel: 1,
    groceries: 1,
    gas: 1,
    other: 1,
  },
  citi: {
    dining: 2,
    flights: 2,
    hotels: 2,
    otherTravel: 2,
    groceries: 2,
    gas: 2,
    other: 2,
  },
  citipremier: {
    dining: 3,
    flights: 3,
    hotels: 3,
    otherTravel: 3,
    groceries: 3,
    gas: 3,
    other: 1,
  },
  savor: {
    dining: 3,
    flights: 1,
    hotels: 1,
    otherTravel: 1,
    groceries: 3,
    gas: 1,
    other: 1,
  },
  venturex: {
    dining: 2,
    flights: 2,
    hotels: 2,
    otherTravel: 2,
    groceries: 2,
    gas: 2,
    other: 2,
  },
  amexbluecash: {
    dining: 1,
    flights: 1,
    hotels: 1,
    otherTravel: 3,
    groceries: 6,
    gas: 3,
    other: 1,
  },
}

export const annualFees: Record<CardKey, number> = {
  chase: 0,
  amex: 320,
  sapphire: 99,
  sapphirereserve: 795,
  citi: 0,
  citipremier: 95,
  savor: 0,
  venturex: 395,
  amexbluecash: 95,
}

export const otherBenefits: Record<CardKey, number> = {
  chase: 0,
  amex: 220,
  sapphire: 0,
  sapphirereserve: 300,
  citi: 0,
  citipremier: 100,
  savor: 0,
  venturex: 400,
  amexbluecash: 0,
}

export const otherBenefitsSummary: Record<CardKey, string> = {
  chase: '',
  amex: '$10 Uber credit/mo, $10 dining credit/mo, $50 Resy credit/6mo',
  sapphire: '',
  sapphirereserve: '$500 hotel, $300 dining, $300 entertainment, free Apple+, $120 Peloton, $120 Lyft, $300 DoorDash, IHG Platinum, lounge access',
  citi: '',
  citipremier: '$100 hotel credit/yr',
  savor: '',
  venturex: '$300 travel credit/yr, 10,000 anniversary miles',
  amexbluecash: '',
}

export const pointValue: Record<CardKey, number> = {
  chase: 1.0,
  amex: 1.5,
  sapphire: 1.5,
  sapphirereserve: 1.5,
  citi: 1.0,
  citipremier: 1.85,
  savor: 1.0,
  venturex: 1.25,
  amexbluecash: 1.0,
}

export const spendCategories: { key: SpendCategory; label: string }[] = [
  { key: 'dining', label: 'Dining' },
  { key: 'flights', label: 'Flights' },
  { key: 'hotels', label: 'Hotels' },
  { key: 'otherTravel', label: 'Other Travel' },
  { key: 'groceries', label: 'Groceries' },
  { key: 'gas', label: 'Gas' },
  { key: 'other', label: 'Other' },
]

export const defaultSpend: Record<SpendCategory, number> = {
  dining: 500,
  flights: 100,
  hotels: 150,
  gas: 100,
  otherTravel: 50,
  groceries: 500,
  other: 1000,
}
