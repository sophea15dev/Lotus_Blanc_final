import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const BookingConfirmation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Retrieve the data passed from the form
  const data = location.state || {
    bookingId: "N/A",
    adults: "0",
    children: "0",
    date: "N/A",
    time: "N/A",
    occasion: "N/A",
    note: ""
  };

  return (
    <div className="flex flex-col md:flex-row bg-white rounded-[32px] overflow-hidden shadow-2xl max-w-4xl mx-auto my-10 border border-gray-100">
      <div className="md:w-5/12 p-4">
        <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80" className="w-full h-full min-h-[300px] object-cover rounded-[24px]" alt="Lotus Blanc" />
      </div>
      <div className="md:w-7/12 p-10 flex flex-col items-center">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="text-white w-10 h-10" />
        </div>
        <h1 className="text-3xl font-bold text-slate-800">Booking Confirmed</h1>
        <p className="text-slate-500 mb-8">Your table has been reserved</p>

        <div className="w-full border border-gray-200 rounded-2xl overflow-hidden mb-8">
          <div className="p-4 border-b border-gray-200 text-left">
            <span className="text-[#ff7043] font-bold text-lg">{data.bookingId}:</span>
          </div>
          <div className="p-6 space-y-4 text-left">
            <Row label="Adults" value={data.adults} />
            <Row label="Children" value={data.children} />
            <Row label="Date" value={data.date} />
            <Row label="Time" value={data.time} />
            <Row label="Occasion" value={data.occasion} />
            <Row label="Note" value={data.note} />
          </div>
        </div>

        <div className="flex gap-4 w-full">
          <button onClick={() => navigate('/book')} className="flex-1 bg-[#ff7043] text-white py-3.5 rounded-xl font-bold">Cancel Booking</button>
          <button className="flex-1 bg-[#084c61] text-white py-3.5 rounded-xl font-bold">Change Booking</button>
        </div>
      </div>
    </div>
  );
};

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="grid grid-cols-[100px_1fr] gap-4">
    <span className="font-bold text-[#1e3a8a]">{label}:</span>
    <span className="text-slate-600">{value || "None"}</span>
  </div>
);

export default BookingConfirmation;