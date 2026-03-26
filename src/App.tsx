import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './component/Navbar';
import Footer from './component/Footer';
import Home from './page/Home';
import BookingForm from './page/BookingForm'; 
import Reservation from './page/reservation';
import Menu from './page/Menu';
import List from './page/list-menu';
import Contact from './page/contact-us';

function App() {
  return (
    <Router>
        <Navbar />
        
        {/* Main content area: flex-grow ensures footer stays at bottom */}
        <main className="flex-grow flex items-center justify-center p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/book" element={<BookingForm />} />
            <Route path="/reservation" element={<Reservation/>} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/list" element={<List />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        <Footer />
    </Router>
  );
}

export default App;
