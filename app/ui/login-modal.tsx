import { useState, useEffect, useRef } from "react";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { toast } from "react-toastify";



export default function AuthModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [name, setName] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState<{ name: string, phone_number: number, address: string, email: string } | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);

  // Tải thông tin user khi trang load lại
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);


  useEffect(() => {
    if (isOpen) {
      emailRef.current?.focus(); // Tự động focus vào email khi mở modal
    }
  }, [isOpen]);


  // Hàm xử lý đăng nhập
  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/app/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      // console.log(data);

      if (!response.ok) {
        throw new Error(data.message || "Đăng nhập thất bại!");
      }

      // 🛠 Lưu token & user vào localStorage
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("user", JSON.stringify(data.data.user));

      // Cập nhật trạng thái đăng nhập
      setUser(data?.data?.user ?? null);
      setIsLoggedIn(true);
      setIsOpen(true); // Đóng modal sau khi đăng nhập thành công
      toast.success("Đăng nhập thành công");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Đã xảy ra lỗi!";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Đăng xuất thành công");
  };

  const handleRegister = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/app/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone_number,
          address,
          email,
          password,
          password_confirmation
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Đăng ký thất bại!");
      }

      toast.success("Đăng ký thành công, vui lòng đăng nhập");
      setIsLogin(true); // Chuyển về form đăng nhập sau khi đăng ký thành công
    } catch (err) {
      setError(err instanceof Error ? err.message : "Có lỗi xảy ra!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Button mở modal */}
      <button
        className="flex items-center px-4 text-lg"
        onClick={() => setIsOpen(true)}
      >
        <FaUser className="hover:scale-110 transition-transform duration-300" />
        <span className="hidden md:hidden lg:inline text-base ml-1 hover:underline underline-offset-4">
          Tài khoản
        </span>
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setTimeout(() => setIsOpen(false), 100); // Đợi 100ms để tránh đóng modal khi blur
            }
          }}
        >
          <div
            className="bg-white p-10 rounded-lg shadow-lg w-[450px] relative z-50"
            onClick={(e) => e.stopPropagation()}
          >
            {isLoggedIn ? (
              <>
                <h2 className="text-xl font-semibold mb-4 text-center">Thông tin tài khoản</h2>
                <div className="p-4 bg-gray-100 rounded-lg">
                  {/* Ảnh đại diện (nếu có) */}
                  <div className="flex justify-center mb-4">
                    <FaUser className="text-6xl text-gray-500" />
                  </div>

                  {/* Tên người dùng */}
                  <p className="text-lg font-semibold text-center">{user?.name ?? "Người dùng"}</p>

                  {/* Danh sách thông tin */}
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
                <button
                  className="w-full bg-red-500 text-white p-2 rounded"
                  onClick={() => {
                    setIsLoggedIn(false);
                    setIsLogin(true);
                    localStorage.removeItem("token"); // Xóa token khi logout
                    setIsOpen(true);
                    handleLogout()
                  }}
                >
                  Đăng xuất
                </button>
              </>
            ) : (
              <>
                <h2 className="text-xl font-semibold mb-4 text-center">
                  {isLogin ? "Đăng nhập" : "Đăng ký"}
                </h2>

                {isLogin ? (
                  <>
                    <form onSubmit={(e) => {
                      e.preventDefault(); // Ngăn form reload trang
                      handleLogin(); // Gọi hàm xử lý đăng nhập
                    }}>
                      <input
                        ref={emailRef} // Gán ref vào input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded mb-3 focus:ring-2 focus:ring-[rgb(121,100,73)] outline-none"
                      />
                      <input
                        type="password"
                        placeholder="Mật khẩu"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded mb-3 focus:ring-2 focus:ring-[rgb(121,100,73)] outline-none"
                      />

                      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

                      <button
                        className="w-full bg-blue-500 text-white p-2 rounded"
                        type="submit"
                        disabled={loading}
                      >
                        {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                      </button>
                      <p className="text-center mt-2 text-sm">
                        Chưa có tài khoản?{" "}
                        <span
                          className="text-blue-500 cursor-pointer"
                          onClick={() => setIsLogin(false)}
                        >
                          Đăng ký ngay
                        </span>
                      </p>
                    </form>
                  </>
                ) : (
                  <>
                    <input
                      type="text"
                      placeholder="Tên"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded mb-3 focus:ring-2 focus:ring-[rgb(121,100,73)] outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Số điện thoại"
                      value={phone_number}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded mb-3 focus:ring-2 focus:ring-[rgb(121,100,73)] outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Địa chỉ"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded mb-3 focus:ring-2 focus:ring-[rgb(121,100,73)] outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded mb-3 focus:ring-2 focus:ring-[rgb(121,100,73)] outline-none"
                    />
                    <input
                      type="password"
                      placeholder="Mật khẩu"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded mb-3 focus:ring-2 focus:ring-[rgb(121,100,73)] outline-none"
                    />
                    <input
                      type="password"
                      placeholder="Nhập lại mật khẩu"
                      value={password_confirmation}
                      onChange={(e) => setPasswordConfirmation(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded mb-3 focus:ring-2 focus:ring-[rgb(121,100,73)] outline-none"
                    />

                    {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                    <button
                      className="w-full bg-green-500 text-white p-2 rounded"
                      onClick={handleRegister}
                      disabled={loading}
                    >
                      {loading ? "Đang đăng ký..." : "Đăng ký"}
                    </button>
                    <p className="text-center mt-2 text-sm">
                      Đã có tài khoản?{" "}
                      <span
                        className="text-blue-500 cursor-pointer"
                        onClick={() => setIsLogin(true)}
                      >
                        Đăng nhập ngay
                      </span>
                    </p>
                  </>
                )}
              </>
            )}

            <button
              className="w-full mt-3 bg-gray-300 p-2 rounded"
              onClick={() => setIsOpen(false)}
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </>
  );
}
