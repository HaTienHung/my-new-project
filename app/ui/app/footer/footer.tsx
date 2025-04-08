"use client";
import { FaFacebookF, FaTwitter, FaInstagram, FaTruck, FaUndo, FaFileContract, FaShieldAlt, FaEnvelope, FaClock, FaStore } from "react-icons/fa";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-100 shadow-lg border-t border-gray-300 text-[rgb(121,100,73)]">
      <div className="container mx-auto px-4 border-b">
        <div className="flex flex-wrap justify-between -mx-4 py-6 bg-gray-100 ">
          <div className="w-full md:w-1/3 px-4 mb-8 md:mb-0">
            <h4 className="uppercase font-semibold text-2xl mb-5">Hỗ trợ khách hàng</h4>
            <ul className="space-y-3 cursor-pointer">
              <li className="flex items-center gap-2 hover:underline underline-offset-4">
                <FaTruck className="text-[rgb(121,100,73)]" />
                <a className=" transition-colors duration-300 ">Chính sách vận chuyển</a>
              </li>
              <li className="flex items-center gap-2">
                <FaUndo className="text-[rgb(121,100,73)]" />
                <a className=" transition-colors duration-300 hover:underline underline-offset-4">Chính sách hoàn tiền</a>
              </li>
              <li className="flex items-center gap-2">
                <FaFileContract className="text-[rgb(121,100,73)]" />
                <a className=" transition-colors duration-300 hover:underline underline-offset-4">Điều khoản dịch vụ</a>
              </li>
              <li className="flex items-center gap-2">
                <FaShieldAlt className="text-[rgb(121,100,73)]" />
                <a className=" transition-colors duration-300 hover:underline underline-offset-4">Chính sách bảo mật</a>
              </li>
            </ul>
          </div>

          <div className="w-full md:w-1/3 px-4 mb-8 md:mb-0">
            <h4 className="uppercase font-semibold text-2xl mb-5">Khám phá My Store</h4>
            <ul className="space-y-3 cursor-pointer">
              <li className="flex items-center gap-2">
                <FaStore className="text-[rgb(121,100,73)]" />
                <a className=" transition-colors duration-300 hover:underline underline-offset-4">Về chúng tôi</a>
              </li>
              <li className="flex items-center gap-2">
                <FaStore className="text-[rgb(121,100,73)]" />
                <a className=" transition-colors duration-300 hover:underline underline-offset-4">Có gì mới</a>
              </li>
            </ul>
          </div>

          <div className="w-full md:w-1/3 px-4">
            <h4 className="uppercase font-semibold text-2xl mb-5">Liên hệ chúng tôi</h4>
            <div className="space-y-3 text-base">
              <div className="flex items-center gap-2">
                <FaEnvelope className="text-[rgb(121,100,73)]" />
                <a href="mailto:hungtmt1102@gmail.com" className="text-[rgb(121,100,73)] hover:underline">
                  hungtmt1102@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <FaClock className="text-[rgb(121,100,73)]" />
                <p>08:00 - 18:30 (Thứ 2 - Thứ 7)</p>
              </div>
              <p className="text-sm text-[rgb(121,100,73)]">Chúng tôi sẽ phản hồi email trong vòng 24h.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-8 py-6 flex flex-col md:flex-row items-center justify-between">
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
          <a href="#" className=" hover:text-blue-600 transition duration-300">
            <FaFacebookF size={20} />
          </a>
          <a href="#" className=" hover:text-blue-400 transition duration-300">
            <FaTwitter size={20} />
          </a>
          <a href="#" className=" hover:text-pink-500 transition duration-300">
            <FaInstagram size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
