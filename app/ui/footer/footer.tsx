"use client";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-100 shadow-lg border-t border-gray-300">
      <div className="mx-auto max-w-7xl px-8 py-6 flex flex-col md:flex-row items-center justify-between text-gray-600">
        {/* Logo và thương hiệu */}
        <div className="flex items-center space-x-3">
          <Image
            className="p-2 md:w-32 lg:w-40"
            src="/next.svg"
            alt="Next.js logo"
            width={140}
            height={30}
            priority
          />
        </div>

        {/* Bản quyền */}
        <p className="text-sm text-center md:text-left mt-4 md:mt-0">
          © 2025 My Store. All rights reserved.
        </p>

        {/* Icon mạng xã hội */}
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="#" className="text-gray-500 hover:text-blue-600 transition duration-300">
            <FaFacebookF size={20} />
          </a>
          <a href="#" className="text-gray-500 hover:text-blue-400 transition duration-300">
            <FaTwitter size={20} />
          </a>
          <a href="#" className="text-gray-500 hover:text-pink-500 transition duration-300">
            <FaInstagram size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
