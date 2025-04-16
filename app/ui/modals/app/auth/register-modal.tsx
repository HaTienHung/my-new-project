import { useEffect, useRef } from "react";

interface RegisterFormProps {
  name: string;
  phone_number: string;
  address: string;
  email: string;
  password: string;
  password_confirmation: string;
  loading: boolean;
  error: string;
  onChange: (field: string, value: string) => void;
  onSubmit: () => void;
  switchToLogin: () => void;
}

export default function RegisterForm({
  name,
  phone_number,
  address,
  email,
  password,
  password_confirmation,
  loading,
  error,
  onChange,
  onSubmit,
  switchToLogin,
}: RegisterFormProps) {
  const nameRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    nameRef.current?.focus(); // Tự động focus vào email khi mở modal
  }, []);
  return (
    <>
      <h2 className="text-xl font-semibold mb-4 text-center">
        Đăng kí
      </h2>
      <input
        ref={nameRef}
        type="text"
        placeholder="Tên"
        value={name}
        onChange={(e) => onChange("name", e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-3 focus:ring-2 focus:ring-[rgb(121,100,73)] outline-none"
      />
      <input
        type="text"
        placeholder="Số điện thoại"
        value={phone_number}
        onChange={(e) => onChange("phone_number", e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-3 focus:ring-2 focus:ring-[rgb(121,100,73)] outline-none"
      />
      <input
        type="text"
        placeholder="Địa chỉ"
        value={address} onChange={(e) => onChange("address", e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-3 focus:ring-2 focus:ring-[rgb(121,100,73)] outline-none"
      />
      <input
        type="email"
        placeholder="Email"
        value={email} onChange={(e) => onChange("email", e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-3 focus:ring-2 focus:ring-[rgb(121,100,73)] outline-none"
      />
      <input
        type="password"
        placeholder="Mật khẩu"
        value={password} onChange={(e) => onChange("password", e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-3 focus:ring-2 focus:ring-[rgb(121,100,73)] outline-none"
      />
      <input
        type="password"
        placeholder="Nhập lại mật khẩu"
        value={password_confirmation}
        onChange={(e) => onChange("password_confirmation", e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-3 focus:ring-2 focus:ring-[rgb(121,100,73)] outline-none"
      />
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      <button className="w-full  bg-[rgb(121,100,73)] text-white p-2 rounded" onClick={onSubmit} disabled={loading}>
        {loading ? "Đang đăng ký..." : "Đăng ký"}
      </button>
      <p className="text-center mt-2 text-sm">
        Đã có tài khoản?{" "}
        <span className="text-blue-500 cursor-pointer" onClick={switchToLogin}>
          Đăng nhập ngay
        </span>
      </p>
    </>
  );
}
