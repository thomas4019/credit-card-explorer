import React, { useState, type ChangeEvent } from 'react'
import {
  type SpendCategory,
  type CardKey,
  cardOptions,
  rewardRates,
  annualFees,
  otherBenefits,
  pointValue,
  spendCategories,
  defaultSpend,
} from '../utils/creditCardData'

const Maximizer: React.FC = () => {
  const [spend, setSpend] = useState<Record<SpendCategory, number>>(defaultSpend)
  const [selectedCards, setSelectedCards] = useState<CardKey[]>(['chase'])

  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
  const formatCurrency = (amount: number): string => currencyFormatter.format(amount)

  const parseToNumber = (value: string): number => {
    const parsed = parseFloat(value)
    return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0
  }

  const handleSpendChange = (category: SpendCategory) => (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    setSpend((prev) => ({ ...prev, [category]: parseToNumber(event.target.value) }))
  }
  
  // For each category, find the best card among selectedCards
  type SpendRow = {
    key: SpendCategory,
    label: string,
    spend: number,
    rate: number,
    points: number,
    value: number,
    bestCard: CardKey,
  }

  const spendRows: SpendRow[] = spendCategories.map((c) => {
    const spendAmountMonthly = spend[c.key]
    const spendAmountAnnual = spendAmountMonthly * 12
    // Find best card for this category
    let bestCard: CardKey = selectedCards[0]
    let bestValue = -Infinity
    let bestRate = 0
    let bestPoints = 0
    selectedCards.forEach((card) => {
      const rate = rewardRates[card][c.key]
      const points = spendAmountAnnual * rate
      const value = points * pointValue[card]
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

  // Add annual fee row (sum for all selected cards)
  const annualFeeRow = {
    key: 'annual-fee',
    label: 'Annual Fee',
    spend: '',
    rate: '',
    points: '',
    value: -selectedCards.reduce((sum, card) => sum + annualFees[card], 0),
    bestCard: '',
  }

  // Add other benefits row (sum for all selected cards)
  const otherBenefitsRow = {
    key: 'other-benefits',
    label: 'Other Benefits',
    spend: '',
    rate: '',
    points: '',
    value: selectedCards.reduce((sum, card) => sum + otherBenefits[card], 0),
    bestCard: '',
  }

  const allRows = [...spendRows, annualFeeRow, otherBenefitsRow]
  const totalValue = allRows.reduce((sum, row) => sum + row.value, 0)
  const totalMonthlySpend = allRows.reduce((sum, row) => sum + (typeof row.spend === 'number' ? row.spend : 0), 0)
  const totalPoints = allRows.reduce((sum, row) => sum + (typeof row.points === 'number' ? row.points : 0), 0)

  // Calculate net earnings change if each card were added
  const calculateCardImpact = (cardKey: CardKey) => {
    if (selectedCards.includes(cardKey)) {
      return 0 // Card is already selected
    }
    
    let additionalValue = 0
    let additionalAnnualFee = annualFees[cardKey]
    let additionalBenefits = otherBenefits[cardKey]
    
    // Calculate additional rewards from this card
    spendCategories.forEach((category) => {
      const spendAmountAnnual = spend[category.key] * 12
      const rate = rewardRates[cardKey][category.key]
      const points = spendAmountAnnual * rate
      const value = points * pointValue[cardKey]
      
      // Check if this card would be better than current best for this category
      const currentBestValue = spendRows.find(row => row.key === category.key)?.value || 0
      if (value > currentBestValue) {
        additionalValue += (value - currentBestValue)
      }
    })
    
    return additionalValue - additionalAnnualFee + additionalBenefits
  }

  const cardImpactAnalysis = cardOptions.map((card) => ({
    ...card,
    impact: calculateCardImpact(card.key),
    isSelected: selectedCards.includes(card.key)
  }))

  const renderSpendRow = (row: typeof allRows[number]) => (
    <tr key={row.key} className={`spend-row ${row.key === 'annual-fee' ? 'annual-fee-row' : row.key === 'other-benefits' ? 'benefits-row' : 'category-row'}`}>
      <th scope="row" id={`cat-${row.key}`} className="category-label">
        {row.label}
      </th>
      <td className="spend-input-cell">
        {row.spend !== '' ? (
          <div className="input-wrapper">
            <span className="currency-symbol">$</span>
            <input
              className="spend-input"
              id={row.key}
              name={row.key}
              type="number"
              min={0}
              step={10}
              inputMode="numeric"
              value={row.spend}
              onChange={handleSpendChange(row.key as SpendCategory)}
              aria-labelledby={`cat-${row.key}`}
            />
          </div>
        ) : null}
      </td>
      <td className="rate-cell">
        {row.rate !== '' ? (
          <span className="rate-badge">{row.rate}x</span>
        ) : ''}
      </td>
      <td className="points-cell">
        {row.points !== '' ? (
          <span className="points-value">{row.points.toLocaleString()}</span>
        ) : ''}
      </td>
      <td className="value-cell">
        <span className={`value-amount ${row.value < 0 ? 'negative' : 'positive'}`}>
          {formatCurrency(row.value)}
        </span>
      </td>
      {row.bestCard !== undefined && (
        <td className="best-card-cell">
          {row.bestCard ? (
            <span className="best-card-badge">
              {cardOptions.find((c) => c.key === row.bestCard)?.label}
            </span>
          ) : ''}
        </td>
      )}
    </tr>
  )

  return (
    <div className="maximizer-container">
      <div className="maximizer-header">
        <h1 className="page-title">Credit Card Rewards Maximizer</h1>
        <p className="page-subtitle">
          Optimize your credit card strategy by entering your monthly spending and comparing rewards across different cards.
        </p>
      </div>

      <div className="card-selection-section">
        <h2 className="section-title">Select Your Cards</h2>
        <p className="section-subtitle">Click on cards to select/deselect them and see their impact on your annual earnings</p>
        
        <div className="impact-grid">
          {cardImpactAnalysis.map((card) => (
            <div 
              key={card.key} 
              className={`impact-card ${card.isSelected ? 'selected' : ''}`}
              onClick={() => {
                setSelectedCards((prev) =>
                  prev.includes(card.key)
                    ? prev.filter((k) => k !== card.key)
                    : [...prev, card.key]
                )
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setSelectedCards((prev) =>
                    prev.includes(card.key)
                      ? prev.filter((k) => k !== card.key)
                      : [...prev, card.key]
                  )
                }
              }}
            >
              <div className="impact-card-header">
                <span className="impact-card-name">{card.label}</span>
                {card.isSelected && <span className="selected-badge">Selected</span>}
              </div>
              <div className="impact-value">
                {card.isSelected ? (
                  <span className="current-value">Currently contributing</span>
                ) : (
                  <>
                    <span className="impact-label">Would add:</span>
                    <span className={`impact-amount ${card.impact >= 0 ? 'positive' : 'negative'}`}>
                      {formatCurrency(card.impact)}
                    </span>
                    <span className="impact-period">/year</span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="spend-input-section">
        <div className="input-instructions">
          <div className="instruction-icon">💡</div>
          <div className="instruction-text">
            <strong>Enter your monthly spending</strong> for each category below. 
            All calculations and rewards are shown on an annual basis.
          </div>
        </div>

        <div className="table-container">
          <table className="spend-table">
            <thead>
              <tr>
                <th className="header-category">Category</th>
                <th className="header-spend">
                  Monthly Spend
                  <span className="header-note">(enter amount)</span>
                </th>
                <th className="header-rate">Reward Rate</th>
                <th className="header-points">Annual Points</th>
                <th className="header-value">Annual Value</th>
                <th className="header-card">Best Card</th>
              </tr>
            </thead>
            <tbody>
              {allRows.map(renderSpendRow)}
            </tbody>
            <tfoot>
              <tr className="total-row">
                <th scope="row" className="total-label">Total</th>
                <td className="total-spend">
                  <span className="total-amount">{formatCurrency(totalMonthlySpend)}</span>
                  <span className="total-note">/month</span>
                </td>
                <td />
                <td className="total-points">
                  <span className="total-points-value">{totalPoints.toLocaleString()}</span>
                  <span className="total-note">points</span>
                </td>
                <td className="total-value">
                  <span className={`total-value-amount ${totalValue >= 0 ? 'positive' : 'negative'}`}>
                    {formatCurrency(totalValue)}
                  </span>
                  <span className="total-note">/year</span>
                </td>
                <td />
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <div className="summary-section">
        <div className="summary-card">
          <div className="summary-header">
            <h3>Your Rewards Summary</h3>
          </div>
          <div className="summary-grid">
            <div className="summary-item">
              <div className="summary-label">Monthly Spending</div>
              <div className="summary-value">{formatCurrency(totalMonthlySpend)}</div>
            </div>
            <div className="summary-item">
              <div className="summary-label">Annual Points Earned</div>
              <div className="summary-value">{totalPoints.toLocaleString()}</div>
            </div>
            <div className="summary-item">
              <div className="summary-label">Net Annual Value</div>
              <div className={`summary-value ${totalValue >= 0 ? 'positive' : 'negative'}`}>
                {formatCurrency(totalValue)}
              </div>
            </div>
            <div className="summary-item">
              <div className="summary-label">Cards Selected</div>
              <div className="summary-value">{selectedCards.length}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Maximizer
