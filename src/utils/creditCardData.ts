export type SpendCategory = 'dining' | 'flights' | 'hotels' | 'otherTravel' | 'groceries' | 'gas' | 'other'
export type CardKey = 'chase' | 'amex' | 'sapphire' | 'sapphirereserve' | 'citi' | 'citipremier' | 'savor' | 'venturex' | 'amexbluecash'
export type TransferPartner = 'delta' | 'united' | 'southwest' | 'hyatt'

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

// Base point values (when no transfer partners are selected)
export const pointValue: Record<CardKey, number> = {
  chase: 1.0,
  amex: 1.0,
  sapphire: 1.0,
  sapphirereserve: 1.0,
  citi: 1.0,
  citipremier: 1.0,
  savor: 1.0,
  venturex: 1.0,
  amexbluecash: 1.0,
}

// Elevated point values (when relevant transfer partners are selected)
export const elevatedPointsValue: Record<CardKey, number> = {
  chase: 1.0, // When United, Southwest, or Hyatt selected
  amex: 1.25, // When Delta selected
  sapphire: 1.5, // When United, Southwest, or Hyatt selected
  sapphirereserve: 1.5, // When United, Southwest, or Hyatt selected
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

export const transferPartnerOptions: { key: TransferPartner; label: string; icon: string }[] = [
  { key: 'delta', label: 'Delta', icon: '✈️' },
  { key: 'united', label: 'United', icon: '✈️' },
  { key: 'southwest', label: 'Southwest', icon: '✈️' },
  { key: 'hyatt', label: 'Hyatt', icon: '🏨' },
]

// Get effective point value based on transfer partners
export const getPointValueWithTransfers = (cardKey: CardKey, selectedTransferPartners: TransferPartner[]): number => {
  if (selectedTransferPartners.length === 0) {
    // No transfer partners selected, use base value of 1.0
    return 1.0
  }

  // Check if any Chase-benefiting partners are selected (United, Southwest, Hyatt)
  const chasePartners = selectedTransferPartners.some(partner => 
    ['united', 'southwest', 'hyatt'].includes(partner)
  )
  
  // Check if Delta is selected (benefits Amex)
  const deltaSelected = selectedTransferPartners.includes('delta')

  // Apply elevated values based on card type and selected partners
  if (['chase', 'sapphire', 'sapphirereserve'].includes(cardKey) && chasePartners) {
    return elevatedPointsValue[cardKey]
  }
  
  if (cardKey === 'amex' && deltaSelected) {
    return elevatedPointsValue[cardKey]
  }

  // For other cards or when relevant partners aren't selected, use base value of 1.0
  return 1.0
}

export const defaultSpend: Record<SpendCategory, number> = {
  dining: 500,
  flights: 100,
  hotels: 150,
  gas: 100,
  otherTravel: 50,
  groceries: 500,
  other: 1000,
}

export const signupLinksAndBonuses: Record<CardKey, { link: string; bonus: string }> = {
  chase: {
    link: 'https://www.referyourchasecard.com/18A/3XFBFF94HA',
    bonus: 'Earn $200 after you spend $500 on purchases in the first 3 months.'
  },
  amex: {
    link: 'https://americanexpress.com/en-us/referral/gold-card?ref=THOMAHu0nC&XLINK=MYCP',
    bonus: 'Up to 100,000 Membership Rewards® Points after you spend $6,000 in the first 6 months.'
  },
  sapphire: {
    link: 'https://www.referyourchasecard.com/19u/NSJ6A49T0P#preferred',
    bonus: 'Earn 60,000 bonus points after you spend $5,000 in the first 3 months.'
  },
  sapphirereserve: {
    link: 'https://www.referyourchasecard.com/19u/NSJ6A49T0P#reserve',
    bonus: 'Earn 125,000 bonus points after you spend $6,000 in the first 3 months.'
  },
  citi: {
    link: 'https://www.citi.com/credit-cards/citi-double-cash-credit-card',
    bonus: 'Earn $200 cash back after you spend $1,500 in the first 6 months.'
  },
  citipremier: {
    link: 'https://www.citi.com/credit-cards/citi-premier-credit-card',
    bonus: 'Earn 60,000 bonus ThankYou® Points after you spend $4,000 in the first 3 months.'
  },
  savor: {
    link: 'https://www.capitalone.com/credit-cards/savor/',
    bonus: 'Earn a one-time $300 cash bonus after you spend $3,000 in the first 3 months.'
  },
  venturex: {
    link: 'https://www.capitalone.com/credit-cards/venture-x/',
    bonus: 'Earn 75,000 bonus miles after you spend $4,000 in the first 3 months.'
  },
  amexbluecash: {
    link: 'https://www.americanexpress.com/us/credit-cards/card/blue-cash-preferred/',
    bonus: 'Earn a $250 statement credit after you spend $3,000 in the first 6 months.'
  },
}
