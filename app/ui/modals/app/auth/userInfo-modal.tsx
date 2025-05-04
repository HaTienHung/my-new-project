import { User } from "@/app/lib/definitions";
import { FaUserAstronaut, FaEnvelope, FaPhone, FaMapMarkerAlt, FaEdit } from "react-icons/fa";

interface UserInfoProps {
  user: User | null;
  onLogout: () => void;
  onEdit: () => void;
}

export default function UserInfo({ user, onLogout, onEdit }: UserInfoProps) {
  return (
    <>
      <div className="flex justify-between items-baseline">
        <h2 className="text-base sm:text-xl font-semibold mb-4 text-center">Thông tin tài khoản</h2>
        <button
          className="flex items-center border border-solid border-primary px-2 sm:px-3 sm:py-2 py-1 gap-2 rounded-md cursor-pointer"
          onClick={onEdit}
        >
          <FaEdit className="text-sm" />
          Cập nhật
        </button>
      </div>
      <div className="p-4 bg-gray-100 rounded-lg">
        <div className="flex justify-center mb-4">
          <FaUserAstronaut className="text-6xl text-gray-700" />
        </div>
        <p className="text-lg font-semibold text-center">{user?.name}</p>
        <div className="mt-4 space-y-3 text-sm">
          <div className="flex items-center space-x-2">
            <FaEnvelope className="text-gray-500" />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaPhone className="text-gray-500" />
            <span>{user?.phone_number ?? "Chưa cập nhật"}</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaMapMarkerAlt className="text-gray-500" />
            <span>{user?.address ?? "Chưa cập nhật"}</span>
          </div>
        </div>
      </div>
      <button className="w-full bg-primary text-white p-2 rounded mt-4" onClick={onLogout}>
        Đăng xuất
      </button>
    </>
  );
}
