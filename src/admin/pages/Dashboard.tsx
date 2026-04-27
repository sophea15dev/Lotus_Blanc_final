      import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";
import { Search, Bell, X, ChevronRight } from "lucide-react";

const Dashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [reservations, setReservations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGuest, setSelectedGuest] = useState<any>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isDrawerOpen ? "hidden" : "auto";
  }, [isDrawerOpen]);

  // FETCH
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
        status: item.status || "PENDING", // ✅ ADD STATUS
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

  // DELETE
  const deleteReservation = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8000/api/reservations/${id}`);
      fetchReservations();
      setIsDrawerOpen(false);
      setSelectedGuest(null);
    } catch (error) {
      console.error(error);
    }
  };

  // STATUS UPDATE
  const updateStatus = async (id: number, status: string) => {
    try {
      await axios.put(`http://localhost:8000/api/reservations/${id}`, {
        status,
      });

      fetchReservations();
      setIsDrawerOpen(false);
      setSelectedGuest(null);
    } catch (error) {
      console.error(error);
    }
  };

  const filtered = useMemo(() => {
    return reservations.filter((r) =>
      r.user_id?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, reservations]);

  // ✅ STATUS BADGE STYLE
  const statusBadge = (status: string) => {
    const base = "text-[10px] px-2 py-1 rounded-full font-semibold";

    if (status === "CONFIRMED")
      return `${base} bg-green-100 text-green-700`;

    if (status === "CANCELLED")
      return `${base} bg-red-100 text-red-600`;

    return `${base} bg-gray-100 text-gray-600`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f6f7fb] to-[#eef2f7] text-slate-900">

      {/* HEADER */}
      <header className="h-16 bg-white/70 backdrop-blur-xl border-b flex items-center justify-between px-6 sticky top-0 z-30">
        <h1 className="font-black text-lg text-[#034A6C]">
          Lotus Blanc
        </h1>

        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <Search size={14} className="absolute left-3 top-2.5 text-slate-400" />
            <input
              className="pl-9 pr-3 py-2 bg-slate-100 rounded-xl text-sm outline-none"
              placeholder="Search reservations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Bell size={18} className="text-slate-500" />
        </div>
      </header>

      {/* MAIN */}
      <main className="p-6 md:p-10 max-w-5xl mx-auto">

        <h2 className="text-3xl font-black mb-8">Reservations</h2>

        <div className="space-y-3">

          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-20 bg-white rounded-2xl animate-pulse" />
            ))
          ) : filtered.length === 0 ? (
            <p className="text-center text-slate-400 py-10">
              No reservations found
            </p>
          ) : (
            filtered.map((r) => (
              <div
                key={r.reservation_id}
                onClick={() => {
                  setSelectedGuest(r);
                  setIsDrawerOpen(true);
                }}
                className="bg-white rounded-2xl p-5 flex justify-between items-center cursor-pointer hover:shadow-md transition"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#034A6C] text-white flex items-center justify-center rounded-full font-bold">
                    {r.user_id?.charAt(0)}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">{r.user_id}</p>

                      {/* ✅ STATUS BADGE */}
                      <span className={statusBadge(r.status)}>
                        {r.status}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500">
                      {r.time} • {r.occasion}
                    </p>
                  </div>
                </div>

                <ChevronRight size={18} />
              </div>
            ))
          )}

        </div>
      </main>

      {/* OVERLAY */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}

      {/* DRAWER */}
      {isDrawerOpen && selectedGuest && (
  <div className="fixed right-0 top-0 h-full w-[400px] bg-white z-50 shadow-2xl flex flex-col">

    {/* HEADER (glass style) */}
    <div className="px-6 py-5 border-b bg-gradient-to-r from-[#034A6C]/5 to-transparent backdrop-blur-md flex items-center justify-between">
      <div>
        <h3 className="font-bold text-lg text-slate-800">
          Reservation
        </h3>
        <p className="text-xs text-slate-500">
          Booking details overview
        </p>
      </div>

      <button
        onClick={() => setIsDrawerOpen(false)}
        className="p-2 rounded-full hover:bg-slate-100 transition"
      >
        <X size={18} />
      </button>
    </div>

    {/* BODY */}
    <div className="p-6 space-y-5 flex-1 overflow-y-auto">

      {/* PROFILE CARD */}
      <div className="bg-gradient-to-br from-slate-50 to-white border rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-bold text-slate-800">
              {selectedGuest.user_id}
            </p>
            <p className="text-xs text-slate-500">
              Guest Customer
            </p>
          </div>

          {/* STATUS */}
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full
              ${
                selectedGuest.status === "CONFIRMED"
                  ? "bg-green-100 text-green-700"
                  : selectedGuest.status === "CANCELLED"
                  ? "bg-red-100 text-red-600"
                  : "bg-gray-100 text-gray-600"
              }`}
          >
            {selectedGuest.status || "PENDING"}
          </span>
        </div>

        <div className="mt-4 text-sm text-slate-600">
          📞 {selectedGuest.phone}
        </div>
      </div>

      {/* INFO GRID */}
      <div className="grid gap-3">

        <div className="flex items-center justify-between bg-white border rounded-xl p-4">
          <span className="text-slate-500 text-sm">Occasion</span>
          <span className="font-medium text-slate-800">
            {selectedGuest.occasion}
          </span>
        </div>

        <div className="bg-white border rounded-xl p-4">
          <p className="text-slate-500 text-sm mb-1">Notes</p>
          <p className="text-slate-700 text-sm">
            {selectedGuest.instruction || "No special instructions"}
          </p>
        </div>

      </div>

      {/* ACTION PANEL */}
      <div className="space-y-3 pt-2">

        <button
          onClick={() =>
            updateStatus(selectedGuest.reservation_id, "CONFIRMED")
          }
          className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:opacity-90 text-white py-2.5 rounded-xl font-semibold shadow-sm transition"
        >
          ✓ Confirm Reservation
        </button>

        <button
          onClick={() =>
            updateStatus(selectedGuest.reservation_id, "CANCELLED")
          }
          className="w-full bg-gradient-to-r from-red-500 to-red-400 hover:opacity-90 text-white py-2.5 rounded-xl font-semibold shadow-sm transition"
        >
          ✕ Cancel Reservation
        </button>

        <button
          onClick={() =>
            deleteReservation(selectedGuest.reservation_id)
          }
          className="w-full border border-red-500 text-red-500 hover:bg-red-50 py-2.5 rounded-xl font-semibold transition"
        >
          🗑 Delete Reservation
        </button>

      </div>

    </div>
  </div>
)}

    </div>
  );
};

export default Dashboard;