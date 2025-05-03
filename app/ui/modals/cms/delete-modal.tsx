"use client";

import React, { useState } from "react";
import axios from "axios";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

interface DeleteModalProps {
  onClose: () => void;
  id: number;
  onDeleted: () => void;
  title: string,
  message: string,
  endpoint: string
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  onClose,
  id,
  onDeleted,
  title,
  message,
  endpoint
}) => {
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {

      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/cms/${endpoint}/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`
        },
      });
      onClose();
      onDeleted();
      toast.success(`${title} thành công !`);
    } catch (error) {
      console.error('Đã có lỗi:', error);
      throw new Error('Xoá sản phẩm thất bại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={true} onClose={onClose} className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <DialogPanel className="w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl relative">
          <DialogTitle className="text-base md:text-xl font-bold  mb-4 text-primary">
            {title}
          </DialogTitle>
          <p className="text-gray-600 mb-6">
            {message} Thao tác này không thể hoàn tác.
          </p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
            >
              Huỷ
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition ${loading && "opacity-50 cursor-not-allowed"
                }`}
            >
              {loading ? "Đang xoá..." : "Xoá"}
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>

  );
};

export default DeleteModal;
