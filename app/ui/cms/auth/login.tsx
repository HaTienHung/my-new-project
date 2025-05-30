'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

export default function CMSLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cms/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      // console.log(JSON.stringify({ email, password }));
      const data = await res.json();

      if (!res.ok) {
        const errorMessage = data?.message || 'Đăng nhập thất bại';
        setError(errorMessage);  // Lấy thông báo lỗi từ server
        throw new Error(errorMessage); // Ném ra lỗi để bắt và hiển thị
      }

      // localStorage.setItem('token', data?.data?.token || '');
      // Sau khi đăng nhập thành công và nhận được response từ BE
      const token = data.data.token;
      const roleId = data.data.user.role_id;  // Lấy role_id từ response

      // Lưu vào cookie
      Cookies.set("token", token);
      Cookies.set("role_id", roleId.toString());  // Lưu role_id vào cookie
      router.push('/cms/dashboard');
      toast.success('Đăng nhập thành công');
    } catch (error) {
      console.error("Đã có lỗi", error);
      throw new Error("Đăng nhập thất bại.");
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-primary">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-lg shadow-md w-[90vw] sm:w-[80vw] md:w-[450px]"
      >
        <h2 className="text-xl sm:text-2xl font-bold text-center">Đăng nhập CMS</h2>
        <div className="mb-4">
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            className="w-full border px-3 py-2 rounded border-solid border-primary text-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1">Mật khẩu</label>
          <input
            type="password"
            className="w-full border px-3 py-2 rounded border-solid border-primary text-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded hover:scale-102 transition-all duration-300"
          disabled={loading}
        >
          {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </button>
      </form>
    </div>
  );
}