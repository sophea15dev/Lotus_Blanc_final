import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios"; 
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, Trash2, ShoppingBag, CheckCircle } from "lucide-react";

interface Dish {
  id: number;
  name: string;
  desc: string;
  price: number;
  image: string;
  category: string;
  cartId?: number; 
}

const Menu: React.FC = () => {
  const navigate = useNavigate();
  
  // --- STATE ---
  const [fullMenu, setFullMenu] = useState<Dish[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [cart, setCart] = useState<Dish[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [orderLoading, setOrderLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<any>(null);

  const [formData, setFormData] = useState({
    name: "", phone: "", note: "" 
  });

  const KHR_RATE = 4100;
  const formatKHR = (usd: number) => (usd * KHR_RATE).toLocaleString() + "៛";

  // --- 1. FETCH DATA FROM API ---
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const [catRes, dishRes] = await Promise.all([
          api.get("/api/categories"),
          api.get("/api/dishes")
        ]);

        const catNames = catRes.data.map((c: any) => c.name);
        setCategories(["All", ...catNames]);

        const mappedDishes = dishRes.data.map((d: any) => ({
          id: d.id,
          name: d.name,
          desc: d.description,
          price: d.price,
          image: d.imageUrl || "https://via.placeholder.com/150",
          category: d.category.name, 
        }));

        setFullMenu(mappedDishes);
      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  // --- FILTER LOGIC ---
  const filteredMenu = useMemo(() => {
    return activeCategory === "All" 
      ? fullMenu 
      : fullMenu.filter(d => d.category === activeCategory);
  }, [activeCategory, fullMenu]);

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  // --- CART ACTIONS ---
  const handleAddToCart = (dish: Dish) => {
    setCart((prev) => [...prev, { ...dish, cartId: Date.now() }]);
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (cartId: number) => {
    setCart((prev) => prev.filter(item => item.cartId !== cartId));
  };

  // --- 2. POST ORDER TO API ---
  const handleFinalOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return alert("Your cart is empty!");
    
    setOrderLoading(true);
    try {
      const orderPayload = {
        customerName: formData.name,
        phone: formData.phone,
        totalPrice: totalPrice,
        items: cart.map(i => ({
          dishId: i.id,
          quantity: 1 
        })),
      };

      await api.post("/api/orders", orderPayload);

      // Save order data locally before clearing cart
      setSubmittedData({ ...formData, items: [...cart], total: totalPrice });
      setIsSubmitted(true);
      setCart([]);
    } catch (err) { 
      alert("Order failed. Please check if the server is running."); 
    } finally { 
      setOrderLoading(false); 
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-[#004e70]" size={48} />
        <p className="text-[#004e70] font-black italic animate-pulse uppercase tracking-widest text-sm">Loading Menu...</p>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto md:px-25 px-8 py-4 bg-slate-50/30 min-h-screen">
      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.div key="menu-view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col lg:flex-row gap-8 items-start">
            
            {/* LEFT: MENU LIST */}
            <div className={`transition-all duration-500 grow ${cart.length > 0 ? "lg:w-[60%]" : "w-full"}`}>
              {/* CATEGORY BAR */}
              <div className="flex gap-2 overflow-x-auto pb-6 no-scrollbar sticky top-0 z-10 bg-slate-50/80 backdrop-blur-sm pt-2">
                {categories.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-8 py-3 rounded-full text-[11px] font-black uppercase transition-all whitespace-nowrap shadow-sm ${activeCategory === cat ? 'bg-[#004e70] text-white' : 'bg-white text-slate-500 border border-slate-100 hover:border-[#004e70]/30'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* DISH GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                {filteredMenu.map((dish) => (
                  <motion.div layout key={dish.id} className="flex bg-white rounded-[35px] p-4 shadow-sm border border-slate-50 items-center hover:shadow-xl transition-all group">
                    <div className="overflow-hidden rounded-[25px] flex-shrink-0">
                      <img src={dish.image} className="w-24 h-24 md:w-32 md:h-32 object-cover group-hover:scale-110 transition-transform duration-500" alt={dish.name} />
                    </div>
                    <div className="ml-5 flex-1">
                      <span className="text-[9px] font-black text-[#f26522] uppercase tracking-tighter">{dish.category}</span>
                      <h3 className="font-black text-[#004e70] text-[17px] italic leading-tight">{dish.name}</h3>
                      <p className="text-slate-400 text-[13px] mt-1 italic line-clamp-2">{dish.desc}</p>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="font-black text-[#004e70] text-lg leading-none">${dish.price.toFixed(2)}</span>
                          <span className="text-slate-300 text-[10px] font-bold">{formatKHR(dish.price)}</span>
                        </div>
                        <button onClick={() => handleAddToCart(dish)} className="bg-[#004e70] text-white text-[10px] font-black py-2 px-5 rounded-full uppercase hover:bg-[#f26522] transition-colors">+ Add</button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* RIGHT: CART PANEL */}
            {cart.length > 0 && (
              <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} className="w-full lg:w-[400px] lg:sticky lg:top-10">
                <div className="bg-white border border-slate-100 rounded-[45px] p-8 shadow-2xl shadow-slate-200">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-[#004e70] font-black text-xl uppercase italic flex items-center gap-2">
                      <ShoppingBag size={20} /> My Order ({cart.length})
                    </h2>
                  </div>

                  <div className="max-h-[250px] overflow-y-auto mb-6 pr-2 space-y-3 custom-scrollbar">
                    {cart.map((item) => (
                      <div key={item.cartId} className="flex justify-between items-center bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                        <div className="flex-1">
                          <p className="text-[#004e70] font-black text-[14px] uppercase truncate">{item.name}</p>
                          <p className="text-[#f26522] font-bold text-[13px]">${item.price.toFixed(2)}</p>
                        </div>
                        <button onClick={() => handleRemoveFromCart(item.cartId!)} className="ml-4 text-slate-300 hover:text-red-400"><Trash2 size={16} /></button>
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleFinalOrder} className="space-y-4">
                    <input type="text" placeholder="Your Name *" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full p-4 rounded-2xl bg-slate-50 border-none text-[14px] focus:ring-2 focus:ring-[#004e70] outline-none" />
                    <input type="tel" placeholder="Phone Number *" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full p-4 rounded-2xl bg-slate-50 border-none text-[14px] focus:ring-2 focus:ring-[#004e70] outline-none" />
                    
                    <div className="pt-6 border-t mt-4 flex justify-between items-end">
                      <div>
                        <span className="text-slate-400 font-black text-[10px] uppercase tracking-widest block mb-1">Grand Total</span>
                        <span className="text-slate-400 font-bold text-[12px]">{formatKHR(totalPrice)}</span>
                      </div>
                      <span className="text-[#f26522] font-black text-4xl tracking-tighter leading-none">${totalPrice.toFixed(2)}</span>
                    </div>

                    <button type="submit" disabled={orderLoading} className="w-full py-5 mt-4 bg-[#004e70] text-white rounded-[25px] font-black uppercase text-[14px] tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-blue-100">
                      {orderLoading ? <Loader2 className="animate-spin mx-auto" /> : "Confirm Order"}
                    </button>
                  </form>
                </div>
              </motion.div>
            )}
          </motion.div>
        ) : (
          /* --- SUCCESS SCREEN --- */
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center py-24 bg-white rounded-[60px] shadow-sm max-w-2xl mx-auto border border-slate-50 mt-10 px-8">
             <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={50} strokeWidth={2.5} />
             </div>
             <h2 className="text-[#004e70] font-black text-4xl mb-3 italic tracking-tight">Thank You, {submittedData.name}!</h2>
             <p className="text-slate-400 mb-12 uppercase tracking-[0.2em] text-[12px] font-bold">Your order has been placed successfully</p>
             
             <div className="flex flex-col md:flex-row gap-4 justify-center">
               <button onClick={() => setIsSubmitted(false)} className="bg-slate-100 text-slate-500 px-10 py-4 rounded-full font-black uppercase text-[11px] tracking-widest hover:bg-slate-200 transition-colors">
                 Back to Menu
               </button>
               {/* This now passes the phone number to the MyOrders page state */}
               <button 
                 onClick={() => navigate("/my-orders", { state: { phone: submittedData.phone } })} 
                 className="bg-[#f26522] text-white px-10 py-4 rounded-full font-black uppercase text-[11px] tracking-widest shadow-xl shadow-orange-200 hover:scale-105 transition-all"
               >
                 Track My Order
               </button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Menu;