import React, { useState, useEffect } from 'react';
import { Calendar, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/PSE_LOTUSBLANC-04.png'; 

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const links = [
    { name: 'Home', href: '/' },
    { name: 'Menu', href: '/menu' }, // Note: If using router, usually /menu instead of #menu
    { name: 'Contact', href: '/contact' },
  ];

  // Close mobile menu on navigation or window resize
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
    <nav className="relative z-[100] bg-white border-b border-gray-100 font-['Work_Sans']">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex justify-between items-center h-20">
          
          {/* LEFT: Logo & Brand */}
          <Link to="/" className="flex items-center gap-3 shrink-0 group">
            <img src={logo} alt="Lotus Logo" className="h-12 w-auto transition-transform group-hover:scale-105" />
            <div className="flex flex-col">
              <span className="text-2xl font-black italic text-slate-800 leading-none">
                Lotus Blanc
              </span>
              <span className="text-[9px] tracking-[3px] text-blue-500 font-bold mt-1">
                FINE DINING & BAKERY
              </span>
            </div>
          </Link>

          {/* CENTER: Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`text-lg font-bold transition-colors duration-300 hover:text-[#FF7043] ${
                  isActive(link.href) ? 'text-[#FF7043]' : 'text-slate-700'
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
              className="hidden sm:flex items-center gap-2 bg-[#FF7043] text-white px-6 py-2.5 rounded-full font-bold shadow-md hover:bg-[#e6643c] transition-all hover:shadow-lg active:scale-95"
            >
              <Calendar size={18} />
              <span>Reservation</span>
            </Link>

            {/* Mobile Toggle */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-slate-700 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU: Dropdown */}
      <div className={`
        absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-xl transition-all duration-300 ease-in-out md:hidden
        ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}
      `}>
        <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col items-center">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={`w-full text-center py-3 text-lg font-bold rounded-xl ${
                isActive(link.href) ? 'bg-orange-50 text-[#FF7043]' : 'text-slate-700 hover:bg-gray-50'
              }`}
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