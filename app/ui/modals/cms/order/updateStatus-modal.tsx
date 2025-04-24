import React, { useEffect, useState } from "react";
import axios from "axios";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

interface UpdateOrderStatusModalProps {
  id: number;
  onClose: () => void;
  onUpdated: () => void;
}

const UpdateOrderStatusModal: React.FC<UpdateOrderStatusModalProps> = ({
  id,
  onClose,
  onUpdated,
}) => {
  const [formData, setFormData] = useState<{
    status: string;
  }>({
    status: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/cms/orders/show/${id}`, {
          headers: {
            "Authorization": `Bearer ${Cookies.get("token")}`,
          },
        });
        const order = res.data?.data || [];
        setFormData({
          status: order.status || "",
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
        `${process.env.NEXT_PUBLIC_API_URL}/cms/orders/update/${id}`,
        {
          status: formData.status
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
      toast.success("Cập nhật trạng thái thành công !");
    } catch (error) {
      console.error('Đã có lỗi :', error);
      throw new Error('Cập nhật trạng thái thất bại.');
    }
  };


  return (
    <Dialog open={true} onClose={onClose} className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <DialogPanel className="w-full max-w-lg bg-white rounded-xl p-6 shadow-xl relative">
          <DialogTitle className="text-lg font-semibold mb-4">Chỉnh sửa trạng thái</DialogTitle>

          {loading ? (
            <div className="text-center py-10">Đang tải dữ liệu...</div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 p-4 max-w-md mx-auto">
              {/* Tên sản phẩm */}
              <div>
                <label className="block text-sm font-medium mb-1">Trạng thái</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
                  required
                >
                  <option value="">-- Chọn trạng thái --</option>
                  <option value="completed">completed</option>
                  <option value="cancelled">cancelled</option>
                </select>
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

export default UpdateOrderStatusModal;
