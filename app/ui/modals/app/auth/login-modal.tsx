import { useEffect, useRef } from "react";

interface LoginFormProps {
  email: string;
  password: string;
  loading: boolean;
  error: string;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: () => void;
  switchToRegister: () => void;
}

export default function LoginForm({
  email,
  password,
  loading,
  error,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  switchToRegister,
}: LoginFormProps) {
  const emailRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    emailRef.current?.focus(); // Tự động focus vào email khi mở modal
  }, []);

  return (
    <>
      <h2 className="text-xl font-semibold mb-4 text-center">
        Đăng nhập
      </h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <input
          ref={emailRef}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          className="w-full p-2 border border-solid  border-gray-300 rounded mb-3 focus:ring-2 focus:ring-[rgb(121,100,73)] outline-none text-base"
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          className="w-full p-2 border border-solid  border-gray-300 rounded mb-3 focus:ring-2 focus:ring-[rgb(121,100,73)] outline-none text-base"
        />
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <button className="w-full bg-[rgb(121,100,73)] text-white p-2 rounded" type="submit" disabled={loading}>
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>
        <p className="text-center mt-2 text-sm">
          Chưa có tài khoản?{" "}
          <span className="text-blue-500 cursor-pointer" onClick={switchToRegister}>
            Đăng ký ngay
          </span>
        </p>
      </form>
    </>
  );
}
