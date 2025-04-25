'use client'

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { FaBars } from "react-icons/fa";
import slugify from 'slugify';
import unidecode from 'unidecode';
import { Category } from "../lib/definitions";

const CategoryDropdown = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
          cache: "no-cache",
        });
        const data = await res.json();
        setCategories(data?.data ?? []);
      } catch (error) {
        console.error("Lỗi khi lấy danh mục:", error);
      }
    };

    fetchCategories();
  }, []);

  //  Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  return (
    <div className="flex justify-between">
      <div className="relative" ref={menuRef}>
        {/* Burger menu */}
        <div className="flex items-center justify-between md:hidden">
          <button
            className="text-2xl md:hidden pb-2 pt-2 pr-2"
            onClick={() => setShowMenu(!showMenu)}
          >
            <FaBars />
          </button>
        </div>

        {/* Dropdown menu */}
        <div
          className={`md:hidden absolute -mx-4 mt-3 w-[450px] bg-gray-100 text-[rgb(121,100,73)] p-4 space-y-2 shadow-lg transition-transform duration-300 ease-in-out z-10 origin-top
          ${showMenu ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"}`}
        >
          <span className="block p-2 text-sm">Danh mục sản phẩm</span>
          {categories.map((category: Category) => (
            <Link
              key={category.id}
              href={`/categories/${slugify(unidecode(category.name), { lower: true, strict: true })}`}
              className="block hover:bg-gray-200 p-2 rounded"
              onClick={() => setShowMenu(false)} // Đóng menu khi chọn
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryDropdown;
