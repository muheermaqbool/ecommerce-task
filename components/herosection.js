"use client";
import { MoveUpRight } from "lucide-react";
import { useCategories } from "@/hooks/useCategories";
import ExploreByColors from "./exploreby-colors";
import Peoplesays from "./peoplesays";
import Blog from "./blog";
import Footer from "./footer";
import Trending from "./trending";

function HeroSection() {
  const { data: categories = [], isLoading, isError, error } = useCategories();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        Loading collections...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-64 text-red-500">
        Failed to load data: {error.message}
      </div>
    );
  }

  return (
    <>
      <div className="max-w-7xl px-6 grid grid-cols-1 md:grid-cols-6 gap-2 md:grid-rows-2">
        {categories[0] && (
          <div className="lg:col-span-4 md:col-span-2 row-span-2 relative rounded-2xl overflow-hidden min-h-[400px]">
            <img
              src={categories[0].image}
              alt={categories[0].name}
              className="w-full h-full object-cover"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-center p-8 text-white">
              <h2 className="text-4xl font-bold">{categories[0].name}</h2>
              <p className="mt-2 text-sm">
                100+ Collections for your outfit inspirations
              </p>
              <button className="mt-4 bg-black text-white max-w-fit px-4 py-2 rounded-full text-sm font-semibold cursor-pointer hover:bg-gray-500 transition">
                View Collections
              </button>
            </div>
          </div>
        )}
        {categories[1] && (
          <div className="relative rounded-2xl overflow-hidden md:col-span-2 md:row-span-1 min-h-[200px]">
            <img
              src={categories[1].image}
              alt={categories[1].name}
              className="w-full h-full object-cover"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
            <div className="absolute inset-0 bg-black/30 flex items-end p-4 text-white">
              <h3 className="text-lg font-semibold">{categories[1].name}</h3>
            </div>
          </div>
        )}

        {categories[2] && (
          <div className="relative rounded-2xl overflow-hidden md:col-span-2 min-h-[200px]">
            <img
              src={categories[2].image}
              alt={categories[2].name}
              className="w-full h-full object-cover"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
            <div className="absolute inset-0 bg-black/30 flex items-end p-4 text-white">
              <h3 className="text-lg font-semibold">{categories[2].name}</h3>
            </div>
          </div>
        )}
        <div className="md:col-span-2 bg-white rounded-2xl p-8 flex flex-col justify-center min-h-[200px]">
          <h2 className="text-3xl font-bold">Casual Inspirations</h2>
          <p className="mt-2 text-gray-600">
            Our favorite combinations for casual outfits that can inspire your
            daily activity
          </p>
          <button className="mt-4 border border-black px-4 py-2 rounded-full text-sm font-semibold">
            Browse Inspirations
          </button>
        </div>
        {categories[3] && (
          <a
            href="#"
            className="md:col-span-2 relative rounded-2xl overflow-hidden hover:scale-103 transition-transform duration-300 min-h-[250px]"
          >
            <img
              src={categories[3].image}
              alt={categories[3].name}
              className="w-full h-full object-cover"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
            <div className="absolute inset-0 bg-black/30 flex items-end p-4 text-white justify-between">
              <h3 className="text-lg font-semibold">{categories[3].name}</h3>
              <MoveUpRight size={30} />
            </div>
          </a>
        )}

        {categories[4] && (
          <a
            href="#"
            className="md:col-span-2 relative rounded-2xl overflow-hidden hover:scale-103 transition-transform duration-300 min-h-[250px]"
          >
            <img
              src={categories[4].image}
              alt={categories[4].name}
              className="w-full h-full object-cover"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
            <div className="absolute inset-0 bg-black/30 flex items-end p-4 text-white justify-between">
              <h3 className="text-lg font-semibold">{categories[4].name}</h3>
              <MoveUpRight size={30} />
            </div>
          </a>
        )}
      </div>

      <Trending />
      <ExploreByColors />
      <Peoplesays />
      <Blog />
      <Footer />
    </>
  );
}

export default HeroSection;
