import React from 'react';

const storeCards = [
  {
    name: 'Amazon Prime Visa',
    cashbackStore: 5,
    cashbackOther: 1,
    notes: '2% at restaurants, gas stations, and drugstores',
  },
  {
    name: 'Costco Anywhere Visa',
    cashbackStore: 2,
    cashbackOther: 1,
    notes: '4% gas, 3% restaurants/travel',
  },
  {
    name: 'Target RedCard',
    cashbackStore: 5,
    cashbackOther: 0,
    notes: '',
  },
  {
    name: 'Apple Card',
    cashbackStore: 3,
    cashbackOther: 1,
    notes: '3% at select merchants, 2% with Apple Pay',
  },
  {
    name: 'Best Buy Credit Card',
    cashbackStore: 5,
    cashbackOther: 0,
    notes: '',
  },
  {
    name: 'Lowe’s Advantage Card',
    cashbackStore: 5,
    cashbackOther: 0,
    notes: '',
  },
  {
    name: 'Walmart Rewards Card',
    cashbackStore: 5,
    cashbackOther: 2,
    notes: '2% in-store, 1% everywhere else',
  },
  {
    name: 'Sam’s Club Mastercard',
    cashbackStore: 5,
    cashbackOther: 1,
    notes: '5% gas, 3% dining/travel',
  },
  {
    name: 'Gap Good Rewards',
    cashbackStore: 5,
    cashbackOther: 1,
    notes: '',
  },
  {
    name: 'Macy’s Card',
    cashbackStore: 5,
    cashbackOther: 1,
    notes: '2%/3% for lower tiers',
  },
];

const StoreCardsTable: React.FC = () => (
  <section style={{ padding: '2rem', width: '100%' }}>
    <h2>Store Credit Cards</h2>
    <p>Popular store credit cards and their cashback rates at their store and elsewhere.</p>
    <table className="spend-table store-cards-table" style={{ width: '100%', marginTop: '1.5rem', borderRadius: 12, overflow: 'hidden', boxShadow: '0 2px 12px rgba(100,108,255,0.07)' }}>
      <thead style={{ background: '#f5f7ff' }}>
        <tr>
          <th style={{ textAlign: 'left', padding: '0.75em', fontSize: '1.08em', borderBottom: '2px solid #ccc' }}>Card</th>
          <th style={{ textAlign: 'center', padding: '0.75em', fontSize: '1.08em', borderBottom: '2px solid #ccc' }}>% Back at Store</th>
          <th style={{ textAlign: 'center', padding: '0.75em', fontSize: '1.08em', borderBottom: '2px solid #ccc' }}>% Back Elsewhere</th>
          <th style={{ textAlign: 'left', padding: '0.75em', fontSize: '1.08em', borderBottom: '2px solid #ccc' }}>Notes</th>
        </tr>
      </thead>
      <tbody>
        {storeCards.map(card => (
          <tr key={card.name} style={{ background: '#fff', borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '0.7em 0.75em', fontWeight: 500 }}>{card.name}</td>
            <td style={{ textAlign: 'center', padding: '0.7em 0.75em', color: '#2e7d32', fontWeight: 600 }}>{card.cashbackStore}%</td>
            <td style={{ textAlign: 'center', padding: '0.7em 0.75em', color: '#1976d2', fontWeight: 600 }}>{card.cashbackOther}%</td>
            <td style={{ padding: '0.7em 0.75em', fontSize: '0.97em', color: '#555' }}>{card.notes}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </section>
);

export default StoreCardsTable;
