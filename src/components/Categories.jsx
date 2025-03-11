import { useState, useEffect } from 'react';
import milk from "../assets/images-2/options/milk.png";
import veg from "../assets/images-2/options/veg.png";
import fruits from "../assets/images-2/options/fruits.png";
import paneer from "../assets/images-2/options/paneer.png";
import ghee from "../assets/images-2/options/ghee.png";
import dosa from "../assets/images-2/options/dosa.png";
import eggs from "../assets/images-2/options/eggs.png"; // Ensure this file exists

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Simulate an API call to fetch categories.
    const fetchCategories = () => {
      const data = [
        {
          name: 'Milk & Coconut Water',
          icon: milk,
        },
        {
          name: 'Fresh Vegetables',
          icon: veg,
        },
        {
          name: 'Fresh Fruits',
          icon: fruits,
        },
        {
          name: 'Milk Products',
          icon: paneer,
        },
        {
          name: 'Ghee & Oils',
          icon: ghee,
        },
        {
          name: 'Dosa Specials',
          icon: dosa,
        },
        {
          name: 'Eggs',
          icon: eggs,
        }
      ];
      setCategories(data);
    };

    fetchCategories();
  }, []);

  return (
    <div className="py-8">
      <h2 className="text-2xl font-semibold mb-4 text-center">Explore Categories</h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-6 justify-items-center">
        {categories.map((category, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className="
                w-32 h-32
                flex items-center justify-center
                rounded-full
                bg-white
                shadow-md
                border-2 border-gray-200
                hover:border-green-400
                transition-colors duration-300
                cursor-pointer
                focus:outline-none focus:ring-0
              "
            >
              <img
                src={category.icon}
                alt={category.name}
                className="w-16 h-16 object-contain"
              />
            </div>
            <p className="mt-2 text-base font-medium text-gray-700">
              {category.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;