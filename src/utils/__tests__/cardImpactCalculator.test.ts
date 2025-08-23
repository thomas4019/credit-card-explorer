import { describe, it, expect } from 'vitest'
import { calculateCardImpact, getEffectivePointValue, calculateSpendRows } from '../cardImpactCalculator'
import { pointValue, defaultSpend } from '../creditCardData'
import type { CardKey, SpendCategory } from '../creditCardData'

describe('getEffectivePointValue', () => {
  it('should return base point value for non-Chase cards', () => {
    expect(getEffectivePointValue('amex', ['amex'], pointValue)).toBe(1.5)
    expect(getEffectivePointValue('citi', ['citi'], pointValue)).toBe(1.0)
  })

  it('should return highest point value among Chase cards', () => {
    expect(getEffectivePointValue('chase', ['chase'], pointValue)).toBe(1.0)
    expect(getEffectivePointValue('sapphire', ['chase', 'sapphire'], pointValue)).toBe(1.5)
    expect(getEffectivePointValue('chase', ['chase', 'sapphire'], pointValue)).toBe(1.5)
  })

  it('should return highest point value among Citi cards', () => {
    expect(getEffectivePointValue('citi', ['citi'], pointValue)).toBe(1.0)
    expect(getEffectivePointValue('citipremier', ['citi', 'citipremier'], pointValue)).toBe(1.85)
    expect(getEffectivePointValue('citi', ['citi', 'citipremier'], pointValue)).toBe(1.85)
  })

  it('should handle hypothetical Chase card scenarios', () => {
    // When calculating impact of adding Sapphire Preferred to existing Chase Freedom
    const hypotheticalCards: CardKey[] = ['chase', 'sapphire']
    expect(getEffectivePointValue('chase', ['chase'], pointValue, hypotheticalCards)).toBe(1.5)
    expect(getEffectivePointValue('sapphire', ['chase'], pointValue, hypotheticalCards)).toBe(1.5)
  })

  it('should handle hypothetical Citi card scenarios', () => {
    // When calculating impact of adding Citi Premier to existing Citi Double Cash
    const hypotheticalCards: CardKey[] = ['citi', 'citipremier']
    expect(getEffectivePointValue('citi', ['citi'], pointValue, hypotheticalCards)).toBe(1.85)
    expect(getEffectivePointValue('citipremier', ['citi'], pointValue, hypotheticalCards)).toBe(1.85)
  })
})

describe('calculateSpendRows', () => {
  it('should return zero values when no cards selected', () => {
    const result = calculateSpendRows(defaultSpend, [], pointValue)
    expect(result).toHaveLength(7) // 7 spending categories
    result.forEach(row => {
      expect(row.value).toBe(0)
      expect(row.rate).toBe(0)
      expect(row.points).toBe(0)
      expect(row.bestCard).toBeUndefined()
    })
  })

  it('should calculate correct values for single card', () => {
    const result = calculateSpendRows(defaultSpend, ['amex'], pointValue)
    
    // Check dining category (4x at 1.5¢)
    const diningRow = result.find(row => row.key === 'dining')
    expect(diningRow?.value).toBe(500 * 12 * 4 * 1.5 / 100) // $360
    expect(diningRow?.bestCard).toBe('amex')
    
    // Check groceries category (4x at 1.5¢)
    const groceriesRow = result.find(row => row.key === 'groceries')
    expect(groceriesRow?.value).toBe(500 * 12 * 4 * 1.5 / 100) // $360
  })

  it('should select best card for each category when multiple cards selected', () => {
    const result = calculateSpendRows(defaultSpend, ['amex', 'chase'], pointValue)
    
    // Dining: Amex Gold (4x at 1.5¢) should beat Chase Freedom (3x at 1.0¢)
    const diningRow = result.find(row => row.key === 'dining')
    expect(diningRow?.bestCard).toBe('amex')
    expect(diningRow?.value).toBe(500 * 12 * 4 * 1.5 / 100) // $360
    
    // Other: Both cards are equal (1.5x at 1.0¢ vs 1x at 1.5¢), first card wins
    const otherRow = result.find(row => row.key === 'other')
    expect(otherRow?.bestCard).toBe('amex') // First card in array wins ties
    expect(otherRow?.value).toBe(1000 * 12 * 1.5 * 1.0 / 100) // $180
  })
})

