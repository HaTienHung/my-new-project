'use client';
import { useEffect, useRef, useState } from "react";
import { FaMinus, FaPlus, FaTrashCan } from "react-icons/fa6";
import { CartItemsSkeleton } from "@/app/ui/skeletons";
import { useDispatch } from "react-redux";
import { setItemQuantity } from "@/app/lib/redux/cart-slice";
import { toast } from "react-toastify";
import { removeFromCart } from "@/app/lib/redux/cart-slice";
import Cookies from "js-cookie";
import { Product } from "@/app/lib/definitions";
import Link from "next/link";
import Image from 'next/image';


const Cart = () => {
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState<{ id: number; product: Product; quantity: number }[]>([]);
  const [error, setError] = useState("");

  const dispatch = useDispatch();


  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true);
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

  // Khởi tạo 1 ref lưu lại số lượng hợp lệ gần nhất từ server
  const validQuantityRef = useRef<Record<number, number>>({});

  const handleIncrease = (id: number) => {
    const currentItem = cartItems.find((item) => item.product.id === id);
    if (!currentItem) return;

    const currentQuantity = currentItem.quantity;
    const newQuantity = currentQuantity + 1;

    // Cập nhật UI tạm thời
    const updatedCart = cartItems.map((item) =>
      item.product.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
    // dispatch(increaseQuantity({ product_id: id }));

    // Xóa timeout cũ nếu có
    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current);
    }

    updateTimeoutRef.current = setTimeout(async () => {
      const success = await updateCartOnSever(id, newQuantity);
      if (success) {
        // Lưu lại số lượng hợp lệ gần nhất
        validQuantityRef.current[id] = newQuantity;
        dispatch(setItemQuantity({ product_id: id, quantity: newQuantity }));
      } else {
        // Lấy lại quantity trước đó đã xác nhận
        const validQuantity = validQuantityRef.current[id] ?? currentQuantity;

        // Rollback UI + Redux
        const rolledBackCart = cartItems.map((item) =>
          item.product.id === id ? { ...item, quantity: validQuantity } : item
        );
        setCartItems(rolledBackCart);
        dispatch(setItemQuantity({ product_id: id, quantity: validQuantity }));
      }
    }, 1000);
  };



  const handleDecrease = (id: number) => {
    const currentItem = cartItems.find((item) => item.product.id === id);
    if (!currentItem) return;

    const currentQuantity = currentItem.quantity;
    const newQuantity = currentQuantity - 1;

    // Cập nhật UI tạm thời
    const updatedCart = cartItems.map((item) =>
      item.product.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
    dispatch(setItemQuantity({ product_id: id, quantity: newQuantity }));
    // Nếu có timeout cũ, hủy nó đi
    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current);
    }

    // Đặt timeout mới để gọi updateCartOnSever sau 1.5 giây nếu không có thao tác nữa
    updateTimeoutRef.current = setTimeout(() => {
      // Gọi hàm updateCartOnSever để cập nhật giỏ hàng lên server
      updateCartOnSever(id, newQuantity);
    }, 1000); // 1 giây
  };



  const updateCartOnSever = async (productId: number, quantity: number): Promise<boolean> => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/app/cart/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Cookies.get('token')}`,
        },
        body: JSON.stringify(
          {
            product_id: productId,
            quantity: quantity,
          }
        ),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Cập nhật số lượng thành công!");
        // Sau khi xóa thành công, cập nhật lại giỏ hàng
        // setCartItems(cartItems.filter(item => item.product.id !== productId));
        // dispatch(removeFromCart({ product_id: productId }));
        setError("");
      } else {
        throw new Error(data.message || "Có lỗi xảy ra!");
      }
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : "Cập nhật sản phẩm thất bại!");
      return false;
    } finally {
      setLoading(false);
    }
  }
  const handleCheckout = async () => {
    const productIds = cartItems.map(item => item.product.id);
    // console.log(productIds);
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
        // console.log(errorData);
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
            <button className="border border-solid  bg-gray-200 font-light rounded-lg px-3 py-2 cursor-pointer hover:bg-primary hover:text-white transition duration-300"><Link href="/products">Tiếp tục mua sắm</Link></button>
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
              <div key={item.id} className="flex container mx-auto mb-10">
                {/* Hình ảnh sản phẩm */}
                <div className="w-20 min-h-[100px] flex flex-col">
                  <div>
                    <Image
                      src={item.product.image_url}
                      alt={item.product.name || 'Product image'}
                      width={300}
                      height={300}
                      className="border rounded border-solid border-primary"
                    />
                  </div>
                  <div className="flex justify-center cursor-pointer mt-2">
                    <div className="flex items-center justify-center">
                      <button
                        onClick={() => handleDelete(item.product.id)}
                        disabled={loading}
                        className="flex items-center cursor-pointer text-sm sm:text-base"
                      >
                        <FaTrashCan className="mr-2 text-sm sm:text-base" />
                        {loading ? "Đang xóa..." : "Xóa"}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Thông tin sản phẩm */}
                <div className="ml-2 flex flex-grow">
                  {/* Phần mô tả sản phẩm (70%) */}
                  <div className="w-[70%] pr-4">
                    <h1 className="font-bold text-sm sm:text-lg leading-tight">{item.product.name}</h1>
                  </div>

                  {/* Phần giá và nút tăng giảm (30%) */}
                  <div className="w-[30%] flex flex-col items-end">
                    <h1 className="mb-4 font-light text-sm sm:text-base">{Number(item.product.price).toLocaleString()} VNĐ</h1>
                    <div className="flex items-center space-x-1 sm:space-x-2 border sm:p-1 rounded-md justify-center ">
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
                      <span className="text-sm sm:text-lg font-semibold flex justify-center w-4">{item.quantity}</span>

                      {/* Nút Tăng (+) */}
                      <button className={`w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-200 `}
                        onClick={() => handleIncrease(item.product.id)}
                      >
                        <FaPlus className="text-sm" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </section>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          {/* Tổng tiền và nút thanh toán */}
          <section className="">
            <div className="flex items-center justify-between mt-6">
              <h2 className="text-base md:text-xl font-semibold">
                Tổng cộng: {cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0).toLocaleString()} VNĐ
              </h2>
              <button className="px-3 sm:px-6 py-3 text-sm sm:text-base bg-green-500 text-white rounded-md hover:bg-green-600 box-border"
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
