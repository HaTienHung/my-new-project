'use client';
import { useEffect, useRef, useState } from "react";
import { FaMinus, FaPlus, FaTrashCan } from "react-icons/fa6";
import { CartItemsSkeleton } from "@/app/ui/skeletons";
import { useDispatch } from "react-redux";
import { decreaseQuantity, increaseQuantity } from "@/app/lib/redux/cart-slice";
import { toast } from "react-toastify";
import { removeFromCart } from "@/app/lib/redux/cart-slice";
import Cookies from "js-cookie";
import { Product } from "@/app/lib/definitions";
import Link from "next/link";


const Cart = () => {
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState<{ id: number; product: Product; quantity: number }[]>([]);

  const dispatch = useDispatch();


  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/app/cart`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Cookies.get("token")}`,
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

  const handleDelete = async (productId: number) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/app/cart/delete/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${Cookies.get('token')}`,
        },
      });

      if (res.ok) {
        toast.success("Sản phẩm đã được xóa khỏi giỏ hàng!");
        // Sau khi xóa thành công, cập nhật lại giỏ hàng
        setCartItems(cartItems.filter(item => item.product.id !== productId));
        dispatch(removeFromCart({ product_id: productId }));
      } else {
        throw new Error("Không thể xóa sản phẩm");
      }
    } catch (error) {
      toast.error("Xóa sản phẩm thất bại");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const handleIncrease = (id: number) => {
    let newQuantity = 0;

    // Cập nhật số lượng trong giỏ hàng
    const updatedCart = cartItems.map((item) => {
      if (item.product.id === id) {
        newQuantity = item.quantity + 1;
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    // Cập nhật UI giỏ hàng
    setCartItems(updatedCart);
    dispatch(increaseQuantity({ product_id: id }));

    // Nếu có timeout cũ, hủy nó đi
    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current);
    }

    // Đặt timeout mới để gọi updateCartOnSever sau 1.5 giây nếu không có thao tác nữa
    updateTimeoutRef.current = setTimeout(() => {
      // Gọi hàm updateCartOnSever để cập nhật giỏ hàng lên server
      updateCartOnSever(id, newQuantity);
    }, 1500); // 1.5 giây
  };

  const handleDecrease = (id: number) => {
    const updatedCart = cartItems.map((item) =>
      item.product.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    console.log(updatedCart);
    setCartItems(updatedCart);
    dispatch(decreaseQuantity({ product_id: id }));
  };
  const updateCartOnSever = async (productId: number, quantity: number) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/app/cart/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Cookies.get('token')}`,
        },
        body: JSON.stringify({
          items: [
            {
              product_id: productId,
              quantity: quantity,
            },
          ],
        }),
      });

      if (res.ok) {
        toast.success("Sản phẩm đã được cập nhật thành công!");
        // Sau khi xóa thành công, cập nhật lại giỏ hàng
        // setCartItems(cartItems.filter(item => item.product.id !== productId));
        // dispatch(removeFromCart({ product_id: productId }));
      } else {
        throw new Error("Không thể cập nhật sản phẩm");
      }
    } catch (error) {
      toast.error("Cập nhật sản phẩm thất bại");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  const handleCheckout = async () => {
    const productIds = cartItems.map(item => item.product.id);
    console.log(productIds);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/app/cart/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Cookies.get('token')}`,
        },
        body: JSON.stringify({
          product_ids:
            productIds
        }),
      });

      if (res.ok) {
        toast.success("Đặt hàng thành công!");
        // Xóa sản phẩm khỏi cartItems
        const updatedCartItems = cartItems.filter(item => !productIds.includes(item.product.id));
        setCartItems(updatedCartItems);  // Cập nhật lại giỏ hàng

        // Xóa sản phẩm khỏi Redux
        productIds.forEach(productId => {
          dispatch(removeFromCart({ product_id: productId }));
        });
      } else {
        const errorData = await res.json();
        console.log(errorData);
        throw new Error("Không thể đặt hàng");
      }
    } catch (error) {
      toast.error("Đặt hàng thất bại");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="mx-auto">
      {loading ? (
        // Hiển thị skeleton khi đang tải dữ liệu
        <CartItemsSkeleton />
      ) : cartItems.length === 0 ? (
        <div className="flex justify-center flex-col items-center">
          <div className="text-center py-4 font-semibold">
            Giỏ hàng của bạn hiện tại không có sản phẩm nào.
          </div>
          <div>
            <button className="border bg-gray-200 font-light rounded-lg px-3 py-2 cursor-pointer hover:bg-[rgb(121,100,73)] hover:text-white transition duration-300"><Link href="/products">Tiếp tục mua sắm</Link></button>
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
                      <button
                        onClick={() => handleDelete(item.product.id)}
                        disabled={loading}
                        className="flex items-center cursor-pointer"
                      >
                        <FaTrashCan className="mr-2" />
                        {loading ? "Đang xóa..." : "Xóa"}
                      </button>
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
                      <button
                        className={`w-8 h-8 flex items-center justify-center rounded-md transition
                            ${item.quantity <= 1
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-50'
                            : 'hover:bg-gray-200 '}
                            `}
                        onClick={() => handleDecrease(item.product.id)}
                        disabled={item.quantity <= 1}
                        title={item.quantity <= 1 ? "Số lượng tối thiểu là 1" : ""}
                      >
                        <FaMinus className="text-sm" />
                      </button>

                      {/* Hiển thị số lượng */}
                      <span className="text-lg font-semibold">{item.quantity}</span>

                      {/* Nút Tăng (+) */}
                      <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-200"
                        onClick={() => handleIncrease(item.product.id)}>
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
                Tổng cộng: {cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0).toLocaleString()} VND
              </h2>
              <button className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600"
                onClick={() => handleCheckout()}>
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
