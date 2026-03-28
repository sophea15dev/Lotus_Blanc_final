import React, { useState } from "react";
import { useLocation } from "react-router-dom";

// --- TYPES & INTERFACES ---
interface LocationState {
  category?: string;
}

interface FoodItem {
  name: string;
  price: string;
  desc: string;
  image: string;
}

interface CartItem extends FoodItem {
  quantity: number;
}

interface Category {
  title: string;
  items: FoodItem[];
}

export default function MenuPage() {
  const location = useLocation();
  const selectedCategory = (location.state as LocationState)?.category;

  // --- STATES ---
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [customer, setCustomer] = useState({ name: "", phone: "" });

  // --- CART LOGIC ---
  const addToCart = (dish: FoodItem) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.name === dish.name);
      if (existing) {
        return prev.map((item) =>
          item.name === dish.name ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...dish, quantity: 1 }];
    });
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handlePreOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer.name || !customer.phone) return alert("Please fill in details");

    // Process the order (Logic for backend or WhatsApp goes here)
    console.log("Customer:", customer);
    console.log("Order Items:", cart);

    alert(`Success! Thank you ${customer.name}. Your order for ${totalItems} items has been received.`);
    
    // Reset after success
    setCart([]);
    setCustomer({ name: "", phone: "" });
    setIsModalOpen(false);
  };

  const categories: Category[] = [
    {
      title: "Western Food",
      items: [
        {
          name: "Creamy Seafood Marinara Pasta",
          price: "$6.00",
          desc: "Pasta tossed with mixed seafood in a rice tomato cream sauce.",
          image: "https://yeyfood.com/wp-content/uploads/2024/10/WEB1close-up_shot_of_creamy_shrimp_penne_pasta._in_whi_a46de50a-49a4-41ee-81bb-c6cc6c646ac9_0-735x735.jpg",
        },
        {
          name: "Classice Carbonara",
          price: "$6.00",
          desc: "Creamy pasta with bacon, parmesan cheese and egg.",
          image: "https://littlespoonfarm.com/wp-content/uploads/2024/07/Pasta-Carbonara-Recipe.jpg",
        },
        {
          name: "Veggie Burrito",
          price: "$2.50",
          desc: "Soft tortilla filled with seasoned vegetables and fresh salad.",
          image: "https://www.healthyseasonalrecipes.com/wp-content/uploads/2023/03/Veggie-Burritos-SQ-2.jpg",
        },
        {
          name: "French Fries",
          price: "$1.50",
          desc: "Crispy golden fries served with ketchup.",
          image: "https://kirbiecravings.com/wp-content/uploads/2019/09/easy-french-fries-1.jpg",
        },
      ],
    },
    {
      title: "Asian Food",
      items: [
        {
          name: "Khmer Hot & Sour Prawn Soup",
          price: "$3.00",
          desc: "Traditional Cambodian soup with prawns and herbs.",
          image: "https://thelocalpalate.com/wp-content/uploads/2023/03/Khmer-hot-and-sour-soup-feat..jpg",
        },
        {
          name: "Khmer-Style Grilled Beef Salad",
          price: "$3.00",
          desc: "Grilled beef with fresh herbs and vegetables.",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXYkUN71AyNF4bPn8AE6tTUvOd2znjEwf_fw&s",
        },
        {
          name: "Num Pang Pate",
          price: "$3.00",
          desc: "Cambodian baguette sandwich with pate.",
          image: "https://thidaskitchen.com/wp-content/uploads/2023/05/num-pang-with-pate.jpg",
        },
        {
          name: "Hainan Chicken Rice",
          price: "$3.00",
          desc: "Classic chicken rice dish.",
          image: "https://onehappybite.com/wp-content/uploads/2025/04/DSC05821-2.jpg",
        },
      ],
    },
    {
      title: "Drinks",
      items: [
        {
          name: "Apple Juice",
          price: "$2.50",
          desc: "Fresh apple juice.",
          image: "https://cookingchew.com/wp-content/uploads/2023/03/Recipes-Using-Apple-Juice-CO2926-FE-min.jpg",
        },
        {
          name: "Coke",
          price: "$1.50",
          desc: "Classic soft drink.",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFLfe1x0Lu9p1W2ky_hFFnvN4kSUn5oGlAnw&s",
        },
        {
          name: "Passion Smoothie",
          price: "$2.50",
          desc: "Kick-start your day with this bright, zingy passion fruit smoothie",
          image: "https://realfood.tesco.com/media/images/1400x919-PassionfruitMangoCardamomSmoothie-52be7698-1a90-4e58-ade1-1f3d04c0a7c9-0-1400x919.jpg",
        },
      ],
    },
    {
      title: "Desserts",
      items: [
        {
          name: "Strawberry Mousse",
          price: "$3.00",
          desc: "Light and creamy strawberry mousse.",
          image: "https://bakewithshivesh.com/wp-content/uploads/2019/01/eggless-strawberry-mousse.jpg",
        },
        {
          name: "Crispy Meringue",
          price: "$3.00",
          desc: "Cruncy meringue served with smooth mango sauce.",
          image: "https://www.browniebites.net/wp-content/uploads/2018/01/almond-meringue-cookies-recipe-03.jpg",
        },
      ],
    },
  ];

  return (
    <div className="bg-white min-h-screen px-4 py-6 pb-28 relative">
      {/* HERO SECTION */}
      <div className="relative rounded-3xl overflow-hidden mb-12">
        <img
          src="https://www.georgeinstitute.org/sites/default/files/styles/image_ratio_2_1_large/public/2020-10/world-food-day-2020.png.webp?itok=-h1y_Rz0"
          className="w-full h-[260px] sm:h-[340px] lg:h-[420px] object-cover"
          alt="Hero"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center p-6 sm:p-10">
          <h1 className="text-white text-2xl sm:text-4xl lg:text-5xl font-bold uppercase">
            HAVE A DELICIOUS <br /> MEAL WITH US
          </h1>
        </div>
      </div>

      {/* MENU SECTIONS */}
      {categories
        .filter((cat: Category) => (selectedCategory ? cat.title === selectedCategory : true))
        .map((cat: Category, i: number) => (
          <div key={i} className="mb-12">
            <h2 className="text-lg font-semibold text-gray-700 mb-5">{cat.title}</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {cat.items.map((dish: FoodItem, index: number) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition hover:-translate-y-2 flex flex-col"
                >
                  <img src={dish.image} alt={dish.name} className="w-full h-40 object-cover rounded-t-2xl" />

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-sm sm:text-base">{dish.name}</h3>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">{dish.desc}</p>
                    </div>

                    <div>
                      <div className="mt-3 text-orange-600 font-bold">{dish.price}</div>
                      <button
                        onClick={() => addToCart(dish)}
                        className="w-full mt-3 bg-blue-500 text-white py-2 rounded-full text-sm hover:bg-blue-700 transition active:scale-95"
                      >
                        Add to Order
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

      {/* --- FLOATING PRE-ORDER BAR --- */}
      {cart.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-md bg-blue-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex justify-between items-center z-40 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div>
            <p className="font-bold text-lg">{totalItems} Items Selected</p>
            <p className="text-xs text-blue-100 italic">Ready to Pre-order</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-white text-blue-600 px-6 py-2 rounded-xl font-bold text-sm shadow-md active:scale-95 transition"
          >
            Confirm
          </button>
        </div>
      )}

      {/* --- PRE-ORDER MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-sm p-6 shadow-2xl transform transition-all">
            <h2 className="text-xl font-bold text-gray-800 mb-1">Pre-order Details</h2>
            <p className="text-xs text-gray-500 mb-6">Enter your info so we can recognize your order.</p>

            <form onSubmit={handlePreOrder} className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-gray-400 block mb-1 uppercase tracking-wider">Full Name</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. John Doe"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition"
                  value={customer.name}
                  onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-400 block mb-1 uppercase tracking-wider">Phone Number</label>
                <input
                  required
                  type="tel"
                  placeholder="012 345 678"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition"
                  value={customer.phone}
                  onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                />
              </div>

              <div className="bg-gray-50 p-3 rounded-xl max-h-32 overflow-y-auto mb-2">
                 <p className="text-[10px] font-bold text-gray-400 uppercase mb-2">Summary:</p>
                 {cart.map((item, idx: number) => (
                   <div key={idx} className="flex justify-between text-xs py-1 border-b border-gray-100 last:border-0">
                      <span className="text-gray-700">{item.name} x{item.quantity}</span>
                      <span className="font-bold text-blue-600">{item.price}</span>
                   </div>
                 ))}
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-red-600 text-white py-3 rounded-2xl font-semibold hover:bg-red-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-[2] bg-blue-600 text-white py-3 rounded-2xl font-semibold hover:bg-blue-700 shadow-lg shadow-blue-200 transition"
                >
                  Confirm Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}