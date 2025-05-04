"use client";

import React, { useState } from "react";
import axios from "axios";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

interface AddToInventoryModalProps {
  id: number;
  onClose: () => void;
  onCreated: () => void;
}

const AddToInventoryModal: React.FC<AddToInventoryModalProps> = ({
  id,
  onClose,
  onCreated,
}) => {
  const [formData, setFormData] = useState({
    quantity: "",
  });

  // const [loading, setLoading] = useState(true);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/cms/inventories/create`,
        {
          product_id: id,
          quantity: formData.quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      onCreated();
      onClose();
      toast.success("Thêm sản phẩm vào kho thành công !");
    } catch (error) {
      console.error('Đã có lỗi:', error);
      throw new Error('Thêm sản phẩm thất bại.');
    }
  };

  return (
    <Dialog open={true} onClose={onClose} className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <DialogPanel className="w-full max-w-lg bg-white rounded-xl p-6 shadow-xl relative">
          <DialogTitle className="text-base md:text-xl font-semibold mb-4 text-primary">Thêm sản phẩm vào kho</DialogTitle>
          <form onSubmit={handleSubmit} className="space-y-5 p-4 max-w-md mx-auto">
            {/* Số lượng */}
            <div>
              <label className="block text-sm font-medium mb-1">Số lượng</label>
              <input
                type="text"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
            </div>

            {/* Nút hành động */}
            <div className="flex justify-end gap-2 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
              >
                Huỷ
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded bg-primary text-white hover:opacity-90"
              >
                Thêm
              </button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default AddToInventoryModal;
