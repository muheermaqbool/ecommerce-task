"use client";
import { useSendContactData } from "@/hooks/useContactData";
import { useState } from "react";


export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const sendContact = useSendContactData();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendContact.mutate(formData, {
      onSuccess: () => {
        setFormData({ name: "", email: "", message: "" });
      },
    });
    console.log(formData,"data")
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 border p-6 rounded-lg shadow-md bg-white"
      >
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-black"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={sendContact.isPending}
          className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-700 transition"
        >
          {sendContact.isPending ? "Sending..." : "Send Message"}
        </button>

        {sendContact.isSuccess && (
          <p className="text-green-600 mt-3">Message sent successfully ✅</p>
        )}
        {sendContact.isError && (
          <p className="text-red-600 mt-3">Failed to send message ❌</p>
        )}
      </form>
    </div>
  );
}
