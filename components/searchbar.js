"use client";
import { useState, useRef, useEffect } from "react";
import { SearchIcon } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";

export default function SearchBar({ isMobile = false }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const dropdownRef = useRef(null);

  const { data: products, isLoading } = useProducts(searchTerm);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // categories
  const categories = [
    "all",
    ...(products
      ?.map((p) => p?.category?.slug)
      ?.filter(Boolean)
      ?.filter((v, i, arr) => arr.indexOf(v) === i)
      ?.slice(0, 4) || []),
  ];

  // filtered products
  const filteredProducts =
    products?.filter((p) => {
      const matchesSearch =
        p?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p?.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p?.category?.name?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" ||
        p?.category?.slug?.toLowerCase() === selectedCategory.toLowerCase();

      return matchesSearch && matchesCategory;
    }) || [];

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Input */}
      <div
        className={`rounded-full flex items-center border border-gray-300 gap-2 bg-white ${
          isMobile ? "px-3 py-2" : "px-3 py-1"
        }`}
      >
        <input
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowDropdown(true);
          }}
          placeholder="Search products..."
          type="text"
          className="flex-grow outline-none text-sm p-1"
        />
        <SearchIcon size={18} className="text-gray-500" />
      </div>

      {/* Dropdown */}
      {showDropdown && (
        <div className="absolute mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-[400px] overflow-y-auto z-50 p-4">
          {/* Categories */}
          <div className="flex gap-3 mb-3 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full text-sm capitalize ${
                  selectedCategory === cat
                    ? "bg-black text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Results */}
          {isLoading && (
            <p className="p-2 text-sm text-gray-500">Loading...</p>
          )}
          {!isLoading && filteredProducts.length === 0 && (
            <p className="p-2 text-sm text-gray-500">No results found</p>
          )}
          {!isLoading &&
            filteredProducts.map((p) => (
              <div
                key={p?.id}
                className="flex items-center gap-3 p-3 hover:bg-gray-100 cursor-pointer border-b last:border-none"
                onClick={() => {
                  setSearchTerm(p?.title);
                  setShowDropdown(false);
                }}
              >
                {p?.images?.[0] && (
                  <img
                    src={p.images[0]}
                    alt={p.title}
                    className="w-12 h-12 rounded-md object-cover border"
                  />
                )}
                <div className="flex flex-col">
                  <p className="font-medium text-sm">{p?.title}</p>
                  <span className="text-[10px] bg-gray-200 px-2 py-1 rounded-full w-fit mt-1">
                    {p?.category?.name || "Uncategorized"}
                  </span>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
