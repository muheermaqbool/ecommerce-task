"use client";
import { useState } from "react";
import { Heart } from "lucide-react";
import { useCategories } from "@/hooks/useCategories";
import { useProducts } from "@/hooks/useProducts";

function TrendingSection() {
  const [wishlist, setWishlist] = useState([]);

  const { data: categories = [], isLoading: loadingCategories } =
    useCategories();
  const { data: products = [], isLoading: loadingProducts } = useProducts();

  const allowedCategories = categories
    ?.map((c) => c.name)
    ?.filter(Boolean)
    ?.slice(0, 4);

  //  Default selected = first category
  const [selectedCategory, setSelectedCategory] = useState(
    allowedCategories?.[0] || ""
  );

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredProducts = products.filter(
    (p) =>
      p.category &&
      allowedCategories?.includes(p.category.name) &&
      p.category.name.toLowerCase() === selectedCategory.toLowerCase()
  );

  // Limit to 2 rows (same logic you had)
  const visibleProducts = [];
  let currentCols = 0;
  for (let i = 0; i < filteredProducts.length; i++) {
    const span = i === 2 || i === 3 ? 2 : 1;
    if (currentCols + span > 4 * 2) break;
    visibleProducts.push(filteredProducts[i]);
    currentCols += span;
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 md:gap-0">
        <h2 className="text-2xl font-semibold">Trending</h2>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap gap-3">
          {loadingCategories ? (
            <p className="text-gray-500 text-sm">Loading categories...</p>
          ) : (
            allowedCategories?.map((cat) => (
              <button
                key={cat}
                className={`cursor-pointer px-4 py-1 text-sm rounded-full border ${
                  selectedCategory === cat ? "bg-black text-white" : "bg-white"
                }`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))
          )}
        </div>
      </div>
      {loadingProducts ? (
        <p className="text-center text-gray-500">Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-fr">
          {visibleProducts.length > 0 ? (
            visibleProducts.map((product, index) => (
              <div
                key={product.id}
                className={`relative bg-white rounded-lg overflow-hidden ${
                  index === 2 || index === 3
                    ? "sm:col-span-2 md:col-span-1 lg:col-span-2"
                    : "col-span-1"
                }`}
              >
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`absolute top-3 right-3 p-2 ${
                    wishlist.includes(product.id) ? "bg-red-500" : "bg-white"
                  } rounded-full shadow-md hover:scale-110 transition z-20`}
                >
                  <Heart
                    size={20}
                    className={
                      wishlist.includes(product.id)
                        ? "outline-red-500 fill-red-500 text-white"
                        : "text-gray-400"
                    }
                  />
                </button>

                <div className="w-full h-100 bg-gray-100 rounded-lg">
                  <img
                    src={product.images?.[0]}
                    alt={product.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                <div className="p-4">
                  <h3 className="text-sm font-medium truncate">
                    {product.title}
                  </h3>
                  <p className="text-gray-500 mt-1">${product.price}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No products found in this category.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default TrendingSection;
