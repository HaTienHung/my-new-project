'use client';

import React, { useState } from "react";
import { FaAngleDown, FaBars, FaSearch } from "react-icons/fa";
import SearchBar from "../../search-bar";
import Image from "next/image";
import CategoryDropdown from "../../category-dropdown"; // Import component mới
import Link from "next/link";
import slugify from 'slugify';
import unidecode from 'unidecode';


import { getCategories } from "@/app/lib/data"; // Import hàm fetch API
import CartQuantity from "@/app/ui/app/cart/cart-quantity";
import OrderModal from "../../modals/app/order/orderList-modal";
import AuthModal from "@/app/ui/auth-modal";
import { Category } from "@/app/lib/definitions";

const categories = await getCategories();

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="bg-blue-500 text-white text-sm border-b border-gray-300 sticky top-0 z-50 border-solid shadow">
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
              className=" hidden md:block md:w-32 lg:w-40 cursor-pointer"
              src="/next.svg"
              alt="Next.js logo"
              width={140}
              height={30}
              priority
            />
          </Link>
          {/* Danh mục mobile */}
          <div className="flex items-center justify-center">
            {/* <CategoryDropdown /> */}
            {/* Hiện logo Vercel trên mobile */}
            <Link href={"/"} className="curson-pointer">
              <Image
                className="p-2 md:hidden"
                src="/nextjs-icon.svg"
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
          <div className="flex items-center gap-5 mr-3">
            {/* Icon tìm kiếm trên mobile */}
            <button
              className="md:hidden text-lg transition-transform duration-300 hover:scale-110"
              onClick={() => setShowSearch(!showSearch)}
            >
              <FaSearch />
            </button>

            <AuthModal />
            <OrderModal />
            <CartQuantity />
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
                className={`absolute left-0 mt-3 w-56 bg-gray-100 text-[rgb(121,100,73)] p-4 space-y-2 shadow-lg transition-transform duration-300 ease-in-out z-1
        ${showMenu ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"}`}
              >
                {categories.map((category: Category) => (
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
            {/* Danh sách danh mục con trải đều*/}
            <div className="flex-1 flex justify-between ml-16 space-x-6">
              {categories.map((category: Category) => (
                <Link
                  key={category.id}
                  href={`/categories/${slugify(unidecode(category.name), { lower: true, strict: true })}`}
                  className="relative font-medium text-base transition-all duration-300 ease-in-out 
                  hover:underline underline-offset-4 
                  hover:text-[rgb(90,70,50)]"
                >
                  {category.name}
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
