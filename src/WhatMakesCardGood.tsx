import React from 'react';

const WhatMakesCardGood: React.FC = () => (
  <section style={{ padding: '2rem', width: '100%', maxWidth: '900px', margin: '0 auto' }}>
    <h2>What Makes a Credit Card Good?</h2>
    <p style={{ fontSize: '1.1em', color: '#555', marginBottom: '2rem' }}>
      When evaluating credit cards, there are four key factors to consider. Understanding these factors helps you choose the right card for your spending habits and financial goals.
    </p>

    <div style={{ display: 'grid', gap: '2rem', marginTop: '2rem' }}>
      {/* Factor 1: Reward Rate */}
      <div style={{ 
        background: '#f8f9ff', 
        padding: '1.5rem', 
        borderRadius: '12px', 
        border: '2px solid #e3f2fd',
        boxShadow: '0 2px 8px rgba(100,108,255,0.1)'
      }}>
        <h3 style={{ color: '#1976d2', marginTop: 0, marginBottom: '1rem' }}>
          🎯 1. Reward Rate (Points per $ × Point Value)
        </h3>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          This is the foundation of card value. Calculate it by multiplying:
        </p>
        <ul style={{ marginLeft: '1.5rem', lineHeight: '1.6' }}>
          <li><strong>Points per dollar spent</strong> - How many points you earn on purchases</li>
          <li><strong>Point value</strong> - How much each point is worth when redeemed</li>
        </ul>
        <div style={{ 
          background: '#fff', 
          padding: '1rem', 
          borderRadius: '8px', 
          marginTop: '1rem',
          border: '1px solid #e0e0e0'
        }}>
          <strong>Example:</strong> A card earning 3x points on dining with points worth 1.5¢ each = 4.5% effective return on dining purchases.
        </div>
      </div>

      {/* Factor 2: Other Benefits */}
      <div style={{ 
        background: '#fff8f8', 
        padding: '1.5rem', 
        borderRadius: '12px', 
        border: '2px solid #ffebee',
        boxShadow: '0 2px 8px rgba(244,67,54,0.1)'
      }}>
        <h3 style={{ color: '#d32f2f', marginTop: 0, marginBottom: '1rem' }}>
          🎁 2. Other Benefits
        </h3>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Beyond earning points, premium cards offer valuable perks that can offset annual fees:
        </p>
        <ul style={{ marginLeft: '1.5rem', lineHeight: '1.6' }}>
          <li><strong>Travel benefits:</strong> Free checked bags, priority boarding, lounge access</li>
          <li><strong>Hotel perks:</strong> Free night certificates, elite status, room upgrades</li>
          <li><strong>Insurance:</strong> Travel insurance, rental car coverage, purchase protection</li>
          <li><strong>Credits:</strong> Airline fee credits, hotel credits, dining credits</li>
        </ul>
        <div style={{ 
          background: '#fff', 
          padding: '1rem', 
          borderRadius: '8px', 
          marginTop: '1rem',
          border: '1px solid #e0e0e0'
        }}>
          <strong>Example:</strong> $200 airline fee credit + $200 hotel credit = $400 in annual value.
        </div>
      </div>

      {/* Factor 3: Signup Bonus */}
      <div style={{ 
        background: '#f0f8f0', 
        padding: '1.5rem', 
        borderRadius: '12px', 
        border: '2px solid #c8e6c9',
        boxShadow: '0 2px 8px rgba(76,175,80,0.1)'
      }}>
        <h3 style={{ color: '#2e7d32', marginTop: 0, marginBottom: '1rem' }}>
          🚀 3. Signup Bonus
        </h3>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          The initial bonus can provide significant upfront value, but consider the spending requirement:
        </p>
        <ul style={{ marginLeft: '1.5rem', lineHeight: '1.6' }}>
          <li><strong>Bonus amount</strong> - Points or cash back offered</li>
          <li><strong>Spending requirement</strong> - How much you need to spend in the first few months</li>
          <li><strong>Time limit</strong> - Usually 3 months to meet the requirement</li>
        </ul>
        <div style={{ 
          background: '#fff', 
          padding: '1rem', 
          borderRadius: '8px', 
          marginTop: '1rem',
          border: '1px solid #e0e0e0'
        }}>
          <strong>Example:</strong> 100,000 points for spending $4,000 in 3 months = 25x return on that spending.
        </div>
      </div>

      {/* Factor 4: Annual Fee */}
      <div style={{ 
        background: '#fff3e0', 
        padding: '1.5rem', 
        borderRadius: '12px', 
        border: '2px solid #ffcc02',
        boxShadow: '0 2px 8px rgba(255,152,0,0.1)'
      }}>
        <h3 style={{ color: '#f57c00', marginTop: 0, marginBottom: '1rem' }}>
          💰 4. Annual Fee
        </h3>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          The cost of card ownership. Higher fees often mean better rewards and benefits:
        </p>
        <ul style={{ marginLeft: '1.5rem', lineHeight: '1.6' }}>
          <li><strong>No-fee cards:</strong> Good for beginners or light spenders</li>
          <li><strong>Low-fee cards ($95):</strong> Balance of cost and value</li>
          <li><strong>Premium cards ($250+):</strong> High rewards and extensive benefits</li>
        </ul>
        <div style={{ 
          background: '#fff', 
          padding: '1rem', 
          borderRadius: '8px', 
          marginTop: '1rem',
          border: '1px solid #e0e0e0'
        }}>
          <strong>Example:</strong> $395 annual fee with $800+ in annual benefits = net positive value.
        </div>
      </div>
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
