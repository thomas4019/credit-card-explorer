import React from 'react';

const redemptionOptions = [
  { method: 'Transfer to Avianca LifeMiles', cpp: 1.7, notes: 'No fuel surcharges, good for Star Alliance flights' },
  { method: 'Transfer to Air Canada Aeroplan', cpp: 1.6, notes: 'Good for Star Alliance flights' },
  { method: 'Transfer to Turkish Airlines Miles&Smiles', cpp: 1.5, notes: 'Great for domestic United flights and Europe awards' },
  { method: 'Transfer to Singapore KrisFlyer', cpp: 1.3, notes: 'Good for Singapore Airlines and Star Alliance' },
  { method: 'Transfer to Wyndham Rewards', cpp: 1.1, notes: 'Best value for Vacasa vacation rentals' },
  { method: 'Travel via Capital One Travel Portal', cpp: 1.0, notes: 'Book any travel at 1¢/mile' },
  { method: 'Transfer to British Airways Avios', cpp: 1.0, notes: 'Best for short-haul Oneworld flights' },
  { method: 'Transfer to Choice Privileges', cpp: 1.0, notes: 'Hotel partner, value varies' },
  { method: 'Cash Back/Statement Credit', cpp: 0.5, notes: 'Redeem as statement credit. Poor value, not recommended.' },
];

const poorValueStyle = {
  background: '#fffbe6',
};

const CapitalOnePointsValue: React.FC = () => (
  <section style={{ padding: '2rem' }}>
    <h2>Capital One Miles Value</h2>
    <p>Summary of common Capital One Miles redemption options and their typical value per mile.</p>
    <div style={{ marginBottom: '0.75em', fontSize: '0.93em', color: '#a68b00' }}>
      <span style={{ marginRight: '1em' }}>⚠️ = Poor value (&lt;1¢/mile, not recommended)</span>
    </div>
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1.5rem' }}>
      <thead>
        <tr>
          <th style={{ textAlign: 'left', padding: '0.5em', borderBottom: '2px solid #ccc' }}>Redemption Option</th>
          <th style={{ textAlign: 'right', padding: '0.5em', borderBottom: '2px solid #ccc' }}>Cents per Mile (¢)</th>
          <th style={{ textAlign: 'left', padding: '0.5em', borderBottom: '2px solid #ccc' }}>Notes</th>
        </tr>
      </thead>
      <tbody>
        {redemptionOptions.map((opt) => {
          const isPoor = typeof opt.cpp === 'number' && opt.cpp < 1.0;
          return (
            <tr key={opt.method} style={isPoor ? poorValueStyle : {}}>
              <td style={{ padding: '0.5em', borderBottom: '1px solid #eee' }}>
                {isPoor ? '⚠️ ' : ''}{opt.method}
              </td>
              <td style={{ padding: '0.5em', textAlign: 'right', borderBottom: '1px solid #eee' }}>{opt.cpp}</td>
              <td style={{ padding: '0.5em', borderBottom: '1px solid #eee' }}>{opt.notes}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </section>
);

export default CapitalOnePointsValue;
