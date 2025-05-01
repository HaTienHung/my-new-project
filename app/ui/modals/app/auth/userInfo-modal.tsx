import { FaUserAstronaut, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

interface UserInfoProps {
  user: {
    name: string;
    email: string;
    phone_number: string;
    address: string;
  } | null;
  onLogout: () => void;
}

export default function UserInfo({ user, onLogout }: UserInfoProps) {
  return (
    <>
      <h2 className="text-xl font-semibold mb-4 text-center">Thông tin tài khoản</h2>
      <div className="p-4 bg-gray-100 rounded-lg">
        <div className="flex justify-center mb-4">
          <FaUserAstronaut className="text-6xl text-gray-700" />
        </div>
        <p className="text-lg font-semibold text-center">{user?.name ?? "Người dùng"}</p>
        <div className="mt-4 space-y-3 text-sm">
          <div className="flex items-center space-x-2">
            <FaEnvelope className="text-gray-500" />
            <span>{user?.email ?? "Chưa cập nhật"}</span>
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
      <button className="w-full  bg-[rgb(121,100,73)] text-white p-2 rounded mt-4" onClick={onLogout}>
        Đăng xuất
      </button>
    </>
  );
}
