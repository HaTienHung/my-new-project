'use client';
import { useEffect, useState } from "react";
import { FaMinus, FaPlus, FaTrashCan } from "react-icons/fa6";
import { CartItemsSkeleton } from "../skeletons";
import Header from "../header/header";

const Cart = () => {
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState<{ id: number; product: any; quantity: number }[]>([]);


  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/app/cart`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Không thể lấy giỏ hàng!");
        }

        const data = await response.json();
        setCartItems(data?.data);
      } catch (err) {
        console.error("Lỗi khi lấy giỏ hàng:", err);
      } finally {
        setLoading(false);  // Khi dữ liệu đã được tải, set loading = false
      }
    };

    fetchCart();
  }, []);

  const getTotalItemsInCart = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="mx-auto">
      {/* Truyền số lượng sản phẩm trong giỏ vào Header */}
      {/* <div className="hidden">
        <Header cartItemCount={getTotalItemsInCart()} />
      </div> */}
      {loading ? (
        // Hiển thị skeleton khi đang tải dữ liệu
        <CartItemsSkeleton />
      ) : cartItems.length === 0 ? (
        <div className="flex justify-center flex-col items-center">
          <div className="text-center py-4 font-semibold">
            Giỏ hàng của bạn hiện tại không có sản phẩm nào.
          </div>
          <div>
            <button className="border bg-gray-200 font-light rounded-lg px-3 py-2 cursor-pointer hover:bg-[rgb(121,100,73)] hover:text-white transition duration-300"><a href="/">Tiếp tục mua sắm</a></button>
          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-2xl bg-gray-100 rounded">
          <section className="px-8 py-4">
            <h1 className="text-center text-3xl font-semibold">Giỏ hàng của bạn</h1>
          </section>

          {/* Danh sách sản phẩm */}
          <section className="py-4 flex flex-col space-y-14 border-t border-b">
            {cartItems.map((item) => (
              <div key={item.id} className="flex container mb-10">
                {/* Hình ảnh sản phẩm */}
                <div className="w-20 min-h-[100px] flex flex-col">
                  <div>
                    <img src={"https://13demarzo.net/cdn/shop/files/FR25X18551.png?v=1742525628&width=600"} className="object-cover border rounded" />
                  </div>
                  <div className="flex justify-center cursor-pointer mt-2">
                    <div className="flex items-center">
                      <FaTrashCan className="mr-2" /> Xoá
                    </div>
                  </div>
                </div>

                {/* Thông tin sản phẩm */}
                <div className="ml-2 flex flex-grow">
                  {/* Phần mô tả sản phẩm (70%) */}
                  <div className="w-[70%] pr-5">
                    <h1 className="truncate font-bold text-lg">{item.product.name} </h1>
                  </div>

                  {/* Phần giá và nút tăng giảm (30%) */}
                  <div className="w-[30%] flex flex-col items-end">
                    <h1 className="mb-4 font-light">{item.product.price} VNĐ</h1>
                    <div className="flex items-center space-x-2 border p-1 rounded-md">
                      {/* Nút Giảm (-) */}
                      <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-200">
                        <FaMinus className="text-sm" />
                      </button>

                      {/* Hiển thị số lượng */}
                      <span className="text-lg font-semibold">{item.quantity}</span>

                      {/* Nút Tăng (+) */}
                      <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-200">
                        <FaPlus className="text-sm" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* Tổng tiền và nút thanh toán */}
          <section className="">
            <div className="flex items-center justify-between mt-6">
              <h2 className="text-xl font-semibold">
                {/* Tổng cộng: {cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toLocaleString()} VND */}
              </h2>
              <button className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600">
                Thanh toán
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default Cart;
