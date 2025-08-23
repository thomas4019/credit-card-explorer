import React from 'react';

const redemptionOptions = [
  { method: 'Transfer to Avianca LifeMiles', cpp: 1.7, notes: 'No fuel surcharges, good for Star Alliance' },
  { method: 'Transfer to Air Canada Aeroplan', cpp: 1.6, notes: 'Good for Star Alliance flights' },
  { method: 'Transfer to Virgin Atlantic Flying Club', cpp: 1.5, notes: 'Great for ANA/Delta redemptions' },
  { method: 'Transfer to ANA Mileage Club', cpp: 1.4, notes: 'Typical value. Can be much higher for business/first class to Asia.' },
  { method: 'Transfer to Singapore KrisFlyer', cpp: 1.3, notes: 'Good for Singapore Airlines and Star Alliance' },
  { method: 'Transfer to British Airways Avios', cpp: 1.3, notes: 'Best for short-haul Oneworld flights' },
  { method: 'Transfer to Delta SkyMiles', cpp: 1.2, notes: 'Dynamic pricing, but easy to use' },
  { method: 'Travel via Amex Travel Portal', cpp: 1.0, notes: 'Book flights at 1¢/pt, hotels at 0.7¢/pt' },
  { method: 'Transfer to Marriott Bonvoy', cpp: 0.7, notes: 'Hotel partner, value varies. Poor value, not recommended.' },
  { method: 'Transfer to Hilton Honors', cpp: 0.6, notes: 'Hotel partner, value varies. Poor value, not recommended.' },
  { method: 'Cash Back/Statement Credit', cpp: 0.6, notes: 'Redeem as statement credit or gift cards. Poor value, not recommended.' },
];

const poorValueStyle = {
  background: '#fffbe6',
};

const AmexPointsValue: React.FC = () => (
  <section style={{ padding: '2rem' }}>
    <h2>Amex Points Value</h2>
    <p>Summary of common Amex Membership Rewards redemption options and their typical value per point.</p>
    <div style={{ marginBottom: '0.75em', fontSize: '0.93em', color: '#a68b00' }}>
      <span style={{ marginRight: '1em' }}>⚠️ = Poor value (&lt;1¢/pt, not recommended)</span>
    </div>
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1.5rem' }}>
      <thead>
        <tr>
          <th style={{ textAlign: 'left', padding: '0.5em', borderBottom: '2px solid #ccc' }}>Redemption Option</th>
          <th style={{ textAlign: 'right', padding: '0.5em', borderBottom: '2px solid #ccc' }}>Cents per Point (¢)</th>
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

export default AmexPointsValue;
