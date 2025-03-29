'use client';

import React, { useEffect, useState } from "react";
import { FaAngleDown, FaBars, FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import SearchBar from "../search-bar";
import Image from "next/image";
import CategoryDropdown from "../category-dropdown"; // Import component mới
import Link from "next/link";
import slugify from "slugify";
import unidecode from "unidecode";


const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
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
    <header className="bg-blue-500 text-white text-sm">
      {/* Top bar */}
      <div className="container mx-auto justify-end py-2 px-4 hidden md:flex ">
        <div className="flex space-x-4">
          <span>📞 (038) 776.8880</span>
          <span>hungtmt1102@gmail.com</span>
        </div>
      </div>

      {/* Main header */}
      <div className="bg-gray-100 text-[rgb(121,100,73)] py-3">
        <div className="container mx-auto flex items-center justify-between px-4">
          {/* Hiện logo NextJS trên desktop */}
          <Link href={"/"} className="cursor-pointer hidden md:block">
            <Image
              className=" hidden md:block md:w-32 lg:w-40"
              src="/next.svg"
              alt="Next.js logo"
              width={140}
              height={30}
              priority
            />
          </Link>
          {/* Danh mục mobile */}
          <div className="flex items-center justify-center">
            <CategoryDropdown />
            {/* Hiện logo Vercel trên mobile */}
            <Link href={"/"} className="curson-pointer">
              <Image
                className="p-2 md:hidden"
                src="/vercel.svg"
                alt="Vercel logo"
                width={40}
                height={30}
                priority
              />
            </Link>
          </div>

          {/* Search bar (ẩn trên mobile) */}
          <div className="hidden md:flex flex-1 justify-center">
            <SearchBar />
          </div>

          {/* Icons */}
          <div className="flex space-x-4 items-center">
            {/* Icon tìm kiếm trên mobile */}
            <button
              className="md:hidden text-xl"
              onClick={() => setShowSearch(!showSearch)}
            >
              <FaSearch />
            </button>

            <button className="flex items-center md:space-x-1 text-xl">
              <FaUser />
              <span className="hidden md:hidden lg:inline text-base ml-2">Tài khoản</span>
            </button>

            <button className="relative text-xl">
              <FaShoppingCart />
              <span className="absolute -top-2 -right-2 bg-red-500 text-xs px-1 rounded-full">0</span>
            </button>
          </div>
        </div>

        {/* Search bar mobile */}
        <div
          className={`md:hidden transition-transform duration-300 ease-in-out overflow-hidden ${showSearch ? "scale-y-100 h-auto opacity-100" : "scale-y-0 h-0 opacity-0"
            }`}
        >
          <div className="px-3">
            <SearchBar />
          </div>
        </div>
      </div>
      {/* Bottom Header */}
      <div className="bg-gray-100 text-[rgb(121,100,73)] pb-3 hidden md:block">
        <div className="container mx-auto items-center justify-between px-4">

          <div className="flex">
            {/* Danh mục trên desktop */}
            <div className="relative">
              <div className="flex items-center space-x-1 cursor-pointer" onClick={() => setShowMenu(!showMenu)}>
                <button
                  className="text-xl"
                >
                  <FaBars />
                </button>
                <span className=" text-base font-medium tracking-wide">DANH MỤC SẢN PHẨM</span>
                <FaAngleDown className="text-sm" />
              </div>
              <div
                className={`absolute left-0 mt-3 w-56 bg-gray-500 text-white p-4 space-y-2 shadow-lg transition-transform duration-300 ease-in-out z-1
        ${showMenu ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"}`}
              >
                {categories.map((category: any) => (
                  <Link
                    key={category.id}
                    href={`${slugify(unidecode(category.name), { lower: true, strict: true })}`}
                    className="block hover:bg-gray-400 p-2 rounded"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
            {/* Danh sách danh mục con trải đều*/}
            <div className="flex-1 flex justify-between ml-16 space-x-6">
              {categories.map((category: any) => (
                <Link
                  key={category.id}
                  href={`${slugify(unidecode(category.name), { lower: true, strict: true })}`}
                  className="relative  font-medium text-base transition-all duration-300 ease-in-out hover:scale-110 group"
                >
                  {category.name}
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-orange-600 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
