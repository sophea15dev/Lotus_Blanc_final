import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate
import { Users, Calendar, Clock, Sparkles, MessageSquare, ArrowRight, ChevronDown } from 'lucide-react';

const BookingForm: React.FC = () => {
  const navigate = useNavigate(); // 2. Initialize navigate

  // Form States
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [adults, setAdults] = useState("0");
  const [children, setChildren] = useState("0");
  const [time, setTime] = useState("7:30 AM");
  const [occasion, setOccasion] = useState("Occasion");
  const [note, setNote] = useState("");

  const handleBooking = () => {
    // 3. Create the data object to send
    const bookingData = {
      bookingId: "BK-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
      adults,
      children,
      date: startDate ? startDate.toLocaleDateString('en-GB') : "",
      time,
      occasion,
      note
    };

    // 4. Navigate to the confirmation route and pass the data
    navigate('/reservation', { state: bookingData });
  };

  const labelS = "text-[11px] text-[#94a3b8] font-bold uppercase mb-1.5 ml-1";
  const inputS = "w-full py-3 pr-3 pl-[42px] border border-[#ff7043] rounded-[10px] text-sm outline-none bg-white appearance-none focus:ring-1 focus:ring-[#ff7043]";
  const iconL = "absolute left-[14px] top-1/2 -translate-y-1/2 text-black z-10";
  const iconR = "absolute right-[14px] top-1/2 -translate-y-1/2 text-[#ff7043] pointer-events-none";

  return (
    <div className="flex bg-white rounded-[24px] w-full max-w-[1050px] min-h-[600px] overflow-hidden shadow-2xl">
      {/* LEFT IMAGE */}
      <div className="hidden md:block md:w-[40%] p-5">
        <img 
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80" 
          className="w-full h-full object-cover rounded-[18px]" 
          alt="Restaurant"
        />
      </div>

      {/* RIGHT FORM */}
      <div className="w-full md:w-[60%] px-8 py-10 lg:px-[60px] flex flex-col justify-center">
        <div className="text-center mb-8">
          <h2 className="text-[32px] font-extrabold text-[#1e3a8a]">BOOK YOUR TABLE</h2>
          <div className="h-[1px] bg-[#1e3a8a] w-full mt-1"></div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className={labelS}>Adults</label>
              <div className="relative">
                <Users size={18} className={iconL} />
                <input 
                  type="number" 
                  className={inputS} 
                  value={adults}
                  onChange={(e) => setAdults(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label className={labelS}>Children</label>
              <div className="relative">
                <Users size={18} className={iconL} />
                <input 
                  type="number" 
                  className={inputS} 
                  value={children}
                  onChange={(e) => setChildren(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className={labelS}>Choose a Date</label>
              <div className="relative">
                <Calendar size={18} className={iconL} />
                <DatePicker
                  selected={startDate}
                  onChange={(date: Date | null) => setStartDate(date)}
                  dateFormat="dd/MM/yy"
                  wrapperClassName="w-full"
                  customInput={<input className={inputS} />}
                />
                <ChevronDown size={14} className={iconR} />
              </div>
            </div>
            <div className="flex flex-col">
              <label className={labelS}>Choose Time</label>
              <div className="relative">
                <Clock size={18} className={iconL} />
                <select className={inputS} value={time} onChange={(e) => setTime(e.target.value)}>
                  <option>7:30 AM</option>
                  <option>8:00 AM</option>
                  <option>8:30 AM</option>
                  <option>9:00 Am</option>
                  <option>9:30 AM</option>
                  <option>10:00 AM</option>
                  <option>10:30 AM</option>
                  <option>11:00 AM</option> 
                  <option>11:30 AM</option>
                  <option>12:00 PM</option>
                  <option>12:30 PM</option>
                  <option>1:00 PM</option>
                  <option>1:30 PM</option>
                </select>
                <ChevronDown size={14} className={iconR} />
              </div>
            </div>
          </div>

          <div className="relative">
            <Sparkles size={18} className={iconL} />
            <select className={inputS} value={occasion} onChange={(e) => setOccasion(e.target.value)}>
              <option>Occasion</option>
              <option>Birthday</option>
              <option>Anniversary</option>
            </select>
            <ChevronDown size={16} className={iconR} />
          </div>

          <div className="relative">
            <MessageSquare size={18} className="absolute left-[14px] top-[15px] text-black z-10" />
            <textarea 
              placeholder="Instruction" 
              className={`${inputS} h-[100px] resize-none pt-3`} 
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          <div className="flex justify-end mt-2">
            <button 
              onClick={handleBooking}
              className="bg-[#ff7043] text-white py-3.5 px-10 rounded-full font-bold text-sm flex items-center gap-2 shadow-md hover:brightness-110 active:scale-95 transition-all"
            >
              Fill your Information <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;