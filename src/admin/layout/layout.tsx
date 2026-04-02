import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../component/Sidebar';
import Header from '../component/Header';

// 1. Define the Interface so TypeScript knows 'onLogout' is expected
interface AdminLayoutProps {
  onLogout: () => void;
}

// 2. Apply the Interface to the component
const AdminLayout: React.FC<AdminLayoutProps> = ({ onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex overflow-x-hidden">
      {/* Sidebar - Fixed width w-64 
          Pass the real onLogout function here instead of the Error 
      */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        onLogout={onLogout} 
      /> 
      
      {/* Main Content Area - lg:ml-64 matches Sidebar width */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen transition-all duration-300">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
        
        {/* THE CLEAN WRAPPER: max-width stops the "over-container" stretch */}
        <main className="p-6 lg:p-10 w-full max-w-7xl mx-auto">
          <div className="animate-in fade-in slide-in-from-bottom-3 duration-700">
            {/* This renders Dashboard, MenuManagement, etc. */}
            <Outlet /> 
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;