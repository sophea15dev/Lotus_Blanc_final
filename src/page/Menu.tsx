<<<<<<< HEAD
import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, CheckCircle2, ArrowRight, Trash2, UtensilsCrossed, LayoutGrid } from "lucide-react";
=======
import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios"; 
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, Trash2, ShoppingBag, CheckCircle } from "lucide-react";
>>>>>>> 7c68cce085af6e779b8476bbc52a539dbbc4a920

interface Dish {
  id: number;
  name: string;
  desc: string;
  price: number;
  image: string;
  category: string;
<<<<<<< HEAD
  cartId?: number;
=======
  cartId?: number; 
>>>>>>> 7c68cce085af6e779b8476bbc52a539dbbc4a920
}

const Menu: React.FC = () => {
  const navigate = useNavigate();
<<<<<<< HEAD
  const [cart, setCart] = useState<Dish[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  
  const KHR_RATE = 4100;
=======
  
  // --- STATE ---
  const [fullMenu, setFullMenu] = useState<Dish[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [cart, setCart] = useState<Dish[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [orderLoading, setOrderLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
>>>>>>> 7c68cce085af6e779b8476bbc52a539dbbc4a920
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<any>(null);

  const [formData, setFormData] = useState({
<<<<<<< HEAD
    name: "", phone: "", date: "", time: "", note: "" 
  });

  const formatKHR = (usd: number) => (usd * KHR_RATE).toLocaleString() + "៛";

  const fullMenu: Dish[] = [
    // STARTERS
    { id: 1, category: "Starters", name: "Asparagus & Egg Bruschetta", desc: "ប៉័ងប្រ៊ុសខេតតាជាមួយទំពាំងបារាំង", price: 3.00, image: "https://boroughmarket.org.uk/wp-content/uploads/2021/02/Griddled-asparagus-soft-egg-bruschetta-2.jpg" },
    { id: 2, category: "Starters", name: "Pomelo Salad with Prawns", desc: "ញាំបង្គាជាមួយក្រូចថ្លុង", price: 3.00, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3AKgsm0cjU1UMaV9JM4DaYlFE4x744XbB2A&s" },
    { id: 3, category: "Starters", name: "Grilled Octopus", desc: "ញាំសាច់គោបែបខ្មែរ", price: 3.00, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR73UyGDSHy_-NKHMKZVKIM-ru4PmrE-OwY_w&s" },
    // SOUPS
    { id: 4, category: "Soups", name: "Khmer Hot & Sour Prawn Soup", desc: "ស្ងោរជ្រក់បង្គា", price: 3.00, image: "https://www.hwcmagazine.com/wp-content/uploads/2012/01/Tom-Yum-Soup-4582.jpg" },
    { id: 5, category: "Soups", name: "Cream of Asparagus Soup ", desc: "ស៊ុបទំពាំងបារាំងគ្រីម ", price: 3.00, image: "data:image/jpeg;base64,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" },

    // MAIN COURSE
    { id: 6, category: "Mains", name: "Pork Milanese on a Bed of Pasta", desc: "សាច់ជ្រូកបំពងជាមួយសូសប៉េងប៉ោះ ", price: 6.00, image: "https://as2.ftcdn.net/jpg/04/11/84/19/1000_F_411841910_fMYI2nk8bapFGQEqdJpkdttaTXGJQJuw.jpg" },
    { id: 7, category: "Mains", name: "Wok-Fried Chicken with Cashew Nuts ", desc: "ឆាសាច់មាន់ជាមួយគ្រាប់ស្វាយចន្ទី (", price: 6.00, image: "https://www.riversidethaicooking.com/wp-content/uploads/2020/06/new-chicken-cashew-header-1024x688.jpg" },
    { id: 8 , category: "Mains", name: "Grilled Fish with Mashed Pumpkin & Lemon Butter ", desc: "ត្រីចៀនជាមួយសូសប័រ ", price: 6.00, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTykkb0X9yQlMQ9w_SSjh0gWJe_1S-KGbz_WQ&s" },
    { id: 9 , category: "Mains", name: "Beef Bourguignon", desc: "សាច់គោខប៊ូហ្គីញ៉ុង", price: 6.00, image: "https://www.seriouseats.com/thmb/_CovX26D-Z6wpeDYJXGhFhA47H8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/MMPSOUPSANDSTEWS-SEA-BoeufBourguignon-FredHardyII-000-991c38a78f934722954c47567b6be97b.jpg" },  
    { id: 10 , category: "Mains", name: "Spinach Frittata with Fresh Salad", desc: " ផ្ទីដុតជាមួយពងមាន់", price: 4.50, image: "https://www.eatingwell.com/thmb/AQiGKRkmhLmzfHOsOD5WrS400ZM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/6599303-5259c0cef15c4109bbb6c763c56b15b4.jpg" }, 
    { id: 11 , category: "Mains", name: "Aloo Gobi ", desc: "ការីដំឡូងនឹងផ្កាខាត់បែបឥណ្ឌា", price: 4.50, image: "https://static01.nyt.com/images/2023/12/21/multimedia/ND-Aloo-Gobi-gkwc/ND-Aloo-Gobi-gkwc-threeByTwoLargeAt2X.jpg" }, 
    // PASTA
    { id: 12, category: "Pasta", name: "Spaghetti", desc: "", price: 6.00, image: "https://www.inspiredtaste.net/wp-content/uploads/2019/03/Spaghetti-with-Meat-Sauce-Recipe-1-1200.jpg" },
    { id: 13, category: "Pasta", name: "Penne", desc: "", price: 6.00, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbVGlKr0u1wtXWV4ji_JLEmun2oh2zgIgpvA&s" },
    { id: 14, category: "Pasta", name: "Creamy Seafood Marinara Pasta ", desc: "", price: 6.00, image: "https://foodess.com/wp-content/uploads/2021/08/Shrimp-and-Scallop-Pasta-in-Garlic-Cream-Sauce-1-5-scaled.jpg" },

    // SANDWICHES
    { id: 16, category: "Sandwiches", name: "Num Pang Pâté", desc: "នំបុ័ងប៉ាតេ ", price: 3.00, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUGGwi7Z7DIWklFVFzq1kMfNXRuhZWqYET2g&s" },
    { id: 17, category: "Sandwiches", name: "Veggie Burrito", desc: "បន្លែប៉ូរីតូ", price: 2.50, image: "https://i0.wp.com/smittenkitchen.com/wp-content/uploads/2023/03/vegetable-burrito-10-scaled.jpg?fit=1200%2C800&ssl=1" },
    { id: 18, category: "Sandwiches", name: "French Fries", desc: "ដំឡូងបារាំងបំពង", price: 1.50, image: "https://www.allrecipes.com/thmb/8_B6OD1w6h1V0zPi8KAGzD41Kzs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/50223-homemade-crispy-seasoned-french-fries-VAT-Beauty-4x3-789ecb2eaed34d6e879b9a93dd56a50a.jpg" },

    // DESSERTS
    { id: 19, category: "Desserts", name: "Strawberry Mousse", desc: "នំស្រ្តប័ររីម៉ូស", price: 3.00, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoypOB98hHKG5px0dK-J2WKzZCCCsGQopTWA&s" },
    { id: 20, category: "Desserts", name: "Crispy Meringue ", desc: "នំមឺរេងជាមួយសូសស្វាយ", price: 3.00, image: "https://justamumnz.com/wp-content/uploads/2022/01/Chewy-Meringues-27.jpg" },
    { id: 21, category: "Desserts", name: "Bread Pudding", desc: "នំប្រេដពុឌីង ជាមួយទឹកសូសវ៉ានីឡាក្តៅ", price: 3.00, image: "https://realhousemoms.com/wp-content/uploads/Bread-Pudding-Recipe-with-Vanilla-Caramel-Sauce-RECIPE-CARD.jpg" },
    { id: 22, category: "Desserts", name: "Seasonal Fresh Fruit Platter", desc: "ផ្លែឈើស្រស់(", price: 2.00, image: "https://scontent.fpnh10-1.fna.fbcdn.net/v/t39.30808-6/505408522_9656762411099846_4605277545137618405_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=13d280&_nc_ohc=DXJ--AnZEfkQ7kNvwFNOaYN&_nc_oc=AdoERoa6tJsSfaDzIkwJQP7RWwmf3PzwF2iRsZRNbfU9Iw0FSY9eqF4Jq6FyXby4v7o&_nc_zt=23&_nc_ht=scontent.fpnh10-1.fna&_nc_gid=yhDY_tHWsbL5dwAfRo04Tw&_nc_ss=7a389&oh=00_Af00jzOmWPf9lpAgyg7DxaRrvvEecdvh6ZQebQiJDHVWaA&oe=69DA6B7D" },
    { id: 23, category: "Desserts", name: "Homemade Ice-Cream ", desc: " ការ៉េម ", price: 2.50, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRmuIyIXF5v525EjWCwk2Rsavd7Yyt3bUv6Q&s" },

    // DRINKS
    { id: 24, category: "Drinks", name: "Coke/Sprite/Soda/Tonic", desc: "", price: 1.50, image: "https://thumbs.dreamstime.com/b/coca-cola-fanta-sprite-bottles-chisinau-moldova-november-isolated-white-three-drinks-produced-company-64145080.jpg" },
    { id: 25, category: "Drinks", name: "Kulen Water (0.5L)", desc: "ទឹកគុលែន (0.5L)", price: 1.50, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi7vJxl6K5jWDw5tgSyQL5ZGTR2ojqQbPCgA&s" },
    { id: 26, category: "Drinks", name: "Kulen Water (1.5L) ", desc: "ទឹកគុលែន (1.5L)", price: 2.50, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzGYeUjZ2RO_vCTk2ZaZTGlBhWQp54gZlTHQ&s" },
    { id: 27, category: "Drinks", name: "Perrier (330ML) ", desc: "ប្រភេទទឹក", price: 2.50, image: "https://www.bbassets.com/media/uploads/p/l/40022933_8-perrier-water-glass-bottle.jpg" },
    { id: 28, category: "Drinks", name: "Apple/Orange/Carrot", desc: "ទឹកផ្លែឈើ", price: 2.50, image: "https://i.ytimg.com/vi/zccsW0djAXw/maxresdefault.jpg" }, 
    { id: 29, category: "Drinks", name: "Lime/Passion/Watermelon   ", desc: "ទឹកផ្លែឈើ", price: 2.50, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZdUcogMR33RQIYP5bu1S_suIuNVh2p-B8RA&s" },  
    { id: 30, category: "Drinks", name: "Apple /Mango/Passion ", desc: "ទឹកផ្លែឈើ", price: 2.50, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvjXXo8WIiMfoyJMaWO05DFPlvj2-av6QDNQ&s" }, 
    { id: 31, category: "Drinks", name: "Apple/Coconut/Chocolate ", desc: "ទឹកផ្លែឈើ", price: 3.00, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoOP_AUiKWPTD821yzad3fYJvgjXiJ8Ex1kQ&s" },
    { id: 32, category: "Drinks", name: "Coffee/Vanilla/Tea ", desc: "", price: 2.50, image: "https://www.coffeebean.com/cdn/shop/files/product_vanilla_ceylon_tea_latte_hot_iced_530x430_74cb3564-8800-4f6f-8efe-2b9324be0208.jpg?v=1736535062" }, 
    { id: 33, category: "Drinks", name: "presso/Americano ", desc: "", price: 1.50, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoqdhJzexwZLGPnMOOk8SESzeIRG7Krn9u2g&s" }, 
    { id: 34, category: "Drinks", name: "Double Espresso", desc: "", price: 2.00, image: "https://pre1673.boxcardonuts.ca/wp-content/uploads/2021/07/espresso-e1684697251652.png" }, 
    { id: 35, category: "Drinks", name: "Latte/Cappuccino/Mocha", desc: "", price: 2.50, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgi7rlRupYtqy_T3wxzo_NGTk0QeqTUqJYCg&s" }, 
    { id: 36, category: "Drinks", name: "Iced Coffee", desc: "", price: 1.50, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt9FzRPcVVGzGUP7c-G7VQ_uUQ0mSp3oUFQA&s" }, 
    { id: 37, category: "Drinks", name: "Khmer Tea", desc: "", price: 0.50, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQMP7pg_UqlYpvs8q8CHIVgVVm6-U5Pn6-GQ&s" },
    { id: 38, category: "Drinks", name: "Black/Green/Red ", desc: "", price: 1.50, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ73vEUxMtTw2sXlaiDOZb1sbajYWjxSKad_Q&s" },  
    { id: 39, category: "Drinks", name: "CINDERELLA ", desc: "", price: 2.50, image: "https://mittengirl.com/wp-content/uploads/2024/01/cinderella-mocktail-SQ.jpg" },
    { id: 40, category: "Drinks", name: "PASSION BLOODY", desc: "", price: 2.50, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQctCo-h5YjULqywWX9ftlcg14xUPPf8P6kng&s" },
    { id: 41, category: "Drinks", name: "BLUE MARGARITA ", desc: "", price: 3.00, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvwZoQ9tWWgovhomRSbYPllIYGWLRg6XVtig&s" },
    { id: 42, category: "Drinks", name: "MOJITO  ", desc: "", price: 3.00, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtwaP80FlMnpCynYz-Vu68aYlTL6lR1dJZ2A&s" },
    { id: 43, category: "Drinks", name: "SAMAI MAITAI ", desc: "", price: 3.00, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAWFG12LOiwKrnA5nRSx0hpmRqt3rnCwWbBA&s" },
    { id: 44, category: "Drinks", name: "Cambodia Beer ", desc: "", price: 1.50, image: "https://www.monde-selection.com/wp-content/uploads/2025/05/1044851-768x768.png" },
    { id: 45, category: "Drinks", name: "Wine by Glass", desc: "", price: 2.00, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfjp6ibkWVuPlsAHxaQ07rq3PSR8Y9s-GEFw&s" },
    { id: 46, category: "Drinks", name: "Wine by Bottle ", desc: "", price: 9.00, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfjp6ibkWVuPlsAHxaQ07rq3PSR8Y9s-GEFw&s" },
  ];

  const categories = ["All", "Starters", "Soups", "Mains", "Pasta", "Desserts", "Sandwiches", "Drinks"];

  const filteredMenu = useMemo(() => {
    return activeCategory === "All" ? fullMenu : fullMenu.filter(d => d.category === activeCategory);
  }, [activeCategory]);

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

=======
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
>>>>>>> 7c68cce085af6e779b8476bbc52a539dbbc4a920
  const handleAddToCart = (dish: Dish) => {
    setCart((prev) => [...prev, { ...dish, cartId: Date.now() }]);
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (cartId: number) => {
    setCart((prev) => prev.filter(item => item.cartId !== cartId));
  };

<<<<<<< HEAD
  const handleFinalOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return alert("Empty cart!");
    setLoading(true);
    try {
      await api.post("/api/orders/pre-order", {
        customerId: formData.phone,
        customerName: formData.name,
        items: cart.map(i => ({ productId: i.name, quantity: 1, note: `${formData.date} | ${formData.time}` })),
      });
      setSubmittedData({ ...formData, items: [...cart], total: totalPrice });
      setIsSubmitted(true);
      setCart([]);
    } catch (err) { alert("Error!"); } finally { setLoading(false); }
  };

  return (
    <div className="w-full mx-auto md:px-25 px-8 py-4 bg-slate-50/30 min-h-screen  ">
      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.div key="menu-view" initial={{ opacity: 0 }} animate={{ opacity: 2 }} exit={{ opacity: 0 }} className="flex flex-col lg:flex-row gap-8 items-start">
            
            {/* LEFT: MENU SECTION */}
            <div className={`transition-all duration-500 grow ${cart.length > 0 ? "lg:w-[60%]" : "w-full"}`}>
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-8">
                
                {/* CATEGORY FILTER */}
                <div className="flex gap-2 overflow-x-auto pb-5 no-scrollbar">
                  {categories.map(cat => (
                    <button 
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-10 py-4 rounded-full text-[12px] font-black uppercase transition-all whitespace-nowrap ${activeCategory === cat ? 'bg-[#004e70] text-white' : 'bg-white text-slate-700 border border-slate-100 hover:border-blue-300'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredMenu.map((dish) => (
                  <motion.div layout key={dish.id} className="flex bg-white rounded-[40px] p-4 shadow-md border border-slate-50 items-center hover:shadow-xl transition-all">
                    <img src={dish.image} className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-[30px] shadow-sm" alt={dish.name} />
                    <div className="ml-5 flex-1">
                      <span className="text-[9px] font-black text-[#f26522] uppercase tracking-tighter">{dish.category}</span>
                      <h3 className="font-black text-[#004e70] text-[16px] italic leading-tight">{dish.name}</h3>
                      <p className="text-slate-400 text-[15px] mt-1 italic leading-tight">{dish.desc}</p>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="font-black text-[#004e70] text-lg leading-none">${dish.price.toFixed(2)}</span>
                          <span className="text-slate-300 text-[10px] font-bold">{formatKHR(dish.price)}</span>
                        </div>
                        <button onClick={() => handleAddToCart(dish)} className="bg-[#004e70] text-white text-[12px] font-black py-2 px-5 rounded-full uppercase  transition-all">+ Add</button>
                      </div>
                    </div>
=======
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
>>>>>>> 7c68cce085af6e779b8476bbc52a539dbbc4a920
                  </motion.div>
                ))}
              </div>
            </div>

<<<<<<< HEAD
            {/* RIGHT: CART SIDEBAR */}
            {cart.length > 0 && isCartOpen && (
              <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="w-full lg:w-[420px] sticky top-10">
                <div className="bg-white border border-slate-100 rounded-[50px] p-8 shadow-2xl shadow-slate-200">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-[#004e70] font-black text-xl uppercase italic">My Cart ({cart.length})</h2>
                    <button onClick={() => setIsCartOpen(false)} className="text-slate-300 hover:text-red-500"><X size={24} /></button>
                  </div>

                  <div className="max-h-[200px] overflow-y-auto mb-6 pr-2 space-y-2">
                    {cart.map((item) => (
                      <div key={item.cartId} className="flex justify-between items-center bg-slate-50/50 p-3 rounded-2xl border border-slate-50">
                        <div className="flex-1">
                          <p className="text-[#004e70] font-black text-[15px] uppercase truncate">{item.name}</p>
                          <p className="text-[#f26522] font-bold text-[15px]">${item.price.toFixed(2)} / {formatKHR(item.price)}</p>
                        </div>
                        <button onClick={() => handleRemoveFromCart(item.cartId!)} className="ml-2 text-slate-300 hover:text-red-400 transition-colors"><Trash2 size={16} /></button>
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleFinalOrder} className="space-y-3">
                    <input type="text" placeholder="Full Name *" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full p-4 rounded-2xl bg-slate-50 border-none text-[15px] focus:ring-2 focus:ring-[#004e70] outline-none" />
                    <input type="tel" placeholder="Phone Number *" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full p-4 rounded-2xl bg-slate-50 border-none text-[15px] focus:ring-2 focus:ring-[#004e70] outline-none" />
                    <div className="flex gap-2">
                      <input type="date" required className="w-1/2 p-4 rounded-2xl bg-slate-50 border-none text-[15px] outline-none" onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
                      <input type="time" required className="w-1/2 p-4 rounded-2xl bg-slate-50 border-none text-[15px] outline-none" onChange={(e) => setFormData({ ...formData, time: e.target.value })} />
                    </div>
                    
                    <div className="pt-6 border-t mt-4 flex justify-between items-center">
                      <span className="text-slate-600 font-black text-[15px] uppercase tracking-widest">Total Pay</span>
                      <div className="text-right">
                        <span className="text-[#f26522] font-black text-3xl tracking-tighter block leading-none">${totalPrice.toFixed(2)}</span>
                        <span className="text-slate-800 font-bold text-[15px]">{formatKHR(totalPrice)}</span>
                      </div>
                    </div>

                    <button type="submit" disabled={loading} className="w-full py-4 mt-4 bg-[#004e70] text-white rounded-[20px] font-black uppercase text-[15px] tracking-widest shadow-xl shadow-blue-100 hover:scale-[1.02] active:scale-95 transition-all">
                      {loading ? <Loader2 className="animate-spin mx-auto" /> : "Order Now"}
                    </button>
                  </form>
                </div>
              </motion.div>
            )}
          </motion.div>
        ) : (
          /* --- VIEW 2: SUCCESS RECEIPT --- */
          <motion.div key="success-view" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-4xl mx-auto min-h-[600px] bg-white rounded-[50px] shadow-2xl overflow-hidden grid md:grid-cols-12 border border-slate-50">
            <div className="md:col-span-5 relative min-h-[250px]">
              <img src={submittedData.items[0]?.image} className="absolute inset-0 w-full h-full object-cover" alt="Confirmed" />
              <div className="absolute inset-0 bg-[#004e70]/40 mix-blend-multiply" />
              <div className="absolute inset-0 flex items-center justify-center">
              </div>
            </div>

            <div className="md:col-span-7 p-8 md:p-14 text-center">
              <h2 className="text-[#004e70] font-black text-3xl uppercase italic mb-6 tracking-tighter">Request Received!</h2>

              <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[30px] p-8 text-left space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-[#f26522] font-black text-xl uppercase italic">{submittedData.name}</h3>
                  <UtensilsCrossed className="text-[#004e70]" size={20} />
                </div>
                
                <div className="border-y border-slate-200 py-3 space-y-2">
                   {submittedData.items.map((item: any, idx: number) => (
                     <div key={idx} className="flex justify-between text-sm">
                        <span className="text-[rgb(0,78,112)] font-bold italic">{item.name}</span>
                        <span className="text-[#004e70] font-medium tracking-tighter">x1 — ${item.price.toFixed(2)}</span>
                     </div>
                   ))}
                </div>

                <div className="grid grid-cols-2 gap-y-2 text-[14px]">
                  <span className="text-[#004e70] uppercase font-black text-[10px]">Date/Time</span>
                  <span className="text-right text-[#004e70] font-bold">{submittedData.date} | {submittedData.time}</span>
                  <span className="text-[#004e70] uppercase font-black text-[10px]">Contact</span>
                  <span className="text-right text-[#004e70] font-bold">{submittedData.phone}</span>
                </div>

                <div className="pt-4 border-t border-slate-200 flex justify-between items-center">
                  <span className="text-[#004e70] font-black text-[12px] uppercase">Final Amount</span>
                  <div className="text-right">
                    <span className="text-[#f26522] font-black text-3xl tracking-tighter block leading-none">${submittedData.total.toFixed(2)}</span>
                    <span className="text-slate-600 font-bold text-[15px]">{formatKHR(submittedData.total)}</span>
=======
            {/* RIGHT: CART PANEL */}
            {cart.length > 0 && (
              <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} className="w-full lg:w-[400px] lg:sticky lg:top-10">
                <div className="bg-white border border-slate-100 rounded-[45px] p-8 shadow-2xl shadow-slate-200">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-[#004e70] font-black text-xl uppercase italic flex items-center gap-2">
                      <ShoppingBag size={20} /> My Order ({cart.length})
                    </h2>
>>>>>>> 7c68cce085af6e779b8476bbc52a539dbbc4a920
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
<<<<<<< HEAD
              </div>

              <div className="mt-8 flex gap-4">
                <button onClick={() => navigate("/")} className="flex-1 py-4 bg-[#004e70] text-white rounded-2xl font-black uppercase text-[15px] hover:bg-[#00354d] transition-all">Home</button>
                <button onClick={() => setIsSubmitted(false)} className="flex-1 py-4 bg-[#f26522] text-white rounded-2xl font-black uppercase text-[12px] flex items-center justify-center gap-2 hover:bg-[#d4561c] transition-all">Order More <ArrowRight size={16} /></button>
              </div>
            </div>
=======
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
>>>>>>> 7c68cce085af6e779b8476bbc52a539dbbc4a920
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Menu;