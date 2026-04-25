import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";
import { Search, Bell, X, ChevronRight, Users } from "lucide-react";

const Dashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [reservations, setReservations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGuest, setSelectedGuest] = useState<any>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const fetchReservations = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8000/api/reservations");
      const data = Array.isArray(res.data) ? res.data : [];

      const formatted = data.map((item: any) => ({
        reservation_id: item.id,
        user_id: item.customerName,
        phone: item.phone,
        adults: item.adults,
        children: item.children,
        time: new Date(item.bookingDate).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        occasion: item.occasion,
        instruction: item.notes,
      }));

      setReservations(formatted);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const filtered = useMemo(() => {
    return reservations.filter((r) =>
      r.user_id?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, reservations]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f6f7fb] to-[#eef2f7] text-slate-900">

      {/* HEADER */}
      <header className="h-16 bg-white/70 backdrop-blur-xl border-b flex items-center justify-between px-6 sticky top-0 z-30">
        <h1 className="font-black text-lg text-[#034A6C] tracking-tight">
          Lotus Blanc
        </h1>

        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <Search size={14} className="absolute left-3 top-2.5 text-slate-400" />
            <input
              className="pl-9 pr-3 py-2 bg-slate-100 rounded-xl text-sm outline-none focus:bg-white focus:ring-2 focus:ring-[#034A6C]/10 transition"
              placeholder="Search reservations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Bell size={18} className="text-slate-500 cursor-pointer hover:text-slate-700 transition" />
        </div>
      </header>

      {/* MAIN */}
      <main className="p-6 md:p-10 max-w-5xl mx-auto">

        {/* TITLE */}
        <div className="mb-8">
          <h2 className="text-3xl font-black tracking-tight">
            Reservations
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Manage and track all bookings in real time
          </p>
        </div>

        {/* LIST */}
        <div className="space-y-3">

          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-20 bg-white rounded-2xl animate-pulse border"
              />
            ))
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-slate-400">
              No reservations found
            </div>
          ) : (
            filtered.map((r) => (
              <div
                key={r.reservation_id}
                onClick={() => {
                  setSelectedGuest(r);
                  setIsDrawerOpen(true);
                }}
                className="group bg-white/80 backdrop-blur border border-slate-100 rounded-2xl p-5 flex items-center justify-between cursor-pointer transition-all hover:shadow-xl hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-4">

                  {/* AVATAR */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#034A6C] to-[#0672A4] text-white flex items-center justify-center font-bold shadow">
                    {r.user_id?.charAt(0)}
                  </div>

                  {/* INFO */}
                  <div>
                    <p className="font-semibold text-slate-800 group-hover:text-[#034A6C] transition">
                      {r.user_id}
                    </p>

                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                      <span>{r.time}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Users size={12} />
                        {r.adults + r.children}
                      </span>
                      <span>•</span>
                      <span className="px-2 py-0.5 bg-slate-100 rounded-full">
                        {r.occasion}
                      </span>
                    </div>
                  </div>
                </div>

                <ChevronRight size={18} className="text-slate-300 group-hover:text-slate-500 transition" />
              </div>
            ))
          )}

        </div>
      </main>

      {/* DRAWER */}
      {isDrawerOpen && selectedGuest && (
        <>
          {/* OVERLAY */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={() => setIsDrawerOpen(false)}
          />

          {/* DRAWER PANEL */}
          <div className="fixed right-0 top-0 h-full w-full sm:w-[380px] bg-white shadow-2xl rounded-l-3xl p-6 z-50 transform transition-all duration-300 ease-out">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-xl tracking-tight">
                Reservation Details
              </h3>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="p-2 rounded-lg hover:bg-slate-100 transition"
              >
                <X size={18} />
              </button>
            </div>

            {/* USER */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#034A6C] to-[#0672A4] text-white flex items-center justify-center text-lg font-bold shadow-md">
                {selectedGuest.user_id?.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-lg">{selectedGuest.user_id}</p>
                <p className="text-sm text-slate-500">{selectedGuest.time}</p>
              </div>
            </div>

            {/* INFO */}
            <div className="space-y-4">
              {[
                ["Phone", selectedGuest.phone],
                ["Occasion", selectedGuest.occasion],
                ["Notes", selectedGuest.instruction || "—"],
              ].map(([label, value]) => (
                <div key={label as string}>
                  <p className="text-xs text-slate-400 mb-1">{label}</p>
                  <div className="bg-slate-50 px-4 py-3 rounded-xl font-medium text-slate-800">
                    {value}
                  </div>
                </div>
              ))}
            </div>

            {/* ACTIONS */}
            <div className="mt-8 space-y-3">

              <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-xl font-semibold transition">
                Confirm Reservation
              </button>

              <button className="w-full bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-xl font-semibold transition">
                Cancel Reservation
              </button>

              <button className="w-full border border-red-500 text-red-500 hover:bg-red-50 py-2.5 rounded-xl font-semibold transition">
                Delete Reservation
              </button>

            </div>

          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;