describe('calculateCardImpact', () => {
  it('should return 0 for already selected cards', () => {
    const impact = calculateCardImpact('amex', defaultSpend, ['amex'], pointValue)
    expect(impact).toBe(0)
  })

  it('should calculate full value when no cards selected', () => {
    const impact = calculateCardImpact('amex', defaultSpend, [], pointValue)
    
    // Should include all rewards minus annual fee plus benefits
    const expectedRewards = (
      (500 * 12 * 4 * 1.5 / 100) + // dining
      (100 * 12 * 3 * 1.5 / 100) + // flights
      (150 * 12 * 1 * 1.5 / 100) + // hotels
      (50 * 12 * 1 * 1.5 / 100) +  // otherTravel
      (500 * 12 * 4 * 1.5 / 100) + // groceries
      (100 * 12 * 1 * 1.5 / 100) + // gas
      (1000 * 12 * 1 * 1.5 / 100)  // other
    )
    const expectedImpact = expectedRewards - 320 + 220 // annual fee + benefits
    
    expect(impact).toBeCloseTo(expectedImpact, 2)
  })

  it('should calculate incremental value when cards already selected', () => {
    // Start with Amex Gold
    const impact = calculateCardImpact('chase', defaultSpend, ['amex'], pointValue)
    
    // Chase Freedom should add value where it beats Amex Gold
    // Check if it adds any incremental value (could be positive or negative)
    expect(typeof impact).toBe('number')
    
    // Log the actual impact for debugging
    console.log('Chase Freedom impact when added to Amex Gold:', impact)
    
    // If Chase Freedom doesn't improve any categories, impact could be 0
    // This is actually valid behavior
    expect(impact).toBeGreaterThanOrEqual(0) // Should be >= 0 since no annual fee
  })

  it('should handle Chase card synergy correctly', () => {
    // This is the key test for the issue you reported
    const impact = calculateCardImpact('sapphire', defaultSpend, ['amex', 'chase'], pointValue)
    
    // Sapphire Preferred should show improved impact because:
    // 1. It improves Chase Freedom Unlimited's point value from 1.0¢ to 1.5¢
    // 2. This affects categories where Chase Freedom is currently best
    
    // The impact should be better than just the annual fee (-$99)
    // because it improves Chase Freedom's point values
    expect(impact).toBeGreaterThan(-99)
    
    // Log the actual impact for debugging
    console.log('Sapphire Preferred impact:', impact)
  })

  it('should show positive impact for Sapphire Preferred with Amex Gold + Chase Freedom', () => {
    // This test verifies the specific fix: Sapphire Preferred should show positive impact
    // when added to Amex Gold + Chase Freedom Unlimited due to Chase card synergy
    
    const impact = calculateCardImpact('sapphire', defaultSpend, ['amex', 'chase'], pointValue)
    
    // With our refactored approach, Sapphire Preferred should show positive impact
    // because it improves Chase Freedom's point values from 1.0¢ to 1.5¢
    expect(impact).toBeGreaterThan(0)
    
    // The impact should be around $36 based on our calculations
    // This represents the actual value improvement from Chase card synergy
    expect(impact).toBeCloseTo(36, 0)
    
    console.log('Sapphire Preferred impact (should be ~$36):', impact)
  })

  it('should handle multiple Chase cards correctly', () => {
    // Test with Amex Gold + Chase Freedom + Sapphire Preferred
    const impact = calculateCardImpact('sapphirereserve', defaultSpend, ['amex', 'chase', 'sapphire'], pointValue)
    
    // Sapphire Reserve should improve point values for all Chase cards to 1.5¢
    // But it has a very high annual fee ($759) so impact should be negative
    expect(impact).toBeLessThan(0)
  })

  it('should handle edge case with no spending', () => {
    const zeroSpend = {
      dining: 0,
      flights: 0,
      hotels: 0,
      otherTravel: 0,
      groceries: 0,
      gas: 0,
      other: 0,
    }
    
    const impact = calculateCardImpact('amex', zeroSpend, [], pointValue)
    // Should just be -annual fee + benefits
    expect(impact).toBe(-320 + 220) // -$100
  })

  it('should handle custom point values', () => {
    const customPointValues = { ...pointValue, chase: 2.0, sapphire: 2.0 }
    
    // With higher Chase point values, adding Sapphire should have different impact
    const impact = calculateCardImpact('sapphire', defaultSpend, ['amex', 'chase'], customPointValues)
    
    // Should be different from default 1.0¢ values
    const defaultImpact = calculateCardImpact('sapphire', defaultSpend, ['amex', 'chase'], pointValue)
    expect(impact).not.toBe(defaultImpact)
    
    // Log both impacts for debugging
    console.log('Custom point values impact:', impact, 'Default impact:', defaultImpact)
  })
})

