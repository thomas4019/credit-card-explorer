import { useState } from 'react'
import './App.css'
import ChasePointsValue from './pages/ChasePointsValue'
import AmexPointsValue from './pages/AmexPointsValue'
import CapitalOnePointsValue from './pages/CapitalOnePointsValue'
import StoreCardsTable from './pages/StoreCardsTable';
import AirlineCardsTable from './pages/AirlineCardsTable';
import HotelCardsTable from './pages/HotelCardsTable';
import WhatMakesCardGood from './pages/WhatMakesCardGood';
import Maximizer from './pages/Maximizer';

const PAGES = [
  { key: 'maximizer', label: 'Maximizer' },
  { key: 'whatmakesgood', label: 'What Makes a Card Good' },
  { key: 'chase', label: 'Chase Points Worth' },
  { key: 'amex', label: 'Amex Points Worth' },
  { key: 'capitalone', label: 'Capital One Points Worth' },
  { key: 'storecards', label: 'Store Credit Cards' },
  { key: 'airlinecards', label: 'Airline Credit Cards' },
  { key: 'hotelcards', label: 'Hotel Credit Cards' },
] as const;
type PageKey = typeof PAGES[number]['key'];

function App() {

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
        {page === 'maximizer' && <Maximizer />}
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
