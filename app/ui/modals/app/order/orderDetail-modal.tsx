// components/ProductModal.tsx
import { OrderItem } from "@/app/lib/definitions";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import React from "react";
import { FaTimes } from "react-icons/fa";

interface OrderDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: OrderItem[];
}


const OrderDetailModal: React.FC<OrderDetailModalProps> = ({ isOpen, onClose, products }) => {
  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Modal container */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="bg-white rounded-lg shadow-lg w-[90vw] md:w-[80vw] lg:w-[70vw] p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <DialogTitle className="text-2xl font-semibold text-[rgb(121,100,73)]">
              Chi tiết đơn hàng
            </DialogTitle>
            <button onClick={onClose}>
              <FaTimes className="text-gray-600 text-xl hover:text-red-500" />
            </button>
          </div>

          {/* Nội dung */}
          {products.length === 0 ? (
            <p className="text-center">Không có sản phẩm trong đơn này</p>
          ) : (
            <table className="w-full border border-collapse text-sm sm:textbase ">
              <thead>
                <tr className="bg-gray-100 text-primary">
                  <th className="p-2 border">STT</th>
                  <th className="p-2 border">Tên sản phẩm</th>
                  <th className="p-2 border">Số lượng</th>
                  <th className="p-2 border">Giá tiền</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product: OrderItem, index: number) => (
                  <tr key={index} className="hover:bg-gray-50 text-sm sm:textbase ">
                    <td className="p-2 border text-center">{index + 1}</td>
                    <td className="p-2 border">{product.product_name}</td>
                    <td className="p-2 border text-center">{product.quantity}</td>
                    <td className="p-2 border text-center">
                      {Number(product.unit_price).toLocaleString()} VNĐ
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default OrderDetailModal;
