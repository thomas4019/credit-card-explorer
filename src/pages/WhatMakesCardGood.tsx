import React from 'react';

const WhatMakesCardGood: React.FC = () => (
  <section style={{ padding: '2rem', width: '100%', maxWidth: '900px', margin: '0 auto' }}>
    <h2>What Makes a Credit Card Good?</h2>
    <p style={{ fontSize: '1.1em', color: '#555', marginBottom: '2rem' }}>
      When evaluating credit cards, there are some key factors to consider.
    </p>
    <div style={{textAlign: 'left'}}>
      <p>
        <b>Return on spending:</b> e.g. 2% cashback or 3x points on dining, 1x on everything else
      </p>
      <p>
        <b>Other Benefits:</b> Like free hotel nights, airport lounge access, free checked bags, elite status, Doordash credits, rental car coverage, purchase protection, etc.
      </p>
      <p>
        <b>Signup Bonus:</b> Vary from $100 to $1500 in value.
      </p>
      <p>
        <b>Annual Fee</b> Unless you plan to cancel the card after 1 year, consider if the benefits above really justify this cost.
      </p>
    </div>

    {/* Summary Section */}
    <div style={{ 
      background: '#f5f5f5', 
      padding: '1.5rem', 
      borderRadius: '12px', 
      marginTop: '2rem',
      border: '1px solid #e0e0e0'
    }}>
      <h3 style={{ marginTop: 0, color: '#333' }}>💡 How to Use These Factors</h3>
      <p style={{ lineHeight: '1.6', marginBottom: '1rem' }}>
        <strong>Calculate the total annual value:</strong> (Reward rate × Annual spending) + Other benefits + Signup bonus - Annual fee
      </p>
      <p style={{ lineHeight: '1.6', marginBottom: '1rem' }}>
        <strong>Consider your spending patterns:</strong> A card with high dining rewards won't help if you rarely eat out.
      </p>
      <p style={{ lineHeight: '1.6' }}>
        <strong>Factor in opportunity cost:</strong> Could you earn more with a different card or investment strategy?
      </p>
    </div>

    {/* Quick Comparison Table */}
    <div style={{ marginTop: '2rem' }}>
      <h3>Quick Comparison Example</h3>
      <table className="spend-table" style={{ width: '100%', marginTop: '1rem', borderRadius: 12, overflow: 'hidden', boxShadow: '0 2px 12px rgba(100,108,255,0.07)' }}>
        <thead style={{ background: '#f5f7ff' }}>
          <tr>
            <th style={{ textAlign: 'left', padding: '0.75em', fontSize: '1.08em', borderBottom: '2px solid #ccc' }}>Card Type</th>
            <th style={{ textAlign: 'center', padding: '0.75em', fontSize: '1.08em', borderBottom: '2px solid #ccc' }}>Reward Rate</th>
            <th style={{ textAlign: 'center', padding: '0.75em', fontSize: '1.08em', borderBottom: '2px solid #ccc' }}>Other Benefits</th>
            <th style={{ textAlign: 'center', padding: '0.75em', fontSize: '1.08em', borderBottom: '2px solid #ccc' }}>Signup Bonus</th>
            <th style={{ textAlign: 'center', padding: '0.75em', fontSize: '1.08em', borderBottom: '2px solid #ccc' }}>Annual Fee</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ background: '#fff', borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '0.7em 0.75em', fontWeight: 500 }}>No-Fee Cash Back</td>
            <td style={{ textAlign: 'center', padding: '0.7em 0.75em', color: '#2e7d32', fontWeight: 600 }}>1.5-2%</td>
            <td style={{ textAlign: 'center', padding: '0.7em 0.75em', color: '#666' }}>Minimal</td>
            <td style={{ textAlign: 'center', padding: '0.7em 0.75em', color: '#666' }}>$150-200</td>
            <td style={{ textAlign: 'center', padding: '0.7em 0.75em', color: '#2e7d32', fontWeight: 600 }}>$0</td>
          </tr>
          <tr style={{ background: '#f9f9f9', borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '0.7em 0.75em', fontWeight: 500 }}>Travel Rewards</td>
            <td style={{ textAlign: 'center', padding: '0.7em 0.75em', color: '#2e7d32', fontWeight: 600 }}>2-5%</td>
            <td style={{ textAlign: 'center', padding: '0.7em 0.75em', color: '#666' }}>Moderate</td>
            <td style={{ textAlign: 'center', padding: '0.7em 0.75em', color: '#666' }}>$400-600</td>
            <td style={{ textAlign: 'center', padding: '0.7em 0.75em', color: '#f57c00', fontWeight: 600 }}>$95</td>
          </tr>
          <tr style={{ background: '#fff', borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '0.7em 0.75em', fontWeight: 500 }}>Premium Travel</td>
            <td style={{ textAlign: 'center', padding: '0.7em 0.75em', color: '#2e7d32', fontWeight: 600 }}>3-5%</td>
            <td style={{ textAlign: 'center', padding: '0.7em 0.75em', color: '#666' }}>Extensive</td>
            <td style={{ textAlign: 'center', padding: '0.7em 0.75em', color: '#666' }}>$800-1200</td>
            <td style={{ textAlign: 'center', padding: '0.7em 0.75em', color: '#d32f2f', fontWeight: 600 }}>$250-550</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
);

export default WhatMakesCardGood;
