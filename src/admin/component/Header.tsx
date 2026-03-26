import React from 'react';
import { Search, Bell, Menu, Plus } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 lg:px-10 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-4 flex-1">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 text-slate-600 bg-slate-50 rounded-xl"
        >
          <Menu size={20} />
        </button>

        <div className="relative max-w-md w-full hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text" 
            placeholder="Search bookings, dishes..." 
            className="w-full bg-slate-50 border-none rounded-xl pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-pink-500/10 transition-all outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        
        <div className="size-10 bg-slate-50 text-slate-400 flex items-center justify-center rounded-xl cursor-pointer hover:text-pink-500 transition-colors">
          <Bell size={20} />
        </div>
      </div>
    </header>
  );
};

export default Header;