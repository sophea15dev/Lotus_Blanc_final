import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

interface Dish {
  id: number;
  name: string;
  desc: string;
  price: number;
  image: string;
  quantity: number;
}

const Menu: React.FC = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState<Dish[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [time, setTime] = useState("");

  const categories = [
    { name: "Western Food", image: "https://cdn.prod.website-files.com/65ee90198a5b84738143d979/65fbc8afaffa13bb08fafd11_Christmas%20Teatime.jpg" },
    { name: "Asian Food", image: "https://www.bcn.travel/wp-content/uploads/asian-cuisine-in-barcelona.jpg" },
    { name: "Drinks", image: "https://dorre.se/cdn/shop/articles/Header_Drinkkvall_1024x.png?v=1693916400" },
    { name: "Desserts", image: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Desserts.jpg" },
  ];

  const menuData: Omit<Dish, 'quantity'>[] = [
    { id: 1, name: "Pork Milanese", desc: "Crispy breaded pork, pasta and light tomato sauce", price: 6.00, image: "https://img.taste.com.au/zAn_m_AY/w1200-h1200-cfill-q80/taste/2016/11/pork-milanese-with-creamy-pasta-92401-1.jpeg" },
    { id: 2, name: "Wok-Fired Chicken", desc: "Stir-fried chicken with roasted cashews nuts, bell peppers, onions and steamed rice", price: 6.00, image: "https://annabanana.co/wp-content/uploads/2022/05/Thai-Cashew-Chicken-Feat-1.jpg" },
    { id: 3, name: "Grilled Fish", desc: "Grilled fish fillet served with mashed pumpkin, garlicky vegetables.", price: 6.00, image: "https://meghanitup.com/wp-content/uploads/2025/03/Grilled-Lemon-Fish-5-3-768x1024.jpg" },
    { id: 4, name: "Beef Bourguignon", desc: "Slow-braised beef in red wine sauce served with a choice of sides.", price: 6.00, image: "https://juliasalbum.com/wp-content/uploads/2025/09/Beef-Bourguignon-Recipe-2.jpg" },
    { id: 5, name: "Spinach Frittata", desc: "Baked spinach and egg frittata served with cucumber and bell pepper salad.", price: 6.00, image: "https://www.runningtothekitchen.com/wp-content/uploads/2023/12/spinach-frittata-10.jpg" },
    { id: 6, name: "Pomelo Salad with Prawns", desc: "Refreshing pomelo tossed with prawns, herbs, and a light citrus dressing.", price: 6.00, image: "https://www.beyondkimchee.com/wp-content/uploads/blogger/-ouQBJt6hLdw/T0c-zxBPCzI/AAAAAAAAEs8/-N0tEqsvhA8/s1600/frameA.jpg" },
  ];

  const addToCart = (dish: any) => {
    setCart((prev) => {
      const exist = prev.find((i) => i.id === dish.id);
      if (exist) return prev.map((i) => i.id === dish.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...dish, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQty = (id: number, delta: number) => {
    setCart((prev) => prev.map((i) => i.id === id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i));
  };

  const total = useMemo(() => cart.reduce((s, i) => s + i.price * i.quantity, 0), [cart]);
  const isValid = name && phone && time && cart.length > 0;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 pb-24 md:pb-20">
      
      {/* Responsive Headers */}
      <header className="mb-8 md:mb-10 text-center md:text-left pt-6">
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight uppercase italic">The Menu</h1>
        <div className="h-1.5 w-20 md:w-24 bg-orange-500 mt-2 rounded-full mx-auto md:mx-0"></div>
      </header>

      {/* Categories: 2 columns on small, 4 on medium+ */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-10 md:mb-12 w-full">
        {categories.map((cat, i) => (
          <div key={i} className="cursor-pointer group text-center" onClick={() => navigate('/list')}>
            <div className="overflow-hidden rounded-xl md:rounded-2xl h-32 md:h-48 mb-2 shadow-sm border-2 border-white">
              <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
            </div>
            <p className="font-bold text-gray-700 text-sm md:text-xl">{cat.name}</p>
          </div>
        ))}
      </div>
      
      <header className="mb-8 md:mb-10 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight uppercase italic">Menu Today</h1>
        <div className="h-1.5 w-20 md:w-24 bg-orange-500 mt-2 rounded-full mx-auto md:mx-0"></div>
      </header>

      {/* Food Items Grid: 1 column on mobile, 2 on large screens */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {menuData.map((dish) => (
          <div key={dish.id} className="bg-white p-4 md:p-5 rounded-2xl md:rounded-[2rem] flex items-center gap-3 md:gap-5 shadow-sm border border-transparent hover:border-blue-200 transition-all group">
            <img src={dish.image} className="w-20 h-20 md:w-24 md:h-24 rounded-xl md:rounded-2xl object-cover shadow-inner" alt={dish.name} />
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-gray-800 text-base md:text-lg leading-tight truncate">{dish.name}</h3>
              <p className="text-gray-400 text-xs mt-1 line-clamp-2">{dish.desc}</p>
              <div className="flex justify-between items-center mt-2 md:mt-3">
                <p className="text-orange-600 font-black text-lg md:text-xl">${dish.price.toFixed(2)}</p>
                <button 
                  onClick={() => addToCart(dish)}
                  className="bg-blue-600 text-white px-4 md:px-6 py-1.5 md:py-2 rounded-lg md:rounded-xl text-[10px] md:text-xs font-black uppercase hover:bg-blue-700 transition-colors"
                >
                  + Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MOBILE FLOATING CART BUTTON (Only visible when items in cart) */}
      {cart.length > 0 && !isCartOpen && (
        <button 
          onClick={() => setIsCartOpen(true)}
          className="md:hidden fixed bottom-6 right-6 bg-orange-600 text-white p-4 rounded-full shadow-2xl z-40 flex items-center gap-2 animate-bounce"
        >
          <span className="font-black">View Tray ({cart.length})</span>
        </button>
      )}

      {/* SIDEBAR TRAY: Full width on mobile, 400px on desktop */}
      {isCartOpen && (
        <>
          {/* Backdrop for mobile */}
          <div className="fixed inset-0 bg-black/50 z-[90] md:hidden" onClick={() => setIsCartOpen(false)} />
          
          <div className="fixed inset-y-0 right-0 w-full md:w-[400px] bg-white shadow-2xl z-[100] flex flex-col transition-transform duration-300">
            
            {/* Tray Header */}
            <div className="px-6 md:px-8 py-4 md:py-6 border-b flex justify-between items-center bg-white sticky top-0">
              <h2 className="text-xl md:text-2xl font-black text-gray-900 uppercase italic">Your Tray</h2>
              <button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-black text-2xl md:text-3xl">&times;</button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 md:px-8 py-4 space-y-6 md:space-y-8">
              
              {/* Customer Details */}
              <section className="bg-gray-50 p-4 md:p-6 rounded-2xl md:rounded-3xl border border-gray-100 space-y-3 shadow-inner">
                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Order Details</h3>
                <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white px-4 py-3 rounded-lg md:rounded-xl border border-gray-200 outline-none focus:border-orange-500 font-bold text-gray-800 text-sm md:text-base" />
                <input type="tel" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-white px-4 py-3 rounded-lg md:rounded-xl border border-gray-200 outline-none focus:border-orange-500 font-bold text-gray-800 text-sm md:text-base" />
                <input type="datetime-local" onChange={(e) => setTime(e.target.value)}
                  className="w-full bg-white px-4 py-3 rounded-lg md:rounded-xl border border-gray-200 outline-none focus:border-orange-500 font-bold text-gray-500 text-sm md:text-base" />
              </section>

              {/* Order List */}
              <section className="space-y-4 pb-4">
                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Your Selection</h3>
                {cart.length === 0 ? (
                  <div className="text-center py-10">
                    <p className="text-gray-300 italic font-bold">Your tray is empty</p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 md:gap-4 bg-white p-2 rounded-xl md:rounded-2xl border border-gray-50 shadow-sm">
                      <img src={item.image} className="w-12 h-12 md:w-16 md:h-16 rounded-lg md:rounded-xl object-cover" alt={item.name} />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-xs md:text-sm text-gray-800 leading-tight truncate">{item.name}</h4>
                        <div className="flex items-center gap-3 mt-1.5">
                          <div className="flex items-center gap-2 bg-gray-100 rounded-md px-2 py-0.5">
                            <button onClick={() => updateQty(item.id, -1)} className="text-gray-400 hover:text-orange-600 font-black">-</button>
                            <span className="text-[10px] md:text-xs font-black w-4 text-center">{item.quantity}</span>
                            <button onClick={() => updateQty(item.id, 1)} className="text-gray-400 hover:text-orange-600 font-black">+</button>
                          </div>
                        </div>
                      </div>
                      <p className="font-black text-gray-900 text-xs md:text-sm pr-1">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))
                )}
              </section>
            </div>

            {/* Tray Footer */}
            <div className="p-6 md:p-8 border-t bg-white shadow-[0_-10px_40px_rgba(0,0,0,0.05)] sticky bottom-0">
              <div className="flex justify-between items-center mb-4 md:mb-6">
                <span className="text-gray-400 font-black text-[10px] md:text-xs tracking-widest uppercase">Total</span>
                <span className="text-2xl md:text-3xl font-black text-gray-900 tracking-tighter">${total.toFixed(2)}</span>
              </div>
              
              <button 
                disabled={!isValid} 
                className={`w-full py-4 md:py-5 rounded-xl md:rounded-2xl font-black text-white text-xs md:text-sm uppercase tracking-widest transition-all active:scale-95 ${
                  isValid 
                    ? "bg-orange-600 hover:bg-orange-700 shadow-xl" 
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
                onClick={() => alert(`Order confirmed for ${name}!`)}
              >
                Confirm Pre-Order
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Menu;