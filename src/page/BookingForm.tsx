import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import {
  User,
  ChevronDown,
  CheckCircle2,
  ArrowRight,
  Loader2,
  Info,
  MessageSquare,
  Sparkles,
} from "lucide-react";

const COUNTRIES = [
  { code: "+855", label: "KH", flag: "🇰🇭" },
  { code: "+1", label: "US", flag: "🇺🇸" },
  { code: "+44", label: "UK", flag: "🇬🇧" },
  { code: "+86", label: "CN", flag: "🇨🇳" },
  { code: "+81", label: "JP", flag: "🇯🇵" },
  { code: "+49", label: "DE", flag: "🇩🇪" },
  { code: "+33", label: "FR", flag: "🇫🇷" },
  { code: "+61", label: "AU", flag: "🇦🇺" },
  { code: "+91", label: "IN", flag: "🇮🇳" },
  { code: "+82", label: "KR", flag: "🇰🇷" },
];

const BookingForm: React.FC = () => {
  const navigate = useNavigate();

  // Form States
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [adults, setAdults] = useState("1");
  const [children, setChildren] = useState("0");
  const [time, setTime] = useState("07:30 ");
  const [occasion, setOccasion] = useState<string>("");
  const [note, setNote] = useState("");
  const [agreedToPolicy, setAgreedToPolicy] = useState(false);

  // Logic States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
  const [isSuccess, setIsSuccess] = useState(false);

  const handleBooking = async () => {
    const newErrors: { [key: string]: boolean } = {};

    // Validation Logic
    if (!name.trim()) newErrors.name = true;
    if (!phone.trim() || phone.length < 6) newErrors.phone = true;
    if (!agreedToPolicy) newErrors.policy = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const payload = {
        customerName: name.trim(),
        phone: `${selectedCountry.code}${phone.replace(/\s/g, "")}`,
        adults: parseInt(adults, 10) || 1,
        children: parseInt(children, 10) || 0,
        bookingDate: startDate
          ? startDate.toISOString()
          : new Date().toISOString(),
        time: time, // ✅ now valid
        occasion: occasion || "Dining",
        notes: note.trim() || "",
      };

      const response = await fetch("http://localhost:8000/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        const errorData = await response.json();
        console.error("API Rejected Request:", errorData);
      }
    } catch (error) {
      console.error("Network error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const labelS =
    "text-[11px] text-[#1e3a5f] font-bold uppercase mb-1.5 flex items-center";
  const inputBase =
    "w-full py-3 border rounded-[12px] text-sm outline-none bg-white transition-all focus:border-blue-600 text-slate-700";

  return (
    <div className="flex bg-white rounded-[30px] w-full max-w-[1050px] min-h-[600px] overflow-hidden shadow-2xl mx-auto my-10 border border-blue-50">
      {/* LEFT SIDE: PICTURE SECTION */}
      <div className="hidden lg:block w-[45%] p-5">
        <div className="w-full h-full rounded-[25px] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop"
            alt="Restaurant Interior"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* RIGHT SIDE: YOUR ORIGINAL UI */}
      <div
        className={`flex flex-col justify-center bg-white w-full lg:w-[55%] px-8 py-10 lg:px-[60px]`}
      >
        {isSuccess ? (
          <div className="text-center py-10 animate-in fade-in zoom-in duration-500 max-w-md mx-auto">
            <div className="bg-blue-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-blue-100">
              <CheckCircle2 size={40} className="text-white" />
            </div>
            <h2 className="text-3xl font-black text-[#1e3a5f] uppercase italic tracking-tighter mb-6">
              Request Sent
            </h2>
            <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl mb-10 flex items-center gap-3 text-left">
              <Info size={20} className="text-blue-500 shrink-0" />
              <p className="text-[12px] text-blue-700 font-medium">
                Cancellations allowed only 48h before booking.
              </p>
            </div>
            <button
              onClick={() => navigate("/")}
              className="w-full py-4 bg-[#1e3a5f] text-white font-bold rounded-2xl uppercase text-[12px] hover:bg-[#152942] transition-all"
            >
              Back to Home
            </button>
          </div>
        ) : (
          <>
            <div className="mb-8 text-left">
              <h2 className="text-4xl font-black text-[#1e3a5f] uppercase tracking-tighter italic">
                Book Your Table
              </h2>
              <div className="h-1 w-12 bg-blue-500 mt-2 rounded-full"></div>
            </div>

            <div className="flex flex-col gap-5">
              <div className="flex flex-col">
                <label className={labelS}> Name *</label>
                <div className="relative">
                  <User
                    size={16}
                    className="absolute left-[14px] top-1/2 -translate-y-1/2 text-[#1e3a5f]"
                  />
                  <input
                    type="text"
                    placeholder="Your name"
                    className={`${inputBase} pl-10 ${errors.name ? "border-red-500 bg-red-50" : "border-slate-200"}`}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label className={labelS}>Phone Number *</label>
                <div className="flex gap-2">
                  <div className="relative w-[110px] shrink-0">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                      <span className="text-lg">{selectedCountry.flag}</span>
                      <span className="text-xs font-bold text-slate-700">
                        {selectedCountry.code}
                      </span>
                    </div>
                    <select
                      className="w-full py-3 opacity-0 cursor-pointer"
                      value={selectedCountry.code}
                      onChange={(e) => {
                        const c = COUNTRIES.find(
                          (x) => x.code === e.target.value,
                        );
                        if (c) setSelectedCountry(c);
                      }}
                    >
                      {COUNTRIES.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.code}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={12}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <div className="absolute inset-0 border border-slate-200 rounded-[12px] -z-10 bg-white"></div>
                  </div>
                  <input
                    type="tel"
                    placeholder="Your phone number"
                    className={`${inputBase} px-4 ${errors.phone ? "border-red-500 bg-red-50" : "border-slate-200"}`}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className={labelS}>Adults</label>
                  <input
                    type="number"
                    className={`${inputBase} px-4 border-slate-200`}
                    value={adults}
                    onChange={(e) => setAdults(e.target.value)}
                  />
                </div>
                <div className="flex flex-col">
                  <label className={labelS}>Children</label>
                  <input
                    type="number"
                    className={`${inputBase} px-4 border-slate-200`}
                    value={children}
                    onChange={(e) => setChildren(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className={labelS}>Date *</label>
                  <DatePicker
                    selected={startDate}
                    onChange={(d: React.SetStateAction<Date | null>) =>
                      setStartDate(d)
                    }
                    dateFormat="dd/MM/yyyy"
                    minDate={new Date()}
                    className={`${inputBase} px-4 border-slate-200 w-full`}
                  />
                </div>
                <div className="relative flex flex-col">
                  <label className={labelS}>Time *</label>
                  <select
                    className={`${inputBase} px-4 border-slate-200 appearance-none`}
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  >
                    <option>7:30 AM</option>
                    <option>12:00 PM</option>
                    <option>8:00 PM</option>
                    <option>9:30 PM</option>
                    <option>10:00 PM</option>
                  </select>
                  <ChevronDown
                    size={14}
                    className="absolute right-3 top-9 text-slate-400"
                  />
                </div>
              </div>
              {/* OCCASION - ORANGE BORDER UI */}
              <div className="flex flex-col">
                <label className={labelS}>Occasion</label>
                <div className="relative group">
                  <Sparkles
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    size={18}
                  />
                  <select
                    className="w-full pl-12 pr-10 py-3.5 bg-white border border-orange-500 rounded-xl text-sm outline-none appearance-none font-medium text-slate-700 cursor-pointer"
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                  >
                    <option value="" disabled>
                      Select an occasion
                    </option>
                    <option value="Birthday">Birthday Party</option>
                    <option value="Anniversary">Anniversary</option>
                    <option value="Business">Business Meeting</option>
                    <option value="Dining">Standard Dining</option>
                  </select>
                  <ChevronDown
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-orange-500 pointer-events-none"
                    size={18}
                  />
                </div>
              </div>

              {/* Note Input */}
              <div className="flex flex-col">
                <label className={labelS}>Note</label>
                <div className="relative">
                  <MessageSquare
                    size={16}
                    className="absolute left-[14px] top-3 text-[#1e3a5f]"
                  />
                  <textarea
                    placeholder="Add special instructions..."
                    rows={3}
                    className={`${inputBase} pl-10 pr-4 pt-2 resize-none border-slate-200`}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                </div>
              </div>

              <div
                className={`p-4 rounded-xl border transition-all ${errors.policy ? "bg-red-50 border-red-500" : "bg-white border-slate-100 shadow-sm"}`}
              >
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={agreedToPolicy}
                    onChange={() => setAgreedToPolicy(!agreedToPolicy)}
                  />
                  <div
                    className={`w-5 h-5 border-2 rounded-lg flex items-center justify-center transition-colors ${agreedToPolicy ? "bg-blue-600 border-blue-600" : errors.policy ? "bg-white border-red-500" : "bg-white border-slate-300"}`}
                  >
                    {agreedToPolicy && (
                      <CheckCircle2 size={14} className="text-white" />
                    )}
                  </div>
                  <span
                    className={`text-[11px] font-black uppercase tracking-wider ${errors.policy ? "text-red-600" : "text-[#1e3a5f]"}`}
                  >
                    Accept Booking
                  </span>
                </label>
              </div>

              <button
                onClick={handleBooking}
                disabled={isSubmitting}
                className="w-full py-4 bg-[#1e3a5f] text-white rounded-2xl font-black uppercase flex items-center justify-center gap-3 hover:bg-[#152942] transition-all"
              >
                {isSubmitting ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Confirm Reservation"
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BookingForm;
