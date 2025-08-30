import React, { useState, useEffect } from 'react'

type SpendingCategory = 'dining' | 'groceries' | 'bigBox' | 'gas' | 'retail' | 'travel' | 'other'
type MonthlySpending = 'lessThan500' | '500to1000' | '1000to2000' | '2000to3000' | '3000to4000' | 'moreThan4000'
type TravelBudget = 'lessThan1000' | '1000to2000' | '2000to4000' | 'moreThan4000'
type CardSetup = 'simple' | 'twoThree' | 'maximum'
type PointsUsage = 'travelPortal' | 'giftCards' | 'pointsTransfers'
type TransferPartner = 'hyatt' | 'virgin' | 'southwest' | 'airCanada' | 'delta' | 'americanAirlines'

interface CardPickerState {
  monthlySpending: MonthlySpending | null
  topCategories: SpendingCategory[]
  travelBudget: TravelBudget | null
  cardSetup: CardSetup | null
  pointsUsage: PointsUsage[]
  transferPartners: TransferPartner[]
  spendingSliders: {
    dining: number
    groceries: number
    gas: number
    hotels: number
    flights: number
    otherTravel: number
    everythingElse: number
  }
}

const CardPicker: React.FC = () => {
  const [state, setState] = useState<CardPickerState>({
    monthlySpending: null,
    topCategories: [],
    travelBudget: null,
    cardSetup: null,
    pointsUsage: [],
    transferPartners: [],
    spendingSliders: {
      dining: 0,
      groceries: 0,
      gas: 0,
      hotels: 0,
      flights: 0,
      otherTravel: 0,
      everythingElse: 0
    }
  })

  const [currentStep, setCurrentStep] = useState(1)
  const [showResults, setShowResults] = useState(false)
  const [initialSpendingValues, setInitialSpendingValues] = useState<CardPickerState['spendingSliders'] | null>(null)

  // Auto-advance effect for single-selection questions
  useEffect(() => {
    if (currentStep === 1 && state.monthlySpending !== null) {
      // Auto-advance from step 1
      setTimeout(() => setCurrentStep(2), 500)
    } else if (currentStep === 3 && state.travelBudget !== null) {
      // Auto-advance from step 3
      setTimeout(() => setCurrentStep(4), 500)
    } else if (currentStep === 4 && state.cardSetup !== null) {
      // Auto-advance from step 4
      setTimeout(() => setCurrentStep(5), 500)
    }
  }, [state.monthlySpending, state.travelBudget, state.cardSetup, currentStep])

  const monthlySpendingOptions = [
    { key: 'lessThan500', label: 'Less than $500', value: 250 },
    { key: '500to1000', label: '$500 - $1,000', value: 750 },
    { key: '1000to2000', label: '$1,000 - $2,000', value: 1500 },
    { key: '2000to3000', label: '$2,000 - $3,000', value: 2500 },
    { key: '3000to4000', label: '$3,000 - $4,000', value: 3500 },
    { key: 'moreThan4000', label: 'More than $4,000', value: 5000 }
  ]

  const spendingCategories = [
    { key: 'dining', label: 'Dining out', icon: '🍽️' },
    { key: 'groceries', label: 'Groceries (at Supermarkets)', icon: '🛒' },
    { key: 'bigBox', label: 'Big Box Retail (e.g. Target, Walmart, Costco)', icon: '🏪' },
    { key: 'gas', label: 'Gas', icon: '⛽' },
    { key: 'retail', label: 'Retail / online shopping', icon: '🛍️' },
    { key: 'travel', label: 'Travel', icon: '✈️' },
    { key: 'other', label: 'Other', icon: '💳' }
  ]

  const travelBudgetOptions = [
    { key: 'lessThan1000', label: 'Less than $1,000', value: 500 },
    { key: '1000to2000', label: '$1,000 - $2,000', value: 1500 },
    { key: '2000to4000', label: '$2,000 - $4,000', value: 3000 },
    { key: 'moreThan4000', label: 'More than $4,000', value: 6000 }
  ]

  const cardSetupOptions = [
    { key: 'simple', label: 'Keep it simple', description: 'One card for everything' },
    { key: 'twoThree', label: '2-3 cards', description: 'Optimize main categories' },
    { key: 'maximum', label: 'Maximum efficiency', description: 'Best rewards for each category' }
  ]

  const pointsUsageOptions = [
    { key: 'travelPortal', label: 'Booking flights & hotels through travel portal', icon: '🌐' },
    { key: 'giftCards', label: 'Gift cards or statement credits', icon: '🎁' },
    { key: 'pointsTransfers', label: 'Points transfers', icon: '🔄' }
  ]

  const transferPartnerOptions = [
    { key: 'hyatt', label: 'Hyatt', icon: '🏨' },
    { key: 'virgin', label: 'Virgin (for Delta, KLM, or Virgin flights)', icon: '✈️' },
    { key: 'southwest', label: 'Southwest', icon: '✈️' },
    { key: 'airCanada', label: 'Air Canada', icon: '✈️' },
    { key: 'delta', label: 'Delta', icon: '✈️' },
    { key: 'americanAirlines', label: 'American Airlines', icon: '✈️' }
  ]

  const handleCategoryToggle = (category: SpendingCategory) => {
    setState(prev => ({
      ...prev,
      topCategories: prev.topCategories.includes(category)
        ? prev.topCategories.filter(c => c !== category)
        : prev.topCategories.length < 3
          ? [...prev.topCategories, category]
          : prev.topCategories
    }))
  }

  const handlePointsUsageToggle = (usage: PointsUsage) => {
    setState(prev => ({
      ...prev,
      pointsUsage: prev.pointsUsage.includes(usage)
        ? prev.pointsUsage.filter(u => u !== usage)
        : [...prev.pointsUsage, usage]
    }))
  }

  const handleTransferPartnerToggle = (partner: TransferPartner) => {
    setState(prev => ({
      ...prev,
      transferPartners: prev.transferPartners.includes(partner)
        ? prev.transferPartners.filter(p => p !== partner)
        : [...prev.transferPartners, partner]
    }))
  }

  const handleSliderChange = (category: keyof CardPickerState['spendingSliders'], value: number) => {
    setState(prev => ({
      ...prev,
      spendingSliders: {
        ...prev.spendingSliders,
        [category]: value
      }
    }))
  }

  // Simplified handlers without setTimeout
  const handleMonthlySpendingSelect = (spending: MonthlySpending) => {
    setState(prev => ({ ...prev, monthlySpending: spending }))
  }

  const handleTravelBudgetSelect = (budget: TravelBudget) => {
    setState(prev => ({ ...prev, travelBudget: budget }))
  }

  const handleCardSetupSelect = (setup: CardSetup) => {
    setState(prev => ({ ...prev, cardSetup: setup }))
  }

  const calculateInitialSpending = () => {
    const monthlyAmount = monthlySpendingOptions.find(opt => opt.key === state.monthlySpending)?.value || 0
    const annualAmount = monthlyAmount * 12
    const travelAmount = travelBudgetOptions.find(opt => opt.key === state.travelBudget)?.value || 0

    // Split travel budget: 50% hotels, 30% flights, 20% other travel
    const hotels = Math.round(travelAmount * 0.5)
    const flights = Math.round(travelAmount * 0.3)
    const otherTravel = Math.round(travelAmount * 0.2)

    // Split remaining credit card expenses
    const remainingAmount = annualAmount - travelAmount
    
    // Base percentages
    let dining = Math.round(remainingAmount * 0.2)
    let groceries = Math.round(remainingAmount * 0.3)
    let gas = Math.round(remainingAmount * 0.15)
    let everythingElse = Math.round(remainingAmount * 0.35)

    // Apply 33% boost to selected categories
    if (state.topCategories.includes('dining')) {
      dining = Math.round(dining * 1.33)
    }
    if (state.topCategories.includes('groceries')) {
      groceries = Math.round(groceries * 1.33)
    }
    if (state.topCategories.includes('gas')) {
      gas = Math.round(gas * 1.33)
    }
    if (state.topCategories.includes('bigBox') || state.topCategories.includes('retail') || state.topCategories.includes('other')) {
      everythingElse = Math.round(everythingElse * 1.33)
    }

    // Adjust everything else to maintain total
    const total = dining + groceries + gas + everythingElse + hotels + flights + otherTravel
    const adjustment = annualAmount - total
    everythingElse += adjustment

    return {
      dining,
      groceries,
      gas,
      hotels,
      flights,
      otherTravel,
      everythingElse
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return state.monthlySpending !== null
      case 2:
        return state.topCategories.length >= 2
      case 3:
        return state.travelBudget !== null
      case 4:
        return state.cardSetup !== null
      case 5:
        return state.pointsUsage.length > 0
      case 6:
        // Only show this step if points transfers is selected
        return state.pointsUsage.includes('pointsTransfers') ? state.transferPartners.length > 0 : true
      default:
        return false
    }
  }

  const nextStep = () => {
    if (canProceed() && currentStep < getMaxStep()) {
      // Initialize spending sliders when moving to the sliders step
      if (currentStep === 6 || (currentStep === 5 && !state.pointsUsage.includes('pointsTransfers'))) {
        const initialSpending = calculateInitialSpending()
        setState(prev => ({
          ...prev,
          spendingSliders: initialSpending
        }))
        setInitialSpendingValues(initialSpending)
      }
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  // Calculate the maximum step based on user selections
  const getMaxStep = () => {
    if (state.pointsUsage.includes('pointsTransfers')) {
      return 7 // Show all steps including transfer partners
    } else {
      return 6 // Skip transfer partners step
    }
  }

  // Get the current step number for display (accounting for skipped steps)
  const getCurrentStepNumber = () => {
    if (currentStep <= 5) {
      return currentStep
    } else if (currentStep === 6 && !state.pointsUsage.includes('pointsTransfers')) {
      return 6 // This is actually the sliders step
    } else if (currentStep === 6 && state.pointsUsage.includes('pointsTransfers')) {
      return 6 // Transfer partners step
    } else {
      return 7 // Sliders step
    }
  }

  // Get the total number of steps for display
  const getTotalSteps = () => {
    return state.pointsUsage.includes('pointsTransfers') ? 7 : 6
  }

  const getSliderTicks = () => {
    const monthlyAmount = monthlySpendingOptions.find(opt => opt.key === state.monthlySpending)?.value || 0
    const annualAmount = monthlyAmount * 12
    
    if (annualAmount <= 6000) return 100
    if (annualAmount <= 12000) return 200
    if (annualAmount <= 24000) return 500
    return 1000
  }

  const renderStep1 = () => (
    <div className="step-content">
      <h2 className="step-title">What are your total typical credit card expenses per month?</h2>
      <p className="step-subtitle">Excluding travel expenses</p>
      
      <div className="button-grid">
        {monthlySpendingOptions.map((option) => (
          <button
            key={option.key}
            className={`spending-button ${state.monthlySpending === option.key ? 'selected' : ''}`}
            onClick={() => handleMonthlySpendingSelect(option.key as MonthlySpending)}
          >
            <span className="spending-label">{option.label}</span>
            {state.monthlySpending === option.key && (
              <span className="selected-indicator">✓</span>
            )}
          </button>
        ))}
      </div>
      <p className="auto-advance-note">Selecting an option will automatically continue to the next step</p>
    </div>
  )

  const renderStep2 = () => (
    <div className="step-content">
      <h2 className="step-title">What are your top 2-3 spend categories?</h2>
      <p className="step-subtitle">Select the categories where you spend the most</p>
      
      <div className="button-grid">
        {spendingCategories.map((category) => (
          <button
            key={category.key}
            className={`category-button ${state.topCategories.includes(category.key as SpendingCategory) ? 'selected' : ''}`}
            onClick={() => handleCategoryToggle(category.key as SpendingCategory)}
            disabled={!state.topCategories.includes(category.key as SpendingCategory) && state.topCategories.length >= 3}
          >
            <span className="category-icon">{category.icon}</span>
            <span className="category-label">{category.label}</span>
            {state.topCategories.includes(category.key as SpendingCategory) && (
              <span className="selected-indicator">✓</span>
            )}
          </button>
        ))}
      </div>
      <p className="selection-note">
        Selected: {state.topCategories.length}/3
      </p>
      <p className="step-note">Select at least 2 categories to continue</p>
    </div>
  )

  const renderStep3 = () => (
    <div className="step-content">
      <h2 className="step-title">How much do you typically spend on trips each year?</h2>
      
      <div className="button-grid">
        {travelBudgetOptions.map((option) => (
          <button
            key={option.key}
            className={`budget-button ${state.travelBudget === option.key ? 'selected' : ''}`}
            onClick={() => handleTravelBudgetSelect(option.key as TravelBudget)}
          >
            <span className="budget-label">{option.label}</span>
            {state.travelBudget === option.key && (
              <span className="selected-indicator">✓</span>
            )}
          </button>
        ))}
      </div>
      <p className="auto-advance-note">Selecting an option will automatically continue to the next step</p>
    </div>
  )

  const renderStep4 = () => (
    <div className="step-content">
      <h2 className="step-title">What kind of credit card setup are you looking for?</h2>
      
      <div className="button-grid">
        {cardSetupOptions.map((option) => (
          <button
            key={option.key}
            className={`setup-button ${state.cardSetup === option.key ? 'selected' : ''}`}
            onClick={() => handleCardSetupSelect(option.key as CardSetup)}
          >
            <div className="setup-content">
              <span className="setup-label">{option.label}</span>
              <span className="setup-description">{option.description}</span>
            </div>
            {state.cardSetup === option.key && (
              <span className="selected-indicator">✓</span>
            )}
          </button>
        ))}
      </div>
      <p className="auto-advance-note">Selecting an option will automatically continue to the next step</p>
    </div>
  )

  const renderStep5 = () => (
    <div className="step-content">
      <h2 className="step-title">What ways work for you to use your points?</h2>
      <p className="step-subtitle">Select all that apply</p>
      
      <div className="button-grid">
        {pointsUsageOptions.map((option) => (
          <button
            key={option.key}
            className={`usage-button ${state.pointsUsage.includes(option.key as PointsUsage) ? 'selected' : ''}`}
            onClick={() => handlePointsUsageToggle(option.key as PointsUsage)}
          >
            <span className="usage-icon">{option.icon}</span>
            <span className="usage-label">{option.label}</span>
            {state.pointsUsage.includes(option.key as PointsUsage) && (
              <span className="selected-indicator">✓</span>
            )}
          </button>
        ))}
      </div>
      <p className="step-note">Select at least one option to continue</p>
    </div>
  )

  const renderStep6 = () => (
    <div className="step-content">
      <h2 className="step-title">Which transfer partners interest you?</h2>
      <p className="step-subtitle">Select the airlines and hotels you'd like to transfer points to</p>
      
      <div className="button-grid">
        {transferPartnerOptions.map((option) => (
          <button
            key={option.key}
            className={`partner-button ${state.transferPartners.includes(option.key as TransferPartner) ? 'selected' : ''}`}
            onClick={() => handleTransferPartnerToggle(option.key as TransferPartner)}
          >
            <span className="partner-icon">{option.icon}</span>
            <span className="partner-label">{option.label}</span>
            {state.transferPartners.includes(option.key as TransferPartner) && (
              <span className="selected-indicator">✓</span>
            )}
          </button>
        ))}
      </div>
      <p className="step-note">Select at least one transfer partner to continue</p>
    </div>
  )

  const renderStep7 = () => {
    const ticks = getSliderTicks()
    const total = Object.values(state.spendingSliders).reduce((sum, val) => sum + val, 0)
    
    // Use initial values for max calculations to avoid feedback loop
    const getSliderMax = (category: keyof CardPickerState['spendingSliders']) => {
      if (!initialSpendingValues) return 2000
      const initialValue = initialSpendingValues[category]
      // Set max to 3x the initial value, but at least $2000 for reasonable range
      return Math.max(initialValue * 3, 2000)
    }
    
    return (
      <div className="step-content">
        <h2 className="step-title">Adjust Your Annual Spending by Category</h2>
        <p className="step-subtitle">Fine-tune the estimated spending amounts. Total: ${total.toLocaleString()}</p>
        
        <div className="sliders-container">
          {Object.entries(state.spendingSliders).map(([category, value]) => (
            <div key={category} className="slider-group">
              <div className="slider-header">
                <label className="slider-label">
                  {category === 'dining' && 'Dining'}
                  {category === 'groceries' && 'Groceries'}
                  {category === 'gas' && 'Gas'}
                  {category === 'hotels' && 'Hotels'}
                  {category === 'flights' && 'Flights'}
                  {category === 'otherTravel' && 'Other Travel'}
                  {category === 'everythingElse' && 'Everything Else'}
                </label>
                <span className="slider-value">${value.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="0"
                max={getSliderMax(category as keyof CardPickerState['spendingSliders'])}
                step={ticks}
                value={value}
                onChange={(e) => handleSliderChange(category as keyof CardPickerState['spendingSliders'], parseInt(e.target.value))}
                className="spending-slider"
              />
              <div className="slider-ticks">
                <span>0</span>
                <span>${Math.round(getSliderMax(category as keyof CardPickerState['spendingSliders']) / 2).toLocaleString()}</span>
                <span>${getSliderMax(category as keyof CardPickerState['spendingSliders']).toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="spending-summary">
          <h3>Spending Summary</h3>
          <div className="summary-grid">
            <div className="summary-item">
              <span className="summary-label">Total Annual:</span>
              <span className="summary-value">${total.toLocaleString()}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Monthly Average:</span>
              <span className="summary-value">${Math.round(total / 12).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderResults = () => {
    const total = Object.values(state.spendingSliders).reduce((sum, val) => sum + val, 0)
    
    return (
      <div className="results-section">
        <h2 className="results-title">Your Final Annual Spending Breakdown</h2>
        <p className="results-subtitle">Use these amounts in the Maximizer to find the best credit cards for your spending patterns!</p>
        
        <div className="spending-table-container">
          <table className="spending-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Annual Spend</th>
                <th>Monthly Average</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Dining</td>
                <td>${state.spendingSliders.dining.toLocaleString()}</td>
                <td>${Math.round(state.spendingSliders.dining / 12).toLocaleString()}</td>
              </tr>
              <tr>
                <td>Groceries</td>
                <td>${state.spendingSliders.groceries.toLocaleString()}</td>
                <td>${Math.round(state.spendingSliders.groceries / 12).toLocaleString()}</td>
              </tr>
              <tr>
                <td>Gas</td>
                <td>${state.spendingSliders.gas.toLocaleString()}</td>
                <td>${Math.round(state.spendingSliders.gas / 12).toLocaleString()}</td>
              </tr>
              <tr>
                <td>Hotels</td>
                <td>${state.spendingSliders.hotels.toLocaleString()}</td>
                <td>${Math.round(state.spendingSliders.hotels / 12).toLocaleString()}</td>
              </tr>
              <tr>
                <td>Flights</td>
                <td>${state.spendingSliders.flights.toLocaleString()}</td>
                <td>${Math.round(state.spendingSliders.flights / 12).toLocaleString()}</td>
              </tr>
              <tr>
                <td>Other Travel</td>
                <td>${state.spendingSliders.otherTravel.toLocaleString()}</td>
                <td>${Math.round(state.spendingSliders.otherTravel / 12).toLocaleString()}</td>
              </tr>
              <tr>
                <td>Everything Else</td>
                <td>${state.spendingSliders.everythingElse.toLocaleString()}</td>
                <td>${Math.round(state.spendingSliders.everythingElse / 12).toLocaleString()}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td><strong>Total</strong></td>
                <td><strong>${total.toLocaleString()}</strong></td>
                <td><strong>${Math.round(total / 12).toLocaleString()}</strong></td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="preferences-summary">
          <h3>Your Preferences Summary</h3>
          <div className="preferences-grid">
            <div className="preference-item">
              <strong>Monthly Spending:</strong> {monthlySpendingOptions.find(m => m.key === state.monthlySpending)?.label}
            </div>
            <div className="preference-item">
              <strong>Top Categories:</strong> {state.topCategories.map(cat => spendingCategories.find(c => c.key === cat)?.label).join(', ')}
            </div>
            <div className="preference-item">
              <strong>Travel Budget:</strong> {travelBudgetOptions.find(t => t.key === state.travelBudget)?.label}
            </div>
            <div className="preference-item">
              <strong>Card Setup:</strong> {cardSetupOptions.find(c => c.key === state.cardSetup)?.label}
            </div>
            <div className="preference-item">
              <strong>Points Usage:</strong> {state.pointsUsage.map(usage => pointsUsageOptions.find(u => u.key === usage)?.label).join(', ')}
            </div>
            {state.pointsUsage.includes('pointsTransfers') && (
              <div className="preference-item">
                <strong>Transfer Partners:</strong> {state.transferPartners.map(partner => transferPartnerOptions.find(p => p.key === partner)?.label).join(', ')}
              </div>
            )}
          </div>
        </div>

        <div className="next-steps">
          <h3>Next Steps</h3>
          <p>Use these spending amounts in the <strong>Maximizer</strong> page to find the best credit cards for your spending patterns!</p>
          <button 
            className="maximizer-button"
            onClick={() => window.location.href = '/#maximizer'}
          >
            Go to Maximizer
          </button>
        </div>
      </div>
    )
  }

  const renderCurrentStep = () => {
    if (showResults) {
      return renderResults()
    }

    switch (currentStep) {
      case 1:
        return renderStep1()
      case 2:
        return renderStep2()
      case 3:
        return renderStep3()
      case 4:
        return renderStep4()
      case 5:
        return renderStep5()
      case 6:
        if (state.pointsUsage.includes('pointsTransfers')) {
          return renderStep6()
        } else {
          // Skip to sliders if no points transfers
          // Make sure we have initial values before rendering
          if (!initialSpendingValues) {
            const initialSpending = calculateInitialSpending()
            setInitialSpendingValues(initialSpending)
            setState(prev => ({
              ...prev,
              spendingSliders: initialSpending
            }))
          }
          return renderStep7()
        }
      case 7:
        return renderStep7()
      default:
        return null
    }
  }

  // Determine if we need navigation buttons for the current step
  const needsNavigationButtons = () => {
    // Steps 1, 3, and 4 auto-advance, so they don't need navigation
    if ([1, 3, 4].includes(currentStep)) {
      return false
    }
    // Steps 2, 5, 6, and 7 need navigation (multi-select or final step)
    return true
  }

  return (
    <div className="card-picker-container">
      <div className="card-picker-header">
        <h1 className="page-title">Credit Card Picker</h1>
        <p className="page-subtitle">Answer a few questions to get personalized credit card recommendations</p>
      </div>

      {!showResults && (
        <div className="progress-section">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${(getCurrentStepNumber() / getTotalSteps()) * 100}%` }}
            ></div>
          </div>
          <p className="progress-text">Step {getCurrentStepNumber()} of {getTotalSteps()}</p>
        </div>
      )}

      <div className="step-container">
        {renderCurrentStep()}
      </div>

      {!showResults && needsNavigationButtons() && (
        <div className="navigation-buttons">
          {currentStep > 1 && (
            <button 
              className="nav-button prev-button"
              onClick={prevStep}
            >
              ← Previous
            </button>
          )}
          
          {currentStep < getMaxStep() ? (
            <button 
              className="nav-button next-button"
              onClick={nextStep}
              disabled={!canProceed()}
            >
              Next →
            </button>
          ) : (
            <button 
              className="nav-button finish-button"
              onClick={() => setShowResults(true)}
              disabled={!canProceed()}
            >
              Show Results
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default CardPicker
