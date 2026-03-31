import React, { useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const FoodDetail: React.FC = () => {
  const [serves, setServes] = useState<number>(1);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-700 flex items-center">
      <div className="max-w-6xl mx-auto px-8 py-12 w-full">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Product Media */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-6"
          >
            <div className="rounded-sm overflow-hidden border border-gray-100 shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80"
                alt="Grilled Zucchini Salad"
                className="w-full aspect-[4/3] object-cover hover:scale-105 transition-transform duration-1000"
              />
            </div>

            {/* Small Thumbnails */}
            <div className="flex gap-4">
              {[1, 2].map((i) => (
                <button
                  key={i}
                  className="w-20 h-20 border border-gray-100 hover:border-[#800040] transition-colors overflow-hidden rounded-sm"
                >
                  <img
                    src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=200&q=80"
                    className="w-full h-full object-cover opacity-80 hover:opacity-100"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Right: Order Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="flex flex-col"
          >
            <h1 className="text-4xl lg:text-5xl font-semibold text-gray-900 tracking-tight leading-[1.1]">
              Grilled Zucchini and Barley Salad
            </h1>
            <p className="text-gray-400 italic text-xl mt-3 font-medium">
              with Garlic Crostinies
            </p>

            {/* <div className="flex items-center gap-1 mt-6">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className={
                    i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-100"
                  }
                />
              ))}
              <span className="text-xs text-gray-400 ml-2 font-bold tracking-wider">
                (29 REVIEWS)
              </span>
            </div> */}

            <p className="mt-8 text-[15px] leading-relaxed text-gray-500 max-w-md font-medium">
              Being the savage's bowman, that is, the person who pulled the
              bow-oar in his boat, it was my cheerful duty to attend upon him
              while taking that hard-scrabble scramble upon the dead whale's
              back.
            </p>

            {/* Category Badges */}
            <div className="flex gap-2 mt-8">
              {["Non Vegetarian", "American", "Main Course"].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-1.5 border border-gray-100 rounded-full text-[10px] text-gray-400 font-bold uppercase tracking-[0.15em]"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Order Interface */}
            {/* <div className="mt-12 space-y-8 border-t border-gray-50 pt-10">
              <div className="flex items-center">
                <span className="w-24 text-[12px] font-black text-gray-600 uppercase tracking-widest">
                  Price
                </span>
                <span className="text-2xl font-bold text-gray-900 tracking-tighter  ">
                  $6
                </span>
              </div>

              <div className="flex items-center">
                <span className="w-24 text-[12px] font-black text-gray-600 uppercase tracking-widest">
                  Serves
                </span>
                <div className="flex gap-3">
                  {[1, 2, 3, 4, "5+"].map((val) => (
                    <button
                      key={val}
                      onClick={() => setServes(val === "5+" ? 5 : Number(val))}
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-black transition-all duration-300 ${
                        (val === "5+" ? serves === 5 : serves === val)
                          ? " bg-[#FF7043] text-white shadow-xl shadow-purple-900/20 scale-110"
                          : "border border-gray-400 text-gray-400 hover:border-gray-900 hover:text-gray-900"
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>
            </div> */}

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: "#FF5722" }}
              whileTap={{ scale: 0.98 }}
              className="mt-12  bg-[#FF7043] text-white py-5 px-12 rounded-sm text-xs font-black uppercase tracking-[0.25em] shadow-2xl shadow-purple-900/10 transition-colors w-fit"
            >
              Add to Cart
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetail;
