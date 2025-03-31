import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import slugify from "slugify";
const unidecode = require("unidecode");


const CategoryDropdown = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
          cache: "no-cache", // Luôn lấy dữ liệu mới từ API
        });
        const data = await res.json();
        setCategories(data?.data ?? []); // Giả sử API trả về { data: [...] }
      } catch (error) {
        console.error("Lỗi khi lấy danh mục:", error);
      }
    };

    fetchCategories();
  }, []);
  return (

    <div className="flex justify-between">
      <div className="relative">

        {/* Burger menu trên mobile */}
        <div className="flex items-center justify-between md:hidden">
          <button
            className="text-2xl md:hidden pb-2 pt-2 pr-2"
            onClick={() => setShowMenu(!showMenu)}
          >
            <FaBars />
          </button>
        </div>

        {/* Menu danh mục mobile */}
        <div
          className={`md:hidden absolute -mx-4 mt-3 w-[450px] bg-gray-100 text-[rgb(121,100,73)] p-4 space-y-2 shadow-lg transition-transform duration-300 ease-in-out z-1
        ${showMenu ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"}`}
        >
          <span className="block p-2 text-sm">Danh mục sản phẩm</span>
          {categories.map((category: any) => (
            <Link
              key={category.id}
              href={`/categories/${slugify(unidecode(category.name), { lower: true, strict: true })}`}
              className="block hover:bg-gray-200 p-2 rounded"
            >
              {category.name}
            </Link>
          ))}
        </div>

      </div>
    </div >
  );
};

export default CategoryDropdown;
