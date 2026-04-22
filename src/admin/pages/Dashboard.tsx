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
  Menu,
} from "lucide-react";
import reservation from "../../page/reservation";
import { Reservation } from "../types";

const Dashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [reservations, setReservations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGuest, setSelectedGuest] = useState<any>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this reservation?",
    );
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8000/api/reservations/${id}`);
        alert("Reservation deleted successfully");
        fetchReservations();
        setIsDrawerOpen(false);
      } catch (err) {
        alert("Failed to delete reservation.");
      }
    }
  };

  const filteredReservations = useMemo(() => {
    return reservations.filter((res) =>
      res.user_id?.toString().toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm, reservations]);

  return (
    <div className="flex h-screen bg-[#f0f2f5] font-sans text-slate-900 overflow-hidden relative">
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* RESPONSIVE HEADER */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-white flex items-center justify-between px-4 md:px-12 shrink-0 sticky top-0 z-30">
          <div className="flex items-center gap-4 md:gap-8 flex-1">
            <button
              className="lg:hidden p-2 text-slate-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu size={24} />
            </button>
            <h1 className="text-lg md:text-2xl font-black bg-gradient-to-r from-[#034A6C] to-[#0672A4] bg-clip-text text-transparent uppercase tracking-tighter shrink-0">
              Lotus Blanc
            </h1>
            <div className="relative w-full max-w-xs hidden sm:block">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={14}
              />
              <input
                type="text"
                placeholder="Find..."
                className="w-full pl-10 pr-4 py-2 bg-slate-100/50 border border-transparent focus:border-[#034A6C]/20 rounded-full outline-none text-sm font-medium"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <div className="p-2 md:p-2.5 bg-white shadow-sm rounded-full text-slate-500 cursor-pointer">
              <Bell size={18} />
            </div>
            {/* <div className="w-8 h-8 md:w-10 md:h-10 bg-[#034A6C] rounded-full flex items-center justify-center text-white font-bold text-xs md:text-sm shadow-lg">
              A
            </div> */}
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-12 custom-scrollbar">
          <div className="max-w-6xl mx-auto space-y-8 md:space-y-12">
            <div className="flex flex-col gap-2">
              <p className="text-[#034A6C] font-black text-[10px] md:text-xs uppercase tracking-[0.2em]">
                Management Console
              </p>
              <h2 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight italic">
                Daily Reservations
              </h2>
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
            <div className="bg-white/70 backdrop-blur-md rounded-[1.5rem] md:rounded-[2.5rem] border border-white shadow-xl overflow-hidden mb-10">
              <div className="p-6 md:p-8 border-b border-slate-100 flex justify-between items-center bg-white/50">
                <h3 className="font-black text-slate-700 flex items-center gap-2 uppercase text-[10px] md:text-xs tracking-widest">
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
                      className="group flex items-center justify-between p-4 md:p-6 hover:bg-[#034A6C]/[0.02] cursor-pointer transition-all"
                    >
                      <div className="flex items-center gap-3 md:gap-6">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-white border border-slate-100 rounded-xl md:rounded-2xl flex items-center justify-center font-black text-[#034A6C] uppercase shrink-0">
                          {res.user_id?.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <p className="font-black text-slate-800 text-sm md:text-base truncate">
                            {res.user_id}
                          </p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                            {res.time} •{" "}
                            {parseInt(res.adults) +
                              (parseInt(res.children) || 0)}{" "}
                            Guests
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 md:gap-12 shrink-0">
                        <div
                          className={`hidden sm:block w-24 md:w-28 py-1.5 rounded-full text-[9px] md:text-[10px] font-black uppercase text-center border shadow-sm ${
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
                          className="text-slate-300 group-hover:text-[#034A6C]"
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

      {/* --- RESPONSIVE SIDE DRAWER --- */}
      {isDrawerOpen && selectedGuest && (
        <>
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[40]"
            onClick={() => setIsDrawerOpen(false)}
          />
          <div className="fixed inset-x-0 bottom-0 top-10 md:inset-y-4 md:right-4 md:left-auto md:w-[520px] bg-white z-[50] rounded-t-[2rem] md:rounded-[3rem] shadow-2xl p-6 md:p-8 flex flex-col animate-in slide-in-from-bottom md:slide-in-from-right duration-500 border border-white overflow-hidden">
            <div className="flex justify-between items-start mb-6 md:mb-8">
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="p-3 bg-slate-50 rounded-full text-slate-400"
              >
                <X size={20} />
              </button>
              <div className="flex flex-wrap justify-end gap-2 max-w-[280px]">
                <StatusActionBtn
                  label="Confirm"
                  color="bg-blue-600"
                  onClick={() =>
                    updateStatus(selectedGuest.reservation_id, "confirmed")
                  }
                />
                {/* <StatusActionBtn
                  // label="Arrived"
                  // color="bg-emerald-500"
                  // onClick={() =>
                  //   updateStatus(selectedGuest.reservation_id, "arrived")
                  // }
                /> */}
                <StatusActionBtn
                  label="Cancel"
                  color="bg-rose-500"
                  onClick={() =>
                    updateStatus(selectedGuest.reservation_id, "cancelled")
                  }
                />
              </div>
            </div>

            <div className="flex items-center gap-4 md:gap-6 mb-6 md:mb-8 shrink-0">
              <div className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl md:rounded-[2.5rem] flex items-center justify-center text-2xl md:text-4xl font-black text-[#034A6C] uppercase border border-white shadow-inner">
                {selectedGuest.user_id?.charAt(0)}
              </div>
              <div className="min-w-0">
                <h2 className="text-2xl md:text-4xl font-black text-slate-800 leading-none mb-2 tracking-tight italic truncate">
                  {selectedGuest.user_id}
                </h2>
                <div className="flex gap-2">
                  <span className="px-3 py-1 md:px-4 md:py-1.5 bg-[#034A6C] text-white text-[9px] md:text-[10px] font-black rounded-lg md:rounded-xl uppercase">
                    Table: {selectedGuest.table_no || "TBD"}
                  </span>
                  <span className="px-3 py-1 md:px-4 md:py-1.5 bg-slate-100 text-slate-400 text-[9px] md:text-[10px] font-black rounded-lg md:rounded-xl uppercase border border-slate-200">
                    ID: #{selectedGuest.reservation_id}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto pr-1 space-y-4 custom-scrollbar pb-6">
              <div className="grid grid-cols-2 gap-3 md:gap-4">
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                <InfoBox
                  label="Date"
                  value={selectedGuest.date}
                  icon={<Calendar size={18} className="text-blue-500" />}
                />
                <InfoBox
                  label="Time"
                  value={selectedGuest.time}
                  icon={<Clock size={18} className="text-orange-500" />}
                />
              </div>
              <InfoBox
                label="Contact"
                value={selectedGuest.phone || "N/A"}
                icon={<Phone size={18} className="text-emerald-500" />}
                fullWidth
              />

              {reservations.map((res: Reservation) => (
                <div
                  key={res.reservation_id}
                  className="flex items-center gap-4 p-4 bg-white rounded-[25px] shadow-sm mb-3"
                >
                  {/* Icon Container matching your screenshot */}
                  <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center">
                    <Sparkles size={18} className="text-purple-500" />
                  </div>

                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      Occasion
                    </p>
                    {/* Accessing the now-defined property */}
                    <p className="text-sm font-black text-[#1e3a5f]">
                      {res.occasion || ""}
                    </p>
                  </div>
                </div>
              ))}
              <div className="p-5 md:p-8 bg-[#034A6C]/[0.03] rounded-2xl md:rounded-[2.5rem] border border-[#034A6C]/5">
                <p className="text-[10px] font-black text-[#034A6C] uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                  <MessageSquare size={16} /> Guest Note
                </p>
                <p className="text-sm md:text-base font-semibold text-slate-600 italic leading-relaxed">
                  "
                  {selectedGuest.instruction ||
                    "No special instructions provided."}
                  "
                </p>
              </div>
            </div>

            <div className="pt-4 bg-white border-t border-slate-50">
              <button
                onClick={() => handleDelete(selectedGuest.reservation_id)}
                className="py-4 md:py-5 w-full text-rose-500 font-black text-[10px] md:text-[11px] uppercase tracking-[0.2em] border-2 border-rose-50 rounded-2xl md:rounded-3xl hover:bg-rose-500 hover:text-white hover:border-rose-500 transition-all flex items-center justify-center gap-2"
              >
                <Trash2 size={18} /> DELETE RESERVATION
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// HELPER COMPONENTS WITH RESPONSIVE TWEAKS
const SquareCard = ({ label, value, icon }: any) => (
  <div className="p-4 md:p-6 bg-slate-50/50 rounded-2xl md:rounded-[2.5rem] border border-slate-100 relative group shrink-0">
    <div className="absolute top-3 right-3 md:top-4 md:right-4 text-slate-200">
      {icon}
    </div>
    <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 truncate">
      {label}
    </p>
    <p className="text-2xl md:text-4xl font-black text-slate-800">{value}</p>
  </div>
);

const InfoBox = ({ label, value, icon, fullWidth }: any) => (
  <div
    className={`p-4 md:p-6 bg-white rounded-xl md:rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-4 md:gap-5 ${fullWidth ? "w-full" : ""}`}
  >
    <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-50 rounded-xl flex items-center justify-center shrink-0">
      {icon}
    </div>
    <div className="min-w-0">
      <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5 truncate">
        {label}
      </p>
      <p className="text-sm md:text-base font-bold text-slate-800 truncate">
        {value || "N/A"}
      </p>
    </div>
  </div>
);

const StatusMiniCard = ({ label, value, color }: any) => (
  <div className="bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl border border-white shadow-sm flex items-center gap-3 md:gap-5">
    <div
      className={`w-1 md:w-1.5 h-8 md:h-10 rounded-full ${color} shrink-0`}
    />
    <div className="min-w-0">
      <p className="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest truncate">
        {label}
      </p>
      <p className="text-xl md:text-2xl font-black text-slate-800">{value}</p>
    </div>
  </div>
);

const StatusActionBtn = ({ label, color, onClick }: any) => (
  <button
    onClick={onClick}
    className={`px-3 py-2 md:px-6 md:py-2.5 ${color} text-white text-[8px] md:text-[10px] font-black rounded-lg md:rounded-xl uppercase tracking-widest shadow-lg shadow-black/5 active:scale-95 transition-all`}
  >
    {label}
  </button>
);

export default Dashboard;
