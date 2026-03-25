import React from "react";

const categories = [
  {
    title: "Western Food",
    items: [
      {
        name: "Creamy Seafood Marinara Pasta",
        price: "$6.00",
        desc: "Pasta tossed with mixed seafood in a rice tomato cream sauce.",
        image:
          "https://yeyfood.com/wp-content/uploads/2024/10/WEB1close-up_shot_of_creamy_shrimp_penne_pasta._in_whi_a46de50a-49a4-41ee-81bb-c6cc6c646ac9_0-735x735.jpg",
      },
      {
        name: "Classice Carbonara",
        price: "$6.00",
        desc: "Creamy pasta with bacon,parmesan cheese and egg.",
        image:
          "https://littlespoonfarm.com/wp-content/uploads/2024/07/Pasta-Carbonara-Recipe.jpg",
      },
      {
        name: "Veggie Burrito",
        price: "$2.50",
        desc: "Soft tortilla filled with seasoned vegetables and fresh salad.",
        image:
          "https://www.healthyseasonalrecipes.com/wp-content/uploads/2023/03/Veggie-Burritos-SQ-2.jpg",
      },
      {
        name: "French Fries",
        price: "$1.50",
        desc: "Crispy golden fries served tomato ketchup.",
        image:
          "https://kirbiecravings.com/wp-content/uploads/2019/09/easy-french-fries-1.jpg",
      },
    ],
  },
  {
    title: "Asian Food",
    items: [
      {
        name: "Khmer Hot & Sour Prawn Soup",
        price: "$3.00",
        desc: "Traditionl Cambodin soup with prawns, aromatic herbs, and a balanced hot-and-sour broth.",
        image:
          "https://thelocalpalate.com/wp-content/uploads/2023/03/Khmer-hot-and-sour-soup-feat..jpg",
      },
      {
        name: "Khmer-Style Grilled Beef Salad",
        price: "$3.00",
        desc: "Grilled beef slice mixed with fresh herbs, vegetables, and a balanced hot-and-sour broth.",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXYkUN71AyNF4bPn8AE6tTUvOd2znjEwf_fw&s",
      },
      {
        name: "Num Pang Pate",
        price: "$3.00",
        desc: "Cambodian bagutte sandwich with pate, pickled vegetables and fresh herbs.",
        image:
          "https://thidaskitchen.com/wp-content/uploads/2023/05/num-pang-with-pate.jpg",
      },
      {
        name: "Hainan Chicken Rice",
        price: "$3.00",
        desc: "The joy of Hainan chicken rice is in the sum of its parts: The skin-on chicken",
        image:
          "https://onehappybite.com/wp-content/uploads/2025/04/DSC05821-2.jpg",
      },
    ],
  },
  {
    title: "Drinks",
    items: [
      {
        name: "Apple Juice",
        price: "$2.50",
        desc: "Here are some of the best recipes using apple juice we’ve found on the",
        image:
          "https://cookingchew.com/wp-content/uploads/2023/03/Recipes-Using-Apple-Juice-CO2926-FE-min.jpg",
      },
      {
        name: "Coke",
        price: "$1.50",
        desc: "Short description",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFLfe1x0Lu9p1W2ky_hFFnvN4kSUn5oGlAnw&s",
      },
      {
        name: "Passion Smoothie",
        price: "$2.50",
        desc: "Kick-start your day with this bright, zingy passion fruit smoothie",

        image:
          "https://realfood.tesco.com/media/images/1400x919-PassionfruitMangoCardamomSmoothie-52be7698-1a90-4e58-ade1-1f3d04c0a7c9-0-1400x919.jpg",
      },
      {
        name: "Chocolate Milkshake",
        price: "$3.00",
        desc: "These chocolate freakshakes are a full-send sugar bomb with no restraint",
        image:
          "https://noblepig.com/site/wp-content/uploads/2025/07/ultimate-chocolate-freakshake.jpg",
      },
      {
        name: "Red Tea",
        price: "$1.50",
        desc: "Short description",
        image: "https://miro.medium.com/1*yVdgPMqLl7B6jf6WKr28Tw.jpeg",
      },
      {
        name: "CINDERELLA Orange",
        price: "$2.50",
        desc: "The Cinderella is a popular mixed drink of tropical juices, grenadine, and",
        image:
          "https://www.thespruceeats.com/thmb/bYqhEJvfR4cP-ElshU35P2cZhdw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/cinderella-recipe-non-alcoholic-759631-hero-01-5b97e21ada1e4407a3637354bdffec86.jpg",
      },
      {
        name: "MOJITO Rum",
        price: "$3.00",
        desc: "You can't say no to a classic mojito, although this spiced version is fast",
        image:
          "https://www.thebottleclub.com/cdn/shop/articles/TBC_recipe_image_12_ff4e4e2b-88d2-4d35-91c0-94e7c5b9cec2-760018.jpg?v=1707230423",
      },
      {
        name: "SAMAI MAITAI",
        price: "$3.00",
        desc: "This refreshing and iconic tiki drink is made with shaken light rum, almond",
        image:
          "https://hips.hearstapps.com/hmg-prod/images/delish-230412-maitai-0735-ns-index-644ae01d67be5.jpg?crop=0.891xw:1.00xh;0.0554xw,0",
      },
    ],
  },
  {
    title: "Dessert",
    items: [
      {
        name: "Strawberry Mousse",
        price: "$3.00",
        desc: "Light and creamy strawberry mousse.",
        image:
          "https://bakewithshivesh.com/wp-content/uploads/2019/01/eggless-strawberry-mousse.jpg",
      },
      {
        name: "Crispy Meringue",
        price: "$3.00",
        desc: "Cruncy meringue served with smooth mango sauce.",
        image:
          "https://www.browniebites.net/wp-content/uploads/2018/01/almond-meringue-cookies-recipe-03.jpg",
      },
      {
        name: "Bread Pudding",
        price: "$3.00",
        desc: "Classic baked pudding with warm vanilla sauce.",
        image:
          "https://realhousemoms.com/wp-content/uploads/Bread-Pudding-Recipe-with-Vanilla-Caramel-Sauce-RECIPE-CARD.jpg",
      },
      {
        name: "Seasonal Fresh Fruit Platter",
        price: "$2.00",
        desc: "A refreshing assortment of the finest seasonal fruits.",
        image:
          "https://catering.soulorigin.com.au/cdn/shop/products/SO_Product_2048x2048_FruitPlatter2.jpg?v=1635832324&width=1946",
      },
    ],
  },
];

