'use client';

import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

export default function SearchBar() {
  const [query, setQuery] = useState('');

  return (
    <div className="flex items-center border border-gray-300 overflow-hidden w-full bg-white rounded-lg md:max-w-md lg:max-w-lg transition-all duration-300 focus-within:ring-1 focus-within:ring-[rgb(121,100,73)] my-1">
      {/* Ô tìm kiếm */}
      <input
        type="text"
        placeholder="Nhập sản phẩm cần tìm..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 px-4 py-2 outline-none text-[rgb(121,100,73)] transition-all duration-300"
      />

      {/* Button tìm kiếm */}
      <button className="text-[rgb(121,100,73)] px-4 md:py-2 py-4 flex items-center bg-gray-200 hover:bg-[rgb(121,100,73)] hover:text-white transition-all duration-300">
        <span className="hidden md:inline">Tìm kiếm</span>
        <FaSearch className="md:ml-2" />
      </button>
    </div>
  );
}
