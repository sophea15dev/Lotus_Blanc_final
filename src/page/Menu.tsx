import React from "react";

const categories = [
  {
    name: "Western Food",
    image:
      "https://cdn.prod.website-files.com/65ee90198a5b84738143d979/65fbc8afaffa13bb08fafd11_Christmas%20Teatime.jpg",
  },
  {
    name: "Asian  Food",
    image:
      "https://www.bcn.travel/wp-content/uploads/asian-cuisine-in-barcelona.jpg",
  },
  {
    name: "Drinks",
    image:
      "https://dorre.se/cdn/shop/articles/Header_Drinkkvall_1024x.png?v=1693916400",
  },
  {
    name: "Desserts",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Desserts.jpg",
  },
];

const dishes = [
  {
    name: "pork milanese on a bed of pasta",
    desc: "Crispy breaded port,pasta and light tomato sauce",
    price: "$6.00",
    image:
      "https://img.taste.com.au/zAn_m_AY/w1200-h1200-cfill-q80/taste/2016/11/pork-milanese-with-creamy-pasta-92401-1.jpeg",
  },
  {
    name: "Wok-Fired Chicken with Cashew Nuts",
    desc: "Stir-fried chicken with roasted cashews nuts, bell peppers, onlions and steamed rice",
    price: "$6.00",
    image:
      "https://annabanana.co/wp-content/uploads/2022/05/Thai-Cashew-Chicken-Feat-1.jpg",
  },
  {
    name: "Grilled Fish with Mashed pumpkin & Lemon Butter Sauce",
    desc: "Grilled fish fillet served with mashed pumpkin, garlicky vegetables.",
    price: "$6.00",
    image:
      "https://meghanitup.com/wp-content/uploads/2025/03/Grilled-Lemon-Fish-5-3-768x1024.jpg",
  },
  {
    name: "Beef Bourguignon",
    desc: "Slow-braised beef in red wine sauce served with a choice of: Duchess potatoes, Mini Baguette, Buttered Egg Noodles.",
    price: "$6.00",
    image:
      "https://juliasalbum.com/wp-content/uploads/2025/09/Beef-Bourguignon-Recipe-2.jpg",
  },
  {
    name: "Spinach Frittata with Fresh Salad",
    desc: "Baked spinach and egg frittata served with cucumber and bell pepper salad.",
    price: "$6.00",
    image:
      "https://www.runningtothekitchen.com/wp-content/uploads/2023/12/spinach-frittata-10.jpg",
  },
  {
    name: "Pomelo salad with Prawns",
    desc: "Refreshing pomelo tossed with prawns,herbs, and a light citrus dressing.",
    price: "$6.00",
    image:
      "https://www.beyondkimchee.com/wp-content/uploads/blogger/-ouQBJt6hLdw/T0c-zxBPCzI/AAAAAAAAEs8/-N0tEqsvhA8/s1600/frameA.jpg",
  },
];

export default function MenuPage() {
  return (
    <div className="bg-white min-h-screen px-4 sm:px-6 md:px-10 py-6">
      {/* Header */}
      <h1 className="text-center text-2xl sm:text-3xl font-bold mb-10 animate-fadeIn">
        View Our Menu
      </h1>

      {/* Categories (FIXED DESIGN) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mb-12">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center justify-center
            transition duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-50 object-cover rounded-xl mb-4"
            />

            <h3 className="font-semibold text-lg mb-3 text-center">
              {cat.name}
            </h3>

            <button className="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-full text-sm transition">
              View More
            </button>
          </div>
        ))}
      </div>

      {/* Main Courses */}
      <h2 className="text-xl sm:text-2xl font-semibold mb-6">Main Courses</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6  ">
        {dishes.map((dish, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md p-4 flex flex-col sm:flex-row gap-4
            transition duration-300 hover:shadow-xl hover:scale-[1.02]"
          >
            <img
              src={dish.image}
              alt={dish.name}
              className="w-full sm:w-30 h-30 object-cover rounded-xl"
            />

            <div className="flex-1">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg">{dish.name}</h3>
                <span className="text-orange-500 font-bold">{dish.price}</span>
              </div>

              <p className="text-sm text-gray-500 mt-1">{dish.desc}</p>

              <button className="p-2 bg-white border shadow-sm hover:bg-red-100 text-red-500 rounded-full transition transform hover:scale-110">
                Order Now
              </button>

              <button
                className="p-2 bg-white hover:bg-red-200 text-red-500 rounded-full transition transform hover:scale-110"
                onClick={() => console.log("Fav clicked!", dish.name)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Animation */}
      <style>
        {`
          .animate-fadeIn {
            animation: fadeIn 0.6s ease-in-out;
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
}
