'use client';

import { FaSearch } from 'react-icons/fa';
import { useProducts } from '../hooks/useProducts';

export default function SearchBar() {

  const {
    formSearch,
    setFormSearch,
    submitFilters,
    searchParams
  } = useProducts({ prefix: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("search bar", formSearch,searchParams);
    submitFilters();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full md:max-w-md lg:max-w-lg my-1">
      <div className="flex items-center border border-gray-300 overflow-hidden bg-white rounded-lg transition-all duration-300 focus-within:ring-1 focus-within:ring-[rgb(121,100,73)]">
        {/* Ô tìm kiếm */}
        <input
          type="text"
          placeholder="Nhập sản phẩm cần tìm..."
          value={formSearch.search}
          onChange={(e) => setFormSearch((prev) => ({ ...prev, search: e.target.value }))}
          className="flex-1 px-4 py-2 outline-none text-[rgb(121,100,73)] transition-all duration-300"
        />

        {/* Button tìm kiếm */}
        <button
          type="submit"
          className="text-[rgb(121,100,73)] px-4 md:py-2 py-4 flex items-center bg-gray-200 hover:bg-[rgb(121,100,73)] hover:text-white transition-all duration-300"
        >
          <span className="hidden md:inline">Tìm kiếm</span>
          <FaSearch className="md:ml-2" />
        </button>
      </div>
    </form>
  );
}
