import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";
import {
  Users,
  Calendar,
  Clock,
  Search,
  Bell,
  X,
  Trash2,
  Phone,
  Sparkles,
  MessageSquare,
  ChevronRight,
} from "lucide-react";

const Dashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [reservations, setReservations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGuest, setSelectedGuest] = useState<any>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const fetchReservations = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:8000/api/reservations",
      );
      const data = Array.isArray(response.data)
        ? response.data
        : response.data.data || [];
      setReservations(data);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const updateStatus = async (id: number, newStatus: string) => {
    try {
      await axios.patch(
        `http://localhost:8000/api/reservations/update-status`,
        {
          reservation_id: id,
          status: newStatus,
        },
      );
      fetchReservations();
      setIsDrawerOpen(false);
    } catch (err) {
      alert("Failed to update status");
    }
  };

  const filteredReservations = useMemo(() => {
    return reservations.filter((res) =>
      res.user_id?.toString().toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm, reservations]);

  return (
    <div className="flex h-screen bg-[#f0f2f5] font-sans text-slate-900 overflow-hidden">
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* HEADER */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-white flex items-center justify-between px-12 shrink-0 sticky top-0 z-10">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-black bg-gradient-to-r from-[#034A6C] to-[#0672A4] bg-clip-text text-transparent uppercase tracking-tighter">
              Lotus Blanc
            </h1>
            <div className="relative w-80">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Find a reservation..."
                className="w-full pl-10 pr-4 py-2 bg-slate-100/50 border border-transparent focus:border-[#034A6C]/20 rounded-full outline-none text-sm transition-all font-medium"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-2.5 bg-white shadow-sm rounded-full text-slate-500 cursor-pointer hover:bg-slate-50 transition-colors">
              <Bell size={18} />
            </div>
            <div className="w-10 h-10 bg-[#034A6C] rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-[#034A6C]/20 text-center uppercase">
              A
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-12 custom-scrollbar">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[#034A6C] font-black text-xs uppercase tracking-[0.2em] mb-2">
                  Management Console
                </p>
                <h2 className="text-4xl font-black text-slate-800 tracking-tight italic">
                  Daily Reservations
                </h2>
              </div>
            </div>

            {/* STATUS CARDS */}
            <div className="grid grid-cols-4 gap-6">
              <StatusMiniCard
                label="Total Bookings"
                value={reservations.length}
                color="bg-blue-500"
              />
              <StatusMiniCard
                label="Pending"
                value={
                  reservations.filter(
                    (r) => r.status === "pending" || !r.status,
                  ).length
                }
                color="bg-orange-400"
              />
              <StatusMiniCard
                label="Confirmed"
                value={
                  reservations.filter((r) => r.status === "confirmed").length
                }
                color="bg-emerald-400"
              />
              <StatusMiniCard
                label="Cancelled"
                value={
                  reservations.filter((r) => r.status === "cancelled").length
                }
                color="bg-rose-400"
              />
            </div>

            {/* LIST TABLE */}
            <div className="bg-white/70 backdrop-blur-md rounded-[2.5rem] border border-white shadow-xl shadow-slate-200/50 overflow-hidden">
              <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-white/50">
                <h3 className="font-black text-slate-700 flex items-center gap-2 uppercase text-xs tracking-widest">
                  <Clock size={16} className="text-[#034A6C]" /> Today's
                  Schedule
                </h3>
              </div>
              <div className="divide-y divide-slate-50">
                {loading ? (
                  <div className="p-20 text-center text-slate-400 font-bold italic">
                    Loading...
                  </div>
                ) : (
                  filteredReservations.map((res) => (
                    <div
                      key={res.reservation_id}
                      onClick={() => {
                        setSelectedGuest(res);
                        setIsDrawerOpen(true);
                      }}
                      className="group flex items-center justify-between p-6 hover:bg-[#034A6C]/[0.02] cursor-pointer transition-all"
                    >
                      <div className="flex items-center gap-6">
                        <div className="w-12 h-12 bg-white border border-slate-100 rounded-2xl flex items-center justify-center font-black text-[#034A6C] shadow-sm uppercase">
                          {res.user_id?.charAt(0)}
                        </div>
                        <div>
                          <p className="font-black text-slate-800 text-base">
                            {res.user_id}
                          </p>
                          <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                            {res.time} •{" "}
                            {parseInt(res.adults) +
                              (parseInt(res.children) || 0)}{" "}
                            Guests
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-12">
                        <div
                          className={`w-28 py-1.5 rounded-full text-[10px] font-black uppercase text-center border shadow-sm ${
                            res.status === "confirmed"
                              ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                              : res.status === "cancelled"
                                ? "bg-rose-50 text-rose-600 border-rose-100"
                                : "bg-slate-50 text-slate-500 border-slate-200"
                          }`}
                        >
                          {res.status || "Pending"}
                        </div>
                        <ChevronRight
                          size={18}
                          className="text-slate-300 group-hover:text-[#034A6C] transition-all"
                        />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* --- NEW REDESIGNED SIDE DRAWER --- */}
      {isDrawerOpen && selectedGuest && (
        <>
          <div
            className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 transition-opacity"
            onClick={() => setIsDrawerOpen(false)}
          />
          <div className="fixed right-4 top-4 bottom-4 w-[520px] bg-white z-50 rounded-[3rem] shadow-2xl p-8 flex flex-col animate-in slide-in-from-right duration-500 border border-white">
            {/* TOP ACTIONS */}
            <div className="flex justify-between items-center mb-8">
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="p-3 bg-slate-50 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={20} />
              </button>
              <div className="flex gap-2">
                <StatusActionBtn
                  label="Confirm"
                  color="bg-blue-600"
                  onClick={() =>
                    updateStatus(selectedGuest.reservation_id, "confirmed")
                  }
                />
                <StatusActionBtn
                  label="Arrived"
                  color="bg-emerald-500"
                  onClick={() =>
                    updateStatus(selectedGuest.reservation_id, "arrived")
                  }
                />
                <StatusActionBtn
                  label="Cancel"
                  color="bg-rose-500"
                  onClick={() =>
                    updateStatus(selectedGuest.reservation_id, "cancelled")
                  }
                />
              </div>
            </div>

            {/* HEADER INFO */}
            <div className="flex items-center gap-6 mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-slate-50 to-slate-100 rounded-[2.5rem] flex items-center justify-center text-4xl font-black text-[#034A6C] uppercase shadow-inner border border-white">
                {selectedGuest.user_id?.charAt(0)}
              </div>
              <div>
                <h2 className="text-4xl font-black text-slate-800 leading-none mb-3 tracking-tight italic">
                  {selectedGuest.user_id}
                </h2>
                <div className="flex gap-2">
                  <span className="px-4 py-1.5 bg-[#034A6C] text-white text-[10px] font-black rounded-xl uppercase tracking-widest">
                    Table: {selectedGuest.table_no || "TBD"}
                  </span>
                  <span className="px-4 py-1.5 bg-slate-100 text-slate-400 text-[10px] font-black rounded-xl uppercase tracking-widest border border-slate-200">
                    ID: #{selectedGuest.reservation_id}
                  </span>
                </div>
              </div>
            </div>

            {/* SCROLLABLE CONTENT */}
            <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
              {/* PARTY SECTION */}
              <div className="grid grid-cols-2 gap-4">
                <SquareCard
                  label="Adults"
                  value={selectedGuest.adults}
                  icon={<Users size={20} />}
                />
                <SquareCard
                  label="Children"
                  value={selectedGuest.children || "0"}
                  icon={<Users size={20} />}
                />
              </div>

              {/* DATE & TIME SECTION */}
              <div className="grid grid-cols-2 gap-4">
                <InfoBox
                  label="Reservation Date"
                  value={selectedGuest.date}
                  icon={<Calendar size={18} className="text-blue-500" />}
                />
                <InfoBox
                  label="Reservation Time"
                  value={selectedGuest.time}
                  icon={<Clock size={18} className="text-orange-500" />}
                />
              </div>

              {/* CONTACT & OCCASION */}
              <InfoBox
                label="Contact Information"
                value={
                  selectedGuest.phone ||
                  selectedGuest.phone_number ||
                  "Not Provided"
                }
                icon={<Phone size={18} className="text-emerald-500" />}
                fullWidth
              />

              <InfoBox
                label="Special Occasion"
                value={selectedGuest.occasion || "Standard Dining"}
                icon={<Sparkles size={18} className="text-purple-500" />}
                fullWidth
              />

              {/* GUEST NOTE */}
              <div className="p-8 bg-[#034A6C]/[0.03] rounded-[2.5rem] border border-[#034A6C]/5">
                <p className="text-[10px] font-black text-[#034A6C] uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                  <MessageSquare size={16} /> Guest Note
                </p>
                <p className="text-base font-semibold text-slate-600 italic leading-relaxed">
                  "
                  {selectedGuest.instruction ||
                    selectedGuest.note ||
                    "No special instructions provided."}
                  "
                </p>
              </div>
            </div>

            <button className="mt-6 py-5 w-full text-rose-500 font-black text-[11px] uppercase tracking-[0.2em] border-2 border-rose-50 rounded-3xl hover:bg-rose-500 hover:text-white hover:border-rose-500 transition-all flex items-center justify-center gap-2">
              <Trash2 size={18} /> Delete Reservation
            </button>
          </div>
        </>
      )}
    </div>
  );
};

// NEW UI COMPONENTS
const SquareCard = ({ label, value, icon }: any) => (
  <div className="p-6 bg-slate-50/50 rounded-[2.5rem] border border-slate-100 relative overflow-hidden group">
    <div className="absolute top-4 right-4 text-slate-200 group-hover:text-slate-300 transition-colors">
      {icon}
    </div>
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
      {label}
    </p>
    <p className="text-4xl font-black text-slate-800">{value}</p>
  </div>
);

const InfoBox = ({ label, value, icon, fullWidth }: any) => (
  <div
    className={`p-6 bg-white rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-5 ${fullWidth ? "w-full" : ""}`}
  >
    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center shrink-0">
      {icon}
    </div>
    <div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">
        {label}
      </p>
      <p className="text-base font-bold text-slate-800">{value || "N/A"}</p>
    </div>
  </div>
);

const StatusMiniCard = ({ label, value, color }: any) => (
  <div className="bg-white p-6 rounded-3xl border border-white shadow-sm flex items-center gap-5">
    <div className={`w-1.5 h-10 rounded-full ${color}`} />
    <div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
        {label}
      </p>
      <p className="text-2xl font-black text-slate-800">{value}</p>
    </div>
  </div>
);

const StatusActionBtn = ({ label, color, onClick }: any) => (
  <button
    onClick={onClick}
    className={`px-6 py-2.5 ${color} text-white text-[10px] font-black rounded-xl uppercase tracking-widest shadow-lg shadow-black/5 hover:opacity-90 active:scale-95 transition-all`}
  >
    {label}
  </button>
);

export default Dashboard;
