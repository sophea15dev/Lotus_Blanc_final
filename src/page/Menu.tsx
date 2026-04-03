import React, { useState, useEffect, useCallback } from "react";
import api from "../api/axios"; 
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, X, CheckCircle, Clock, UtensilsCrossed, Lock, Calendar, ClipboardList } from "lucide-react";

interface Dish {
  id: number;
  name: string;
  desc: string;
  price: number;
  image: string;
  category: string;
}

const Menu: React.FC = () => {
  const [cart, setCart] = useState<Dish[]>([]);
  const [history, setHistory] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false); 
  const [formData, setFormData] = useState({ name: "", phone: "", date: "", time: "" });

  // --- 1. FETCH HISTORY ---
  const fetchMyHistory = useCallback(async () => {
    const mySavedPhone = localStorage.getItem("user_phone");
    
    if (!mySavedPhone) {
      console.log("No phone found in LocalStorage. History hidden.");
      setHistory([]);
      return;
    }

    try {
      // We use 'user_id' as the filter because your backend error requested it
      const res = await api.get(`/orders?user_id=${mySavedPhone}`); 
      console.log("History received for ID " + mySavedPhone + ":", res.data);
      setHistory(res.data);
    } catch (err) {
      console.error("Error loading history:", err);
    }
  }, []);

  // Fetch when modal opens
  useEffect(() => {
    if (isHistoryOpen) fetchMyHistory();
  }, [isHistoryOpen, fetchMyHistory]);

  // Listen for 'My Orders' click from Navbar
  useEffect(() => {
    const handleOpenHistory = () => setIsHistoryOpen(true);
    window.addEventListener("openHistory", handleOpenHistory);
    return () => window.removeEventListener("openHistory", handleOpenHistory);
  }, []);

  // --- 2. HANDLERS ---
  const handleAddToCart = (dish: Dish) => {
    setCart((prev) => [...prev, { ...dish, cartId: Math.random() } as any]);
    setIsCartOpen(true);
  };

  const handleFinalOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      user_id: formData.phone,           // Critical: Backend requirement
      customer_name: formData.name,      
      phone_number: formData.phone, 
      order_date: formData.date,
      order_time: formData.time,
      items: cart.map(item => ({ 
        id: item.id, 
        item_name: item.name, 
        price: item.price 
      })),
      total_price: cart.reduce((sum, item) => sum + item.price, 0)
    };

    try {
      await api.post("/orders", payload);
      
      // IMPORTANT: Save the phone number so the 'Get' request knows which orders to pull
      localStorage.setItem("user_phone", formData.phone);
      
      alert("Order Successful!");
      setCart([]);
      setIsCartOpen(false);
      fetchMyHistory(); 
    } catch (error: any) {
      console.error("Post Error Details:", error.response?.data);
      alert("Order failed. Please check the console for details.");
    }
  };

  const categories = ["MENU THIS WEEK", "MAIN COURSES", "STARTERS"];
  const fullMenu: Dish[] = [
    { id: 1, category: "MENU THIS WEEK", name: "Asparagus & Egg Bruschetta", desc: "ប៉័ងប្រ៊ុសខេតតាជាមួយទំពាំងបារាំង", price: 3.0, image: "https://boroughmarket.org.uk/wp-content/uploads/2021/02/Griddled-asparagus-soft-egg-bruschetta-2.jpg" },
    { id: 2, category: "MENU THIS WEEK", name: "Pomelo Salad with Prawns", desc: "ញាំបង្គាជាមួយក្រូចថ្លុង", price: 3.0, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3AKgsm0cjU1UMaV9JM4DaYlFE4x744XbB2A&s" },
  ];

  return (
    <div className="w-full mx-auto px-4 md:px-10 py-6 bg-white min-h-screen font-sans">
      
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* --- MENU GRID --- */}
        <div className={`transition-all duration-500 flex-grow ${cart.length > 0 ? "lg:w-[62%]" : "w-full"}`}>
          
          {categories.map((catName) => (
            <div key={catName} className="mb-12">
              <h2 className="text-[#004e70] font-bold text-xl mb-8 uppercase border-l-4 border-[#f26522] pl-4 tracking-widest">
                {catName}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {fullMenu.filter(item => item.category === catName).map((dish) => (
                  <div key={dish.id} className="flex bg-white rounded-[40px] p-5 shadow-md border border-slate-100 items-center hover:shadow-xl transition-all">
                    <img src={dish.image} className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-[30px]" alt={dish.name} />
                    <div className="ml-6 flex-1">
                      <h3 className="font-bold text-[#004e70] text-xl">{dish.name}</h3>
                      <p className="text-slate-400 text-sm mt-2 line-clamp-2">{dish.desc}</p>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="font-black text-[#f26522] text-2xl">${dish.price.toFixed(2)}</span>
                        <button onClick={() => handleAddToCart(dish)} className="bg-[#f26522] text-white text-xs font-black py-3 px-6 rounded-full hover:bg-[#004e70] transition-colors shadow-lg uppercase">
                          + Add
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* --- SIDEBAR CART --- */}
        <AnimatePresence>
          {cart.length > 0 && isCartOpen && (
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }} className="w-full lg:w-[420px] sticky top-10 z-20">
              <div className="bg-[#fcfdfe] border-2 border-slate-50 rounded-[45px] p-8 shadow-2xl">
                <div className="flex justify-between items-center mb-8">
                   <h2 className="text-[#004e70] font-black text-2xl uppercase italic">Order Summary</h2>
                   <button onClick={() => setIsCartOpen(false)} className="text-slate-300 hover:text-red-500"><X size={24}/></button>
                </div>
                
                <div className="max-h-[180px] overflow-y-auto mb-8 pr-2 space-y-3">
                  {cart.map((item: any) => (
                    <div key={item.cartId} className="flex justify-between items-center bg-white p-4 rounded-3xl shadow-sm border border-slate-50">
                      <span className="text-[#004e70] font-bold text-sm">{item.name}</span>
                      <span className="text-[#f26522] font-black text-sm">${item.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleFinalOrder} className="space-y-4">
                  <input type="text" placeholder="Full Name" required className="w-full p-4 rounded-2xl border border-slate-100 outline-none focus:ring-2 ring-orange-50" onChange={(e) => setFormData({...formData, name: e.target.value})} />
                  <input type="tel" placeholder="Phone Number" required className="w-full p-4 rounded-2xl border border-slate-100 outline-none focus:ring-2 ring-orange-50" onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                  
                  <div className="flex gap-3">
                    <input type="date" required className="w-1/2 p-4 rounded-2xl border border-slate-100 text-xs" onChange={(e) => setFormData({...formData, date: e.target.value})} />
                    <input type="time" required className="w-1/2 p-4 rounded-2xl border border-slate-100 text-xs" onChange={(e) => setFormData({...formData, time: e.target.value})} />
                  </div>

                  <div className="pt-6 flex justify-between items-center border-t border-slate-100 mt-4">
                     <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">Total</span>
                     <span className="text-[#f26522] font-black text-3xl">${cart.reduce((s, i) => s + i.price, 0).toFixed(2)}</span>
                  </div>
                  <button type="submit" className="w-full py-5 bg-[#f26522] text-white rounded-3xl font-black shadow-xl uppercase tracking-widest hover:scale-[1.02] transition-all">
                    Confirm Order
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* --- HISTORY MODAL --- */}
      <AnimatePresence>
        {isHistoryOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsHistoryOpen(false)} className="fixed inset-0 bg-[#004e70]/60 backdrop-blur-md z-[300]" />
            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }} className="fixed inset-0 m-auto w-[92%] max-w-[600px] h-fit max-h-[85vh] bg-white z-[310] rounded-[50px] shadow-2xl p-10 overflow-y-auto">
              <div className="flex justify-between items-center mb-8 border-b pb-6">
                <div className="flex items-center gap-3 text-[#004e70]">
                   <ClipboardList size={24} className="text-[#f26522]" />
                   <h2 className="font-black text-3xl uppercase italic tracking-tighter">My Orders</h2>
                </div>
                <button onClick={() => setIsHistoryOpen(false)} className="bg-slate-50 p-3 rounded-full hover:bg-red-50 text-slate-400 hover:text-red-500 transition-all"><X size={20}/></button>
              </div>

              <div className="space-y-6">
                {localStorage.getItem("user_phone") ? (
                    history.length > 0 ? history.map((order) => (
                    <div key={order.id} className="bg-slate-50/50 rounded-[35px] border border-slate-100 p-6">
                        <div className="flex justify-between items-center mb-4 border-b border-slate-200/40 pb-3">
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{order.order_date}</span>
                          <span className="text-green-600 bg-green-50 px-3 py-1 rounded-full font-bold text-[10px] uppercase flex items-center gap-1">
                             <CheckCircle size={10}/> Order Placed
                          </span>
                        </div>
                        
                        <div className="space-y-3 mb-6">
                        {order.items?.map((food: any, i: number) => (
                            <div key={i} className="flex justify-between items-center">
                              <p className="text-[#004e70] font-semibold text-sm">{food.item_name}</p>
                              <p className="text-slate-400 font-bold text-sm">${Number(food.price).toFixed(2)}</p>
                            </div>
                        ))}
                        </div>

                        <div className="flex justify-between items-center pt-4 border-t border-slate-200/40">
                          <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Paid</span>
                          <span className="text-[#f26522] font-black text-2xl">${Number(order.total_price).toFixed(2)}</span>
                        </div>
                    </div>
                    )) : (
                      <div className="text-center py-16">
                        <Clock size={32} className="mx-auto text-slate-200 mb-4" />
                        <p className="text-slate-400 font-medium italic">No orders found for this phone number.</p>
                      </div>
                    )
                ) : (
                    <div className="text-center py-16">
                      <UtensilsCrossed size={48} className="mx-auto text-slate-100 mb-4" />
                      <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Place an order to start your history</p>
                    </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Menu;