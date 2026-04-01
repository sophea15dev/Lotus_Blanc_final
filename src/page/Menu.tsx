import React, { useState, useMemo } from "react";

interface Dish {
  id: number;
  name: string;
  desc: string;
  price: number;
  image: string;
  quantity: number;
  category: string;
}

const Menu: React.FC = () => {
  const [cart, setCart] = useState<Dish[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [time, setTime] = useState("");

  // Categories Array - Matches the 'category' strings in fullMenu exactly
  const categories = ["Menu This Week", "Main Courses", "Appetizers", "Drinks", "Desserts"];

  // Organized Menu Data
  const fullMenu: Omit<Dish, 'quantity'>[] = [
    // MENU THIS WEEK (Items 1-26 renamed category to match)
    { id: 1, category: "Menu This Week", name: "Asparagus & Slow-Cooked Egg Bruschetta", desc: "Toasted bruschetta topped with tender asparagus and a soft slow-cooked egg.", price: 3.00, image: "https://boroughmarket.org.uk/wp-content/uploads/2021/02/Griddled-asparagus-soft-egg-bruschetta-2.jpg" },
    { id: 2, category: "Menu This Week", name: "Pomelo Salad with Prawns", desc: "Refreshing pomelo tossed with prawns, herbs, and a light citrus dressing.", price: 3.00, image: "https://phohoaph.com/cdn/shop/products/POMELOSHRIMPSALAD_1200x1200.jpg?v=1633501750" },
    { id: 3, category: "Menu This Week", name: "Khmer-Style Grilled Beef Salad", desc: "Grilled beef slices mixed with fresh herbs, vegetables, and a tangy Khmer dressing.", price: 3.00, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSYk0pf7v_qeCgkzdDRfojvIKjzkzh702K_w&s" },
    { id: 4, category: "Menu This Week", name: "Khmer Hot & Sour Prawn Soup", desc: "Traditional Cambodian soup with prawns, aromatic herbs, and a balanced hot-and-sour broth.", price: 3.00, image: "https://www.hwcmagazine.com/wp-content/uploads/2012/01/Tom-Yum-Soup-4582.jpg" },
    { id: 5, category: "Menu This Week", name: "Cream of Asparagus Soup", desc: "Smooth and creamy asparagus soup finished with fresh herbs.", price: 3.00, image: "https://tenpoundcakecompany.com/wp-content/uploads/2024/04/Creamy-Roasted-Asparagus-Shallot-and-Parmesan-Soup-1.jpg" },
    { id: 6, category: "Menu This Week", name: "Pork Milanese on a Bed of Pasta", desc: "Crispy breaded pork, pasta and light tomato sauce.", price: 6.00, image: "https://as2.ftcdn.net/jpg/04/11/84/19/1000_F_411841910_fMYI2nk8bapFGQEqdJpkdttaTXGJQJuw.jpg" },
    { id: 7, category: "Menu This Week", name: " Wok-Fried Chicken with Cashew Nuts", desc: "Stir-fried chicken with roasted cashew nuts, bell peppers, onion and steamed rice.", price: 6.00, image: "https://storage.beko.co.uk/bekoupload/leisure16/meat-recipe-chicken-and-cashew-nut-stir-fry.jpg" },
    { id: 8, category: "Menu This Week", name: "Grilled Fish with Mashed Pumpkin & Lemon Butter ", desc: "Grilled fish fillet served with mashed pumpkin, garlicky vegetables.", price: 6.00, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTykkb0X9yQlMQ9w_SSjh0gWJe_1S-KGbz_WQ&s" },
    { id: 9, category: "Menu This Week", name: "Beef Bourguignon ", desc: "beef in red wine sauce served with a choice Duchesse Potato (D)or Mini Baguette (B)or Buttered Egg Noodles", price: 6.00, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaD2TJN0qM1e65Mmx3_AA53BIUvk6_SBEIdQ&s" },   
    { id: 10, category: "Menu This Week", name: "Spinach Frittata with Fresh Salad", desc: "Baked spinach and egg frittata served with cucumber and bell pepper salad.", price: 4.50, image: "https://www.laurafuentes.com/wp-content/uploads/2021/04/Spinach-Bacon-Frittata_post_01-1.jpg" },
    { id: 11, category: "Menu This Week", name: " Aloo Gobi", desc: "Indian-style cauliflower and potato curry served with biryani rice.", price: 4.50, image: "https://static01.nyt.com/images/2023/12/21/multimedia/ND-Aloo-Gobi-gkwc/ND-Aloo-Gobi-gkwc-videoSixteenByNineJumbo1600.jpg" },
    { id: 12, category: "Menu This Week", name: "Choice of Spaghetti", desc: "Pasta tossed with mixed seafood in a rich tomato cream sauce.", price: 6.00, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0D3V0QRSLzVMN9eBt4c28wlRqITPAPJZq3Q&s" },  
    { id: 13, category: "Menu This Week", name: "Choice of Spaghetti", desc: "Pasta tossed with mixed seafood in a rich tomato cream sauce.", price: 6.00, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpVriPhJdWEJtNkZAkqXFB8dKTvKWnPsUbYw&s" },  
    { id: 14, category: "Menu This Week", name: "Creamy Seafood Marinara Pasta ", desc: "Pasta tossed with mixed seafood in a rich tomato cream sauce.", price: 6.00, image: "https://foodess.com/wp-content/uploads/2021/08/Shrimp-and-Scallop-Pasta-in-Garlic-Cream-Sauce-1-5-scaled.jpg" }, 
    { id: 15, category: "Menu This Week", name: "Classic Carbonara", desc: "Creamy pasta with bacon, parmesan cheese, and egg.", price: 6.00, image: "https://www.allrecipes.com/thmb/Vg2cRidr2zcYhWGvPD8M18xM_WY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/11973-spaghetti-carbonara-ii-DDMFS-4x3-6edea51e421e4457ac0c3269f3be5157.jpg" },  
    { id: 16, category: "Menu This Week", name: "Num Pang Pâté", desc: "Cambodian baguette sandwich with pâté, pickled vegetables, and fresh herbs.", price: 6.00, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMdztynQjRUyQekaPgZwzvMIzUjXQGR22b2A&s" },  
    { id: 17, category: "Menu This Week", name: "Veggie Burrito", desc: "Soft tortilla filled with seasoned vegetables and fresh salad.", price: 2.50, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTufgkpnEizBojC5pyOyMW4wx1DVKLnbEKm8A&s" },
    { id: 18, category: "Menu This Week", name: "French Fries", desc: "Crispy golden fries served tomato ketchup.", price: 1.50, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7USaKU-_DxefVmZ7npjz5UOraMWFP8SUYug&s" },  
    { id: 19, category: "Menu This Week", name: "Strawberry Mousse ", desc: "Light and creamy strawberry mousse.", price: 3.00, image: "https://therecipecritic.com/wp-content/uploads/2024/01/strawberry_mousse.jpg" },  
    { id: 20, category: "Menu This Week", name: " Crispy Meringue ", desc: "Crunchy meringue served with smooth mango sauce.", price: 3.00, image: "https://justamumnz.com/wp-content/uploads/2022/01/Chewy-Meringues-27.jpg" },  
    { id: 21, category: "Menu This Week", name: "Grilled Steak", desc: "Juicy grilled steak with herb butter.", price: 6.00, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtOUoompahdn6L0fN7spo59l1kPC9v5e_zJg&s" },
    { id: 22, category: "Menu This Week", name: "Pasta Carbonara", desc: "Pasta with creamy sauce, pancetta, and Parmesan.", price: 6.00, image: "https://www.cookingclassy.com/wp-content/uploads/2019/05/pasta-carbonara-1.jpg" },
    { id: 23, category: "Menu This Week", name: "Vegetarian Lasagna", desc: "Layers of pasta with vegetables and cheese.", price: 6.00, image: "https://www.cookingclassy.com/wp-content/uploads/2019/05/vegetarian-lasagna-1.jpg" },
    { id: 24, category: "Menu This Week", name: "Shrimp Tacos", desc: "Soft tortillas filled with seasoned shrimp.", price: 6.00, image: "https://www.cookingclassy.com/wp-content/uploads/2019/05/shrimp-tacos-1.jpg" },
    { id: 25, category: "Menu This Week", name: "Chicken Parmesan", desc: "Breaded chicken topped with marinara and cheese.", price: 6.00, image: "https://www.cookingclassy.com/wp-content/uploads/2019/05/chicken-parmesan-1.jpg" },
    { id: 26, category: "Menu This Week", name: "Vegetable Fajitas", desc: "Sizzling vegetables with fajita seasoning.", price: 6.00, image: "https://www.cookingclassy.com/wp-content/uploads/2019/05/vegetable-fajitas-1.jpg" },

    // MAIN COURSES
    { id: 27, category: "Main Courses", name: "Pork Milanese on a Bed of Pasta", desc: "Crispy breaded pork, pasta and light tomato sauce.", price: 6.00, image: "https://as2.ftcdn.net/jpg/04/11/84/19/1000_F_411841910_fMYI2nk8bapFGQEqdJpkdttaTXGJQJuw.jpg" },
    { id: 28, category: "Main Courses", name: "Wok-Fried Chicken with Cashew Nuts", desc: "Stir-fried chicken with roasted cashew nuts, bell peppers, onion and steamed rice.", price: 6.00, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3cJmCS4MzXTnHxPvD-jXAOyw3TECuTMTX6w&s" },
    { id: 29, category: "Main Courses", name: "Grilled Salmon with Lemon Butter Sauce", desc: "Salmon fillet grilled to perfection, served with a tangy lemon butter sauce and steamed vegetables.", price: 6.00, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5TRY0xsk6jKpdssSWDpTbTEFzqlkOMYM4Eg&s" },
    { id: 30, category: "Main Courses", name: "Vegetable Stir-Fry with Tofu", desc: "A colorful medley of fresh vegetables and tofu stir-fried in a savory sauce, served with steamed rice.", price: 6.00, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwwTrjrKQ6K4dDvNRKGefQ9nUVOIj6HCPUcw&s" },

    // APPETIZERS
    { id: 31, category: "Appetizers", name: "Crispy Spring Rolls", desc: "Vegetable filled rolls with sweet chili dip.", price: 4.50, image: "https://plus.unsplash.com/premium_photo-1664472637341-3ec829d1f4df?q=80&w=500&auto=format&fit=crop" },
    { id: 32, category: "Appetizers", name: "Garlic Bread", desc: "Toasted baguette with herb butter.", price: 3.50, image: "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?q=80&w=500&auto=format&fit=crop" },

    // DRINKS
    { id: 33, category: "Drinks", name: "Coke/Sprite/Soda/Tonic", desc: "Assorted soft drinks.", price: 1.50, image: "https://p.turbosquid.com/ts-thumb/29/p1XPIa/lpSf6JC9/soft_drink_collection_001/jpg/1522689586/1920x1080/fit_q87/577235cbc0e3e8f973589aeecdc16d90dde290f6/soft_drink_collection_001.jpg" },
    { id: 34, category: "Drinks", name: "Kulen Water", desc: "(0.5L)", price: 1.50, image: "https://aeoncambodia.sgp1.digitaloceanspaces.com/image/catalog/product/8846003368882-b.jpg" },
    { id: 35, category: "Drinks", name: "Perrier", desc: "(330ML)", price: 2.50, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5TRY0xsk6jKpdssSWDpTbTEFzqlkOMYM4Eg&s" },
    { id: 36, category: "Drinks", name: "Fresh Juice (Glass)", desc: "Apple, Orange, or Carrot.", price: 2.50, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwwTrjrKQ6K4dDvNRKGefQ9nUVOIj6HCPUcw&s" },
    { id: 37, category: "Drinks", name: "Fruit Cooler (Glass)", desc: "Lime, Passion, or Watermelon.", price: 2.50, image: "https://coldsnap.com/cdn/shop/files/Passionate-Mango-Frozen-Smoothie_fa1d68c9-33bc-402d-ab08-b5fe96b3d48e.png?v=1764685409" },
    { id: 38, category: "Drinks", name: "Smoothies", desc: "Apple, Mango, or Passionfruit.", price: 2.50, image: "https://coldsnap.com/cdn/shop/files/Passionate-Mango-Frozen-Smoothie_fa1d68c9-33bc-402d-ab08-b5fe96b3d48e.png?v=1764685409" },
    { id: 39, category: "Drinks", name: "Specialty Tea/Latte", desc: "Coffee, Vanilla, or Tea.", price: 2.50, image: "https://www.coffeebean.com/cdn/shop/files/product_vanilla_ceylon_tea_latte_hot_iced_530x430_74cb3564-8800-4f6f-8efe-2b9324be0208.jpg?v=1736535062" },   
    { id: 40, category: "Drinks", name: "Espresso/Americano", desc: "Classic black coffee.", price: 1.50, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQubxMOnmsDgMtPeiwomKpfoejk6bSStqJ-qQ&s" }, 
    { id: 41, category: "Drinks", name: "Double Espresso", desc: "Strong double shot.", price: 2.00, image: "https://theconnoisseurconcerto.com/wp-content/uploads/2022/03/Double-Espresso.jpg" },
    { id: 42, category: "Drinks", name: "Latte/Cappuccino/Mocha", desc: "Creamy coffee favorites.", price: 2.50, image: "https://www.cremashop.dk/content/www.crema.fi/media/recipe/caffe-mocha/ingredients_a1b8624bb67b460bbb007f389cb4eadc.jpg" }, 
    { id: 43, category: "Drinks", name: "Iced Coffee", desc: "Refreshing chilled coffee.", price: 1.50, image: "https://www.allrecipes.com/thmb/Hqro0FNdnDEwDjrEoxhMfKdWfOY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/21667-easy-iced-coffee-ddmfs-4x3-0093-7becf3932bd64ed7b594d46c02d0889f.jpg" }, 
    { id: 44, category: "Drinks", name: "Khmer Tea", desc: "Local traditional tea.", price: 0.50, image: "https://images.deliveryhero.io/image/fd-kh/Products/3798750.jpg?width=%s" },  
    { id: 45, category: "Drinks", name: "Blue Margarita", desc: "Signature blue cocktail.", price: 3.00, image: "https://www.troprockin.com/wp-content/uploads/2022/06/blue-margarita.jpg" },  
    { id: 46, category: "Drinks", name: "Cambodia Beer", desc: "Local favorite (1 can).", price: 1.50, image: "https://www.monde-selection.com/wp-content/uploads/2025/05/1044851-768x768.png" },  
    { id: 47, category: "Drinks", name: "House Wine (Glass)", desc: "Red or White selection.", price: 2.00, image: "https://bravofarms.com/cdn/shop/products/red-wine.jpg?v=1646253890" },
    { id: 48, category: "Drinks", name: "Wine (Bottle)", desc: "Selected house bottle.", price: 9.00, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA_mDQyqMDvCJOE2df6htRujDEiEmIzp4b2Q&s" },  

    // DESSERTS (IDs updated to start at 49 to avoid duplicates)
    { id: 49, category: "Desserts", name: "Chocolate Lava Cake", desc: "Warm cake with a melting heart.", price: 5.00, image: "https://images.unsplash.com/photo-1624353335562-f4e22554702b?q=80&w=500&auto=format&fit=crop" },
    { id: 50, category: "Desserts", name: "Pomelo Salad", desc: "Sweet and tangy refreshing citrus.", price: 4.00, image: "https://www.beyondkimchee.com/wp-content/uploads/blogger/-ouQBJt6hLdw/T0c-zxBPCzI/AAAAAAAAEs8/-N0tEqsvhA8/s1600/frameA.jpg" },
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
    setCart((prev) => prev.map((i) => 
      i.id === id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i
    ));
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter(i => i.id !== id));
  };

  const total = useMemo(() => cart.reduce((s, i) => s + i.price * i.quantity, 0), [cart]);
  const isValid = name && phone && time && cart.length > 0;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 pb-24 bg-gray-50/30">
      
      {/* Sticky Quick Nav */}
      <nav className="sticky top-0 bg-white/80 backdrop-blur-md z-30 py-4 mb-8 border-b hidden md:block">
        <div className="flex justify-center gap-8 font-black uppercase text-xs tracking-widest text-gray-500">
          {categories.map(cat => (
            <a key={cat} href={`#${cat.replace(/\s+/g, '')}`} className="hover:text-orange-600 transition-colors">{cat}</a>
          ))}
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="space-y-16 py-8">
        {categories.map((catName) => (
          <section key={catName} id={catName.replace(/\s+/g, '')} className="scroll-mt-24">
            <header className="mb-8 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight uppercase italic">{catName}</h2>
              <div className="h-1.5 w-20 bg-orange-500 mt-2 rounded-full mx-auto md:mx-0"></div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              {fullMenu
                .filter(item => item.category.toLowerCase() === catName.toLowerCase())
                .map((dish) => (
                <div key={dish.id} className="bg-white p-4 md:p-5 rounded-3xl flex items-center gap-4 shadow-sm border border-gray-100 hover:shadow-md transition-all">
                  <img src={dish.image} className="w-24 h-24 rounded-2xl object-cover" alt={dish.name} />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-800 text-lg leading-tight truncate">{dish.name}</h3>
                    <p className="text-gray-400 text-xs mt-1 line-clamp-2">{dish.desc}</p>
                    <div className="flex justify-between items-center mt-3">
                      <p className="text-orange-600 font-black text-xl">${dish.price.toFixed(2)}</p>
                      <button 
                        onClick={() => addToCart(dish)}
                        className="bg-blue-600 text-white px-5 py-2 rounded-xl text-[10px] font-black uppercase hover:bg-blue-700 transition-colors"
                      >
                        + Add
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* --- CART SIDEBAR --- */}
      {isCartOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-[90]" onClick={() => setIsCartOpen(false)} />
          <div className="fixed inset-y-0 right-0 w-full md:w-[400px] bg-white shadow-2xl z-[100] flex flex-col">
            <div className="px-8 py-6 border-b flex justify-between items-center">
              <h2 className="text-2xl font-black text-gray-900 uppercase italic">Your Tray</h2>
              <button onClick={() => setIsCartOpen(false)} className="text-gray-400 text-3xl">&times;</button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8 space-y-6">
               <div className="space-y-4">
                 <label className="block text-xs font-bold text-gray-400 uppercase">Customer Details</label>
                 <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none" />
                 <input type="tel" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none" />
                 <input type="datetime-local" onChange={(e) => setTime(e.target.value)} className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none" />
               </div>
               
               <div className="mt-8">
                 <label className="block text-xs font-bold text-gray-400 uppercase mb-4">Items</label>
                 <div className="space-y-4">
                  {cart.length === 0 ? (
                    <p className="text-gray-400 text-center py-8">Tray is empty</p>
                  ) : (
                    cart.map(item => (
                      <div key={item.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-2xl">
                        <div className="flex-1">
                          <p className="font-bold text-sm text-gray-800">{item.name}</p>
                          <p className="text-orange-600 font-black text-xs">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <button onClick={() => updateQty(item.id, -1)} className="w-6 h-6 rounded-full bg-white border flex items-center justify-center text-gray-500">-</button>
                          <span className="font-bold text-sm">{item.quantity}</span>
                          <button onClick={() => updateQty(item.id, 1)} className="w-6 h-6 rounded-full bg-white border flex items-center justify-center text-gray-500">+</button>
                        </div>
                      </div>
                    ))
                  )}
                 </div>
               </div>
            </div>

            <div className="p-8 border-t bg-gray-50">
              <div className="flex justify-between text-2xl font-black mb-4 text-gray-900">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button 
                disabled={!isValid} 
                onClick={() => alert(`Order Confirmed for ${name}!`)} 
                className={`w-full py-4 rounded-2xl font-black text-white uppercase tracking-widest transition-all ${isValid ? 'bg-orange-600 shadow-lg shadow-orange-200' : 'bg-gray-300 cursor-not-allowed'}`}
              >
                Confirm Order
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Menu;