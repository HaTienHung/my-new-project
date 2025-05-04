import Link from "next/link";

// app/cms/no-access/page.tsx
export default function Forbidden() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-4">
      <div className="text-center max-w-md">
        <h1 className="text-2xl md:text-3xl font-bold text-red-600">
          Bạn không có quyền truy cập vào trang này.
        </h1>
        <p className="mt-4 text-gray-600">
          Hãy tiếp tục mua sắm hoặc liên hệ với quản trị viên nếu gặp lỗi. Xin cảm ơn !!!
        </p>
        <button className=" mt-4 border border-solid  bg-gray-100 font-light rounded-lg px-3 py-2 cursor-pointer hover:bg-primary hover:text-white transition duration-300">
          <Link href="/products">
            Tiếp tục mua sắm
          </Link>
        </button>
      </div>
    </div>
  );
}
