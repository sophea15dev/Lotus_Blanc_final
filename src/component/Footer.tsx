import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/PSE_LOTUSBLANC-04.png'; 

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#004A61] text-white pt-16 pb-8 px-6 md:px-12 lg:px-20 mt-auto font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-24">
        
        {/* Column 1: Mission */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            {/* brightness-0 invert-100 makes the logo solid white */}
            <img 
              src={logo} 
              alt="Lotus Logo" 
              className="h-10 w-auto brightness-0 invert" 
            />
            <span className="font-bold text-xl tracking-wide">Our Mission</span>
          </div>
          <p className="text-sm leading-relaxed opacity-80 max-w-sm">
            Lotus Blanc is a training restaurant dedicated to empowering Cambodian youth 
            through professional hospitality training. Your patronage directly supports 
            their futures and the PSE mission.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="flex flex-col space-y-4">
          <span className="text-lg font-bold mb-2">Quick Links</span>
          <nav className="flex flex-col space-y-3">
            {['Home', 'Menu', 'Cooking Classes', 'About PSE', 'Support Us'].map((item) => (
              <Link 
                key={item} 
                to={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-sm opacity-70 hover:opacity-100 hover:translate-x-1 transition-all duration-200"
              >
                {item}
              </Link>
            ))}
          </nav>
        </div>

        {/* Column 3: Contact & Hours */}
        <div className="flex flex-col space-y-4">
          <span className="text-lg font-bold mb-2">Contact & Hours</span>
          <div className="text-sm space-y-4 opacity-80 leading-relaxed">
            <p>
              <strong className="block text-white opacity-100">Address:</strong>
              #420 Tchecoslovaquie Blvd (St. 163), Phnom Penh
            </p>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <strong className="block text-white opacity-100">Breakfast:</strong>
                Mon-Fri, 7:30 – 9:00 AM
              </div>
              <div>
                <strong className="block text-white opacity-100">Lunch:</strong>
                Mon-Fri, 12:00 – 2:00 PM
              </div>
            </div>
            <p>
              <strong className="block text-white opacity-100">Email:</strong>
              booking@pse.ngo
            </p>
          </div>
        </div>
      </div>
      
      {/* Bottom Copyright */}
      <div className="mt-16 pt-8 border-t border-white/10 text-center text-xs opacity-50 tracking-widest">
        © 2026 LOTUS BLANC TRAINING RESTAURANT | POWERED BY Stack-Builder
      </div>
    </footer>
  );
};

export default Footer;