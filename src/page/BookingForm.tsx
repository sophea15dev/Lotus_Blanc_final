import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Calendar,
  Clock,
  Sparkles,
  MessageSquare,
  ArrowRight,
  ChevronDown,
  AlertCircle,
  CheckCircle2,
  Phone,
  User,
  Loader2,
} from "lucide-react";

const BookingForm: React.FC = () => {
  const navigate = useNavigate();

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

  // Success state to show the summary card
  const [isSuccess, setIsSuccess] = useState(false);

  // 1. Function to handle initial booking request
  const handleBooking = async () => {
    if (!agreedToPolicy || !name.trim() || !phone.trim()) {
      setMessage("Please fill in all fields.");
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch("http://localhost:8000/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: name,
          phone: phone,
          adults: parseInt(adults),
          children: parseInt(children),
          date: startDate?.toLocaleDateString("en-GB"),
          time,
          occasion,
          instruction: note || "None",
          status: "pending", // Status starts as pending for the Admin to see
        }),
      });
      if (response.ok) setIsSuccess(true);
    } catch (error) {
      setMessage("Error connecting to server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 2. Function for User to Cancel (Updates Admin Dashboard to 'cancelled')
  const handleCancel = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/reservations/update-status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: name,
            phone: phone,
            status: "cancelled",
          }),
        },
      );

      if (response.ok) {
        setIsSuccess(false);
        alert(
          "Your booking has been cancelled. The Admin Dashboard has been updated.",
        );
      }
    } catch (error) {
      console.error("Failed to notify admin dashboard:", error);
    }
  };

  // Styling Constants
  const labelS = "text-[11px] text-[#94a3b8] font-bold uppercase mb-1.5 ml-1";
  const inputS =
    "w-full py-3 pr-3 pl-[42px] border border-[#ff7043] rounded-[10px] text-sm outline-none bg-white appearance-none focus:ring-1 focus:ring-[#ff7043]";
  const iconL = "absolute left-[14px] top-1/2 -translate-y-1/2 text-black z-10";
  const iconR =
    "absolute right-[14px] top-1/2 -translate-y-1/2 text-[#ff7043] pointer-events-none";

  return (
    <div className="flex bg-white rounded-[24px] w-full max-w-[1050px] min-h-[600px] overflow-hidden shadow-2xl mx-auto my-10">
      {/* LEFT IMAGE SECTION */}
      <div className="hidden md:block md:w-[40%] p-5">
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80"
          className="w-full h-full object-cover rounded-[18px]"
          alt="Restaurant Interior"
        />
      </div>

      <div className="w-full md:w-[60%] px-8 py-10 lg:px-[60px] flex flex-col justify-center">
        {isSuccess ? (
          /* --- SUMMARY VIEW --- */
          <div className="animate-in fade-in duration-500">
            <div className="flex flex-col items-center mb-4">
              <div className="bg-green-500 rounded-full p-1 mb-2">
                <CheckCircle2 size={32} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-[#1e3a5f]">
                Request Sent
              </h2>
              <p className="text-gray-500 text-sm">
                Waiting for Admin confirmation
              </p>
            </div>

            <div className="border border-gray-300 rounded-lg p-6 bg-white">
              <div className="border-b border-gray-300 pb-3 mb-4">
                <h3 className="text-[#ff7043] text-lg font-bold border-2 border-dashed border-[#ff7043] inline-block px-2 py-1">
                  {name}:
                </h3>
              </div>

              <div className="space-y-3 text-[#1e3a5f] font-bold text-md">
                <div className="grid grid-cols-2 border-b border-dashed border-blue-100 pb-1">
                  <span>Adults:</span>{" "}
                  <span className="font-medium text-gray-700">{adults}</span>
                </div>
                <div className="grid grid-cols-2 border-b border-dashed border-blue-100 pb-1">
                  <span>Children:</span>{" "}
                  <span className="font-medium text-gray-700">{children}</span>
                </div>
                <div className="grid grid-cols-2 border-b border-dashed border-blue-100 pb-1">
                  <span>Phone:</span>{" "}
                  <span className="font-medium text-gray-700">{phone}</span>
                </div>
                <div className="grid grid-cols-2 border-b border-dashed border-blue-100 pb-1">
                  <span>Date:</span>{" "}
                  <span className="font-medium text-gray-700">
                    {startDate?.toLocaleDateString("en-GB")}
                  </span>
                </div>
                <div className="grid grid-cols-2 border-b border-dashed border-blue-100 pb-1">
                  <span>Time:</span>{" "}
                  <span className="font-medium text-gray-700">{time}</span>
                </div>
                <div className="grid grid-cols-2">
                  <span>Note:</span>{" "}
                  <span className="font-normal italic text-gray-500 truncate">
                    {note || "None"}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              {/* Left Button: User goes home (Cannot confirm themselves) */}
              <button
                onClick={() => navigate("/")}
                className="flex-1 py-3 bg-[#0a4d68] text-white font-bold rounded-md hover:opacity-90 transition-all text-sm uppercase tracking-wider"
              >
                Return Home
              </button>
              {/* Right Button: User cancels booking */}
              <button
                onClick={handleCancel}
                className="flex-1 py-3 bg-[#ff7043] text-white font-bold rounded-md hover:opacity-90 transition-all text-sm uppercase tracking-wider"
              >
                Cancel Booking
              </button>
            </div>
          </div>
        ) : (
          /* --- FORM VIEW --- */
          <>
            <div className="text-center mb-6">
              <h2 className="text-[32px] font-extrabold text-black uppercase tracking-tight">
                Book Your Table
              </h2>
              <div className="h-[2px] bg-[#ff7043] w-12 mx-auto mt-1"></div>
            </div>

            {message && (
              <p className="text-rose-500 text-center text-xs font-bold mb-4">
                {message}
              </p>
            )}

            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className={labelS}>Full Name</label>
                  <div className="relative">
                    <User size={18} className={iconL} />
                    <input
                      type="text"
                      placeholder="Name"
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
                      placeholder="Phone"
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

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className={labelS}>Date</label>
                  <div className="relative">
                    <Calendar size={18} className={iconL} />
                    <DatePicker
                      selected={startDate}
                      onChange={(d: React.SetStateAction<Date | null>) =>
                        setStartDate(d)
                      }
                      dateFormat="dd/MM/yy"
                      className={inputS}
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className={labelS}>Time</label>
                  <div className="relative">
                    <Clock size={18} className={iconL} />
                    <select
                      className={inputS}
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                    >
                      <option>7:30 AM</option>
                      <option>8:00 PM</option>
                    </select>
                    <ChevronDown size={14} className={iconR} />
                  </div>
                </div>
              </div>

              <div className="relative">
                <Sparkles size={18} className={iconL} />
                <select
                  className={inputS}
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                >
                  <option>Occasion</option>
                  <option>Anniversary</option>
                  <option>Birthday</option>
                </select>
                <ChevronDown size={16} className={iconR} />
              </div>

              <div className="relative">
                <MessageSquare
                  size={18}
                  className="absolute left-[14px] top-[15px]"
                />
                <textarea
                  placeholder="Special instructions..."
                  className={`${inputS} h-[80px] pt-3 resize-none`}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>

              <div className="bg-[#fff5f2] border border-[#ffe0d6] rounded-xl p-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={agreedToPolicy}
                    onChange={() => setAgreedToPolicy(!agreedToPolicy)}
                  />
                  <div
                    className={`w-5 h-5 border-2 border-[#ff7043] rounded flex items-center justify-center ${agreedToPolicy ? "bg-[#ff7043]" : "bg-white"}`}
                  >
                    {agreedToPolicy && (
                      <CheckCircle2 size={14} className="text-white" />
                    )}
                  </div>
                  <span className="text-[12px] font-medium text-gray-700">
                    I understand and agree to the policy.
                  </span>
                </label>
              </div>

              <div className="flex justify-end mt-4">
                <button
                  onClick={handleBooking}
                  disabled={!agreedToPolicy || isSubmitting}
                  className={`py-3 px-10 rounded-full font-bold flex items-center gap-2 transition-all ${agreedToPolicy ? "bg-[#034A6C] text-white hover:opacity-90" : "bg-gray-100 text-gray-400"}`}
                >
                  {isSubmitting ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "Request Table"
                  )}
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BookingForm;
