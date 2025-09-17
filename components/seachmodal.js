"use client";
import { X } from "lucide-react";

export default function SearchModal({ open, onClose, products, isLoading }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-50">
      <div className="bg-white w-full max-w-2xl mt-20 rounded-lg shadow-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black"
        >
          <X size={20} />
        </button>

        <h2 className="text-lg font-semibold mb-4">Search Results</h2>

        {isLoading ? (
          <p className="text-gray-500">Loading...</p>
        ) : products?.length > 0 ? (
          <ul className="space-y-3 max-h-80 overflow-y-auto">
            {products.map((p) => (
              <li key={p.id} className="flex items-center gap-3 border-b pb-2">
                <img
                  src={p.images?.[0]}
                  alt={p.title}
                  className="w-12 h-12 object-cover rounded"
                />
                <div>
                  <p className="font-medium">{p.title}</p>
                  <p className="text-sm text-gray-500 line-clamp-1">
                    {p.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No products found.</p>
        )}
      </div>
    </div>
  );
}
