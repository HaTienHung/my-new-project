// components/ProductModal.tsx
import React from "react";
import { FaTimes } from "react-icons/fa";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: any[];
}


const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose, products }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-opacity-30">
      <div className="bg-white rounded-lg shadow-lg w-[450px] max-w-xl p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Chi tiết sản phẩm</h2>
          <button onClick={onClose}>
            <FaTimes className="text-gray-600 text-xl hover:text-red-500" />
          </button>
        </div>

        {/* Nội dung */}
        {products.length === 0 ? (
          <p className="text-center">Không có sản phẩm trong đơn này</p>
        ) : (
          <table className="w-full border border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">STT</th>
                <th className="p-2 border">Tên sản phẩm</th>
                <th className="p-2 border">Số lượng</th>
                <th className="p-2 border">Giá tiền</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product: any, index: number) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="p-2 border text-center">{index + 1}</td>
                  <td className="p-2 border">{product.product_name}</td>
                  <td className="p-2 border text-center">{product.quantity}</td>
                  <td className="p-2 border text-center">{Number(product.unit_price).toLocaleString()} VNĐ</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ProductModal;
