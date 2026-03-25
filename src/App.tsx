import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import MenuPage from "./page/Menu";

// Create a small Home component or import your actual Home page
const Home = () => (
  <main className="p-10 text-center">
    <h1 className="text-4xl font-bold mt-20">Welcome to Lotus Blanc</h1>
    <p className="text-gray-600 mt-4">
      Experience fine dining and bakery excellence.
    </p>
  </main>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />

        {/* This area changes based on the URL */}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<MenuPage />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
