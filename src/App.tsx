import { useState, type ChangeEvent } from 'react'
import './App.css'
import ChasePointsValue from './ChasePointsValue'
import AmexPointsValue from './AmexPointsValue'
import CapitalOnePointsValue from './CapitalOnePointsValue'
import StoreCardsTable from './StoreCardsTable';
import AirlineCardsTable from './AirlineCardsTable';
import HotelCardsTable from './HotelCardsTable';
import WhatMakesCardGood from './WhatMakesCardGood';

const PAGES = [
  { key: 'maximizer', label: 'Maximizer' },
  { key: 'whatmakesgood', label: 'What Makes a Card Good' },
  { key: 'chase', label: 'Chase Points Value' },
  { key: 'amex', label: 'Amex Points Value' },
  { key: 'capitalone', label: 'Capital One Points Value' },
  { key: 'storecards', label: 'Store Credit Cards' },
  { key: 'airlinecards', label: 'Airline Credit Cards' },
  { key: 'hotelcards', label: 'Hotel Credit Cards' },
] as const;
type PageKey = typeof PAGES[number]['key'];

function App() {
  type SpendCategory = 'dining' | 'travel' | 'groceries' | 'other'
  const [spend, setSpend] = useState<Record<SpendCategory, number>>({
    dining: 500,
    travel: 667,
    groceries: 500,
    other: 1000,
  })
  type CardKey = 'chase' | 'amex' | 'sapphire' | 'citi' | 'savor' | 'venturex';
  const [selectedCards, setSelectedCards] = useState<CardKey[]>(['chase'])

  const cardOptions: { key: CardKey; label: string }[] = [
    { key: 'chase', label: 'Chase Freedom Unlimited' },
    { key: 'amex', label: 'Amex Gold' },
    { key: 'sapphire', label: 'Chase Sapphire Preferred' },
    { key: 'citi', label: 'Citibank Double Cash' },
    { key: 'savor', label: 'Capital One Savor' },
    { key: 'venturex', label: 'Capital One Venture X' },
  ]

  const rewardRates: Record<CardKey, Record<SpendCategory, number>> = {
    chase: {
      dining: 3,
      travel: 1.5,
      groceries: 1.5,
      other: 1.5,
    },
    amex: {
      dining: 4,
      travel: 2,
      groceries: 4,
      other: 1,
    },
    sapphire: {
      dining: 3,
      travel: 2,
      groceries: 1,
      other: 1,
    },
    citi: {
      dining: 2,
      travel: 2,
      groceries: 2,
      other: 2,
    },
    savor: {
      dining: 3,
      travel: 1,
      groceries: 3,
      other: 1,
    },
    venturex: {
      dining: 2,
      travel: 2,
      groceries: 2,
      other: 2,
    },
  }

  const annualFees: Record<CardKey, number> = {
    chase: 0,
    amex: 320,
    sapphire: 99,
    citi: 0,
    savor: 0,
    venturex: 395,
  }

  const otherBenefits: Record<CardKey, number> = {
    chase: 0,
    amex: 220,
    sapphire: 0,
    citi: 0,
    savor: 0,
    venturex: 400,
  }

  // Value per point for each card
  const pointValue: Record<CardKey, number> = {
    chase: 0.015,
    amex: 0.015,
    sapphire: 0.015,
    citi: 0.01,
    savor: 0.01,
    venturex: 0.0125,
  }

  // We'll update spendCategories and calculations later for best card logic
  const spendCategories: { key: SpendCategory; label: string }[] = [
    { key: 'dining', label: 'Dining' },
    { key: 'travel', label: 'Travel' },
    { key: 'groceries', label: 'Groceries' },
    { key: 'other', label: 'Other' },
  ]

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

  // We'll update this function after best card logic is implemented
  const renderSpendRow = (row: typeof allRows[number]) => (
    <tr key={row.key}>
      <th scope="row" id={`cat-${row.key}`}>{row.label}</th>
      <td>{row.spend !== '' ? (
        <input
          style={{ width: '75px' }}
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
      ) : null}</td>
      <td>{row.rate !== '' ? `${row.rate}x` : ''}</td>
      <td>{row.points !== '' ? row.points.toLocaleString() : ''}</td>
      <td>{formatCurrency(row.value)}</td>
      {row.bestCard !== undefined && (
        <td>{row.bestCard ? cardOptions.find((c) => c.key === row.bestCard)?.label : ''}</td>
      )}
    </tr>
  )

  const [page, setPage] = useState<PageKey>('maximizer');

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <nav className="page-selector">
        {PAGES.map((p) => (
          <button
            key={p.key}
            className={`page-btn${page === p.key ? ' selected' : ''}`}
            onClick={() => setPage(p.key)}
            tabIndex={0}
          >
            {p.label}
          </button>
        ))}
      </nav>
      <main style={{ flex: 1, display: 'flex', alignItems: 'flex-start' }}>
        {page === 'maximizer' && (
          <section className="form-section" style={{ maxWidth: 700, width: '100%', margin: '2rem auto 0 auto', display: 'flex', flexDirection: 'column' }}>
            <h2>Spend</h2>
            <div className="card-toggle-group">
              {cardOptions.map((card) => {
                const isSelected = selectedCards.includes(card.key)
                return (
                  <label
                    key={card.key}
                    className={`card-checkbox-label${isSelected ? ' selected' : ''}`}
                    tabIndex={0}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => {
                        setSelectedCards((prev) =>
                          prev.includes(card.key)
                            ? prev.filter((k) => k !== card.key)
                            : [...prev, card.key]
                        )
                      }}
                    />
                    <span className="card-name">{card.label}</span>
                  </label>
                )
              })}
            </div>
            <form className="spend-form" onSubmit={(e) => e.preventDefault()}>
              <div style={{ textAlign: 'left', marginBottom: '0.5rem', fontSize: '0.95em', color: '#555' }}>
                <span>Enter your <strong>monthly</strong> spend for each category. All other values are annual.</span>
              </div>
              <table className="spend-table">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Spend<br /><span style={{ fontWeight: 'normal', fontSize: '0.85em' }}>(monthly)</span></th>
                    <th>Rate</th>
                    <th>Points</th>
                    <th>Value</th>
                    <th>Best Card</th>
                  </tr>
                </thead>
                <tbody>
                  {allRows.map(renderSpendRow)}
                </tbody>
                <tfoot>
                  <tr>
                    <th scope="row">Total</th>
                    <td>
                      {formatCurrency(
                        allRows.reduce((sum, row) => sum + (typeof row.spend === 'number' ? row.spend * 1 : 0), 0)
                      )}
                    </td>
                    <td />
                    <td>
                      {allRows.reduce((sum, row) => sum + (typeof row.points === 'number' ? row.points : 0), 0).toLocaleString()}
                    </td>
                    <td>
                      {formatCurrency(
                        allRows.reduce((sum, row) => sum + row.value, 0)
                      )}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </form>
          </section>
        )}
        {page === 'chase' && <ChasePointsValue />}
        {page === 'amex' && <AmexPointsValue />}
        {page === 'capitalone' && <CapitalOnePointsValue />}
        {page === 'storecards' && <StoreCardsTable />}
        {page === 'airlinecards' && <AirlineCardsTable />}
        {page === 'hotelcards' && <HotelCardsTable />}
        {page === 'whatmakesgood' && <WhatMakesCardGood />}
      </main>
    </div>
  )
}

export default App
