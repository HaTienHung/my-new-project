'use client';
import { useEffect, useMemo, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { CartItemsSkeleton } from "@/app/ui/skeletons";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { removeFromCart } from "@/app/lib/redux/cart-slice";
import { Product } from "@/app/lib/definitions";
import Cookies from "js-cookie";
import Link from "next/link";
import CartItem from "./cart-item";

const Cart = () => {
  const [loading, setLoading] = useState(true);
  const [loadingTotal, setLoadingTotal] = useState(false);
  const [cartItems, setCartItems] = useState<{ id: number; product: Product; quantity: number }[]>([]);
  const [errors, setErrors] = useState<Record<number, string>>({});
  const totalPrice = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }, [cartItems]);

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

  const updateCartOnServer = async (productId: number, quantity: number): Promise<{ success: boolean; message: string }> => {
    try {
      setLoadingTotal(true);
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
      if (!res.ok) {
        return { success: false, message: data.message || "Có lỗi xảy ra" };
      }
      toast.success("Cập nhật số lượng thành công !");
      return { success: true, message: "" };
    } catch (error) {
      return { success: false, message: "Lỗi kết nối server" };
    } finally {
      setLoadingTotal(false);
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
              <CartItem
                error={errors[item.product.id]}
                key={item.id}
                item={item}
                onDelete={(productId) => handleDelete(productId)}
                updateCartOnServer={updateCartOnServer}
                onChangeQuantity={(productId, newQuantity) => {
                  const updated = cartItems.map((i) =>
                    i.product.id === productId ? { ...i, quantity: newQuantity } : i
                  );
                  setCartItems(updated);
                }}
                onSetError={(productId, message) => {
                  setErrors(prev => ({
                    ...prev,
                    [productId]: message,
                  }));
                }}
              />
            ))}
          </section>
          {/* Tổng tiền và nút thanh toán */}
          <section className="">
            <div className="flex items-center justify-between mt-6">
              <h2 className="text-base md:text-xl font-semibold flex items-center gap-2">
                Tổng cộng:
                {loadingTotal ? (
                  <AiOutlineLoading3Quarters className="animate-spin text-primary" />
                ) : (
                  <span>{totalPrice.toLocaleString()} VNĐ</span>
                )}
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
