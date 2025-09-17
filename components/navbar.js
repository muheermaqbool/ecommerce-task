"use client";
import { useState, useRef, useEffect } from "react";
import {
  SearchIcon,
  X,
  ChevronDown,
  UserRound,
  ShoppingCart,
  Menu,
  Heart,
} from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import Link from "next/link";

export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [openCategoryMenu, setOpenCategoryMenu] = useState(false);

  const { data: products, isLoading } = useProducts(searchTerm);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
        setOpenCategoryMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const categories = [
    "all",
    ...(products
      ?.map((p) => p?.category?.slug)
      ?.filter(Boolean)
      ?.filter((v, i, arr) => arr.indexOf(v) === i)
      ?.slice(0, 4) || []),
  ];
  // Filter products based on search term and selected category
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
    <nav className="w-full">
      <div className="max-w-7xl mx-auto hidden md:flex items-center justify-between px-6 py-2">
        <div className="flex gap-5 text-sm text-gray-500 capitalize">
          <p>english</p>
          <p>dollar</p>
        </div>
        {/* Desktop top links */}
        <div className="hidden md:flex space-x-8">
          <a href="#" className="text-sm text-gray-500 capitalize">
            Tracking package
          </a>
          <a href="#" className="text-sm text-gray-500 capitalize">
            FAQ
          </a>
          <a href="#" className="text-sm text-gray-500 capitalize">
            About us
          </a>
          <Link href="contact-us" className="text-sm text-gray-500 capitalize">
            Contact Us
          </Link>
        </div>
      </div>

      {/* Desktop Navbar */}
      <div
        className="hidden md:flex justify-between p-6 relative"
        ref={dropdownRef}
      >
        <div className="flex items-center gap-6">
          <p className="font-bold text-2xl">ECOMMERCE</p>

          {/* Search box */}
          <div className="relative w-[500px]">
            <div className="rounded-full flex items-center border border-gray-300 px-3 py-1 gap-2 bg-white">
              <input
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowDropdown(true);
                }}
                placeholder="Search products by name or description..."
                type="text"
                className="flex-grow outline-none text-sm p-1"
              />
              <SearchIcon size={18} className="text-gray-500" />
            </div>

            {/* Dropdown panel */}
            {showDropdown && (
              <div className="absolute mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-[400px] overflow-y-auto z-50 p-4">
                {/* Filters */}
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

          <div className="relative">
            <button
              onClick={() => setOpenCategoryMenu(!openCategoryMenu)}
              className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-black"
            >
              All Categories
              <ChevronDown
                size={16}
                className={`transition-transform duration-300 ${
                  openCategoryMenu ? "rotate-180" : ""
                }`}
              />
            </button>

            {openCategoryMenu && (
              <div className="absolute  mt-2 bg-white border rounded-lg shadow-lg w-[500px] p-6 flex justify-between gap-6 z-50 h-[500px] overflow-hidden overflow-y-auto">
                <div>
                  <h4 className="text-xs font-semibold text-gray-500 uppercase mb-3">
                    Categories
                  </h4>
                  <ul className="space-y-3">
                    {products
                      ?.map((p) => p?.category)
                      ?.filter(Boolean)
                      ?.filter(
                        (cat, index, arr) =>
                          arr.findIndex((c) => c?.id === cat?.id) === index
                      )
                      ?.slice(0, 6)
                      .map((cat) => (
                        <li
                          key={cat?.id}
                          onClick={() => {
                            setSelectedCategory(cat?.slug);
                            setOpenCategoryMenu(false);
                          }}
                          className="flex items-center jus gap-3 px-2 py-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                        >
                          {cat?.image && (
                            <img
                              src={cat.image}
                              alt={cat.name}
                              className="w-10 h-10 rounded-md object-cover border"
                            />
                          )}
                          <div className="flex flex-col">
                            <span className="text-sm font-medium">
                              {cat?.name}
                            </span>
                            <span className="text-xs text-gray-500">
                              {cat?.slug}
                            </span>
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-gray-500 uppercase mb-3">
                    Featured
                  </h4>
                  <div className="flex flex-col gap-3">
                    {products?.slice(0, 3).map((p) => (
                      <div key={p.id} className="flex items-center gap-3">
                        <img
                          src={p.images?.[0]}
                          alt={p.title}
                          className="w-12 h-12 rounded-md object-cover border"
                        />
                        <div>
                          <p className="text-sm font-medium">{p.title}</p>
                          <p className="text-xs text-gray-500">${p.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <p>Gift cards</p>
          <p>Special Event</p>
        </div>

        <div className="flex items-center gap-4">
          <Heart size={20} />
          <UserRound size={20} />
          <ShoppingCart size={20} />
        </div>
      </div>

      {/*  Tablet Navbar */}
      <div className="md:hidden px-6 py-3 flex items-center justify-between border-t">
        <div className="flex items-center justify-between w-full">
          <p className="font-bold text-xl">ECOMMERCE</p>
          <button onClick={() => setOpen(!open)}>
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="md:hidden bg-white border-t shadow-lg p-6 space-y-6">
          <div className="relative">
            <div className="rounded-full flex items-center border border-gray-300 px-3 py-2 gap-2">
              <input
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowDropdown(true);
                }}
                placeholder="Search products..."
                type="text"
                className="flex-grow outline-none text-sm"
              />
              <SearchIcon size={18} className="text-gray-500" />
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-4 text-gray-700 text-sm">
            <p>All Categories</p>
            <p>Gift cards</p>
            <p>Special Event</p>
            <a href="#">Tracking package</a>
            <a href="#">FAQ</a>
            <a href="#">About us</a>
            <Link href="contact-us">Contact Us</Link>
          </div>

          {/* Icons */}
          <div className="flex gap-6 pt-4">
            <Heart size={22} />
            <UserRound size={22} />
            <ShoppingCart size={22} />
          </div>
        </div>
      )}
    </nav>
  );
}
