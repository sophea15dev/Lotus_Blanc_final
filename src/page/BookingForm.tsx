import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Users, Calendar, Clock, Sparkles, MessageSquare, ArrowRight, ChevronDown } from 'lucide-react';

const BookingForm: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  const labelS = "text-[11px] text-[#94a3b8] font-bold uppercase mb-1.5 ml-1";
  const inputS = "w-full py-3 pr-3 pl-[42px] border border-[#ff7043] rounded-[10px] text-sm outline-none bg-white appearance-none focus:ring-1 focus:ring-[#ff7043]";
  const iconL = "absolute left-[14px] top-1/2 -translate-y-1/2 text-black z-10";
  const iconR = "absolute right-[14px] top-1/2 -translate-y-1/2 text-[#ff7043] pointer-events-none";

  return (
    <div className="flex bg-white rounded-[24px] w-full max-w-[1050px] min-h-[600px] overflow-hidden shadow-2xl">
      {/* LEFT IMAGE */}
      <div className="hidden md:block md:w-[40%] p-5">
        <img 
          src="https://scontent.fpnh10-1.fna.fbcdn.net/v/t39.30808-6/509364838_9747394752036611_557461447383141450_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=7b2446&_nc_ohc=fBoL8IOeUrcQ7kNvwHTJehZ&_nc_oc=AdpJyGFNOZAmECbQYdNxnp9JT5CFYpiy-72q0MWBngSWFAfUjAxdaWaMH9CN7qbB7Dw&_nc_zt=23&_nc_ht=scontent.fpnh10-1.fna&_nc_gid=1phcOdGjc481-MmfXG5lqg&_nc_ss=7a30f&oh=00_AfyRAYG8Vm8FktejdcRzo4om6AhJ4IkLlJ58m9CY97z0bw&oe=69C980F3" 
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
          {/* ROW 1: ADULTS & CHILDREN */}
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className={labelS}>Adults</label>
              <div className="relative">
                <Users size={18} className={iconL} />
                 <input 
                 type="number" 
                 className={inputS} 
                 placeholder="0"
                 min="0"
                 defaultValue="0"
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
                 placeholder="0"
                 min="0"
                 defaultValue="0"
                />

             </div>
          </div>
          </div>

          {/* ROW 2: DATE & TIME */}
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
                <select className={inputS} defaultValue="7:30 AM">
                  <option>7:30 AM</option>
                  <option>8:00 AM</option>
                  <option>8:30 AM</option>
                  <option>9:00 AM</option>
                  <option>9:30 AM</option>
                  <option>10:00 AM</option>
                  <option>10:30 AM</option>
                  <option>11:00 AM</option>
                  <option>11:30 AM</option>
                  <option>12:00 PM</option>
                  <option>12:30 PM</option>
                  <option>1:00 PM</option>
                  <option>1:30 PM</option>
                  <option>2:00 PM</option>
                </select>
                <ChevronDown size={14} className={iconR} />
              </div>
            </div>
          </div>

          {/* OCCASION & INSTRUCTION */}
          <div className="relative">
            <Sparkles size={18} className={iconL} />
            <select className={inputS}>
              <option>Occasion</option>
              <option>Birthday</option>
              <option>Anniversary</option>
              <option>Business Meeting</option>
              <option>Family Gathering</option>
              <option>Other</option>
            </select>
            <ChevronDown size={16} className={iconR} />
          </div>

          <div className="relative">
            <MessageSquare size={18} className="absolute left-[14px] top-[15px] text-black z-10" />
            <textarea placeholder="Instruction" className={`${inputS} h-[100px] resize-none pt-3`} />
          </div>

          <p className="text-[16px] text-[#94a3b8] text-center italic">Bookings can be canceled up to 2 days in advance.</p>

          <div className="flex justify-end mt-2">
            <button className="bg-[#ff7043] text-white py-3.5 px-10 rounded-full font-bold text-sm flex items-center gap-2 shadow-md hover:brightness-110 active:scale-95 transition-all">
              Fill your Information <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;