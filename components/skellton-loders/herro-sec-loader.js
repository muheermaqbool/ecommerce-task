import React from 'react'

function HeroSecLoader() {
  return (
    <div className="max-w-7xl px-6 grid grid-cols-1 md:grid-cols-6 gap-2 md:grid-rows-2 mx-auto md:mx-auto animate-pulse">
      {/* Big Hero Block */}
      <div className="lg:col-span-4 md:col-span-2 row-span-2 relative rounded-2xl overflow-hidden min-h-[400px] bg-gray-200 shimmer"></div>

      {/* Category 2 */}
      <div className="relative rounded-2xl overflow-hidden md:col-span-2 md:row-span-1 min-h-[200px] bg-gray-200 shimmer"></div>

      {/* Category 3 */}
      <div className="relative rounded-2xl overflow-hidden md:col-span-2 min-h-[200px] bg-gray-200 shimmer"></div>

      {/* Casual Inspirations Block */}
      <div className="md:col-span-2 bg-gray-200 rounded-2xl min-h-[200px] shimmer"></div>

      {/* Category 4 */}
      <div className="md:col-span-2 relative rounded-2xl overflow-hidden min-h-[250px] bg-gray-200 shimmer"></div>

      {/* Category 5 */}
      <div className="md:col-span-2 relative rounded-2xl overflow-hidden min-h-[250px] bg-gray-200 shimmer"></div>
    </div>

  )
}

export default HeroSecLoader