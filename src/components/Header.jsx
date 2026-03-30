import React from 'react';
import { Presentation, LayoutTemplate, UserCircle } from 'lucide-react';
import './Header.css';

const Header = ({ onCreateNew }) => {
  return (
    <header className="main-header">
      <div className="header-brand">
        <Presentation className="brand-icon" size={32} />
        <div>
          <h1>Presentation Pro</h1>
          <p className="brand-tagline">Premium Slide Creator</p>
        </div>
      </div>
      
      <nav className="header-nav">
        <button className="nav-btn active">
          <LayoutTemplate size={20} />
          <span>Templates</span>
        </button>
        <button className="nav-btn">
          <UserCircle size={20} />
          <span>My Library</span>
        </button>
      </nav>
      
      <div className="header-actions">
        <button className="btn-primary" onClick={onCreateNew}>Create New</button>
      </div>
    </header>
  );
};

export default Header;
