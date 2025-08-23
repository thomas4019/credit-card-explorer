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
import { calculateCardImpact as calculateCardImpactUtil, calculateSpendRows, getEffectivePointValue } from '../utils/cardImpactCalculator'

const Maximizer: React.FC = () => {
  const [spend, setSpend] = useState<Record<SpendCategory, number>>({
    dining: 0,
    flights: 0,
    hotels: 0,
    otherTravel: 0,
    groceries: 0,
    gas: 0,
    other: 0,
  })
  const [selectedCards, setSelectedCards] = useState<CardKey[]>(['chase'])
  const [assumptionsCollapsed, setAssumptionsCollapsed] = useState(true)
  const [pointValues, setPointValues] = useState<Record<CardKey, number>>(pointValue)
  const [showEffectiveRates, setShowEffectiveRates] = useState(false)
  
  // Local state for input values to ensure proper control
  const [inputValues, setInputValues] = useState<Record<SpendCategory, string>>({
    dining: '',
    flights: '',
    hotels: '',
    otherTravel: '',
    groceries: '',
    gas: '',
    other: '',
  })



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
    const value = event.target.value
    setInputValues(prev => ({ ...prev, [category]: value }))
    
    if (value === '') {
      setSpend((prev) => ({ ...prev, [category]: 0 }))
    } else {
      const parsed = parseToNumber(value)
      setSpend((prev) => ({ ...prev, [category]: parsed }))
    }
  }
  
  // For each category, find the best card among selectedCards
  type SpendRow = {
    key: SpendCategory,
    label: string,
    spend: number,
    rate: number,
    points: number,
    value: number,
    bestCard: CardKey | undefined,
  }

  const spendRows: SpendRow[] = calculateSpendRows(spend, selectedCards, pointValues)

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
    return calculateCardImpactUtil(cardKey, spend, selectedCards, pointValues)
  }

  const cardImpactAnalysis = cardOptions.map((card) => ({
    ...card,
    impact: calculateCardImpact(card.key),
    isSelected: selectedCards.includes(card.key)
  }))

  // Check if user has filled out all spending categories
  const hasFilledAllCategories = Object.values(spend).every(amount => amount > 0)

  // Welcome screen when not all categories are filled
  if (!hasFilledAllCategories) {
    return (
      <div className="maximizer-container">
        <div className="welcome-section">
          <div className="welcome-card">
            <div className="welcome-icon">💳</div>
            <h1 className="welcome-title">Welcome to the Credit Card Rewards Maximizer!</h1>
            <p className="welcome-description">
              To get started, please enter your approximate monthly spending in each category below. 
              This will help us calculate which credit cards will give you the most rewards.
            </p>
            
            <div className="spend-input-section">
              <div className="input-instructions">
                <div className="instruction-icon">💡</div>
                <div className="instruction-text">
                  <strong>Enter your monthly spending</strong> for each category below. 
                  Don't worry about being exact - rough estimates work great!
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
                    </tr>
                  </thead>
                  <tbody>
                    {spendCategories.map((category) => (
                      <tr key={category.key} className="spend-row">
                        <th scope="row" className="category-label">
                          {category.label}
                        </th>
                        <td className="spend-input-cell">
                          <div className="input-wrapper">
                            <span className="currency-symbol">$</span>
                            <input
                              className="spend-input"
                              id={category.key}
                              name={category.key}
                              type="number"
                              min={0}
                              step={10}
                              inputMode="numeric"
                              value={inputValues[category.key] || ''}
                              onChange={handleSpendChange(category.key)}
                              aria-labelledby={`cat-${category.key}`}
                              placeholder="0"
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="welcome-actions">
                <button 
                  className="view-cards-button"
                  onClick={() => {
                    const quickValues = {
                      dining: 100,
                      flights: 50,
                      hotels: 75,
                      otherTravel: 25,
                      groceries: 200,
                      gas: 80,
                      other: 300,
                    }
                    setSpend(quickValues)
                    setInputValues({
                      dining: quickValues.dining.toString(),
                      flights: quickValues.flights.toString(),
                      hotels: quickValues.hotels.toString(),
                      otherTravel: quickValues.otherTravel.toString(),
                      groceries: quickValues.groceries.toString(),
                      gas: quickValues.gas.toString(),
                      other: quickValues.other.toString(),
                    })
                  }}
                >
                  View Cards Options
                </button>
                <span className="welcome-or">OR</span>
                <button 
                  className="load-defaults-button"
                  onClick={() => {
                    setSpend(defaultSpend)
                    setInputValues({
                      dining: defaultSpend.dining.toString(),
                      flights: defaultSpend.flights.toString(),
                      hotels: defaultSpend.hotels.toString(),
                      otherTravel: defaultSpend.otherTravel.toString(),
                      groceries: defaultSpend.groceries.toString(),
                      gas: defaultSpend.gas.toString(),
                      other: defaultSpend.other.toString(),
                    })
                  }}
                >
                  View Example Spending
                </button>
                <p className="welcome-note">
                  Fill out all categories above to see your personalized rewards analysis
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderSpendRow = (row: typeof allRows[number]) => (
    <tr key={row.key} className={`spend-row ${row.key === 'annual-fee' ? 'annual-fee-row' : row.key === 'other-benefits' ? 'benefits-row' : 'category-row'}`}>
      <th scope="row" id={`cat-${row.key}`} className="category-label">
        {row.label}
      </th>
      <td className="spend-input-cell">
        {row.key !== 'annual-fee' && row.key !== 'other-benefits' ? (
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
              value={inputValues[row.key as SpendCategory] || ''}
              onChange={handleSpendChange(row.key as SpendCategory)}
              aria-labelledby={`cat-${row.key}`}
            />
          </div>
        ) : null}
      </td>
      <td className="rate-cell">
        {row.rate !== '' ? (
          <span className="rate-badge">
            {showEffectiveRates && row.bestCard && typeof row.rate === 'number' ? (
              <>
                {(() => {
                  const rate = row.rate
                  const pointValue = getEffectivePointValue(row.bestCard as CardKey, selectedCards, pointValues)
                  const effectiveRate = (rate * pointValue) / 100
                  console.log(`Rate calc for ${row.key}: ${rate}x × ${pointValue}¢ = ${effectiveRate} = ${(effectiveRate * 100).toFixed(1)}%`)
                  // Show no decimal places for whole numbers, 1 decimal place otherwise
                  return `${(effectiveRate * 100) % 1 === 0 ? (effectiveRate * 100).toFixed(0) : (effectiveRate * 100).toFixed(1)}%`
                })()}
              </>
            ) : (
              `${row.rate}x`
            )}
          </span>
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

      <div className="top-summary-section">
        <div className="top-summary-card">
          <div className="top-summary-grid">
            <div className="top-summary-item">
              <div className="top-summary-label">Monthly Spending</div>
              <div className="top-summary-value">{formatCurrency(totalMonthlySpend)}</div>
            </div>
            <div className="top-summary-item">
              <div className="top-summary-label">Annual Points</div>
              <div className="top-summary-value">{totalPoints.toLocaleString()}</div>
            </div>
            <div className="top-summary-item">
              <div className="top-summary-label">Net Annual Value</div>
              <div className={`top-summary-value ${totalValue >= 0 ? 'positive' : 'negative'}`}>
                {formatCurrency(totalValue)}
              </div>
            </div>
            <div className="top-summary-item">
              <div className="top-summary-label">Cards Selected</div>
              <div className="top-summary-value">{selectedCards.length}</div>
            </div>
          </div>
        </div>
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
            <strong>Adjust your monthly spending</strong> for each category below. 
            All calculations and rewards are shown on an annual basis.
          </div>
        </div>

        <div className="rate-toggle-section">
          <div className="rate-toggle-wrapper">
            <label className="rate-toggle-label">
              <input
                type="checkbox"
                checked={showEffectiveRates}
                onChange={(e) => setShowEffectiveRates(e.target.checked)}
                className="rate-toggle-checkbox"
              />
              <span className="rate-toggle-text">
                Show effective cashback rates (points × value)
              </span>
              <span className="rate-toggle-description">
                {showEffectiveRates
                    ? "4x points × 1.5¢ = 6% earnings"
                    : "4x points × 1.5¢ = 6% earnings"
                }
              </span>
            </label>
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
                <th className="header-rate">
                  {showEffectiveRates ? 'Effective Cashback' : 'Reward Rate'}
                </th>
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

      <div className="assumptions-section">
        <div className="assumptions-header" onClick={() => setAssumptionsCollapsed(!assumptionsCollapsed)}>
          <h3>Assumptions & Point Values</h3>
          <span className={`collapse-icon ${assumptionsCollapsed ? 'collapsed' : 'expanded'}`}>
            {assumptionsCollapsed ? '▼' : '▲'}
          </span>
        </div>
        
        {!assumptionsCollapsed && (
          <div className="assumptions-content">
            <p className="assumptions-description">
              Adjust the point values for each credit card type. These values represent how much each point is worth in cents. 
              Chase Freedom, Sapphire Preferred, and Sapphire Reserve points are transferrable and will use the highest value among selected Chase cards.
            </p>
                            <div className="point-values-grid">
                                    {cardOptions.map((card) => {
                    const isChaseCard = ['chase', 'sapphire', 'sapphirereserve'].includes(card.key)
                    const effectiveValue = getEffectivePointValue(card.key, selectedCards, pointValues)
                    const showEffectiveValue = isChaseCard && selectedCards.some(selectedCard => 
                      ['chase', 'sapphire', 'sapphirereserve'].includes(selectedCard)
                    )
                    
                    return (
                      <div key={card.key} className="point-value-item">
                        <label className="point-value-label">
                          {card.label}
                        </label>
                        <div className="point-value-input-row">
                          <div className="point-value-input-wrapper">
                            <span className="point-value-symbol">$</span>
                            <input
                              type="number"
                              step="0.1"
                              min="0"
                              max="100"
                              className="point-value-input"
                              value={pointValues[card.key]}
                              onChange={(e) => {
                                const newValue = parseFloat(e.target.value) || 0
                                setPointValues(prev => ({
                                  ...prev,
                                  [card.key]: newValue
                                }))
                              }}
                            />
                          </div>
                          <span className="point-value-note">cents per point</span>
                        </div>
                        {showEffectiveValue && effectiveValue > pointValues[card.key] && (
                          <div className="effective-value-note">
                            Effective value: {effectiveValue} cents (highest among Chase cards)
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
            <div className="assumptions-footer">
              <button 
                className="reset-button"
                onClick={() => setPointValues(pointValue)}
              >
                Reset to Defaults
              </button>
            </div>
          </div>
        )}
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
