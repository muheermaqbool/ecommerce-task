"use client";
import { useState, useRef, useEffect } from "react";
import {
  X,
  ChevronDown,
  UserRound,
  ShoppingCart,
  Menu,
  Heart,
} from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import Link from "next/link";
import SearchBar from "./searchbar";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [openCategoryMenu, setOpenCategoryMenu] = useState(false);

  const { data: products } = useProducts();
  const dropdownRef = useRef(null);

  // Close category dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenCategoryMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="w-full">
      <div className="max-w-7xl mx-auto hidden md:flex items-center justify-between px-6 py-2">
        <div className="flex gap-5 text-sm text-gray-500 capitalize">
          <p>english</p>
          <p>dollar</p>
        </div>
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
        <div className="flex items-center gap-6 mx-auto">
          <p className="font-bold text-2xl">ECOMMERCE</p>

          {/* Search */}
          <div className="relative w-[500px]">
            <SearchBar />
          </div>

          {/* Category Menu */}
          <div className="relative">
            <button
              onClick={() => setOpenCategoryMenu(!openCategoryMenu)}
              className="cursor-pointer flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-black"
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
              <div className="absolute mt-2 bg-white border rounded-lg shadow-lg w-[500px] p-6 flex justify-between gap-6 z-50 h-[500px] overflow-hidden overflow-y-auto">
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
                          className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-gray-100 cursor-pointer"
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

                {/* Featured */}
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

        {/* Icons */}
        <div className="flex items-center gap-4">
          <Heart
            size={20}
            className="cursor-pointer text-gray-600 hover:text-red-500 transition-colors duration-200"
          />
          <UserRound
            size={20}
            className="cursor-pointer text-gray-600 hover:text-black transition-colors duration-200"
          />
          <ShoppingCart
            size={20}
            className="cursor-pointer text-gray-600 hover:text-blue-500 transition-colors duration-200"
          />
        </div>
      </div>

      {/* Mobile Navbar */}
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
            <SearchBar isMobile />
          </div>

          <div className="flex flex-col gap-4 text-gray-700 text-sm">
            <p>All Categories</p>
            <p>Gift cards</p>
            <p>Special Event</p>
            <a href="#">Tracking package</a>
            <a href="#">FAQ</a>
            <a href="#">About us</a>
            <Link href="contact-us">Contact Us</Link>
          </div>

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
