import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, UtensilsCrossed, CalendarCheck, LogOut, X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onLogout }) => {
  const navigate = useNavigate();

  const menuItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/admin/menu-management', label: 'Menu Management', icon: <UtensilsCrossed size={20} /> },
    { path: '/admin/reservations', label: 'Reservations', icon: <CalendarCheck size={20} /> },
  ];

  const handleLogoutClick = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      onLogout(); // Clears state in App.tsx
      navigate('/'); // Redirect to home
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden" onClick={onClose} />
      )}

      <aside className={`
        fixed left-0 top-0 h-screen w-72 bg-white border-r border-slate-200 flex flex-col z-50
        transition-transform duration-300 ease-in-out lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* LOGO SECTION - FIXED 403 ERROR */}
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-2xl flex items-center justify-center bg-[#034A6C] text-white font-black text-xl italic shadow-lg border-2 border-white">
              LB
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tight text-slate-800 italic leading-none">Lotus Blanc</h2>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 block">Admin Panel</span>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden p-2 text-slate-400 hover:bg-slate-50 rounded-lg">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => { if(window.innerWidth < 1024) onClose(); }}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-200
                ${isActive 
                  ? 'bg-blue-50 text-[#034A6C] font-black shadow-sm' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}
              `}
            >
              {item.icon}
              <span className="text-sm tracking-tight">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button 
            onClick={handleLogoutClick}
            className="w-full flex items-center gap-3 px-4 py-3.5 text-rose-500 hover:bg-rose-50 rounded-2xl transition-all font-black text-xs uppercase tracking-widest"
          >
            <LogOut size={20} /> 
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;