"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

interface CreateCategoryModalProps {
  onClose: () => void;
  onCreated: () => void;
}

const CreateCategoryModal: React.FC<CreateCategoryModalProps> = ({
  onClose,
  onCreated,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
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
        `${process.env.NEXT_PUBLIC_API_URL}/cms/categories/create`,
        {
          name: formData.name,
          slug: formData.slug,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      onCreated();
      onClose();
    } catch (error: any) {
      console.error("Lỗi khi thêm sản phẩm:", error);
    }
  };

  return (
    <Dialog open={true} onClose={onClose} className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <DialogPanel className="w-full max-w-lg bg-white rounded-xl p-6 shadow-xl relative">
          <DialogTitle className="text-lg font-semibold mb-4">Thêm danh mục</DialogTitle>
          <form onSubmit={handleSubmit} className="space-y-5 p-4 max-w-md mx-auto">
            {/* Tên danh mục */}
            <div>
              <label className="block text-sm font-medium mb-1">Tên danh mục</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
            </div>
            {/* Tên sản phẩm */}
            <div>
              <label className="block text-sm font-medium mb-1">Slug</label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
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
                className="px-4 py-2 rounded bg-[rgb(121,100,73)] text-white hover:opacity-90"
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

export default CreateCategoryModal;
