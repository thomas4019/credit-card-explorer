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
import CardPicker from './pages/CardPicker';

const PAGES = [
  { key: 'cardpicker', label: 'Card Picker' },
  { key: 'maximizer', label: 'Maximizer' },
  { key: 'chase', label: 'Chase Points Worth' },
  { key: 'amex', label: 'Amex Points Worth' },
  { key: 'capitalone', label: 'Capital One Points Worth' },
  { key: 'storecards', label: 'Store Credit Cards' },
  { key: 'airlinecards', label: 'Airline Credit Cards' },
  { key: 'hotelcards', label: 'Hotel Credit Cards' },
  { key: 'whatmakesgood', label: 'What Makes a Card Good' },
] as const;
type PageKey = typeof PAGES[number]['key'];

function App() {
  const [page, setPage] = useState<PageKey>('cardpicker');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const selectPage = (pageKey: PageKey) => {
    setPage(pageKey);
    setMobileMenuOpen(false); // Close menu when page is selected
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Top menu bar */}
      <header className="top-menu-bar">
        <div className="menu-bar-content">
          <div className="menu-bar-left">
            <h1 className="app-title">Credit Cards Points Tools</h1>
          </div>
          <div className="menu-bar-right">
            <button 
              className={`hamburger-button${mobileMenuOpen ? ' open' : ''}`}
              onClick={toggleMobileMenu}
              aria-label="Toggle navigation menu"
            >
              <div className="hamburger">
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div 
        className={`mobile-menu-overlay${mobileMenuOpen ? ' open' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Right-side mobile menu panel */}
      <div className={`mobile-menu-panel${mobileMenuOpen ? ' open' : ''}`}>
        <div className="mobile-menu-header">
          <h2 className="mobile-menu-title">Navigation</h2>
        </div>
        <div className="mobile-menu-items">
          {PAGES.map((p) => (
            <button
              key={p.key}
              className={`mobile-menu-item${page === p.key ? ' selected' : ''}`}
              onClick={() => selectPage(p.key)}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main content */}
      <main className="main-content">
        {page === 'cardpicker' && <CardPicker />}
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
