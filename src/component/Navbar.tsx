import React from 'react';
import { Calendar } from 'lucide-react';
import logo from '../assets/PSE_LOTUSBLANC-04.png'; 

const Navbar: React.FC = () => {
  // Common Styles to keep the code "Clean"
  const navLinkStyle = {
    color: '#2C3E50',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 20px'
  };

  const buttonStyle = {
    backgroundColor: '#FF7043',
    color: 'white',
    padding: '10px 30px',
    borderRadius: '50px',
    border: 'none',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    fontSize: '18px',
    fontFamily: 'Work Sans' 


  };

  return (
    <nav style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between', 
      padding: '15px 100px', 
      backgroundColor: 'white',
      borderBottom: '1px solid #eee',
      fontFamily: 'Work Sans' 
    }}>
      
      {/* 1. LEFT: Logo & Text */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <img src={logo} alt="Lotus Logo" style={{ height: '50px', width: 'auto' }} />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '26px', fontWeight: '900', fontStyle: 'italic', color: '#2C3E50' }}>
            Lotus Blanc
          </span>
          <span style={{ fontSize: '9px', letterSpacing: '3px', color: '#3B82F6', fontWeight: 'bold', marginTop: '-4px' }}>
            FINE DINING & BAKERY
          </span>
        </div>
      </div>

      {/* 2. CENTER: Links with proper spacing */}
      <div style={{ display: 'flex' }}>
        <a href="#home" style={navLinkStyle}>Home</a>
        <a href="#menu" style={navLinkStyle}>Menu</a>
        <a href="#contact" style={navLinkStyle}>Contact</a>
      </div>

      {/* 3. RIGHT: The Orange Pill Button */}
      <button style={buttonStyle}>
        <Calendar size={20} />
        <span>Reservation</span>
      </button>

    </nav>
  );
};

export default Navbar;