import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// User Imports
import Navbar from './component/Navbar';
import Footer from './component/Footer';
import Home from './page/Home';
// ... other user imports ...

// Admin Imports
import Login from './admin/pages/Login';
import Dashboard from './admin/pages/Dashboard';
import MenuManagement from './admin/pages/MenuManagement';
import AdminLayout from './admin/layout/layout';
import ProtectedRoute from './admin/ProtectedRoute';

const App: React.FC = () => {
  // Check localStorage for initial state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    localStorage.getItem('isLoggedIn') === 'true'
  );

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    console.log("Admin session initialized");
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
  };

  const userMainStyles = "flex flex-col items-center justify-center min-h-[calc(100vh-160px)] w-full p-4 bg-gray-50";

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        {/* PUBLIC USER ROUTES */}
        <Route path="/" element={<><Navbar /><main className={userMainStyles}><Home /></main><Footer /></>} />
        {/* Add your other public routes here... */}

        {/* ADMIN LOGIN */}
        <Route 
          path="/admin/login" 
          element={
            isAuthenticated 
              ? <Navigate to="/admin/dashboard" replace /> 
              : <Login onLoginSuccess={handleLoginSuccess} />
          } 
        />

        {/* PROTECTED ADMIN ROUTES */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              {/* This now works perfectly without errors */}
              <AdminLayout onLogout={handleLogout} />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="menu-management" element={<MenuManagement />} />
          <Route path="reservations" element={<div className="p-8">Reservations List</div>} />
        </Route>

        <Route path="*" element={<div className="flex h-screen items-center justify-center font-bold">404 - Not Found</div>} />
      </Routes>
    </Router>
  );
};

export default App;