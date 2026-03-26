import React, { useState, useMemo } from 'react';
import { 
  Users, Calendar, Trash2, Clock, X, Phone, Mail, 
  ChevronRight, Baby, User, PartyPopper, 
  StickyNote, ShoppingBag, AlertCircle, Utensils,
  CheckCircle2, MapPin, Search, DollarSign, 
} from 'lucide-react';

// --- TYPES ---
interface OrderItem {
  name: string;
  qty: number;
  price: string;
}

interface Reservation {
  id: number;
  name: string;
  date: string;
  time: string;
  adults: number;
  children: number;
  status: 'Confirmed' | 'Arrived' | 'Cancelled';
  phone: string;
  email: string;
  occasion: string;
  notes: string;
  table: string;
  isPreOrder: boolean;
  preOrderItems?: OrderItem[];
}

const Dashboard: React.FC = () => {
  // 1. STATE MANAGEMENT
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRes, setSelectedRes] = useState<Reservation | null>(null);
  const [reservations, setReservations] = useState<Reservation[]>([
    { 
      id: 1, name: 'Jean Dupont', date: '2026-03-26', time: '19:30', adults: 2, children: 2, 
      status: 'Arrived', phone: '+33 6 12 34 56 78', email: 'jean.d@lotus.com', 
      occasion: 'Anniversary', table: 'Table 12', notes: 'Window seat preferred. Needs high chair.', isPreOrder: true,
      preOrderItems: [
        { name: 'Roasted Duck Curry', qty: 1, price: '$22.00' },
        { name: 'Pad Thai Shrimp', qty: 2, price: '$36.00' },
        { name: 'Mango Sticky Rice', qty: 2, price: '$14.00' }
      ]
    },
    { 
      id: 2, name: 'Marie Curie', date: '2026-03-26', time: '20:00', adults: 2, children: 0, 
      status: 'Confirmed', phone: '+33 6 98 76 54 32', email: 'm.curie@science.fr', 
      occasion: 'Birthday', table: 'Table 04', notes: 'Severe peanut allergy.', isPreOrder: false 
    },
    { 
      id: 3, name: 'Victor Hugo', date: '2026-03-26', time: '21:00', adults: 4, children: 0, 
      status: 'Cancelled', phone: '+33 7 11 22 33 44', email: 'v.hugo@lit.fr', 
      occasion: 'Business', table: 'Table 08', notes: 'Quiet corner.', isPreOrder: true,
      preOrderItems: [{ name: 'Set Menu A', qty: 4, price: '$120.00' }]
    }
  ]);

  // 2. LOGIC & FILTERING
  const filteredReservations = useMemo(() => {
    return reservations.filter(res => 
      res.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      res.phone.includes(searchTerm)
    );
  }, [searchTerm, reservations]);

  const stats = useMemo(() => ({
    totalGuests: reservations.reduce((acc, curr) => acc + curr.adults + curr.children, 0),
    cancelled: reservations.filter(res => res.status === 'Cancelled').length,
    preOrders: reservations.filter(res => res.isPreOrder).length
  }), [reservations]);

  // 3. ACTIONS
  const updateStatus = (id: number, newStatus: Reservation['status']) => {
    setReservations(prev => prev.map(res => res.id === id ? { ...res, status: newStatus } : res));
    if (selectedRes?.id === id) setSelectedRes(prev => prev ? { ...prev, status: newStatus } : null);
  };

  const deleteReservation = (id: number) => {
    if (window.confirm("Delete this reservation permanently?")) {
      setReservations(prev => prev.filter(res => res.id !== id));
      setSelectedRes(null);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#F8FAFC] font-sans text-slate-900">
      
      {/* MAIN CONTENT AREA */}
      <div className={`transition-all duration-500 p-8 ${selectedRes ? 'mr-[450px] opacity-30 pointer-events-none scale-[0.98]' : ''}`}>
        <div className="max-w-7xl mx-auto space-y-10">
          
          {/* Header & Search */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl font-black text-[#1E293B] italic tracking-tight">Lotus Blanc Dashboard</h1>
              <p className="text-slate-500 font-medium mt-1">Manage your daily restaurant operations</p>
            </div>
            
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search bookings, phone..." 
                className="w-full pl-12 pr-4 py-4 bg-white border border-slate-100 rounded-2xl shadow-sm focus:ring-2 focus:ring-[#034A6C]/20 outline-none transition-all font-medium"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          {/* STATS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Revenue" value="$12,840" trend="+12.5%" icon={<DollarSign />} color="bg-emerald-50 text-emerald-600" />
            <StatCard title="Total Guests" value={stats.totalGuests.toString()} trend="+8.2%" icon={<Users />} color="bg-orange-50 text-orange-600" />
            <StatCard title="Orders" value="156" trend="+5.0%" icon={<ShoppingBag />} color="bg-blue-50 text-blue-600" />
            <StatCard title="Cancelled" value={stats.cancelled.toString()} trend="-1.5%" icon={<AlertCircle />} color="bg-rose-50 text-rose-600" />
          </div>

          {/* SCHEDULE LIST */}
          <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm">
            <h2 className="text-2xl font-black text-slate-800 mb-8 flex items-center gap-3 italic">
              <Clock className="text-[#034A6C]" /> Today's Schedule
            </h2>
            <div className="space-y-4">
              {filteredReservations.length > 0 ? (
                filteredReservations.map(res => (
                  <div key={res.id} onClick={() => setSelectedRes(res)} className="cursor-pointer">
                    <ReservationItem {...res} />
                  </div>
                ))
              ) : (
                <div className="py-20 text-center text-slate-400 font-bold italic">No reservations found matching your search.</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* DETAIL SIDE PANEL */}
      {selectedRes && (
        <div className="fixed inset-y-0 right-0 w-[450px] bg-white shadow-2xl z-50 border-l border-slate-100 flex flex-col animate-in slide-in-from-right duration-500">
          
          {/* Header Actions */}
          <div className="p-8 border-b border-slate-50 flex justify-between items-center">
             <button onClick={() => setSelectedRes(null)} className="p-3 bg-slate-100 rounded-2xl text-slate-400 hover:text-slate-800 transition-all"><X size={20}/></button>
             <div className="flex gap-2">
                <StatusBtn active={selectedRes.status === 'Arrived'} label="Arrive" color="emerald" onClick={() => updateStatus(selectedRes.id, 'Arrived')} />
                <StatusBtn active={selectedRes.status === 'Confirmed'} label="Confirm" color="blue" onClick={() => updateStatus(selectedRes.id, 'Confirmed')} />
                <StatusBtn active={selectedRes.status === 'Cancelled'} label="Cancel" color="red" onClick={() => updateStatus(selectedRes.id, 'Cancelled')} />
             </div>
          </div>

          <div className="flex-1 overflow-y-auto p-10 space-y-10">
            {/* Customer Identity */}
            <div className="text-center">
              <div className="size-24 bg-[#034A6C] text-white text-4xl font-black rounded-[2.5rem] flex items-center justify-center mx-auto mb-4 shadow-xl shadow-blue-100">
                {selectedRes.name[0]}
              </div>
              <h2 className="text-3xl font-black text-slate-800">{selectedRes.name}</h2>
              <p className="text-[#034A6C] font-black text-xs uppercase tracking-[0.2em] mt-2 flex items-center justify-center gap-2">
                <MapPin size={14}/> {selectedRes.table}
              </p>
            </div>

            {/* Guest Count */}
            <div className="bg-slate-50 p-6 rounded-[2.5rem] border border-slate-100 flex divide-x divide-slate-200">
               <div className="flex-1 flex items-center justify-center gap-3">
                  <User className="text-slate-400" size={20}/>
                  <div>
                    <p className="text-[10px] font-black uppercase text-slate-400">Adults</p>
                    <p className="text-xl font-black text-slate-800">{selectedRes.adults}</p>
                  </div>
               </div>
               <div className="flex-1 flex items-center justify-center gap-3">
                  <Baby className="text-slate-400" size={20}/>
                  <div>
                    <p className="text-[10px] font-black uppercase text-slate-400">Children</p>
                    <p className="text-xl font-black text-slate-800">{selectedRes.children}</p>
                  </div>
               </div>
            </div>

            {/* Core Details */}
            <div className="space-y-6">
                <DetailBox icon={<Calendar size={20}/>} label="Reservation Date" value={selectedRes.date} />
                <DetailBox icon={<Clock size={20}/>} label="Arrival Time" value={selectedRes.time} />
                <DetailBox icon={<PartyPopper size={20}/>} label="Occasion" value={selectedRes.occasion} />
            </div>

            {/* Pre-Order Section */}
            {selectedRes.isPreOrder && (
              <div className="bg-blue-50/50 rounded-[2.5rem] p-8 border border-blue-100">
                <h3 className="text-xs font-black text-blue-700 uppercase mb-5 flex items-center gap-2 tracking-widest">
                  <Utensils size={16} /> Pre-Order Menu
                </h3>
                <div className="space-y-4">
                  {selectedRes.preOrderItems?.map((item, index) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                      <span className="text-slate-600 font-medium"><span className="text-blue-600 font-black mr-2">{item.qty}x</span> {item.name}</span>
                      <span className="text-slate-800 font-black">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Notes */}
            <div className="space-y-4">
               <label className="text-[10px] font-black uppercase text-slate-400 flex items-center gap-2 px-2 tracking-widest">
                  <StickyNote size={14} /> Instructions
               </label>
               <div className="bg-[#F1F5F9] p-6 rounded-[2rem] text-sm text-slate-600 italic leading-relaxed">
                  "{selectedRes.notes}"
               </div>
            </div>

            {/* Contact */}
            <div className="space-y-4 pt-4 border-t border-slate-50">
                <ContactRow icon={<Phone size={18}/>} label="Phone" value={selectedRes.phone} />
                <ContactRow icon={<Mail size={18}/>} label="Email" value={selectedRes.email} />
            </div>
          </div>

          <div className="p-8 border-t border-slate-50">
             <button onClick={() => deleteReservation(selectedRes.id)} className="w-full py-5 text-red-500 font-black text-xs uppercase tracking-[0.2em] hover:bg-red-50 rounded-[1.5rem] transition-all flex items-center justify-center gap-2">
                <Trash2 size={16} /> Delete Forever
             </button>
          </div>
        </div>
      )}
    </div>
  );
};

// --- HELPER COMPONENTS ---

const StatCard = ({ title, value, trend, icon, color }: any) => {
  const isPositive = trend?.includes('+');
  return (
    <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
      <div className={`absolute -right-6 -top-6 size-24 rounded-full opacity-10 blur-3xl ${color}`} />
      <div className="flex justify-between items-start mb-6">
        <div className={`p-4 rounded-2xl shadow-sm border border-white/50 ${color} group-hover:scale-110 transition-transform`}>
          {React.cloneElement(icon, { size: 22, strokeWidth: 2.5 })}
        </div>
        <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black border tracking-tighter shadow-sm ${
          isPositive ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'
        }`}>
          {isPositive ? '↑' : '↓'} {trend}
        </div>
      </div>
      <div>
        <p className="text-slate-400 text-[11px] font-black uppercase tracking-[0.15em] mb-1.5">{title}</p>
        <div className="flex items-baseline gap-1.5">
          <h3 className="text-3xl font-black text-slate-800 tracking-tight leading-none">{value}</h3>
          {title.toLowerCase().includes('revenue') && <span className="text-slate-300 font-bold text-xs">USD</span>}
        </div>
      </div>
    </div>
  );
};

const ReservationItem = ({ name, time, adults, children, status, isPreOrder }: any) => (
  <div className="flex items-center justify-between p-6 bg-slate-50/50 rounded-[2.5rem] border border-transparent hover:border-[#034A6C]/10 hover:bg-white transition-all group shadow-sm">
    <div className="flex items-center gap-6">
      <div className="size-14 bg-[#034A6C] text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-lg shadow-blue-50">{name[0]}</div>
      <div>
        <div className="flex items-center gap-3">
          <p className="font-black text-slate-800 text-lg">{name}</p>
          {isPreOrder && (
            <span className="flex items-center gap-1 bg-blue-50 text-blue-700 text-[8px] font-black px-2 py-0.5 rounded-md uppercase">
                <CheckCircle2 size={10} /> Pre-Ordered
            </span>
          )}
        </div>
        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">{time} • {adults + children} Members</p>
      </div>
    </div>
    <div className="flex items-center gap-6">
      <span className={`text-[9px] font-black uppercase px-4 py-2 rounded-xl border ${
        status === 'Arrived' ? 'bg-blue-600 text-white border-blue-600' : 
        status === 'Cancelled' ? 'bg-red-50 text-red-400 border-red-100' : 'bg-white text-slate-400 border-slate-100'
      }`}>{status}</span>
      <ChevronRight className="text-slate-300 group-hover:text-slate-800 transition-colors" />
    </div>
  </div>
);

const StatusBtn = ({ label, color, active, onClick }: any) => {
  const themes: any = {
    emerald: active ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-100' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100',
    blue: active ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'bg-blue-50 text-blue-600 hover:bg-blue-100',
    red: active ? 'bg-red-500 text-white shadow-lg shadow-red-100' : 'bg-red-50 text-red-600 hover:bg-red-100'
  };
  return (
    <button onClick={onClick} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-tighter transition-all ${themes[color]}`}>
      {label}
    </button>
  );
};

const DetailBox = ({ icon, label, value }: any) => (
  <div className="flex items-center gap-5 p-2">
    <div className="p-4 bg-slate-50 rounded-2xl text-slate-400">{icon}</div>
    <div>
      <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-0.5">{label}</p>
      <p className="text-slate-800 font-black text-lg">{value}</p>
    </div>
  </div>
);

const ContactRow = ({ icon, label, value }: any) => (
  <div className="flex items-center gap-5 p-2 group cursor-pointer">
    <div className="p-4 bg-slate-50 rounded-2xl text-slate-300 group-hover:text-[#034A6C] transition-colors">{icon}</div>
    <div>
      <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{label}</p>
      <p className="font-bold text-slate-800 group-hover:underline">{value}</p>
    </div>
  </div>
);

export default Dashboard;