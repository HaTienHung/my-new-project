'use client';

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToCart as addToCartAction } from "@/app/lib/redux/cart-slice";
import { RootState } from "@/app/lib/redux/store";
import { openAuthModal } from "@/app/lib/redux/authModal-slice";
import Cookies from "js-cookie";
import { Product } from "@/app/lib/definitions";
import Image from 'next/image';
import { FaMinus, FaPlus } from "react-icons/fa6";
import { AiOutlineLoading3Quarters } from "react-icons/ai";



const ProductDetail = ({ product }: { product: Product }) => {
  const [quantity, setQuantity] = useState(1); // Quản lý số lượng tại component này
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const [error, setError] = useState("");
  const [isloading, setIsLoading] = useState(false);

  const handleIncrease = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecrease = () => {
    setQuantity(prevQuantity => Math.max(1, prevQuantity - 1)); // Giới hạn số lượng >= 1
  };

  const dispatch = useDispatch();
  const addToCart = async () => {
    if (!isAuthenticated) return dispatch(openAuthModal())
    try {
      setIsLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/app/cart/store`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Cookies.get('token')}`,
        },
        body: JSON.stringify({ product_id: product.id, quantity }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Có lỗi xảy ra!");


      // console.log("API response:", data);

      // ✅ Gọi dispatch ở đây, SAU khi API thành công
      dispatch(addToCartAction({ product_id: product.id, quantity }));

      toast.success("Thêm vào giỏ hàng thành công!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Cập nhật sản phẩm thất bại!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 py-10 text-primary flex flex-col md:flex-row gap-4 md:gap-10">
        {/* Hình ảnh sản phẩm - mở rộng tối đa */}
        <div className="flex-1 rounded-lg flex justify-center items-center border-[1.5px] bg-white">
          <div className="max-w-[600px] w-full bg-white p-6 rounded-lg">
            <Image
              src={product.image_url}
              alt="Product Name"
              width={500}
              height={300}
              className="w-full h-auto rounded-lg object-cover"
            />
          </div>
        </div>

        {/* Thông tin sản phẩm - chỉ chiếm 1/3 chiều rộng */}
        <div className="w-full md:w-1/3">
          <h1 className="text-2xl sm:text-3xl md:text-2xl lg:text-3xl font-bold">{product.name}</h1>
          <p className="text-lg sm:text-xl md:text-2xl font-extralight mt-4">
            {Number(product.price).toLocaleString()} VNĐ
          </p>
          <p className="text-primary text-sm mt-2">Phí vận chuyển sẽ được tính khi đặt hàng!</p>

          {/* Số lượng */}
          <div className="flex items-center mt-6">
            <span className="mr-4 font-medium">Quantity</span>
            <div className="flex items-center border border-solid border-[rgb(121,100,73)] rounded-lg px-3 py-1 gap-2 justify-center">
              <button
                className="text-primary hover:bg-gray-200 p-2 rounded-md "
                onClick={handleDecrease}
              >
                <FaMinus className="text-sm hover:bg-gray-200" />
              </button>
              <span className="px-3 font-medium flex justify-center w-[24px]">
                {quantity}
              </span>
              <button
                className={`text-primary hover:bg-gray-200 p-2 rounded-md`}
                onClick={handleIncrease}
              >
                <FaPlus className="text-sm " />
              </button>
            </div>
          </div>
          {error && <p className="text-red-500 text-sm mb-2 mt-2">{error}</p>}
          {/* Nút mua hàng */}
          <button
            className="w-full mt-6 py-3 text-lg font-semibold border border-solid border-gray-400 rounded-lg transition duration-300 hover:border-[rgb(121,100,73)] flex justify-center items-center h-12"
            onClick={addToCart}
          >
            {
              isloading
                ? <AiOutlineLoading3Quarters className="animate-spin text-primary text-xl" />
                : "Add to cart"
            }
          </button>
          <button className="w-full h-12 mt-3 py-3 text-lg font-semibold bg-yellow-400 rounded-lg transition hover:bg-yellow-500"
            onClick={() => { toast.info("Xin thứ lỗi , chúng tôi đang phát triển tính năng này !") }}
          >
            Pay with <span className="font-bold">PayPal</span>
          </button>

          <p className="text-sm text-gray-500 text-center mt-4 underline cursor-pointer">
            More payment options
          </p>

          {/* Nút share */}
          <div className="mt-6 text-center">
            <button className="text-gray-500 hover:text-gray-900 flex items-center justify-center">
              <span className="mr-2">🔗</span> Share
            </button>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-10 text-primary">
        <span className="text-3xl font-bold">Mô tả sản phẩm</span>
        <div
          className="whitespace-pre-line mt-4"
        >
          {product.description}
        </div>
      </div>
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Shipping Section */}
          <div className=" ">
            <h2 className="text-2xl font-bold text-primary mb-4">Về Vận Chuyển</h2>
            <p className="text-primary leading-relaxed ">
              Chúng tôi sẽ tính phí giao hàng dựa trên khu vực bạn sinh sống. Chúng tôi hợp tác với nhiều đơn vị vận chuyển như FedEx, DHL, v.v., để đảm bảo đơn hàng của bạn được giao một cách an toàn và nhanh chóng.
            </p>
          </div>

          {/* Refund or Exchange Section */}
          <div className="  ">
            <h2 className="text-2xl font-bold text-primary mb-4">Hoàn Tiền hoặc Đổi Trả</h2>
            <p className="text-primary leading-relaxed ">
              Chúng tôi sẽ hoàn tiền sau khi bạn trả lại sản phẩm. Phí vận chuyển trả hàng sẽ do bạn tự chi trả. Nếu sản phẩm không có vấn đề về chất lượng, chúng tôi khuyến khích bạn liên hệ với đội ngũ Chăm Sóc Khách Hàng của chúng tôi trước khi hoàn trả.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
export default ProductDetail;