'use client';

import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

export default function SearchBar() {
  const [query, setQuery] = useState('');

  return (
    <div className="flex items-center border border-gray-300 overflow-hidden w-full bg-white rounded-lg md:max-w-md lg:max-w-lg" >
      {/* Ô tìm kiếm */}
      <input
        type="text"
        placeholder="Nhập sản phẩm cần tìm..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 px-4 py-2 outline-none text-gray-800"
      />

      {/* Button tìm kiếm */}
      <button className="bg-blue-500 text-white px-4 md:py-2 py-4 flex items-center">
        <span className="hidden md:inline">Tìm kiếm</span>
        <FaSearch className="md:ml-2" />
      </button>
    </div>
  );
}
