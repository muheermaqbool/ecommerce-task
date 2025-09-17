import React from 'react'

function TrendingLoader() {
  return (
     <div className="max-w-7xl mx-auto p-6 animate-pulse">
      {/* Heading + Category Filter Buttons */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 md:gap-0">
        {/* Title skeleton */}
        <div className="h-6 w-32 bg-gray-200 rounded shimmer"></div>

        {/* Filter buttons skeleton */}
        <div className="flex flex-wrap gap-3">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-8 w-20 bg-gray-200 rounded-full shimmer"
            ></div>
          ))}
        </div>
      </div>

      {/* Products Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-fr">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`relative bg-gray-200 rounded-lg overflow-hidden shimmer ${
              i === 2 || i === 3
                ? "sm:col-span-2 md:col-span-1 lg:col-span-2"
                : "col-span-1"
            }`}
          >
            {/* Image placeholder */}
            <div className="w-full h-64 bg-gray-300"></div>

            {/* Text placeholders */}
            <div className="p-4 space-y-2">
              <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
              <div className="h-4 w-1/4 bg-gray-300 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TrendingLoader