import React, { useState, useEffect } from 'react';
import { Calendar, Menu, X } from 'lucide-react';
import logo from '../assets/PSE_LOTUSBLANC-04.png'; 

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [activeLink, setActiveLink] = useState('Home'); // default active

  const links = [
    { name: 'Home', href: '#home' },
    { name: 'Menu', href: '#menu' },
    { name: 'Contact', href: '#contact' },
  ];

  const navLinkStyle = (link: string) => ({
    color: activeLink === link ? '#FF7043' : hoveredLink === link ? '#FF7043' : '#2C3E50',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 20px',
    transition: 'color 0.3s',
    cursor: 'pointer',
  });

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
    fontFamily: 'Work Sans',
  };

  return (
    <nav style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '15px 100px',
      backgroundColor: 'white',
      borderBottom: '1px solid #eee',
      fontFamily: 'Work Sans',
      position: 'relative',
      flexWrap: 'wrap'
    }}>
      {/* LEFT: Logo */}
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

      {/* CENTER: Links */}
      <div style={{
        display: 'flex',
        gap: '20px',
        alignItems: 'center',
      }}>
        {links.map(link => (
          <a
            key={link.name}
            href={link.href}
            style={navLinkStyle(link.name)}
            onMouseEnter={() => setHoveredLink(link.name)}
            onMouseLeave={() => setHoveredLink(null)}
            onClick={() => setActiveLink(link.name)}
          >
            {link.name}
          </a>
        ))}
      </div>

      {/* RIGHT: Reservation Button */}
      <button style={buttonStyle}>
        <Calendar size={20} />
        <span>Reservation</span>
      </button>

      {/* Hamburger Icon (mobile) */}
      <div className="hamburger" onClick={() => setOpen(!open)} style={{
        display: 'none',
        cursor: 'pointer',
        zIndex: 50
      }}>
        {open ? <X size={28} /> : <Menu size={28} />}
      </div>

      {/* Mobile Menu */}
      {open && (
        <div style={{
          position: 'absolute',
          top: '70px',
          left: 0,
          width: '100%',
          backgroundColor: 'white',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '20px 0',
          gap: '15px',
          borderTop: '1px solid #eee',
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
          zIndex: 40
        }}>
          {links.map(link => (
            <a
              key={link.name}
              href={link.href}
              style={navLinkStyle(link.name)}
              onMouseEnter={() => setHoveredLink(link.name)}
              onMouseLeave={() => setHoveredLink(null)}
              onClick={() => {
                setActiveLink(link.name);
                setOpen(false); // close menu on mobile click
              }}
            >
              {link.name}
            </Link>
          ))}
          <Link 
            to="/book" 
            className="w-full flex justify-center items-center gap-2 bg-[#FF7043] text-white py-4 rounded-xl font-bold mt-4"
          >
            <Calendar size={20} />
            <span>Make a Reservation</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;