import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';
import { 
  Users, Calendar, Clock, Sparkles, MessageSquare, 
  ArrowRight, ChevronDown, AlertCircle, CheckCircle2, Phone, User 
} from 'lucide-react';

const BookingForm: React.FC = () => {
  const navigate = useNavigate();

  const fullyBookedDates = [
    new Date(2026, 2, 28),
    new Date(2026, 3, 1),
  ];

  // Form States
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [adults, setAdults] = useState("1");
  const [children, setChildren] = useState("0");
  const [time, setTime] = useState("7:30 AM");
  const [occasion, setOccasion] = useState("Occasion");
  const [note, setNote] = useState("");
  const [agreedToPolicy, setAgreedToPolicy] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleBooking = async () => {
    if (!agreedToPolicy) {
      setMessage('Please agree to the cancellation policy before booking.');
      return;
    }

    if (!name.trim() || !phone.trim() || !adults.trim() || !children.trim() || !time.trim() || !occasion.trim() || !startDate) {
      setMessage('Please complete all required fields before booking.');
      return;
    }

    const bookingData = {
      bookingId: "BK-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
      name,
      phone,
      adults,
      children,
      date: startDate ? startDate.toLocaleDateString('en-GB') : "",
      time,
      occasion,
      note
    };

    setIsSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || `HTTP ${response.status}`);
      }

      setMessage('Reservation created successfully!');

      // Short delay so the user sees the success state before redirecting
      setTimeout(() => {
        navigate('/reservation', { state: { ...bookingData, ...result } });
      }, 1500);

    } catch (error) {
      console.error('Reservation failed:', error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      setMessage(`Reservation failed: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const labelS = "text-[11px] text-[#94a3b8] font-bold uppercase mb-1.5 ml-1";
  const inputS = "w-full py-3 pr-3 pl-[42px] border border-[#ff7043] rounded-[10px] text-sm outline-none bg-white appearance-none focus:ring-1 focus:ring-[#ff7043]";
  const iconL = "absolute left-[14px] top-1/2 -translate-y-1/2 text-black z-10";
  const iconR = "absolute right-[14px] top-1/2 -translate-y-1/2 text-[#ff7043] pointer-events-none";

  return (
    <div className="flex bg-white rounded-[24px] w-full max-w-[1050px] min-h-[600px] overflow-hidden shadow-2xl mx-auto my-10">
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
        <div className="text-center mb-6">
          <h2 className="text-[32px] font-extrabold text-black">BOOK YOUR TABLE</h2>
          <div className="h-[2px] bg-[#ff7043] w-20 mx-auto mt-1"></div>
        </div>

        <div className="flex flex-col gap-4">
          {/* NAME & PHONE */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className={labelS}>Full Name</label>
              <div className="relative">
                <User size={18} className={iconL} />
                <input 
                  type="text" 
                  placeholder="John Doe" 
                  required
                  className={inputS} 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label className={labelS}>Phone Number</label>
              <div className="relative">
                <Phone size={18} className={iconL} />
                <input 
                  type="tel" 
                  placeholder="+1 (555) 123-4567" 
                  required
                  className={inputS} 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)} 
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className={labelS}>Adults</label>
              <div className="relative">
                <Users size={18} className={iconL} />
                <input type="number" min="1" className={inputS} value={adults} onChange={(e) => setAdults(e.target.value)} />
              </div>
            </div>
            <div className="flex flex-col">
              <label className={labelS}>Children</label>
              <div className="relative">
                <Users size={18} className={iconL} />
                <input type="number" min="0" className={inputS} value={children} onChange={(e) => setChildren(e.target.value)} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className={labelS}>Date</label>
              <div className="relative">
                <Calendar size={18} className={iconL} />
                <DatePicker
                  selected={startDate}
                  onChange={(date: Date | null) => setStartDate(date)}
                  dateFormat="dd/MM/yy"
                  minDate={new Date()}
                  excludeDates={fullyBookedDates}
                  wrapperClassName="w-full"
                  customInput={<input className={inputS} />}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label className={labelS}>Time</label>
              <div className="relative">
                <Clock size={18} className={iconL} />
                <select className={inputS} value={time} onChange={(e) => setTime(e.target.value)}>
                  <option>7:30 AM</option>
                  <option>8:00 AM</option>
                  <option>9:00 AM</option>
                  <option>12:00 PM</option>
                </select>
                <ChevronDown size={14} className={iconR} />
              </div>
            </div>
          </div>

          <div className="relative">
            <Sparkles size={18} className={iconL} />
            <select className={inputS} value={occasion} onChange={(e) => setOccasion(e.target.value)}>
              <option value="Occasion">Occasion</option>
              <option value="Birthday">Birthday</option>
              <option value="Anniversary">Anniversary</option>
            </select>
            <ChevronDown size={16} className={iconR} />
          </div>

          <div className="relative">
            <MessageSquare size={18} className="absolute left-[14px] top-[15px] text-black z-10" />
            <textarea 
              placeholder="Special instructions..." 
              className={`${inputS} h-[80px] resize-none pt-3`} 
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mt-2">
            <div className="flex items-start gap-3">
              <AlertCircle size={20} className="text-[#ff7043] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-[13px] font-bold text-orange-900 uppercase">Cancellation Policy</h4>
                <p className="text-[12px] text-orange-800 leading-relaxed">
                  Cancellations must be made at least **2 days** before your scheduled time. 
                </p>
              </div>
            </div>
            
            <label className="flex items-center gap-3 mt-3 cursor-pointer group">
              <input 
                type="checkbox" 
                className="hidden" 
                checked={agreedToPolicy}
                onChange={() => setAgreedToPolicy(!agreedToPolicy)}
              />
              <div className={`w-5 h-5 border-2 border-[#ff7043] rounded-md flex items-center justify-center transition-colors ${agreedToPolicy ? 'bg-[#ff7043]' : 'bg-white'}`}>
                {agreedToPolicy && <CheckCircle2 size={14} className="text-white" />}
              </div>
              <span className="text-[12px] font-medium text-gray-700 group-hover:text-black">
                I understand and agree to the policy.
              </span>
            </label>
          </div>

          {message && (
            <p className={`mt-3 text-sm font-bold ${message.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
              {message}
            </p>
          )}

          <div className="flex justify-end">
            <button 
              onClick={handleBooking}
              disabled={!name.trim() || !phone.trim() || !adults.trim() || !children.trim() || !time.trim() || !occasion.trim() || !startDate || !agreedToPolicy || isSubmitting}
              className={`py-3.5 px-10 rounded-full font-bold text-sm flex items-center gap-2 shadow-md transition-all
                ${name.trim() && phone.trim() && adults.trim() && children.trim() && time.trim() && occasion.trim() && startDate && agreedToPolicy && !isSubmitting
                  ? "bg-[#ff7043] text-white hover:brightness-110 active:scale-95" 
                  : "bg-gray-300 text-gray-500 cursor-not-allowed opacity-70"
                }`}
            >
              {isSubmitting ? 'Booking...' : 'Confirm Booking'} <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;