import React, {useState, type ChangeEvent} from 'react'
import {
    type SpendCategory,
    type CardKey,
    cardOptions,
    annualFees,
    otherBenefits,
    pointValue,
    spendCategories,
    defaultSpend,
    otherBenefitsSummary,
    signupLinksAndBonuses,
} from '../utils/creditCardData'
import {
    calculateCardImpact as calculateCardImpactUtil,
    calculateSpendRows,
    getEffectivePointValue
} from '../utils/cardImpactCalculator'

const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
})
const formatCurrency = (amount: number): string => currencyFormatter.format(amount)

const RewardsSummary: React.FC<{
    totalMonthlySpend: number;
    totalPoints: number;
    totalValue: number;
    selectedCardsCount: number;
    showHeading?: boolean;
    className?: string;
    children?: React.ReactNode;
}> = ({
          totalMonthlySpend,
          totalPoints,
          totalValue,
          selectedCardsCount,
          showHeading = false,
          className = '',
          children
      }) => (
    <div className={`top-summary-card ${className}`}>
        {showHeading && (
            <div className="summary-header">
                <h3>Your Rewards Summary</h3>
            </div>
        )}
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
                <div
                    className={`top-summary-value ${totalValue >= 0 ? 'positive' : 'negative'}`}>{formatCurrency(totalValue)}</div>
            </div>
            <div className="top-summary-item">
                <div className="top-summary-label">Cards Selected</div>
                <div className="top-summary-value">{selectedCardsCount}</div>
            </div>
        </div>
        {children}
    </div>
)

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
    const [selectedCards, setSelectedCards] = useState<CardKey[]>([])
    const [assumptionsCollapsed, setAssumptionsCollapsed] = useState(true)
    const [pointValues, setPointValues] = useState<Record<CardKey, number>>(pointValue)
    const [showEffectiveRates, setShowEffectiveRates] = useState(true)
    const [mobileSpendingCollapsed, setMobileSpendingCollapsed] = useState(true)

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

    // Check if user has filled out all spending categories (including zeros)
    const hasFilledAllCategories = Object.values(inputValues).every(value => value !== '')

    const [readyToShowResults, setReadyToShowResults] = useState(false)
    const debounceRef = React.useRef<number | null>(null)

    // Debounce logic: wait 1s after all fields are filled before showing results
    React.useEffect(() => {
        if (hasFilledAllCategories) {
            debounceRef.current = window.setTimeout(() => {
                setReadyToShowResults(true)
            }, 1000)
        } else {
            setReadyToShowResults(false)
            if (debounceRef.current) {
                clearTimeout(debounceRef.current)
                debounceRef.current = null
            }
        }
        return () => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current)
                debounceRef.current = null
            }
        }
    }, [hasFilledAllCategories, spend])


    const parseToNumber = (value: string): number => {
        const parsed = parseFloat(value)
        return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0
    }

    const handleSpendChange = (category: SpendCategory) => (
        event: ChangeEvent<HTMLInputElement>,
    ) => {
        const value = event.target.value
        setInputValues(prev => ({...prev, [category]: value}))

        if (value === '') {
            setSpend((prev) => ({...prev, [category]: 0}))
        } else {
            const parsed = parseToNumber(value)
            setSpend((prev) => ({...prev, [category]: parsed}))
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
    const selectedBenefits = selectedCards
        .map(card => otherBenefitsSummary[card])
        .filter(Boolean)
    const otherBenefitsRow = {
        key: 'other-benefits',
        label: 'Other Benefits',
        spend: '',
        rate: '',
        points: '',
        value: selectedCards.reduce((sum, card) => sum + otherBenefits[card], 0),
        bestCard: '',
        benefitSummaries: selectedBenefits,
    }

    const allRows = [...spendRows, annualFeeRow, otherBenefitsRow]
    const totalValue = allRows.reduce((sum, row) => sum + row.value, 0)
    const totalMonthlySpend = allRows.reduce((sum, row) => sum + (typeof row.spend === 'number' ? row.spend : 0), 0)
    const totalPoints = allRows.reduce((sum, row) => sum + (typeof row.points === 'number' ? row.points : 0), 0)

    // Calculate net earnings change if each card were added
    const calculateCardImpact = (cardKey: CardKey) => {
        return calculateCardImpactUtil(cardKey, spend, selectedCards, pointValues)
    }

    // Build card impact analysis
    const cardImpactAnalysisRaw = cardOptions.map((card) => ({
        ...card,
        impact: calculateCardImpact(card.key),
        isSelected: selectedCards.includes(card.key)
    }))

    // Selected cards in the order they were added
    const selectedCardAnalysis = selectedCards
        .map(key => cardImpactAnalysisRaw.find(card => card.key === key))
        .filter(Boolean) as typeof cardImpactAnalysisRaw

    // Unselected cards sorted by impact descending
    const unselectedCardAnalysis = cardImpactAnalysisRaw
        .filter(card => !selectedCards.includes(card.key))
        .sort((a, b) => b.impact - a.impact)

    const cardImpactAnalysis = [...selectedCardAnalysis, ...unselectedCardAnalysis]

    // Welcome screen when not all categories are filled
    if (!readyToShowResults) {
        return (
            <div className="maximizer-container">
                <div className="welcome-section">
                    <div className="welcome-card">
                        <h1 className="welcome-title">Rewards Maximizer</h1>
                        <div className="spend-input-section">
                            <div className="input-instructions">
                                <div className="instruction-icon">💡</div>
                                <div className="instruction-text">
                                    <strong>Enter your approximate monthly spending</strong> in each category below to
                                    see which credit cards will give you the most rewards.
                                </div>
                            </div>

                            <div className="table-container">
                                <table className="spend-table">
                                    <thead>
                                    <tr>
                                        <th className="header-category">Category</th>
                                        <th className="header-spend">
                                            Monthly Spend
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
                                    <tr className="spend-row total-row">
                                        <th scope="row" className="category-label total-label">
                                            <strong>Total Monthly Spending</strong>
                                        </th>
                                        <td className="spend-input-cell total-cell">
                                            <div className="total-amount">
                                                <span className="total-value">${totalMonthlySpend.toLocaleString()}</span>
                                            </div>
                                        </td>
                                    </tr>
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

    const renderSpendRow = (row: typeof allRows[number]) => {
        if (row.key === 'other-benefits' && Array.isArray((row as any).benefitSummaries)) {
            const benefitSummaries = (row as any).benefitSummaries as string[]
            return (
                <tr key={row.key} className="spend-row benefits-row">
                    <th scope="row" id={`cat-${row.key}`} className="category-label">
                        {row.label}
                    </th>
                    <td className="spend-input-cell" colSpan={4}>
                        {benefitSummaries.length > 0 && (
                            <div className="benefit-summaries">
                                {benefitSummaries.map((summary: string, idx: number) => (
                                    <div key={idx} className="benefit-summary-item">{summary}</div>
                                ))}
                            </div>
                        )}
                    </td>
                    <td className="value-cell">
            <span className={`value-amount ${row.value < 0 ? 'negative' : 'positive'}`}>
              {formatCurrency(row.value)}
            </span>
                    </td>
                    {row.bestCard !== undefined && <td className="best-card-cell"/>}
                </tr>
            )
        }
        // Default rendering for other rows
        return (
            <tr key={row.key}
                className={`spend-row ${row.key === 'annual-fee' ? 'annual-fee-row' : row.key === 'other-benefits' ? 'benefits-row' : 'category-row'}`}>
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
    }

    return (
        <div className="maximizer-container">
            <div className="maximizer-header">
                <h1 className="page-title">Credit Card Rewards Maximizer</h1>
            </div>

            <div className="top-summary-section">
                <RewardsSummary
                    totalMonthlySpend={totalMonthlySpend}
                    totalPoints={totalPoints}
                    totalValue={totalValue}
                    selectedCardsCount={selectedCards.length}
                />
            </div>

            <div className="card-selection-section">
                <h2 className="section-title">Select Your Cards</h2>
                <p className="section-subtitle">Click on cards to select/deselect them and see their impact on your
                    annual earnings</p>

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
                    {/* Desktop: Single comprehensive table */}
                    <table className="spend-table desktop-table">
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
                            <td/>
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
                            <td/>
                        </tr>
                        </tfoot>
                    </table>

                                            {/* Mobile: Two separate tables */}
                        <div className="mobile-tables">
                            {/* Mobile Table 1: Spending Inputs - Collapsible */}
                            <div className="mobile-table-container">
                                <button 
                                    className="mobile-table-toggle"
                                    onClick={() => setMobileSpendingCollapsed(!mobileSpendingCollapsed)}
                                    aria-expanded={!mobileSpendingCollapsed}
                                    aria-controls="mobile-spending-table"
                                >
                                    <h4 className="mobile-table-title">Monthly Spending</h4>
                                    <span className="toggle-icon">
                                        {mobileSpendingCollapsed ? '▼' : '▲'}
                                    </span>
                                </button>
                                <div 
                                    id="mobile-spending-table"
                                    className={`mobile-table-content ${mobileSpendingCollapsed ? 'collapsed' : ''}`}
                                >
                                    <table className="spend-table mobile-spend-table">
                                        <thead>
                                        <tr>
                                            <th className="header-category">Category</th>
                                            <th className="header-spend">Monthly Spend</th>
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
                                                            id={`mobile-${category.key}`}
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
                                        <tr className="spend-row total-row">
                                            <th scope="row" className="category-label total-label">
                                                <strong>Total</strong>
                                            </th>
                                            <td className="spend-input-cell total-cell">
                                                <div className="total-amount">
                                                    <span className="total-value">${totalMonthlySpend.toLocaleString()}</span>
                                                </div>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        {/* Mobile Table 2: Results */}
                        <div className="mobile-table-container">
                            <h4 className="mobile-table-title">Rewards Summary</h4>
                            <table className="spend-table mobile-results-table">
                                <thead>
                                <tr>
                                    <th className="header-category">Category</th>
                                    <th className="header-rate">
                                        {showEffectiveRates ? 'Cashback' : 'Rate'}
                                    </th>
                                    <th className="header-value">Annual Value</th>
                                    <th className="header-card">Best Card</th>
                                </tr>
                                </thead>
                                <tbody>
                                {allRows.map((row) => (
                                    <tr key={row.key} className="spend-row">
                                        <th scope="row" className="category-label">
                                            {row.label}
                                        </th>
                                        <td className="rate-cell">
                                            <span className="rate-badge">
                                                {showEffectiveRates && row.bestCard && typeof row.rate === 'number' ? (
                                                    (() => {
                                                        const rate = row.rate
                                                        const pointValue = getEffectivePointValue(row.bestCard as CardKey, selectedCards, pointValues)
                                                        const effectiveRate = (rate * pointValue) / 100
                                                        return `${(effectiveRate * 100) % 1 === 0 ? (effectiveRate * 100).toFixed(0) : (effectiveRate * 100).toFixed(1)}%`
                                                    })()
                                                ) : (
                                                    row.rate !== '' ? `${row.rate}x` : '-'
                                                )}
                                            </span>
                                        </td>
                                        <td className="value-cell">
                                            <span className={`value-amount ${row.value < 0 ? 'negative' : 'positive'}`}>
                                                {formatCurrency(row.value)}
                                            </span>
                                        </td>
                                        <td className="best-card-cell">
                                            {row.bestCard ? (
                                                <span className="best-card-badge">
                                                    {cardOptions.find(c => c.key === row.bestCard)?.label || row.bestCard}
                                                </span>
                                            ) : (
                                                <span className="no-card">-</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div className="summary-section">
                <RewardsSummary
                    totalMonthlySpend={totalMonthlySpend}
                    totalPoints={totalPoints}
                    totalValue={totalValue}
                    selectedCardsCount={selectedCards.length}
                    showHeading={true}
                    className="summary-card"
                >
                    {selectedCards.length > 0 && (
                        <ul className="signup-links-list">
                            {selectedCards.map((cardKey) => {
                                const card = cardOptions.find(c => c.key === cardKey)
                                const signup = signupLinksAndBonuses[cardKey]
                                if (!card || !signup) return null
                                return (
                                    <li key={cardKey} className="signup-link-item">
                                        <strong>{card.label}:</strong> {' '}
                                        <a href={signup.link} target="_blank" rel="noopener noreferrer"
                                           className="signup-link">Apply here</a>
                                        <div className="signup-bonus-detail">{signup.bonus}</div>
                                    </li>
                                )
                            })}
                        </ul>
                    )}
                </RewardsSummary>
            </div>

            <div className="spending-summary-section">
                <div className="spending-summary-card">
                    <div className="spending-summary-header">
                        <h3>💳 Quick Reference Card</h3>
                        <p className="spending-summary-subtitle">
                            Which card to use for each category
                        </p>
                    </div>

                    <div className="spending-summary-content">
                        <div className="spending-summary-table">
                            {(() => {
                                // Group categories by card
                                const cardGroups = new Map<CardKey | 'none', Array<{
                                    key: SpendCategory,
                                    label: string,
                                    icon: string,
                                    rate: number
                                }>>()

                                spendRows.forEach((row) => {
                                    const cardKey = row.bestCard || 'none'
                                    if (!cardGroups.has(cardKey)) {
                                        cardGroups.set(cardKey, [])
                                    }
                                    cardGroups.get(cardKey)!.push({
                                        key: row.key,
                                        label: row.label,
                                        icon: (() => {
                                            switch (row.key) {
                                                case 'dining':
                                                    return '🍽️'
                                                case 'flights':
                                                    return '✈️'
                                                case 'hotels':
                                                    return '🏨'
                                                case 'otherTravel':
                                                    return '🧳'
                                                case 'groceries':
                                                    return '🛒'
                                                case 'gas':
                                                    return '⛽'
                                                case 'other':
                                                    return '💳'
                                                default:
                                                    return '💳'
                                            }
                                        })(),
                                        rate: row.rate
                                    })
                                })

                                return Array.from(cardGroups.entries()).map(([cardKey, categories]) => (
                                    <div key={cardKey} className="card-group">
                                        <div className="card-group-header">
                                            <div className="card-name">
                                                {cardKey === 'none' ? 'No card selected' : cardOptions.find((c) => c.key === cardKey)?.label}
                                            </div>
                                            {cardKey !== 'none' && categories.length > 0 && (
                                                <div className="card-rate">
                                                    {showEffectiveRates ? (
                                                        `${(() => {
                                                            // Find min and max rates across all categories for this card
                                                            const rates = categories.map(cat => cat.rate)
                                                            const minRate = Math.min(...rates)
                                                            const maxRate = Math.max(...rates)
                                                            const pointValue = getEffectivePointValue(cardKey as CardKey, selectedCards, pointValues)

                                                            if (minRate === maxRate) {
                                                                // Single rate
                                                                const effectiveRate = (minRate * pointValue) / 100
                                                                return `${(effectiveRate * 100) % 1 === 0 ? (effectiveRate * 100).toFixed(0) : (effectiveRate * 100).toFixed(1)}% cashback`
                                                            } else {
                                                                // Range of rates
                                                                const minEffective = (minRate * pointValue) / 100
                                                                const maxEffective = (maxRate * pointValue) / 100
                                                                const formatRate = (r: number) => r % 1 === 0 ? r.toFixed(0) : r.toFixed(1)
                                                                return `${formatRate(minEffective * 100)}-${formatRate(maxEffective * 100)}% cashback`
                                                            }
                                                        })()}`
                                                    ) : (
                                                        (() => {
                                                            // Find min and max rates across all categories for this card
                                                            const rates = categories.map(cat => cat.rate)
                                                            const minRate = Math.min(...rates)
                                                            const maxRate = Math.max(...rates)

                                                            if (minRate === maxRate) {
                                                                return `${minRate}x points`
                                                            } else {
                                                                return `${minRate}x-${maxRate}x points`
                                                            }
                                                        })()
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                        <div className="card-categories">
                                            {categories.map((category) => (
                                                <div key={category.key} className="category-item">
                                                    <span className="category-icon">{category.icon}</span>
                                                    <span className="category-label">{category.label}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))
                            })()}
                        </div>

                        <div className="print-instructions">
                            <div className="print-icon">🖨️</div>
                            <div className="print-text">
                                Print or screenshot for your wallet
                            </div>
                        </div>
                    </div>
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
                            Adjust the point values for each credit card type. These values represent how much each
                            point is worth in cents.
                            Chase Freedom, Sapphire Preferred, and Sapphire Reserve points are transferrable and will
                            use the highest value among selected Chase cards.
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
        </div>
    )
}

export default Maximizer
