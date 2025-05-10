'use client'; // Đảm bảo là Client Component

import { RiShoppingBag2Fill } from "react-icons/ri";
import { RootState } from "@/app/lib/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { openAuthModal } from "@/app/lib/redux/authModal-slice";
import Link from "next/link";

export default function CartQuantity() {
  const quantity = useSelector((state: RootState) => state.cart.quantity);
  // console.log(quantity);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const handleCartClick = () => {
    if (!isAuthenticated) {
      // Nếu chưa đăng nhập, mở modal AuthModal
      dispatch(openAuthModal());
    }
  };

  return (
    <Link
      href={isAuthenticated ? "/cart" : "#"}
      className="relative text-xl transition-transform duration-300 hover:scale-110 flex items-center"
      passHref
      onClick={handleCartClick}
    >
      <RiShoppingBag2Fill />
      {quantity > 0 && (
        <span className="absolute -bottom-2 -right-2 text-white bg-primary text-xs px-1.5 h-4 min-w-[10px] flex items-center justify-center rounded-lg leading-none">
          {quantity}
        </span>
      )}
    </Link>
  );
}
