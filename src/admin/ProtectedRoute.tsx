import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  
  // Strict check for both the login flag AND the actual auth token
  const isAuthenticated = localStorage.getItem('isLoggedIn') === 'true';
  const hasToken = !!localStorage.getItem('authToken');

  if (!isAuthenticated || !hasToken) {
    // Redirect to login while saving the original destination
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;