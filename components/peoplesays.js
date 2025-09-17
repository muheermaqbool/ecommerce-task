import React from "react";

function Peoplesays() {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="relative bg-gray-100 rounded-3xl overflow-hidden">
        <img
          src="/wome.png"
          alt="Happy customer"
          className="people-bg absolute inset-0 w-full h-full"
        />

        <div className="relative z-10 flex flex-col justify-center h-full p-8 md:flex-row md:p-14">
          <div className="w-full md:w-1/2 text-white">
            <p className="text-gray-300 mb-3 text-base">What people said</p>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-5">
              Love the way they <br /> handle the order.
            </h2>
            <p className="text-gray-200 mb-8 leading-relaxed text-sm md:text-base">
              Very professional and friendly at the same time. They packed the
              order on schedule and the detail of their wrapping is top notch.
              One of my best experience for buying online items. Surely will
              come back for another purchase.
            </p>

            {/* Profile Section -> Only visible on mobile */}
            <div className="flex items-center gap-3 block md:hidden">
              <img
                src="/wome.png"
                alt="profile"
                className="w-12 h-12 rounded-full object-cover border border-white/50"
              />
              <div>
                <p className="font-semibold text-base">Samantha William</p>
                <p className="text-gray-300 text-sm">Fashion Enthusiast</p>
              </div>
            </div>
          </div>
          <div className="hidden md:block w-1/2"></div>
        </div>
      </div>
    </div>
  );
}

export default Peoplesays;
