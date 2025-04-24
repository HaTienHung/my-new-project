'use client';

import { generatePagination } from '@/app/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages = generatePagination(currentPage, totalPages);

  const handleClick = (page: number | string) => {
    if (typeof page === 'number') {
      onPageChange(page); // Gọi hàm callback từ component cha
    }
  };

  return (
    <div className="flex items-center justify-center mt-10 space-x-2">
      {/* Nút "Previous" */}
      <button
        className="px-3 py-1 rounded-md border bg-white text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <FaChevronLeft size={16} />
      </button>

      {/* Các trang */}
      {pages.map((page, index) => (
        <button
          key={index}
          className={`px-3 py-1 rounded-md border text-sm ${page === currentPage
            ? 'bg-[rgb(121,100,73)] text-white'
            : typeof page === 'number'
              ? 'bg-white text-gray-800 hover:bg-gray-100'
              : 'bg-transparent text-gray-500 cursor-default'
            }`}
          disabled={typeof page !== 'number'}
          onClick={() => handleClick(page)}
        >
          {page}
        </button>
      ))}

      {/* Nút "Next" */}
      <button
        className="px-3 py-1 rounded-md border bg-white text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <FaChevronRight size={16} />
      </button>
    </div>
  );
}
