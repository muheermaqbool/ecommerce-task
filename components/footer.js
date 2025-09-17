"use client";
import { useSendContactData } from "@/hooks/useContactData";
import React, { useState } from "react";

function Footer() {
  const [formData, setFormData] = useState({
    email: "",
  });
  const sendContact = useSendContactData();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    sendContact.mutate(formData, {
      onSuccess: () => {
        setFormData({ email: "" });
      },
    });
    console.log(formData, "data");
  };
  return (
    <footer className="bg-black text-white py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between gap-20 lg:justify-between">
          <div className="md:w-[30%]">
            <h2 className="text-white text-xl font-bold mb-4">ECOMMERCE</h2>
            <p className="text-gray-400 mb-4">
              Ecommerce is a free UI Kit from Papperpillar that you can use for
              your personal or commercial project.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <form className="flex gap-2 w-full" onSubmit={handleSubmit}>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="Type your email address"
                  className="bg-gray-800 text-white rounded-full px-4 py-2 w-full focus:outline-none"
                />

                <button className="bg-white text-black px-5 rounded-full font-semibold whitespace-nowrap">
                  Submit
                </button>
              </form>
            </div>
          </div>

          {/* Links Section */}
          <div className="flex flex-col sm:flex-row justify-between flex-1 gap-10">
            <div>
              <h3 className="text-white font-semibold mb-3">POPULAR</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Shoes</li>
                <li>T-Shirt</li>
                <li>Jackets</li>
                <li>Hat</li>
                <li>Accessories</li>
              </ul>
            </div>

            {/* Menu */}
            <div>
              <h3 className="text-white font-semibold mb-3">MENU</h3>
              <ul className="space-y-2 text-gray-400">
                <li>All Category</li>
                <li>Gift Cards</li>
                <li>Special Events</li>
                <li>Testimonial</li>
                <li>Blog</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-3">OTHER</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Tracking Package</li>
                <li>FAQ</li>
                <li>About Us</li>
                <li>Contact Us</li>
                <li>Terms and Conditions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