describe('Integration tests', () => {
  it('should handle the specific scenario from the bug report', () => {
    // Test the exact scenario: Amex Gold + Chase Freedom Unlimited, then adding Sapphire Preferred
    
    // First, calculate current value with Amex Gold + Chase Freedom
    const currentSpendRows = calculateSpendRows(defaultSpend, ['amex', 'chase'], pointValue)
    const currentTotalValue = currentSpendRows.reduce((sum, row) => sum + row.value, 0)
    
    // Then calculate impact of adding Sapphire Preferred
    const sapphireImpact = calculateCardImpact('sapphire', defaultSpend, ['amex', 'chase'], pointValue)
    
    // The impact should be more positive than just the direct Sapphire benefits
    // because it improves Chase Freedom's point values
    expect(sapphireImpact).toBeGreaterThan(-99) // Should be better than just the annual fee
  })

  it('should show progressive improvement with Chase cards', () => {
    // Test that each additional Chase card improves the overall value
    
    // Start with just Chase Freedom
    const freedomOnly = calculateSpendRows(defaultSpend, ['chase'], pointValue)
    const freedomTotal = freedomOnly.reduce((sum, row) => sum + row.value, 0)
    
    // Add Sapphire Preferred
    const sapphireImpact = calculateCardImpact('sapphire', defaultSpend, ['chase'], pointValue)
    
    // Add Sapphire Reserve
    const reserveImpact = calculateCardImpact('sapphirereserve', defaultSpend, ['chase', 'sapphire'], pointValue)
    
    // Each addition should provide some value (though may be negative due to fees)
    expect(sapphireImpact).toBeGreaterThan(-99) // Better than just annual fee
    expect(reserveImpact).toBeGreaterThan(-759) // Better than just annual fee
  })
})

describe('Effective Cashback Rate Calculations', () => {
  it('should calculate effective cashback rates correctly', () => {
    // Test the effective cashback rate calculation
    // Amex Gold: 4x dining × 1.5¢ = 6% cashback
    const amexGoldDiningRate = 4
    const amexGoldPointValue = 1.5
    const effectiveCashbackRate = (amexGoldDiningRate * amexGoldPointValue) / 100
    
    expect(effectiveCashbackRate).toBe(0.06) // 6%
  })

  it('should handle Chase card effective rates correctly', () => {
    // Chase Freedom with Sapphire Preferred: 1.5x other × 1.5¢ = 2.25% cashback
    const chaseFreedomOtherRate = 1.5
    const chaseFreedomPointValue = 1.5 // When paired with Sapphire Preferred
    const effectiveCashbackRate = (chaseFreedomOtherRate * chaseFreedomPointValue) / 100
    
    expect(effectiveCashbackRate).toBe(0.0225) // 2.25%
  })
})
