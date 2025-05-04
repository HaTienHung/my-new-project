import React, { useEffect, useState } from "react";
import axios from "axios";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

interface EditCategoryModalProps {
  id: number;
  onClose: () => void;
  onUpdated: () => void;
}

const EditCategoryModal: React.FC<EditCategoryModalProps> = ({
  id,
  onClose,
  onUpdated,
}) => {
  const [formData, setFormData] = useState<{
    name: string;
    slug: string;

  }>({
    name: "",
    slug: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/cms/categories/${id}`, {
          headers: {
            "Authorization": `Bearer ${Cookies.get("token")}`,
          },
        });
        const category = res.data?.data || [];
        setFormData({
          name: category.name || "",
          slug: category.slug || "",
        });
      } catch (err) {
        console.error("Lỗi khi fetch product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/cms/categories/update/${id}`,
        {
          name: formData.name,
          slug: formData.slug,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
            // Không cần Content-Type, Axios tự set là application/json
          },
        }
      );

      onUpdated();
      onClose();
      toast.success("Sửa danh mục thành công !");
    } catch (error) {
      console.error('Đã có lỗi:', error);
      throw new Error('Cập nhật danh mục thất bại.');
    }
  };


  return (
    <Dialog open={true} onClose={onClose} className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <DialogPanel className="w-full max-w-lg bg-white rounded-xl p-6 shadow-xl relative">
          <DialogTitle className="text-base md:text-xl font-semibold mb-4 text-primary">Chỉnh sửa danh mục</DialogTitle>

          {loading ? (
            <div className="text-center py-10">Đang tải dữ liệu...</div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 p-4 max-w-md mx-auto">
              {/* Tên sản phẩm */}
              <div>
                <label className="block text-sm font-medium mb-1">Tên danh mục</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Slug</label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
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
                  Cập nhật
                </button>
              </div>
            </form>

          )}
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default EditCategoryModal;
