import React from "react";
import { Link } from "react-router-dom"; // Essential for routing
import { Calendar } from "lucide-react";
import logo from "../assets/PSE_LOTUSBLANC-04.png";

const Navbar: React.FC = () => {
  return (
    <nav className="flex items-center justify-between px-[100px] py-[15px] bg-white border-b border-gray-100 font-['Work_Sans']">
      {/* 1. LEFT: Logo & Text */}
      <Link to="/" className="flex items-center gap-[15px] no-underline">
        <img src={logo} alt="Lotus Logo" className="h-[50px] w-auto" />
        <div className="flex flex-col">
          <span className="text-[26px] font-[900] italic text-[#2C3E50] leading-none">
            Lotus Blanc
          </span>
          <span className="text-[9px] tracking-[3px] text-[#3B82F6] font-bold mt-[2px]">
            FINE DINING & BAKERY
          </span>
        </div>
      </Link>

      {/* 2. CENTER: Links */}
      <div className="flex gap-[40px]">
        <Link
          to="/"
          className="text-[#2C3E50] no-underline font-bold text-[18px] hover:text-[#FF7043] transition-colors"
        >
          Home
        </Link>
        <Link
          to="/menu"
          className="text-[#2C3E50] no-underline font-bold text-[18px] hover:text-[#FF7043] transition-colors"
        >
          Menu
        </Link>
        <Link
          to="/contact"
          className="text-[#2C3E50] no-underline font-bold text-[18px] hover:text-[#FF7043] transition-colors"
        >
          Contact
        </Link>
      </div>

      {/* 3. RIGHT: The Orange Pill Button */}
      <button className="bg-[#FF7043] text-white px-[30px] py-[10px] rounded-full font-bold flex items-center gap-[8px] cursor-pointer shadow-md hover:bg-[#e65d34] transition-all text-[18px]">
        <Calendar size={20} />
        <span>Reservation</span>
      </button>
    </nav>
  );
};

export default Navbar;
