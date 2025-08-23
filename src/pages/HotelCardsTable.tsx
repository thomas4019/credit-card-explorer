import React from 'react';

const hotelCards = [
  {
    name: 'Chase World of Hyatt',
    hotelEarn: '4x',
    otherEarn: '1x',
    annualFee: 95,
    freeNight: 'Yes',
    notes: 'Free night at Category 1-4 hotels annually, 2x on dining, gym, and local transit',
  },
  {
    name: 'Marriott Bonvoy Boundless',
    hotelEarn: '6x',
    otherEarn: '2x',
    annualFee: 95,
    freeNight: 'Yes',
    notes: 'Free night at hotels up to 35,000 points annually, 3x on dining and groceries',
  },
  {
    name: 'Marriott Bonvoy Brilliant Amex',
    hotelEarn: '6x',
    otherEarn: '3x',
    annualFee: 650,
    freeNight: 'Yes',
    notes: 'Free night at hotels up to 85,000 points annually, 3x on dining worldwide, 2x on other travel',
  },
  {
    name: 'Hilton Honors Surpass',
    hotelEarn: '12x',
    otherEarn: '3x',
    annualFee: 95,
    freeNight: '',
    notes: '3x on dining, groceries, gas stations, 6x on select streaming',
  },
  {
    name: 'IHG Rewards Premier',
    hotelEarn: '25x',
    otherEarn: '3x',
    annualFee: 99,
    freeNight: 'Yes',
    notes: 'Free night at hotels up to 40,000 points annually, 5x on gas, groceries, restaurants',
  },
  {
    name: 'Choice Privileges Visa',
    hotelEarn: '8x',
    otherEarn: '2x',
    annualFee: 95,
    freeNight: '',
    notes: '2x on gas, groceries, and phone services',
  },
  {
    name: 'Best Western Rewards Mastercard',
    hotelEarn: '10x',
    otherEarn: '1x',
    annualFee: 59,
    freeNight: '',
    notes: '',
  },
];

const sortedHotelCards = [...hotelCards].sort((a, b) => {
  // Parse the numeric part of 'hotelEarn', e.g., '25x' => 25
  const getNum = (s: string) => parseFloat(s);
  return getNum(b.hotelEarn) - getNum(a.hotelEarn);
});

const HotelCardsTable: React.FC = () => (
  <section style={{ padding: '2rem', width: '100%' }}>
    <h2>Hotel Credit Cards</h2>
    <p>Popular hotel credit cards and their rewards rates for hotel stays and elsewhere.</p>
    <div style={{ marginBottom: '0.75em', fontSize: '0.93em', color: '#a68b00' }}>
      <span>* = Free night has minimum spend requirement</span>
    </div>
    <table className="spend-table hotel-cards-table" style={{ width: '100%', marginTop: '1.5rem', borderRadius: 12, overflow: 'hidden', boxShadow: '0 2px 12px rgba(100,108,255,0.07)' }}>
      <thead style={{ background: '#f5f7ff' }}>
        <tr>
          <th style={{ textAlign: 'left', padding: '0.75em', fontSize: '1.08em', borderBottom: '2px solid #ccc' }}>Card</th>
          <th style={{ textAlign: 'center', padding: '0.75em', fontSize: '1.08em', borderBottom: '2px solid #ccc' }}>Points/$ at Hotels</th>
          <th style={{ textAlign: 'center', padding: '0.75em', fontSize: '1.08em', borderBottom: '2px solid #ccc' }}>Points/$ Elsewhere</th>
          <th style={{ textAlign: 'center', padding: '0.75em', fontSize: '1.08em', borderBottom: '2px solid #ccc' }}>Annual Fee</th>
          <th style={{ textAlign: 'center', padding: '0.75em', fontSize: '1.08em', borderBottom: '2px solid #ccc' }}>Free Night</th>
          <th style={{ textAlign: 'left', padding: '0.75em', fontSize: '1.08em', borderBottom: '2px solid #ccc' }}>Notes</th>
        </tr>
      </thead>
      <tbody>
        {sortedHotelCards.map(card => (
          <tr key={card.name} style={{ background: '#fff', borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '0.7em 0.75em', fontWeight: 500 }}>
              {card.name.includes('Hyatt') && <strong>Hyatt</strong>}
              {card.name.includes('Marriott') && <strong>Marriott</strong>}
              {card.name.includes('Hilton') && <strong>Hilton</strong>}
              {card.name.includes('IHG') && <strong>IHG</strong>}
              {card.name.includes('Choice') && <strong>Choice</strong>}
              {card.name.includes('Wyndham') && <strong>Wyndham</strong>}
              {card.name.includes('Best Western') && <strong>Best Western</strong>}
              {card.name.includes('Radisson') && <strong>Radisson</strong>}
              {card.name.includes('La Quinta') && <strong>La Quinta</strong>}
              {card.name.replace(/Hyatt|Marriott|Hilton|IHG|Choice|Wyndham|Best Western|Radisson|La Quinta/g, '')}
            </td>
            <td style={{ textAlign: 'center', padding: '0.7em 0.75em', color: '#2e7d32', fontWeight: 600 }}>{card.hotelEarn}</td>
            <td style={{ textAlign: 'center', padding: '0.7em 0.75em', color: '#1976d2', fontWeight: 600 }}>{card.otherEarn}</td>
            <td style={{ textAlign: 'center', padding: '0.7em 0.75em', color: '#d32f2f', fontWeight: 600 }}>${card.annualFee}</td>
            <td style={{ textAlign: 'center', padding: '0.7em 0.75em', color: '#388e3c', fontWeight: 600 }}>{card.freeNight}</td>
            <td style={{ padding: '0.7em 0.75em', fontSize: '0.97em', color: '#555' }}>{card.notes}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </section>
);

export default HotelCardsTable;