export default function MenuPage() {
  return (
    <div className="bg-white min-h-screen px-4 py-6">
      {/* HERO */}
      <div className="relative rounded-3xl overflow-hidden mb-12">
        <img
          src="https://www.georgeinstitute.org/sites/default/files/styles/image_ratio_2_1_large/public/2020-10/world-food-day-2020.png.webp?itok=-h1y_Rz0"
          className="w-full h-[260px] sm:h-[340px] lg:h-[420px] object-cover"
          alt=""
        />
        <div className="absolute inset-0 bg-black/40 flex items-center p-6 sm:p-10">
          <h1 className="text-white text-2xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            HAVE A DELICIOUS <br /> MEAL WITH US
          </h1>
        </div>
      </div>

      {/* SECTIONS */}
      {categories.map((cat, i) => (
        <div key={i} className="mb-12">
          <h2 className="text-lg font-semibold text-gray-700 mb-5">
            {cat.title}
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {cat.items.map((dish, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition duration-300 overflow-hidden hover:-translate-y-2"
              >
                <img
                  src={dish.image}
                  alt=""
                  className="w-full h-40 sm:h-48 object-cover"
                />

                <div className="p-4">
                  <h3 className="text-base font-semibold">{dish.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">{dish.desc}</p>

                  <div className="mt-3">
                    <span className="text-blue-600 font-bold">
                      {dish.price}
                    </span>
                  </div>

                  <button className="w-full mt-3 bg-blue-600 text-white py-2 rounded-full text-sm hover:bg-blue-700 transition">
                    Order Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
