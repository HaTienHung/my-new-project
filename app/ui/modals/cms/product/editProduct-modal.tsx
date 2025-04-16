import React, { useEffect, useState } from "react";
import axios from "axios";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

interface EditProductModalProps {
  id: number;
  onClose: () => void;
  onUpdated: () => void;
}

const EditProductModal: React.FC<EditProductModalProps> = ({
  id,
  onClose,
  onUpdated,
}) => {
  const [formData, setFormData] = useState<{
    name: string;
    category_id: string;
    price: string;
    description: string;
    image: File | null;
  }>({
    name: "",
    category_id: "",
    price: "",
    description: "",
    image: null,
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/cms/products/${id}`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const product = res.data?.product;
        setProduct(product);
        setFormData({
          name: product.name || "",
          category_id: product.category_id || "",
          price: product.price || "",
          description: product.description || "",
          image: product.image || "",
        });
      } catch (err) {
        console.error("Lỗi khi fetch product:", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
        setCategories(res.data.data);
      } catch (err) {
        console.error("Lỗi khi fetch categories:", err);
      }
    };

    fetchProduct();
    fetchCategories();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const form = new FormData();

      // Append các field vào form (trừ image)
      form.append("name", formData.name);
      form.append("category_id", formData.category_id);
      form.append("price", formData.price);
      form.append("description", formData.description);

      // Nếu có ảnh thì thêm ảnh vào
      if (formData.image instanceof File) {
        form.append("image", formData.image);
      }

      // Laravel cần _method = PUT để hiểu
      form.append("_method", "PUT");

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/cms/products/update/${id}`,
        form,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      onUpdated();
      onClose();
    } catch (error: any) {
      if (error.response) {
        console.log("Lỗi từ backend:", error.response.data);
        console.log("Status code:", error.response.status);
      } else if (error.request) {
        console.log("Không nhận được phản hồi từ server:", error.request);
      } else {
        console.log("Lỗi khi gửi request:", error.message);
      }
    }
  };


  return (
    <Dialog open={true} onClose={onClose} className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <DialogPanel className="w-full max-w-lg bg-white rounded-xl p-6 shadow-xl relative">
          <DialogTitle className="text-lg font-semibold mb-4">Chỉnh sửa sản phẩm</DialogTitle>

          {loading ? (
            <div className="text-center py-10">Đang tải dữ liệu...</div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 p-4 max-w-md mx-auto">
              {/* Ảnh hiện tại */}
              {product?.image_url && (
                <div className="text-center">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ảnh hiện tại
                  </label>
                  <img
                    src={product.image_url}
                    alt="Ảnh sản phẩm"
                    className="mx-auto h-32 md:h-34 object-contain rounded border shadow-lg"
                  />
                </div>
              )}

              {/* Tên sản phẩm */}
              <div>
                <label className="block text-sm font-medium mb-1">Tên sản phẩm</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
                  required
                />
              </div>

              {/* Danh mục */}
              <div>
                <label className="block text-sm font-medium mb-1">Danh mục</label>
                <select
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
                  required
                >
                  <option value="">-- Chọn danh mục --</option>
                  {categories.map((cat: any) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Giá */}
              <div>
                <label className="block text-sm font-medium mb-1">Giá</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
                  required
                />
              </div>

              {/* Mô tả */}
              <div>
                <label className="block text-sm font-medium mb-1">Mô tả</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>

              {/* Upload ảnh mới */}
              <div>
                <label className="block text-sm font-medium mb-1">Ảnh (upload)</label>
                <input
                  type="file"
                  name="image"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setFormData((prev) => ({
                        ...prev,
                        image: file,
                      }));
                    }
                  }}
                  className="w-full border border-gray-300 p-2 rounded bg-gray-100"
                  accept="image/*"
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

export default EditProductModal;
