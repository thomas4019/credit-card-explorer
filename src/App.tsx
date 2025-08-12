import { useState, type ChangeEvent } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  type SpendCategory = 'dining' | 'travel' | 'groceries' | 'other'
  const [spend, setSpend] = useState<Record<SpendCategory, number>>({
    dining: 0,
    travel: 0,
    groceries: 0,
    other: 0,
  })
  const spendCategories: Array<{ key: SpendCategory; label: string }> = [
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

  const renderSpendRow = (category: SpendCategory, label: string) => (
    <tr key={category}>
      <th scope="row" id={`cat-${category}`}>
        {label}
      </th>
      <td>
        <input
          id={category}
          name={category}
          type="number"
          min={0}
          step={10}
          inputMode="numeric"
          value={spend[category]}
          onChange={handleSpendChange(category)}
          aria-labelledby={`cat-${category}`}
        />
      </td>
      <td>{spend[category] * 1}</td>
      <td>{formatCurrency(spend[category] * 0.015)}</td>
    </tr>
  )

  return (
    <>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>

      <section className="form-section">
        <h2>Annual Spend</h2>
        <form className="spend-form" onSubmit={(e) => e.preventDefault()}>
          <table className="spend-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Annual Spend</th>
                <th>Rewards</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {spendCategories.map((c) => renderSpendRow(c.key, c.label))}
            </tbody>
            <tfoot>
              <tr>
                <th scope="row">Total</th>
                <td>
                  {formatCurrency(
                    spendCategories.reduce((sum, c) => sum + spend[c.key], 0),
                  )}
                </td>
                <td />
                <td>
                  {formatCurrency(
                    spendCategories.reduce(
                      (sum, c) => sum + spend[c.key] * 0.015,
                      0,
                    ),
                  )}
                </td>
              </tr>
            </tfoot>
          </table>
        </form>
      </section>
    </>
  )
}

export default App
