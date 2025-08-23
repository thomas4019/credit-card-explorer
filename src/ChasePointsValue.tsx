import React from 'react';

const redemptionOptions = [
  { method: 'Transfer to World of Hyatt®', cpp: 1.7, notes: 'Best hotel transfer value, can be higher' },
  { method: 'Transfer to Virgin Atlantic Flying Club', cpp: 1.5, notes: 'High value for ANA/Delta redemptions' },
  { method: 'Transfer to Southwest Rapid Rewards®', cpp: 1.3, notes: 'Consistent value, no blackout dates' },
  { method: 'Transfer to United MileagePlus®', cpp: 1.2, notes: 'Typical value, can be higher with premium cabins' },
  { method: 'Travel via Chase Portal', cpp: '1.0–1.75', notes: 'Varies by card and promo; 1.0¢ to 1.75¢ per point' },
  { method: 'Cash Back', cpp: 1.0, notes: 'Direct deposit or statement credit' },
];

const ChasePointsValue: React.FC = () => (
  <section style={{ padding: '2rem' }}>
    <h2>Chase Points Value</h2>
    <p>Summary of common Chase Ultimate Rewards redemption options and their typical value per point.</p>
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1.5rem' }}>
      <thead>
        <tr>
          <th style={{ textAlign: 'left', padding: '0.5em', borderBottom: '2px solid #ccc' }}>Redemption Option</th>
          <th style={{ textAlign: 'right', padding: '0.5em', borderBottom: '2px solid #ccc' }}>Cents per Point (¢)</th>
          <th style={{ textAlign: 'left', padding: '0.5em', borderBottom: '2px solid #ccc' }}>Notes</th>
        </tr>
      </thead>
      <tbody>
        {redemptionOptions.map((opt) => (
          <tr key={opt.method}>
            <td style={{ padding: '0.5em', borderBottom: '1px solid #eee' }}>{opt.method}</td>
            <td style={{ padding: '0.5em', textAlign: 'right', borderBottom: '1px solid #eee' }}>{opt.cpp}</td>
            <td style={{ padding: '0.5em', borderBottom: '1px solid #eee' }}>{opt.notes}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </section>
);

export default ChasePointsValue;
