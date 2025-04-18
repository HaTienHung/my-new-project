'use client'; // Đảm bảo là Client Component

import { FaShoppingCart } from "react-icons/fa";
import { RootState } from "@/app/lib/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { openAuthModal } from "@/app/lib/redux/authModal-slice";
import Link from "next/link";
import { useState } from "react";

export default function CartQuantity() {
  const quantity = useSelector((state: RootState) => state.cart.quantity);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const [isOpen,setIsOpen] = useState()
  const dispatch = useDispatch();

  const handleCartClick = () => {
    if (!isAuthenticated) {
      // Nếu chưa đăng nhập, mở modal AuthModal
      dispatch(openAuthModal());
    }
  };

  return (
    <button onClick={handleCartClick}>
      <Link href={isAuthenticated ? '/cart' : '#'} passHref className="relative text-lg transition-transform duration-300 hover:scale-110">
        <FaShoppingCart />
        <span className="absolute -top-2 -right-2 text-white bg-[rgb(121,100,73)] text-xs px-1 rounded-full">
          {quantity}
        </span>
      </Link>
    </button>
  );
}
