'use client';

import { useState } from "react";
import { toast } from "react-toastify";

const ProductDetail = ({ product }: { product: any }) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecrease = () => {
    setQuantity(prevQuantity => Math.max(1, prevQuantity - 1));
  };

  const addToCart = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/app/cart/store`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ product_id: product.id, quantity }),
      });
      console.log(product.id);
      if (!res.ok) throw new Error('Failed to add to cart');

      const data = await res.json();
      console.log('Cart updated:', data);
      toast.success("Đặt hàng thành công!");
      // Optionally, show a success message or update cart UI
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 py-10 text-[rgb(121,100,73)] flex flex-col md:flex-row gap-4 md:gap-10">
        {/* Hình ảnh sản phẩm - mở rộng tối đa */}
        <div className="flex-1 rounded-lg flex justify-center items-center border-[1.5px]">
          <div className="max-w-[600px] w-full bg-gray-100 p-6 rounded-lg">
            <img
              src="https://13demarzo.net/cdn/shop/files/FR25X18551.png?v=1742525628&width=600"
              alt="Product Name"
              className="w-full h-auto rounded-lg object-cover"
            />
          </div>
        </div>

        {/* Thông tin sản phẩm - chỉ chiếm 1/3 chiều rộng */}
        <div className="w-full md:w-1/3">
          <h1 className="text-5xl font-bold ">{product.name}</h1>
          <p className="text-3xl font-extralight  mt-4">{product.price} VNĐ</p>
          <p className="text-[rgb(121,100,73)] text-sm mt-2">Phí vận chuyển sẽ được tính khi đặt hàng!</p>

          {/* Số lượng */}
          <div className="flex items-center mt-6">
            <span className="mr-4 font-medium">Quantity</span>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
              <button
                className="text-[rgb(121,100,73)] hover:text-gray-900"
                onClick={handleDecrease}
              >
                −
              </button>
              <span className="mx-3 font-medium">{quantity}</span>
              <button
                className="text-[rgb(121,100,73)] hover:text-gray-900"
                onClick={handleIncrease}
              >
                +
              </button>
            </div>
          </div>

          {/* Nút mua hàng */}
          <button className="w-full mt-6 py-3 text-lg font-semibold border border-gray-400 rounded-lg transition duration-300 hover:border-[rgb(121,100,73)]" onClick={addToCart}>
            Add to cart
          </button>
          <button className="w-full mt-3 py-3 text-lg font-semibold bg-yellow-400 rounded-lg transition hover:bg-yellow-500"
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
      <div className="container mx-auto px-4 py-10 text-[rgb(121,100,73)]">
        <span className="text-3xl font-bold">Mô tả sản phẩm</span>
        <h1 className="mt-4">{product.description}</h1>
      </div>
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Shipping Section */}
          <div className=" ">
            <h2 className="text-2xl font-bold text-[rgb(121,100,73)] mb-4">Về Vận Chuyển</h2>
            <p className="text-[rgb(121,100,73)] leading-relaxed ">
              Chúng tôi sẽ tính phí giao hàng dựa trên khu vực bạn sinh sống. Chúng tôi hợp tác với nhiều đơn vị vận chuyển như FedEx, DHL, v.v., để đảm bảo đơn hàng của bạn được giao một cách an toàn và nhanh chóng.
            </p>
          </div>

          {/* Refund or Exchange Section */}
          <div className="  ">
            <h2 className="text-2xl font-bold text-[rgb(121,100,73)] mb-4">Hoàn Tiền hoặc Đổi Trả</h2>
            <p className="text-[rgb(121,100,73)] leading-relaxed ">
              Chúng tôi sẽ hoàn tiền sau khi bạn trả lại sản phẩm. Phí vận chuyển trả hàng sẽ do bạn tự chi trả. Nếu sản phẩm không có vấn đề về chất lượng, chúng tôi khuyến khích bạn liên hệ với đội ngũ Chăm Sóc Khách Hàng của chúng tôi trước khi hoàn trả.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
export default ProductDetail;