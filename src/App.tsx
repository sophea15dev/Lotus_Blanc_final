<<<<<<< HEAD
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './component/Navbar';
import Footer from './component/Footer';
import Home from './page/Home';
import BookingForm from './page/BookingForm'; 
import Reservation from './page/reservation';
=======
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import MenuPage from "./page/Menu";
import List from "./page/list-menu";
// Create a small Home component or import your actual Home page
const Home = () => (
  <main className="p-10 text-center">
    <h1 className="text-4xl font-bold mt-20">Welcome to Lotus Blanc</h1>
    <p className="text-gray-600 mt-4">
      Experience fine dining and bakery excellence.
    </p>
  </main>
);
>>>>>>> origin/list-Menu

function App() {
  return (
    <Router>
<<<<<<< HEAD
        <Navbar />
        
        {/* Main content area: flex-grow ensures footer stays at bottom */}
        <main className="flex-grow flex items-center justify-center p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/book" element={<BookingForm />} />
            <Route path="/reservation" element={<Reservation/>} />
          </Routes>
        </main>

        <Footer />
=======
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />

        {/* This area changes based on the URL */}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/list" element={<List />} />
          </Routes>
        </div>

        <Footer />
      </div>
>>>>>>> origin/list-Menu
    </Router>
  );
}

export default App;
