'use client';

import { useEffect, useState } from "react";
import LoginForm from "@/app/ui/modals/app/auth/login-modal";
import RegisterForm from "@/app/ui/modals/app/auth/register-modal";
import UserInfo from "@/app/ui/modals/app/auth/userInfo-modal";
import { FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, logout } from "../lib/redux/auth-slice";
import { RootState } from "../lib/redux/store";
import { closeAuthModal, openAuthModal } from "../lib/redux/authModal-slice";
import Cookies from "js-cookie";


export default function AuthModal() {
  const isOpen = useSelector((state: RootState) => state.authModal.isOpen);
  const [isLogin, setIsLogin] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();


  const [form, setForm] = useState({
    name: "",
    phone_number: "",
    address: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [user, setUser] = useState<null | typeof form>(null);

  useEffect(() => {
    const token = Cookies.get("token");
    const userData = Cookies.get("user");
    if (token && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/app/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      // localStorage.setItem("token", data.data.token);
      // localStorage.setItem("user", JSON.stringify(data.data.user));
      const token = data.data.token;
      const roleId = data.data.user.role_id;  // Lấy role_id từ response
      const user = data.data.user;

      // Lưu vào cookie
      Cookies.set("token", token);
      Cookies.set("role_id", roleId.toString());
      Cookies.set("user", JSON.stringify(user));

      setUser(data.data.user);
      setIsLoggedIn(true);
      dispatch(loginSuccess({ user: data.data.user, token: data.data.token }));
      toast.success("Đăng nhập thành công");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Có lỗi xảy ra!");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/app/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      toast.success("Đăng ký thành công, vui lòng đăng nhập");
      setIsLogin(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Đăng ký thất bại!");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    setUser(null);
    setIsLoggedIn(false);
    toast.success("Đăng xuất thành công");
    dispatch(logout());
  };

  return (
    <>
      <button className="flex items-center text-lg" onClick={() => dispatch(openAuthModal())}>
        <FaUser className="hover:scale-110 transition-transform duration-300" />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          onMouseDown={(e) => e.target === e.currentTarget && dispatch(closeAuthModal())}
        >
          <div
            className="bg-white p-6 sm:p-8 md:p-10 rounded-lg shadow-lg w-[90vw] sm:w-[450px] relative z-50"
            onClick={(e) => e.stopPropagation()}
          >
            {isLoggedIn ? (
              <UserInfo user={user} onLogout={handleLogout} />
            ) : isLogin ? (
              <LoginForm
                email={form.email}
                password={form.password}
                error={error}
                loading={loading}
                onEmailChange={(val) => setForm({ ...form, email: val })}
                onPasswordChange={(val) => setForm({ ...form, password: val })}
                onSubmit={handleLogin}
                switchToRegister={() => setIsLogin(false)}
              />
            ) : (
              <RegisterForm
                {...form}
                error={error}
                loading={loading}
                onChange={(field, val) => setForm({ ...form, [field]: val })}
                onSubmit={handleRegister}
                switchToLogin={() => setIsLogin(true)}
              />
            )}
            <button className="w-full mt-3 bg-gray-300 p-2 rounded" onClick={() => dispatch(closeAuthModal())}>
              Đóng
            </button>
          </div>
        </div>
      )}
    </>
  );
}
