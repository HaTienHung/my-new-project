'use client'; // Đảm bảo là Client Component

import { FaShoppingCart } from "react-icons/fa";
import { RootState } from "@/app/lib/redux/store";
import { useSelector } from "react-redux";

export default function CartQuantity() {
  const quantity = useSelector((state: RootState) => state.cart.quantity);
  console.log('Cart Quantity:', quantity);

  return (
    <button>
      <a href="/cart" className="relative text-lg transition-transform duration-300 hover:scale-110">
        <FaShoppingCart />
        <span className="absolute -top-2 -right-2 text-white bg-[rgb(121,100,73)] text-xs px-1 rounded-full">
          {quantity} {/* Số lượng giỏ hàng */}
        </span>
      </a>
    </button>
  );
}
