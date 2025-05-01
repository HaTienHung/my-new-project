"use client";

import { IoLogOut } from "react-icons/io5";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface LogoutButtonProps {
  isMobile?: boolean;
  // onCloseMenu?: () => void;
}

export default function LogoutButton({ isMobile = false }: LogoutButtonProps) {
  const router = useRouter();

  const handleLogout = async () => {
    // Xoá cookie
    Cookies.remove("token");
    Cookies.remove("role_id");

    // Gọi API logout nếu cần
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cms/admin/logout`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`,
      },
    });

    toast.success("Đăng xuất thành công");

    // Redirect về login
    router.push("/cms/login");
  };

  return (
    <button
      onClick={() => {
        handleLogout();
      }}
      className={`flex items-center gap-2 p-3 hover:bg-gray-100 text-primary ${isMobile ? "text-2xl lg:hidden" : "mt-auto text-lg h-[48px] justify-start rounded-md font-medium hidden lg:flex"
        }`}
    >
      <IoLogOut className="w-6" />
      {!isMobile && "Đăng xuất"}
    </button>
  );
}
