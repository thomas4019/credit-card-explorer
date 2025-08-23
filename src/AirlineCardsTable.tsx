import React from 'react';

const airlineCards = [
  {
    name: 'Delta SkyMiles® Gold Amex',
    airlineEarn: '2x',
    otherEarn: '1x',
    annualFee: 99,
    notes: '2x at restaurants and U.S. supermarkets',
  },
  {
    name: 'United Explorer Card',
    airlineEarn: '2x',
    otherEarn: '1x',
    annualFee: 95,
    notes: '2x on hotels and dining',
  },
  {
    name: 'American Airlines AAdvantage Platinum Select',
    airlineEarn: '2x',
    otherEarn: '1x',
    annualFee: 95,
    notes: '2x at gas stations and restaurants',
  },
  {
    name: 'Southwest Rapid Rewards® Plus',
    airlineEarn: '2x',
    otherEarn: '1x',
    annualFee: 69,
    notes: '2x on local transit, internet, cable, phone, and streaming',
  },
  {
    name: 'JetBlue Plus Card',
    airlineEarn: '6x',
    otherEarn: '1x',
    annualFee: 95,
    notes: '2x at restaurants and grocery stores',
  },
  {
    name: 'Alaska Airlines Visa Signature®',
    airlineEarn: '3x',
    otherEarn: '1x',
    annualFee: 75,
    notes: '2x on gas, EV charging, cable, streaming, transit',
  },
  {
    name: 'Citi® / AAdvantage® Executive World Elite',
    airlineEarn: '4x',
    otherEarn: '1x',
    annualFee: 450,
    notes: '10x on hotels and car rentals booked through AA, 4x on AA purchases',
  },
  {
    name: 'United Quest Card',
    airlineEarn: '3x',
    otherEarn: '1x',
    annualFee: 250,
    notes: '2x on hotels, dining, select streaming',
  },
  {
    name: 'Delta SkyMiles® Reserve Amex',
    airlineEarn: '3x',
    otherEarn: '1x',
    annualFee: 550,
    notes: '1x on all other eligible purchases',
  },
];

const sortedAirlineCards = [...airlineCards].sort((a, b) => {
  // Parse the numeric part of 'airlineEarn', e.g., '6x' => 6
  const getNum = (s: string) => parseFloat(s);
  return getNum(b.airlineEarn) - getNum(a.airlineEarn);
});

const AirlineCardsTable: React.FC = () => (
  <section style={{ padding: '2rem', width: '100%' }}>
    <h2>Airline Credit Cards</h2>
    <p>Popular airline credit cards and their rewards rates for airline purchases and elsewhere.</p>
    <table className="spend-table airline-cards-table" style={{ width: '100%', marginTop: '1.5rem', borderRadius: 12, overflow: 'hidden', boxShadow: '0 2px 12px rgba(100,108,255,0.07)' }}>
      <thead style={{ background: '#f5f7ff' }}>
        <tr>
          <th style={{ textAlign: 'left', padding: '0.75em', fontSize: '1.08em', borderBottom: '2px solid #ccc' }}>Card</th>
          <th style={{ textAlign: 'center', padding: '0.75em', fontSize: '1.08em', borderBottom: '2px solid #ccc' }}>Miles/$ on Airline</th>
          <th style={{ textAlign: 'center', padding: '0.75em', fontSize: '1.08em', borderBottom: '2px solid #ccc' }}>Miles/$ Elsewhere</th>
          <th style={{ textAlign: 'center', padding: '0.75em', fontSize: '1.08em', borderBottom: '2px solid #ccc' }}>Annual Fee</th>
          <th style={{ textAlign: 'left', padding: '0.75em', fontSize: '1.08em', borderBottom: '2px solid #ccc' }}>Notes</th>
        </tr>
      </thead>
      <tbody>
        {sortedAirlineCards.map(card => (
          <tr key={card.name} style={{ background: '#fff', borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '0.7em 0.75em', fontWeight: 500 }}>
              {card.name}
            </td>
            <td style={{ textAlign: 'center', padding: '0.7em 0.75em', color: '#2e7d32', fontWeight: 600 }}>{card.airlineEarn}</td>
            <td style={{ textAlign: 'center', padding: '0.7em 0.75em', color: '#1976d2', fontWeight: 600 }}>{card.otherEarn}</td>
            <td style={{ textAlign: 'center', padding: '0.7em 0.75em', color: '#d32f2f', fontWeight: 600 }}>${card.annualFee}</td>
            <td style={{ padding: '0.7em 0.75em', fontSize: '0.97em', color: '#555' }}>{card.notes}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </section>
);

export default AirlineCardsTable;
