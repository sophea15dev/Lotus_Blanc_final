import React, { useState } from 'react';
import { Calendar, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom'; // 1. Added Link and useLocation
import logo from '../assets/PSE_LOTUSBLANC-04.png'; 

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const location = useLocation(); // To track which page we are on

  const links = [
    { name: 'Home', href: '/' },
    { name: 'Menu', href: '#menu' },
    { name: 'Contact', href: '#contact' },
  ];

  // Helper to check if a link is active
  const isActive = (path: string) => location.pathname === path;

  const navLinkStyle = (linkName: string, path: string): React.CSSProperties => ({
    color: isActive(path) || hoveredLink === linkName ? '#FF7043' : '#2C3E50',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 20px',
    transition: 'color 0.3s',
    cursor: 'pointer',
  });

  const buttonStyle: React.CSSProperties = {
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
    textDecoration: 'none', // Important: removes underline from Link
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
      flexWrap: 'wrap',
      zIndex: 100
    }}>
      {/* LEFT: Logo */}
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '15px', textDecoration: 'none' }}>
        <img src={logo} alt="Lotus Logo" style={{ height: '50px', width: 'auto' }} />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '26px', fontWeight: '900', fontStyle: 'italic', color: '#2C3E50', lineHeight: '1' }}>
            Lotus Blanc
          </span>
          <span style={{ fontSize: '9px', letterSpacing: '3px', color: '#3B82F6', fontWeight: 'bold', marginTop: '4px' }}>
            FINE DINING & BAKERY
          </span>
        </div>
      </Link>

      {/* CENTER: Desktop Links */}
      <div style={{
        display: 'flex',
        gap: '20px',
        alignItems: 'center',
      }} className="hidden md:flex">
        {links.map(link => (
          <Link
            key={link.name}
            to={link.href}
            style={navLinkStyle(link.name, link.href)}
            onMouseEnter={() => setHoveredLink(link.name)}
            onMouseLeave={() => setHoveredLink(null)}
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* RIGHT: Reservation Button (Now a Link) */}
      <Link to="/book" style={buttonStyle}>
        <Calendar size={20} />
        <span>Reservation</span>
      </Link>

      {/* Hamburger Icon (mobile) */}
      <div onClick={() => setOpen(!open)} style={{
        display: 'none', // You should handle this with media queries in CSS
        cursor: 'pointer',
        zIndex: 50
      }} className="mobile-toggle">
        {open ? <X size={28} /> : <Menu size={28} />}
      </div>

      {/* Mobile Menu */}
      {open && (
        <div style={{
          position: 'absolute',
          top: '100%',
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
            <Link
              key={link.name}
              to={link.href}
              style={navLinkStyle(link.name, link.href)}
              onClick={() => setOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;