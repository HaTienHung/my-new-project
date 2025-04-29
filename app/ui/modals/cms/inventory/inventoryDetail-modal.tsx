"use client";

import { Transaction } from "@/app/lib/definitions";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa"; // Giả sử bạn có type riêng
import Cookies from "js-cookie";
import ExportButton from "@/app/ui/components/export-button";

interface InventoryDetailModalProps {
  id: number,
  isOpen: boolean;
  onClose: () => void;
}

export default function InventoryDetailModal({
  id,
  isOpen,
  onClose,
}: InventoryDetailModalProps) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!isOpen) return;
    const fetchTransactions = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cms/inventories/show/${id}/transactions`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Cookies.get("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Không thể lấy giỏ hàng!");
        }

        const data = await response.json();
        setTransactions(data?.data || []);
      } catch (err) {
        console.error("Lỗi khi lấy giỏ hàng:", err);
      } finally {
        setLoading(false);  // Khi dữ liệu đã được tải, set loading = false
      }
    };

    fetchTransactions();
  }, [id, isOpen]);

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 flex items-center justify-center px-4">
        <DialogPanel className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-lg bg-white p-4 shadow-lg relative">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-base md:text-lg font-semibold mb-4 text-[rgb(121,100,73)]">
              Chi tiết lịch sử kho
            </DialogTitle>
            <ExportButton onClick={() => { }} loading={false} className="mr-8 mb-4 text-xs sm:text-sm px-2 sm:px-4" />
          </div>
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition"
          >
            <FaTimes />
          </button>
          {loading ? (
            <div className="text-center text-gray-600 py-10">
              Đang tải dữ liệu...
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-300 text-sm">
                <thead className="bg-gray-100  sm:text-sm text-xs">
                  <tr>
                    <th className="px-4 py-2 text-left font-medium text-primary whitespace-nowrap">
                      STT
                    </th>
                    <th className="px-1 sm:px-4 py-2 text-left font-medium text-primary whitespace-nowrap">
                      Số lượng
                    </th>
                    <th className="sm:px-2 px-1 py-2 text-left font-medium text-primary whitespace-nowrap">
                      Loại
                    </th>
                    <th className="sm:px-4 py-2 text-left font-medium text-primary whitespace-nowrap">
                      Ngày
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {transactions.map((txn: Transaction, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2">{index + 1}</td>
                      <td className="sm:px-4 px-1  py-2">{txn.quantity}</td>
                      <td className="px-2 py-2">
                        <span
                          className={`px-2 py-1 rounded text-white sm:text-xs md:text-sm text-[10px] ${txn.type === "import"
                            ? "bg-green-500"
                            : "bg-red-500"
                            }`}
                        >
                          {txn.type === "import" ? "Nhập kho" : "Xuất kho"}
                        </span>
                      </td>
                      <td className=" sm:px-4 py-2">
                        {format(new Date(txn.created_at), "dd/MM/yyyy HH:mm")}
                      </td>
                    </tr>
                  ))}
                  {transactions.length === 0 && (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-4 py-4 text-center text-gray-500"
                      >
                        Không có dữ liệu
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </DialogPanel>
      </div>
    </Dialog>
  );
}
