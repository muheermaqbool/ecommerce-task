import React from 'react';

function Blog() {
  return (
    <div className='p-6 '>
        <p className='font-bold text-2xl mb-5'>From the Blog</p>
    <div className="max-w-6xl flex items-center gap-10 justify-start flex-col md:flex-row lg:mx-0 mx-auto">
 
      {/* Image Section */}
      <div className="flex-1">
        <img
          src='/blog-img.png'
          alt="Clothes Rack"
          className="rounded-lg shadow-md w-full h-[300px] object-cover object-center"
        />
      </div>

      {/* Text Section */}
      <div className="flex-1">
        <h2 className="text-3xl font-semibold mb-4">
          How to combine your daily outfit to looks fresh and cool.
        </h2>
        <p className="text-gray-600 mb-6">
          Maybe you dont need to buy new clothes to have nice cool fresh looking outfit everyday. Maybe what you need is to combine your clothes collections. Mix and match is the key.
        </p>
        <button className="px-5 py-2 border border-gray-800 rounded-full hover:bg-gray-800 hover:text-white transition cursor-pointer">
          READ MORE
        </button>
      </div>

    </div>
    </div>
  );
}

export default Blog;
