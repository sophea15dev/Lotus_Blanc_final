import React, { useState, useEffect } from 'react';
import { Calendar, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/PSE_LOTUSBLANC-04.png'; 

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const links = [
    { name: 'Home', href: '/' },
    { name: 'Menu', href: '/menu' },
    { name: 'Contact', href: '/contact' },
  ];

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    /* Removed shadow-xl and border-b to ensure a seamless transition to the Hero */
    <nav className="relative z-[200] bg-white w-full m-0 p-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20"> {/* Reduced height from 25 to 20 for a tighter look */}
          
          {/* LEFT: Logo & Brand */}
          <Link to="/" className="flex items-center gap-3 shrink-0 group">
            <img src={logo} alt="Lotus Logo" className="h-12 w-auto transition-transform group-hover:scale-105" />
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-black italic text-[#004e70] leading-none uppercase">
                Lotus Blanc
              </span>
              <span className="text-[8px] md:text-[9px] tracking-[2px] md:tracking-[3px] text-[#004e70] font-bold mt-1">
                FINE DINING & BAKERY
              </span>
            </div>
          </Link>

          {/* CENTER: Desktop Links */}
          <div className="hidden md:flex items-center space-x-10">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`text-base font-black uppercase italic transition-all duration-300 hover:text-[#f26522] ${
                  isActive(link.href) ? 'text-[#f26522] scale-110' : 'text-[#004e70]'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* RIGHT: Actions */}
          <div className="flex items-center gap-4">
            <Link 
              to="/book" 
              /* Updated button color to match your brand orange */
              className="hidden sm:flex items-center gap-2 bg-[#f26522] text-white px-6 py-2.5 rounded-full font-black italic uppercase text-sm shadow-md hover:bg-[#d9541a] transition-all active:scale-95"
            >
              <Calendar size={18} />
              <span>Reservation</span>
            </Link>

            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-[#004e70] hover:bg-orange-50 rounded-lg transition-colors"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div className={`
        absolute top-full left-0 w-full bg-white shadow-2xl transition-all duration-300 ease-in-out md:hidden z-[300]
        ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}
      `}>
        <div className="px-6 pt-4 pb-10 space-y-3 flex flex-col items-center">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={`w-full text-center py-4 text-lg font-black uppercase italic rounded-2xl ${
                isActive(link.href) ? 'bg-orange-50 text-[#f26522]' : 'text-[#004e70] hover:bg-slate-50'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link 
            to="/book" 
            className="w-full flex justify-center items-center gap-2 bg-[#f26522] text-white py-4 rounded-2xl font-black uppercase italic mt-4 shadow-lg"
          >
            <Calendar size={20} />
            <span>Reservation</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;