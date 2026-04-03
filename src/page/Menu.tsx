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

  const categories = ["Menu This Week", "Main Courses", "Starters","Sandwich & Light Bites","Pasta","Soups","Desserts","Drinks"];

  const fullMenu: Omit<Dish, 'quantity'>[] = [
    { id: 1, category: "Menu This Week", name: "Asparagus & Egg Bruschetta", desc: "ប៉័ងប្រ៊ុសខេតតាជាមួយទំពាំងបារាំង (12000​​​​៛)", price: 3.00, image: "https://boroughmarket.org.uk/wp-content/uploads/2021/02/Griddled-asparagus-soft-egg-bruschetta-2.jpg" },
    { id: 2, category: "Menu This Week", name: " Pomelo Salad with Prawns ", desc: "ញាំបង្គាជាមួយក្រូចថ្លុង (12000៛)", price: 3.00, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3AKgsm0cjU1UMaV9JM4DaYlFE4x744XbB2A&s" },
    { id: 3, category: "Menu This Week", name: "Khmer-Style Grilled Beef Salad", desc: "ញាំសាច់គោបែបខ្មែរ (12000៛)", price: 3.00, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSYk0pf7v_qeCgkzdDRfojvIKjzkzh702K_w&s" },
    { id: 4, category: "Menu This Week", name: "Khmer Hot & Sour Prawn Soup ", desc: "ស្ងោរជ្រក់បង្គា (12000៛)", price: 3.00, image: "https://ladaskitchen.wordpress.com/wp-content/uploads/2016/12/50ead-dsc_0333-1.jpeg" },
    { id: 5, category: "Menu This Week", name: "Cream of Asparagus Soup", desc: "ស៊ុបទំពាំងបារាំងគ្រីម (12000៛)", price: 3.00, image: "data:image/jpeg;base64,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" },     
    { id: 6, category: "Menu This Week", name: "Pork Milanese on a Bed of Pasta ", desc: "សាច់ជ្រូកបំពងជាមួយសូសប៉េងប៉ោះ (24000៛)", price: 6.00, image: "https://img.taste.com.au/93V52ixp/taste/2016/11/pork-milanese-with-creamy-pasta-92401-1.jpeg" },
    { id: 7, category: "Menu This Week", name: "Wok-Fried Chicken with Cashew Nuts ", desc: "ឆាសាច់មាន់ជាមួយគ្រាប់ស្វាយចន្ទី (24000៛)", price: 6.00, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3cJmCS4MzXTnHxPvD-jXAOyw3TECuTMTX6w&s" },
    { id: 8, category: "Menu This Week", name: "Grilled Salmon with Lemon Butter ", desc: "ត្រីចៀនជាមួយសូសប័រ (24000៛)", price: 6.00, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTykkb0X9yQlMQ9w_SSjh0gWJe_1S-KGbz_WQ&s" },
    { id: 9, category: "Menu This Week", name: "Beef Bourguignon", desc: "សាច់គោខប៊ូហ្គីញ៉ុង​​​​​ (​24000៛)", price: 6.00, image: "https://www.seriouseats.com/thmb/_CovX26D-Z6wpeDYJXGhFhA47H8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/MMPSOUPSANDSTEWS-SEA-BoeufBourguignon-FredHardyII-000-991c38a78f934722954c47567b6be97b.jpg" },
    { id: 10, category: "Menu This Week", name: "Spinach Frittata with Fresh Salad", desc: " ផ្ទីដុតជាមួយពងមាន (18000៛)", price: 4.50, image: "https://www.laurafuentes.com/wp-content/uploads/2021/04/Spinach-Bacon-Frittata_post_01-1.jpg" }, 
    { id: 11, category: "Menu This Week", name: "Aloo Gobi", desc: "ការីដំឡូងនឹងផ្កាខាត់បែបឥណ្ឌា (18000៛)", price: 4.50, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgZWwEOxzKre8ihHDWnzoWb73RjsYU1rKxtg&s" },
    { id: 12, category: "Menu This Week", name: "Penne ", desc: "ស្ពាហ្គាទីឬប៉េ (​24000៛)", price: 6.00, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpVriPhJdWEJtNkZAkqXFB8dKTvKWnPsUbYw&s" },  
    { id: 13, category: "Menu This Week", name: "Spaghetti", desc: "ប៉េនេ (​24000៛)", price: 6.00, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-_EkHM9MGpcc1u9tEtbOObnNDtTozT5WiLg&s" },
    { id: 14, category: "Menu This Week", name: "Creamy Seafood Marinara Pasta  ", desc: "រស់ជាតិគ្រឿងសមុទ្រ (​24000៛)", price: 6.00, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD9LmW8BmRTaVOJGhtiTYVD_CoLbOYtpqs2A&s" },
    { id: 15, category: "Menu This Week", name: "Classic Carbonara ", desc: "រស់ជាតិសាច់ជ្រូក (​24000៛)", price: 6.00, image: "https://www.marthastewart.com/thmb/S9xVtnWSHldvxPHKOxEq0bALG-k=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/MSL-338686-spaghetti-carbonara-hero-3x2-69999-560b45d1dd9f4741b717176eff024839.jpeg" },
   
    //Main Courses

    { id: 16, category: "Main Courses", name: "Pork Milanese on a Bed of Pasta ", desc: "សាច់ជ្រូកបំពងជាមួយសូសប៉េងប៉ោះ (24000៛)", price: 6.00, image: "https://img.taste.com.au/93V52ixp/taste/2016/11/pork-milanese-with-creamy-pasta-92401-1.jpeg" },
    { id: 17, category: "Main Courses", name: "Wok-Fried Chicken with Cashew Nuts ", desc: "ឆាសាច់មាន់ជាមួយគ្រាប់ស្វាយចន្ទី (24000៛)", price: 6.00, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3cJmCS4MzXTnHxPvD-jXAOyw3TECuTMTX6w&s" },
    { id: 18, category: "Main Courses", name: "Grilled Salmon with Lemon Butter ", desc: "ត្រីចៀនជាមួយសូសប័រ (24000៛)", price: 6.00, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTykkb0X9yQlMQ9w_SSjh0gWJe_1S-KGbz_WQ&s" },
    { id: 19, category: "Main Courses", name: "Beef Bourguignon", desc: "សាច់គោខប៊ូហ្គីញ៉ុង​​​​​ (​24000៛)", price: 6.00, image: "https://www.seriouseats.com/thmb/_CovX26D-Z6wpeDYJXGhFhA47H8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/MMPSOUPSANDSTEWS-SEA-BoeufBourguignon-FredHardyII-000-991c38a78f934722954c47567b6be97b.jpg" },
    { id: 20, category: "Main Courses", name: "Spinach Frittata with Fresh Salad", desc: " ផ្ទីដុតជាមួយពងមាន (18000៛)", price: 4.50, image: "https://www.laurafuentes.com/wp-content/uploads/2021/04/Spinach-Bacon-Frittata_post_01-1.jpg" }, 
    { id: 21, category: "Main Courses", name: "Aloo Gobi", desc: "ការីដំឡូងនឹងផ្កាខាត់បែបឥណ្ឌា (18000៛)", price: 4.50, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgZWwEOxzKre8ihHDWnzoWb73RjsYU1rKxtg&s" },

    //Starters

    { id: 22, category: "Starters", name: "Asparagus & Egg Bruschetta", desc: "ប៉័ងប្រ៊ុសខេតតាជាមួយទំពាំងបារាំង (12000​​​​៛)", price: 3.00, image: "https://boroughmarket.org.uk/wp-content/uploads/2021/02/Griddled-asparagus-soft-egg-bruschetta-2.jpg" },
    { id: 23, category: "Starters", name: "Pomelo Salad with Prawns ", desc: "ញាំបង្គាជាមួយក្រូចថ្លុង (12000៛)", price: 3.00, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3AKgsm0cjU1UMaV9JM4DaYlFE4x744XbB2A&s" },
    { id: 24, category: "Starters", name: "Khmer-Style Grilled Beef Salad", desc: "ញាំសាច់គោបែបខ្មែរ (12000៛)", price: 3.00, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSYk0pf7v_qeCgkzdDRfojvIKjzkzh702K_w&s" },

    //Sandwich & Light Bites

    { id: 25, category: "Sandwich & Light Bites", name: "Num Pang Pâté", desc: "នំបុ័ងប៉ាតេ (12000​​​​៛)", price: 3.00, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUGGwi7Z7DIWklFVFzq1kMfNXRuhZWqYET2g&s" },
    { id: 26, category: "Sandwich & Light Bites", name: " Veggie Burrito ", desc: "បន្លែប៉ូរីតូ (10000៛)", price: 2.50, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHKsvMaSKzn5-AZ7voUFTrICZrmTpPNzRZGA&s" },
    { id: 27, category: "Sandwich & Light Bites", name: "French Fries ", desc: "ដំឡូងបារាំងបំពង (5000៛)", price: 1.50, image: "https://kirbiecravings.com/wp-content/uploads/2019/09/easy-french-fries-1.jpg" }, 

    //Pasta

    { id: 28, category: "Pasta", name: "Penne ", desc: "ស្ពាហ្គាទីឬប៉េ (​24000៛)", price: 6.00, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpVriPhJdWEJtNkZAkqXFB8dKTvKWnPsUbYw&s" },
    { id: 29, category: "Pasta", name: "Spaghetti", desc: "ប៉េនេ (​24000៛)", price: 6.00, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-_EkHM9MGpcc1u9tEtbOObnNDtTozT5WiLg&s" },  
    { id: 30, category: "Pasta", name: "Creamy Seafood Marinara Pasta  ", desc: "រស់ជាតិគ្រឿងសមុទ្រ (​24000៛)", price: 6.00, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD9LmW8BmRTaVOJGhtiTYVD_CoLbOYtpqs2A&s" },  

    //Soups 

    { id: 31, category: "Soups", name: "Khmer Hot & Sour Prawn Soup ", desc: "ស្ងោរជ្រក់បង្គា (12000៛)", price: 3.00, image: "https://ladaskitchen.wordpress.com/wp-content/uploads/2016/12/50ead-dsc_0333-1.jpeg" },
    { id: 32, category: "Soups", name: "Cream of Asparagus Soup", desc: "ស៊ុបទំពាំងបារាំងគ្រីម (12000៛)", price: 3.00, image: "data:image/jpeg;base64,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" },     

    //Dserts

    { id:33, category:"Desserts", name: " Strawberry Mousse", desc: "នំស្រ្តប័ររីម៉ូស​ (12000៛)", price: 3.00, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqvyF-hiOIm3-B07P2xo7nmK1u0HD5HmYbgg&s" },
    { id:34, category:"Desserts", name: "Crispy Meringue", desc: "នំមឺរេងជាមួយសូសស្វាយ (12000៛)", price: 3.00, image: "https://justamumnz.com/wp-content/uploads/2022/01/Chewy-Meringues-27.jpg" },
    { id:35, category:"Desserts", name: "Bread Pudding ", desc: "នំប្រេដពុឌីង ជាមួយទឹកសូសវ៉ានីឡាក្តៅ (12000៛)", price: 3.00, image: "https://www.allrecipes.com/thmb/ljuOERn9shEaut8U1FeSBVituX4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/7177-bread-pudding-VAT-Beauty-4x3-aa78380123034d09917b999e0ab4117e.jpg" },
    { id:36, category:"Desserts", name: "Seasonal Fresh Fruit Platter ", desc: "ផ្លែឈើស្រស់ (8000៛)", price: 2.00, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-Qf0IQk6Pnuwh0k5-Niq8-vfxy_YMvWFUwg&s" },  
    { id:37, category:"Desserts", name: " Homemade Ice-Cream ", desc: "ការ៉េម (10000៛) ", price: 2.50, image: "https://barefeetinthekitchen.com/wp-content/uploads/2018/05/Easiest-Ice-Cream-1-1-of-1.jpg" },

    // Drinks
    { id:38, category:"Drinks", name: "Coke/Sprite/Soda/Tonic", desc: "", price: 1.50, image: "https://thumbs.dreamstime.com/b/coca-cola-fanta-sprite-shweppes-20280589.jpg" },
    { id:39, category:"Drinks", name: "Kulen Water (0.5L) ", desc: "", price: 1.50, image: "https://i0.wp.com/crepitaly.com/wp-content/uploads/2019/04/kulen-2.jpg?fit=225%2C225&ssl=1" },
    { id:40, category:"Drinks", name: "ulen Water (1.5L) ", desc: "", price: 2.50, image: "https://i0.wp.com/crepitaly.com/wp-content/uploads/2019/04/kulen-2.jpg?fit=225%2C225&ssl=1" },
    { id:41, category:"Drinks", name: "Perrier (330ML) ", desc: "", price: 2.50, image: "https://www.webstaurantstore.com/images/products/landscape/798632/2809999.jpg" },
    { id:42, category:"Drinks", name: "Apple/Orange/Carrot ", desc: "", price: 2.50, image: "https://previews.123rf.com/images/viperagp/viperagp1210/viperagp121000094/15544962-fresh-fruit-juice-with-apple-orange-and-carrot.jpg" },   
    { id:43, category:"Drinks", name: "Lime/Passion/Watermelon ", desc: "", price: 2.50, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZdUcogMR33RQIYP5bu1S_suIuNVh2p-B8RA&s" }, 
    { id:44, category:"Drinks", name: "Apple /Mango/Passion ", desc: "", price: 2.50, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzxGjSZmBJXlpyxVCj7XMpUBhCxdrRpB0U3Q&s" },
    { id:45, category:"Drinks", name: "Apple/Coconut/Chocolate", desc: "", price: 3.00, image: "https://sprinkleofflavor.com/wp-content/uploads/2019/10/Chocolate-Caramel-Apple-Cocktail-1.jpg" },
    { id:46, category:"Drinks", name: "Lemonade (Lime/Passion/Watermelon) ", desc: "", price: 2.50, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ11W_Lry_2zbz9d2seeKYev4O_1VxOWgbvyA&s" },
    { id:47, category:"Drinks", name: "Espresso/Americano", desc: "", price: 1.50, image: "https://giraffyco.com/cdn/shop/articles/v2-120grc-0jkgf.jpg?v=1759821577&width=320" },  
    { id:48, category:"Drinks", name: "Double Espresso", desc: "", price: 2.00, image: "https://theconnoisseurconcerto.com/wp-content/uploads/2022/03/Double-Espresso.jpg" },
    { id:49, category:"Drinks", name: "Latte/Cappuccino/Mocha", desc: "", price: 2.50, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgi7rlRupYtqy_T3wxzo_NGTk0QeqTUqJYCg&s" },
    { id:50, category:"Drinks", name: "Iced Coffee ", desc: "", price: 1.50, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFpk9OVoWHm5y2yK0V4o6R81oQtSSLwarkTw&s" },
    { id:51, category:"Drinks", name: "Khmer Tea", desc: "", price: 0.50, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8M5CLAMO3SHamUoi-vb_BamVtnA4vDmJnfg&s" },  
    { id:52, category:"Drinks", name: "Black/Green/Red", desc: "", price: 1.50, image: "https://images.squarespace-cdn.com/content/v1/68f206cca9dce96f2599130d/1760691945950-LCWQLP1HD8ZB65OP9ZLG/%401.png" },
    { id:53, category:"Drinks", name: "CINDERELLA ", desc: "", price: 2.50, image: "https://mittengirl.com/wp-content/uploads/2024/01/cinderella-mocktail-SQ.jpg" },
    { id:54, category:"Drinks", name: "PASSION BLOODY", desc: "", price: 2.50, image: "https://images.immediate.co.uk/production/volatile/sites/30/2025/04/Passion-fruit-mule-10ca1d0.jpg" },  
    { id:55, category:"Drinks", name: "BLUE MARGARITA", desc: "", price: 3.00, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9dbLyv6v06VTAxelPwmioLEWwUDqvs5bbqA&s" },
    { id:56, category:"Drinks", name: "MOJITO ", desc: "", price: 3.00, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtwaP80FlMnpCynYz-Vu68aYlTL6lR1dJZ2A&s" },
    { id:57, category:"Drinks", name: "SAMAI MAITAI ", desc: "", price: 3.00, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBMH1wrWNKPt7IlVXX_aE7dWQbun7S6IdytQ&s" },
    { id:58, category:"Drinks", name: "Cambodia Beer", desc: "", price: 1.50, image: "https://foodpanda.dhmedia.io/image/nv/Cambodia/Chip-Mong-Supermarket-Eden-Garden/new-8/8847100740137.jpg?width=176&height=176" },
    { id:59, category:"Drinks", name: "Wine by Glass ", desc: "", price: 2.00, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQll3ir36-qIPrda-gtBhPqvekqo1b_NreQOw&s" },
    { id:60, category:"Drinks", name: "Wine by bottle", desc: "", price: 9.00, image: "https://buywinesonline.com/cdn/shop/products/20BottlesofPerfectSummerWines2.jpg?v=1637615120&width=1997" },








  ];

  const addToCart = (dish: any) => {
    setCart((prev) => {
      const exist = prev.find((i) => i.id === dish.id);
      if (exist) return prev.map((i) => i.id === dish.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...dish, quantity: 1 }];
    });
    // Optional: Auto-open tray on first item
    if (cart.length === 0) setIsCartOpen(true);
  };

  const updateQty = (id: number, delta: number) => {
    setCart((prev) => prev.map((i) => 
      i.id === id ? { ...i, quantity: Math.max(0, i.quantity + delta) } : i
    ).filter(i => i.quantity > 0));
  };

  const total = useMemo(() => cart.reduce((s, i) => s + i.price * i.quantity, 0), [cart]);
  const isValid = name && phone && time && cart.length > 0;

  return (
    <div className="min-h-screen w-full bg-white text-[#024a6c] font-sans selection:bg-orange-100">
    

      
<nav className="sticky top-0 bg-white/80 backdrop-blur-md z-40 border-b border-gray-50 mb-8 font-['Work_Sans']">
  <div className="max-w-7xl mx-auto px-9 py-9"> 
    <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-4">
      {categories.map(cat => (
        <a 
          key={cat} 
          href={`#${cat}`} 
          className="text-[12px] font-black uppercase tracking-[0.15em] text-slate-500 hover:text-orange-600 transition-all duration-300 relative group whitespace-nowrap"
        >
          {cat}
          {/* Optional: Animated underline for extra polish */}
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-600 transition-all duration-300 group-hover:w-full"></span>
        </a>
      ))}
    </div>
  </div>
</nav>

      {/* MENU CONTENT */}
      <main className="max-w-6xl mx-auto px-8 pb-30">
        {categories.map((catName) => (
          <section key={catName} id={catName} className="mb-19 scroll-mt-30">
            <h2 className="text-xl font-black uppercase tracking-tight mb-8 text-[#024a6c]  font-['Work_Sans']">{catName}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-19 bg">
              {fullMenu.filter(item => item.category === catName).map((dish) => (
                <div key={dish.id} className="flex items-start gap-10 group cursor-pointer bg-gray-50 rounded-2xl p-3 shadow hover:shadow-lg" onClick={() => addToCart(dish)}>
                  <div className="relative w-30 h-30 shrink-0 overflow-hidden rounded-2xl">
                    <img src={dish.image} className="w-full h-full object-cover " alt="" />
                  </div>
                  <div className="flex-3">
                    <h3 className="font-bold text-lg font-['Work_Sans'] ">{dish.name}</h3>
                    <p className="text-slate-500 text-[17px] mt-3 line-clamp-2 leading-relaxed font-['Work_Sans']">{dish.desc}</p>
                    <div className="mt-5 flex items-center gap-40">
                       <span className="font-black text-orange-600 font-['Work_Sans'] text-[20px]">${dish.price.toFixed(2)}</span>
                       <span className="text-[15px] font-black text-white bg-orange-600  text-center w-20  rounded-2xl transition-colors font-['Work_Sans']">+  Add</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>

      {/* FLOATING CART TRIGGER */}
      {cart.length > 0 && !isCartOpen && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full px-6 max-w-md ">
          <button 
            onClick={() => setIsCartOpen(true)}
            className="w-full bg-orange-500 text-white p-4 rounded-3xl shadow-2xl flex justify-between items-center animate-in slide-in-from-bottom-10 "
          >
            <div className="flex items-center gap-3">
              <span className="bg-orange-800 w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold">{cart.length}</span>
              <span className="text-xs font-black uppercase tracking-widest font-['Work_Sans']">View Your Tray</span>
            </div>
            <span className="font-black text-lg font-['Work_Sans']">${total.toFixed(2)}</span>
          </button>
        </div>
      )}

      {/* THE TRAY DRAWER */}
      <aside className={`
        fixed inset-y-0 right-0 z-[100]  w-full sm:w-[450px] bg-white shadow-[-30px_0_60px_rgba(0,0,0,0.1)]
        flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
        ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        {/* Header */}
        <div className="p-8 border-b border-gray-50 flex justify-between items-center">
          <button onClick={() => setIsCartOpen(false)} className="text-orange-600 transition-colors uppercase text-[15px] font-black tracking-widest flex items-center gap-2 font-['Work_Sans']">
            ← Back to Menu
          </button>
          <span className="text-[10px] font-black text-[#024a6c] uppercase tracking-widest font-['Work_Sans']">Tray ({cart.length})</span>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-12">
          {/* Form */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-black text-[#024a6c] uppercase tracking-[0.2em] font-['Work_Sans']">Order Info</h4>
            <div className="space-y-2 font-['Work_Sans']">
              <input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} className="w-full bg-gray-50 border-none p-4 rounded-2xl text-sm focus:ring-1 focus:ring-orange-500 outline-none transition-all" />
              <input type="tel" placeholder="Phone Number" value={phone} onChange={e => setPhone(e.target.value)} className="w-full bg-gray-50 border-none p-4 rounded-2xl text-sm focus:ring-1 focus:ring-orange-500 outline-none transition-all" />
              <input type="datetime-local" value={time} onChange={e => setTime(e.target.value)} className="w-full bg-gray-50 border-none p-4 rounded-2xl text-sm text-slate-400 outline-none" />
            </div>
          </div>

          {/* List */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] font-['Work_Sans']">Selected Items</h4>
            <div className="space-y-6">
              {cart.map(item => (
                <div key={item.id} className="flex items-center gap-4">
                  <img src={item.image} className="w-14 h-14 rounded-xl object-cover" alt="" />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm truncate leading-none mb-1">{item.name}</p>
                    <p className="text-orange-600 font-bold text-xs">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-3 bg-gray-50 px-3 py-1.5 rounded-xl">
                    <button onClick={() => updateQty(item.id, -1)} className="text-slate-400 font-bold text-lg">-</button>
                    <span className="font-bold text-xs">{item.quantity}</span>
                    <button onClick={() => updateQty(item.id, 1)} className="text-slate-400 font-bold text-lg">+</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-8 bg-gray-50/50">
          <div className="flex justify-between items-end mb-6 px-2">
             <span className="text-[10px] font-black text-orange-600 uppercase tracking-widest font-['Work_Sans']">Subtotal</span>
             <span className="text-3xl font-black text-slate-900 tracking-tighter font-['Work_Sans']">${total.toFixed(2)}</span>
          </div>
          <button 
            disabled={!isValid} 
            className={`w-full py-5 rounded-2xl font-['Work_Sans'] font-black text-white uppercase tracking-[0.3em] text-[10px] transition-all shadow-xl shadow-slate-200 ${
              isValid ? 'bg-orange-600 hover:bg-slate-900' : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            Confirm Order
          </button>
        </div>
      </aside>

      {/* BLUR OVERLAY */}
      {isCartOpen && (
        <div 
          className="fixed inset-0 bg-white/60 backdrop-blur-sm z-[90] animate-in fade-in"
          onClick={() => setIsCartOpen(false)}
        />
      )}
    </div>
  );
};

export default Menu;