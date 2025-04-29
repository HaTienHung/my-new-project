'use client'

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import slugify from 'slugify';
import unidecode from 'unidecode';
import { Category } from "../lib/definitions";

const CategoryDropdown = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

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

  return (
    <>
      {/* Burger menu */}
      <div className="flex items-center justify-between md:hidden">
        <button
          className="text-2xl pb-2 pt-2 pr-2"
          onClick={() => setShowMenu(!showMenu)}
        >
          {showMenu ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Dropdown menu */}
      {showMenu && (
        <div
          className="absolute top-full left-0 w-[80vw] mx-auto mt-1 ml-1 rounded-xl bg-gray-200 text-[rgb(121,100,73)] p-4 space-y-2 shadow-lg transition-transform duration-300 ease-in-out z-20 origin-top md:hidden  "
        >
          <span className="block p-2 text-sm">Danh mục sản phẩm</span>
          {categories.map((category: Category) => (
            <Link
              key={category.id}
              href={`/categories/${slugify(unidecode(category.name), { lower: true, strict: true })}`}
              className="block hover:bg-gray-300 p-2 rounded"
              onClick={() => setShowMenu(false)}
            >
              {category.name}
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default CategoryDropdown;
