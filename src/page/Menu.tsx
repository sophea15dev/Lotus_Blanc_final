import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Trash2, ShoppingBag, CheckCircle } from "lucide-react";

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

  const [fullMenu, setFullMenu] = useState<Dish[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [cart, setCart] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(true);
  const [orderLoading, setOrderLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<any>(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    note: "",
  });

  const KHR_RATE = 4100;
  const formatKHR = (usd: number) => (usd * KHR_RATE).toLocaleString() + "៛";

  // ================= FETCH DATA =================
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);

        const [catRes, dishRes] = await Promise.all([
          api.get("/categories"),
          api.get("/dishes"),
        ]);

        const categoriesData = Array.isArray(catRes.data)
          ? catRes.data
          : catRes.data.data || [];

        const dishesData = Array.isArray(dishRes.data)
          ? dishRes.data
          : dishRes.data.data || [];

        const catNames = categoriesData.map((c: any) => c.name);
        setCategories(["All", ...catNames]);

        const mappedDishes = dishesData.map((d: any) => ({
          id: d.id,
          name: d.name || "Unnamed Dish",
          desc: d.description || "",
          price: Number(d.price) || 0,
          image: d.imageUrl || d.image || "https://via.placeholder.com/150",
          category:
            d.category?.name ||
            categoriesData.find((c: any) => c.id === d.categoryId)?.name ||
            "Uncategorized",
        }));

        console.log("MAPPED DISHES:", mappedDishes);

        setFullMenu(mappedDishes);
      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  // ================= FILTER =================
  const filteredMenu = useMemo(() => {
    return activeCategory === "All"
      ? fullMenu
      : fullMenu.filter((d) => d.category === activeCategory);
  }, [activeCategory, fullMenu]);

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  // ================= CART =================
  const handleAddToCart = (dish: Dish) => {
    setCart((prev) => [...prev, { ...dish, cartId: Date.now() }]);
  };

  const handleRemoveFromCart = (cartId: number) => {
    setCart((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  // ================= ORDER =================
  const handleFinalOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    setOrderLoading(true);

    try {
      const orderPayload = {
        customerName: formData.name,
        phone: formData.phone,
        totalPrice,
        items: cart.map((i) => ({
          dishId: i.id,
          quantity: 1,
        })),
      };

      await api.post("/api/orders", orderPayload);

      setSubmittedData({
        ...formData,
        items: [...cart],
        total: totalPrice,
      });

      setIsSubmitted(true);
      setCart([]);
    } catch (err) {
      console.error(err);
      alert("Order failed.");
    } finally {
      setOrderLoading(false);
    }
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-[#004e70]" size={48} />
        <p className="text-[#004e70] font-black italic animate-pulse uppercase tracking-widest text-sm">
          Loading Menu...
        </p>
      </div>
    );
  }

  // ================= UI =================
  return (
    <div className="w-full mx-auto md:px-25 px-8 py-4 bg-slate-50/30 min-h-screen">
      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.div
            key="menu-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col lg:flex-row gap-8 items-start"
          >
            {/* LEFT */}
            <div className="grow w-full">
              {/* Categories */}
              <div className="flex gap-2 overflow-x-auto pb-6">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-8 py-3 rounded-full text-[11px] font-black uppercase ${
                      activeCategory === cat
                        ? "bg-[#004e70] text-white"
                        : "bg-white text-slate-500"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Dishes */}
              {filteredMenu.length === 0 ? (
                <p className="text-center text-slate-400 py-20">
                  No dishes available
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  {filteredMenu.map((dish) => (
                    <div
                      key={dish.id}
                      className="flex bg-white rounded-[35px] p-4 shadow-sm items-center"
                    >
                      <img
                        src={dish.image}
                        className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-[25px]"
                        alt={dish.name}
                      />

                      <div className="ml-5 flex-1">
                        <span className="text-[9px] font-black text-[#f26522] uppercase">
                          {dish.category}
                        </span>

                        <h3 className="font-black text-[#004e70] text-[17px] italic">
                          {dish.name}
                        </h3>

                        <p className="text-slate-400 text-[13px] mt-1">
                          {dish.desc}
                        </p>

                        <div className="mt-3 flex items-center justify-between">
                          <div>
                            <span className="font-black text-[#004e70] text-lg">
                              ${dish.price.toFixed(2)}
                            </span>
                            <p className="text-[10px] text-slate-400">
                              {formatKHR(dish.price)}
                            </p>
                          </div>

                          <button
                            onClick={() => handleAddToCart(dish)}
                            className="bg-[#004e70] text-white text-[10px] font-black py-2 px-5 rounded-full"
                          >
                            + Add
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT CART */}
            {cart.length > 0 && (
              <div className="w-full lg:w-[400px]">
                <div className="bg-white rounded-[45px] p-8 shadow-xl">
                  <h2 className="text-[#004e70] font-black text-xl uppercase flex items-center gap-2 mb-6">
                    <ShoppingBag size={20} /> My Order ({cart.length})
                  </h2>

                  <div className="space-y-3 mb-6">
                    {cart.map((item) => (
                      <div
                        key={item.cartId}
                        className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl"
                      >
                        <div>
                          <p className="font-bold">{item.name}</p>
                          <p>${item.price.toFixed(2)}</p>
                        </div>

                        <button
                          onClick={() => handleRemoveFromCart(item.cartId!)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleFinalOrder} className="space-y-4">
                    <input
                      required
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          name: e.target.value,
                        })
                      }
                      className="w-full p-4 rounded-2xl bg-slate-50"
                    />

                    <input
                      required
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          phone: e.target.value,
                        })
                      }
                      className="w-full p-4 rounded-2xl bg-slate-50"
                    />

                    <button
                      type="submit"
                      disabled={orderLoading}
                      className="w-full py-4 bg-[#004e70] text-white rounded-2xl"
                    >
                      {orderLoading ? (
                        <Loader2 className="animate-spin mx-auto" />
                      ) : (
                        "Confirm Order"
                      )}
                    </button>
                  </form>
                </div>
              </div>
            )}
          </motion.div>
        ) : (
          <div className="text-center py-24">
            <CheckCircle size={50} className="mx-auto text-green-500" />
            <h2 className="text-3xl font-bold mt-4">
              Thank You, {submittedData.name}!
            </h2>
            <p>Your order has been placed successfully.</p>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Menu;
