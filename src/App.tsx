import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './component/Navbar';
import Footer from './component/Footer';
import Home from './page/Home';

function App() {
  return (
    <Router>

          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>

    </Router>
  );
}

export default App;