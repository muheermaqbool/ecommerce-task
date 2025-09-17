"use client";
import React from "react";

const colors = [
  { name: "Red Pastel", hex: "#f08080" },
  { name: "Lime Green", hex: "#90ee90" },
  { name: "Navy Blue", hex: "#000080" },
  { name: "Clean White", hex: "#ffffff" },
  { name: "Blue Sky", hex: "#87ceeb" },
  { name: "Purple", hex: "#9370db" },
  { name: "Pink", hex: "#ff69b4" },
  { name: "Yellow", hex: "#ffd700" },
  { name: "Dark Green", hex: "#006400" },
];

function ExploreByColors() {
  return (
    <div className="max-w-7xl mx-auto mt-6 px-6 py-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <h1 className="font-bolder text-4xl md:text-5xl  leading-tight">
          Explore <br /> by Colors
        </h1>
        <div className="flex flex-wrap gap-3 lg:w-[60%] lg:mr-30 md:mr-30 w-full">
          {colors.map((color) => (
            <div
              key={color.name}
              className="flex items-center gap-2 border border-gray-400 rounded-full px-4 py-2 text-sm font-medium cursor-pointer hover:shadow-md transition"
            >
              <span
                className="h-4 w-4 rounded-full border"
                style={{ backgroundColor: color.hex }}
              ></span>
              <p className="capitalize">{color.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ExploreByColors;

