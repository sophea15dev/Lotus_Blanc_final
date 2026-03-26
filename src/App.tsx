import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// User Website Components
import Navbar from './component/Navbar';
import Footer from './component/Footer';
import Home from './page/Home';
import BookingForm from './page/BookingForm'; 
import Reservation from './page/reservation';
import Menu from './page/Menu';
import List from './page/list-menu';
import Contact from './page/contact-us';

// Admin Components
import Login from './admin/pages/Login';
import Dashboard from './admin/pages/Dashboard';
import MenuManagement from './admin/pages/MenuManagement';
import AdminLayout from './admin/layout/layout';
import ProtectedRoute from './admin/ProtectedRoute';

const App: React.FC = () => {
  // A simple handler to satisfy the prop requirement
  const handleLoginSuccess = () => {
    console.log("Admin session initialized");
  };

  return (
    <Router>
      <Routes>
        
        {/* --- USER WEBSITE SECTION --- */}
        <Route path="/" element={<><Navbar /><main className="p-4"><Home /></main><Footer /></>} />
        <Route path="/book" element={<><Navbar /><main className="p-4"><BookingForm /></main><Footer /></>} />
        <Route path="/reservation" element={<><Navbar /><main className="p-4"><Reservation /></main><Footer /></>} />
        <Route path="/menu" element={<><Navbar /><main className="p-4"><Menu /></main><Footer /></>} />
        <Route path="/list" element={<><Navbar /><main className="p-4"><List /></main><Footer /></>} />
        <Route path="/contact" element={<><Navbar /><main className="p-4"><Contact /></main><Footer /></>} />

        {/* --- ADMIN LOGIN --- */}
        {/* Pass the actual function here instead of throwing an error */}
        <Route 
          path="/admin/login" 
          element={<Login onLoginSuccess={handleLoginSuccess} />} 
        />

        {/* --- ADMIN DASHBOARD SECTION --- */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="menu-management" element={<MenuManagement />} />
          <Route path="reservations" element={<Reservation />} />
        </Route>

        {/* Catch-all for 404 */}
        <Route path="*" element={<div className="flex h-screen items-center justify-center font-bold">404 - Page Not Found</div>} />

      </Routes>
    </Router>
  );
};

export default App;