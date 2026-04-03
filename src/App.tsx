import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// User Website Components
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import Home from "./page/Home";
import BookingForm from "./page/BookingForm";
import Reservation from "./page/reservation";
import Menu from "./page/Menu";
import List from "./page/list-menu";
import Contact from "./page/contact-us";

// Admin Components
import Login from "./admin/pages/Login";
import Dashboard from "./admin/pages/Dashboard";
import MenuManagement from "./admin/pages/MenuManagement";
import AdminLayout from "./admin/layout/layout";
import ProtectedRoute from "./admin/ProtectedRoute";

const App: React.FC = () => {
  // ✅ ONLY use token (no double logic)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!localStorage.getItem("authToken"),
  );

  const handleLoginSuccess = () => {
    localStorage.setItem("authToken", "dummy-token"); // simulate login
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
  };

  const userMainStyles =
    "flex flex-col items-center justify-center min-h-[calc(100vh-160px)] w-full p-4 bg-gray-50";

  return (
    <Router>
      <Routes>
        {/* --- USER WEBSITE --- */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <main className={userMainStyles}>
                <Home />
              </main>
              <Footer />
            </>
          }
        />
        <Route
          path="/book"
          element={
            <>
              <Navbar />
              <main className={userMainStyles}>
                <BookingForm />
              </main>
              <Footer />
            </>
          }
        />
        <Route
          path="/reservation"
          element={
            <>
              <Navbar />
              <main className={userMainStyles}>
                <Reservation />
              </main>
              <Footer />
            </>
          }
        />
        <Route
          path="/menu"
          element={
            <>
              <Navbar />
              <main className={userMainStyles}>
                <Menu />
              </main>
              <Footer />
            </>
          }
        />
        <Route
          path="/list"
          element={
            <>
              <Navbar />
              <main className={userMainStyles}>
                <List />
              </main>
              <Footer />
            </>
          }
        />
        <Route
          path="/contact"
          element={
            <>
              <Navbar />
              <main className={userMainStyles}>
                <Contact />
              </main>
              <Footer />
            </>
          }
        />

        {/* --- LOGIN --- */}
        <Route
          path="/admin/login"
          element={
            isAuthenticated ? (
              <Navigate to="/admin/dashboard" replace />
            ) : (
              <Login onLoginSuccess={handleLoginSuccess} />
            )
          }
        />

        {/* --- PROTECTED ADMIN --- */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <AdminLayout onLogout={handleLogout} />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="menu-management" element={<MenuManagement />} />
          <Route path="reservations" element={<Reservation />} />
        </Route>

        {/* 404 */}
        <Route
          path="*"
          element={
            <div className="flex h-screen items-center justify-center font-bold">
              404
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
