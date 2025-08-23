import {
  type SpendCategory,
  type CardKey,
  rewardRates,
  annualFees,
  otherBenefits,
  pointValue,
  spendCategories,
} from './creditCardData'

export interface SpendRow {
  key: SpendCategory
  label: string
  spend: number
  rate: number
  points: number
  value: number
  bestCard: CardKey | undefined
}

// Get effective point value for a card, considering Chase transferable points
export const getEffectivePointValue = (
  cardKey: CardKey, 
  selectedCards: CardKey[], 
  pointValues: Record<CardKey, number>,
  hypotheticalCards?: CardKey[]
): number => {
  const cardsToCheck = hypotheticalCards || selectedCards
  
  if (['chase', 'sapphire', 'sapphirereserve'].includes(cardKey)) {
    // Chase cards use the highest point value among selected Chase cards
    const chaseCards = cardsToCheck.filter(card => ['chase', 'sapphire', 'sapphirereserve'].includes(card))
    if (chaseCards.length > 0) {
      return Math.max(...chaseCards.map(card => pointValues[card]))
    }
  }
  return pointValues[cardKey]
}

// Calculate spend rows for selected cards
export const calculateSpendRows = (
  spend: Record<SpendCategory, number>,
  selectedCards: CardKey[],
  pointValues: Record<CardKey, number>
): SpendRow[] => {
  return spendCategories.map((c) => {
    const spendAmountMonthly = spend[c.key]
    const spendAmountAnnual = spendAmountMonthly * 12
    
    if (selectedCards.length === 0) {
      // If no cards selected, show $0 for all categories
      return {
        key: c.key,
        label: c.label,
        spend: spendAmountMonthly,
        rate: 0,
        points: 0,
        value: 0,
        bestCard: undefined,
      }
    }
    
    // Find best card for this category
    let bestCard: CardKey = selectedCards[0]
    let bestValue = -Infinity
    let bestRate = 0
    let bestPoints = 0
    selectedCards.forEach((card) => {
      const rate = rewardRates[card][c.key]
      const points = spendAmountAnnual * rate
      const value = points * getEffectivePointValue(card, selectedCards, pointValues) / 100
      if (value > bestValue) {
        bestValue = value
        bestCard = card
        bestRate = rate
        bestPoints = points
      }
    })
    
    return {
      key: c.key,
      label: c.label,
      spend: spendAmountMonthly,
      rate: bestRate,
      points: bestPoints,
      value: bestValue,
      bestCard,
    }
  })
}

// Calculate net earnings change if each card were added
export const calculateCardImpact = (
  cardKey: CardKey,
  spend: Record<SpendCategory, number>,
  selectedCards: CardKey[],
  pointValues: Record<CardKey, number>
): number => {
  if (selectedCards.includes(cardKey)) {
    return 0 // Card is already selected
  }
  
  // Calculate total value WITHOUT the new card
  const currentSpendRows = calculateSpendRows(spend, selectedCards, pointValues)
  const currentTotalValue = currentSpendRows.reduce((sum, row) => sum + row.value, 0)
  const currentAnnualFees = selectedCards.reduce((sum, card) => sum + annualFees[card], 0)
  const currentBenefits = selectedCards.reduce((sum, card) => sum + otherBenefits[card], 0)
  const currentNetValue = currentTotalValue - currentAnnualFees + currentBenefits
  
  // Calculate total value WITH the new card
  const newCards = [...selectedCards, cardKey]
  const newSpendRows = calculateSpendRows(spend, newCards, pointValues)
  const newTotalValue = newSpendRows.reduce((sum, row) => sum + row.value, 0)
  const newAnnualFees = newCards.reduce((sum, card) => sum + annualFees[card], 0)
  const newBenefits = newCards.reduce((sum, card) => sum + otherBenefits[card], 0)
  const newNetValue = newTotalValue - newAnnualFees + newBenefits
  
  // The impact is the difference
  return newNetValue - currentNetValue
}
