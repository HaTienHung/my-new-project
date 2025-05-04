'use client';
import { Inventory } from "@/app/lib/definitions";
import { InventoryTableSkeleton } from "@/app/ui/skeletons";
import { useEffect, useState } from "react";
import { useInventories } from "@/app/hooks/useInventories";
import { FaPlus } from "react-icons/fa6";
import AddToInventoryModal from "../../modals/cms/inventory/AddToInventoryModal";
import { FaInfoCircle } from "react-icons/fa";
import InventoryDetailModal from "../../modals/cms/inventory/inventoryDetail-modal";
import Pagination from "../../pagination";
import SubmitButton from "@/app/ui/components/submit-button";
import ExportButton from "../../components/export-button";
import Cookies from "js-cookie";
import { saveAs } from "file-saver";
import { toast } from "react-toastify";

export default function InventoryManagment() {
  const [productId, setProductId] = useState<number | null>(null);
  const [showInventoryDetail, setShowInventoryDetail] = useState(false);
  const [loading, setLoading] = useState(false);
  const perPage = 12;

  const handleViewDetail = (productId: number) => {
    setProductId(productId);
    setShowInventoryDetail(true);
  };


  const handleCloseDetail = () => {
    setShowInventoryDetail(false);
    setProductId(null);
  };


  const {
    currentPage,
    totalPages,
    inventories,
    formSearch,
    setFormSearch,
    submitFilters,
    isLoading,
    refetch
  } = useInventories();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formSearch.page !== 1) {
      setFormSearch((prev) => ({ ...prev, page: 1 }));
    } else {
      submitFilters();
    }
  };

  const handleAdd = (id: number) => {
    setProductId(id);
  };

  const handlePageChange = (page: number) => {
    setFormSearch((prev) => ({
      ...prev,
      page // Cập nhật lại giá trị page
    }));
  };

  const handleExport = async () => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    const token = Cookies.get('token');
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cms/inventories/stock-report/export-excel`, {
        headers: {
          method: "GET",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Export failed');
      }

      const blob = await response.blob();
      saveAs(blob, `${formattedDate}-exported-data.xlsx`);
      toast.success("Xuất file Exel thành công!"); // hoặc đổi tên file theo ý bạn
    } catch (error) {
      console.error(error);
      alert('Có lỗi xảy ra khi export');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    submitFilters();  // Gọi lại API khi page thay đổi
  }, [formSearch.page]);

  return (
    <>
      <h1 className="text-2xl font-semibold mb-4 text-primary">Quản lí kho</h1>
      <div className="mb-4">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center text-primary"
        >
          {/* Từ khoá tìm kiếm */}
          <input
            type="text"
            value={formSearch.search}
            onChange={(e) => setFormSearch((prev) => ({ ...prev, search: e.target.value }))}
            placeholder="Tìm kiếm theo tên sản phẩm..."
            className="border border-solid border-gray-300 rounded-xl h-10 px-4 text-sm shadow-sm focus:ring-[rgb(121,100,73)] focus:border-[rgb(121,100,73)] w-full"
          />

          {/* Sắp xếp */}
          <select
            value={formSearch.sortBy}
            onChange={(e) => setFormSearch((prev) => ({ ...prev, sortBy: e.target.value }))}
            className="border border-solid border-gray-300 rounded-xl h-10 px-4 text-sm shadow-sm focus:ring-[rgb(121,100,73)] focus:border-[rgb(121,100,73)] w-full appearance-none "
          >
            <option value="">-- Sắp xếp --</option>
            <option value="-name">Tên Z-A</option>
            <option value="+name">Tên A-Z</option>
          </select>

          {/* Nút tìm kiếm */}
          <div className="sm:col-span-2 flex justify-end">
            <SubmitButton label={"Tìm kiếm"} />
          </div>
        </form>
        <div className="sm:col-span-2 flex gap-4 justify-start  ">
          <ExportButton onClick={handleExport} loading={loading} />
        </div>
      </div>
      <div className="overflow-x-auto rounded-xl shadow-md">
        <table className="min-w-full divide-y divide-gray-300 bg-white rounded-xl overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">STT</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Tên sản phẩm</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden md:table-cell">Số lượng trong kho</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {isLoading ? (
              <InventoryTableSkeleton rows={6} />
            ) : (
              inventories.map((inventory: Inventory, i: number) => (
                <tr key={inventory.product_id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 text-sm">{(currentPage - 1) * perPage + i + 1}</td>
                  <td className="px-4 py-3 text-sm">{inventory.product_name}</td>
                  <td className="px-4 py-3 text-sm hidden md:table-cell">{inventory.stock}</td>
                  <td className="px-4 py-3 text-sm flex flex-col md:flex-row gap-2 md:gap-3 items-center">
                    <button
                      className="inline-flex items-center gap-1 bg-white text-sm text-primary font-medium px-3 py-2 rounded cursor-pointer transition border border-solid hover:bg-primary hover:text-white"
                      onClick={() => handleAdd(inventory.product_id)}
                    >
                      Thêm vào kho
                      <FaPlus className="text-xs" />
                    </button>
                    <button
                      onClick={() => handleViewDetail(inventory.product_id)}
                      className="inline-flex items-center gap-1 text-[#796449] hover:text-[#5f4f3a] transition"
                      title="Xem lịch sử kho"
                    >
                      <FaInfoCircle />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {productId && !showInventoryDetail && (
          <AddToInventoryModal
            id={productId}
            onClose={() => setProductId(null)}
            onCreated={refetch}
          />
        )}
        {showInventoryDetail && productId && (
          <InventoryDetailModal
            id={productId}
            onClose={handleCloseDetail}
            isOpen={showInventoryDetail}
          />
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
}
