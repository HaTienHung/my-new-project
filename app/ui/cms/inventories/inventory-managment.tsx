'use client';
import { Category, Inventory, Order, Product } from "@/app/lib/definitions";
import { CategoryTableSkeleton, InventoryTableSkeleton, OrderTableSkeleton, ProductTableSkeleton } from "@/app/ui/skeletons";
import { useState } from "react";
import CreateCategoryModal from "../../modals/cms/category/createCategory";
import { useInventories } from "@/app/hooks/useInventories";
import { FaPlus } from "react-icons/fa6";
import AddToInventoryModal from "../../modals/cms/inventory/AddToInventoryModal";
import { FaInfoCircle } from "react-icons/fa";
import InventoryDetailModal from "../../modals/cms/inventory/inventoryDetail-modal";

export default function InventoryManagment() {
  const [productId, setProductId] = useState<number | null>(null);
  const [showInventoryDetail, setShowInventoryDetail] = useState(false);

  const handleViewDetail = (productId: number) => {
    setProductId(productId);
    setShowInventoryDetail(true);
  };


  const handleCloseDetail = () => {
    setShowInventoryDetail(false);
    setProductId(null);
  };

  const {
    inventories,
    formSearch,
    setFormSearch,
    submitFilters,
    isLoading,
    refetch
  } = useInventories();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitFilters();
  };

  const handleAdd = (id: number) => {
    setProductId(id);
  };
  return (
    <>
      <h1 className="text-2xl font-semibold mb-4 text-[rgb(121,100,73)]">Quản lí kho</h1>
      <div className="mb-4">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center"
        >
          {/* Từ khoá tìm kiếm */}
          <input
            type="text"
            value={formSearch.search}
            onChange={(e) => setFormSearch((prev) => ({ ...prev, search: e.target.value }))}
            placeholder="Tìm kiếm theo tên sản phẩm..."
            className="border border-gray-300 rounded-xl h-10 px-4 text-sm shadow-sm focus:ring-[rgb(121,100,73)] focus:border-[rgb(121,100,73)] w-full"
          />

          {/* Sắp xếp */}
          <select
            value={formSearch.sortBy}
            onChange={(e) => setFormSearch((prev) => ({ ...prev, sortBy: e.target.value }))}
            className="border border-gray-300 rounded-xl h-10 px-4 text-sm shadow-sm focus:ring-[rgb(121,100,73)] focus:border-[rgb(121,100,73)] w-full"
          >
            <option value="">-- Sắp xếp --</option>
            <option value="-name">Tên Z-A</option>
            <option value="+name">Tên A-Z</option>
          </select>

          {/* Nút tìm kiếm */}
          <div className="sm:col-span-2 flex justify-end">
            <button
              type="submit"
              className="bg-[rgb(121,100,73)] hover:bg-opacity-90 text-white text-sm px-5 py-2 rounded-xl shadow transition-all duration-200 hover:underline cursor-pointer"
            >
              Tìm kiếm
            </button>
          </div>
        </form>
        <div className="sm:col-span-2 flex gap-4 justify-start  ">
          <button
            className=" cursor-pointer bg-white border border-[#796449] text-[#796449] hover:bg-[#f7f4f0] text-sm px-5 py-2 rounded-lg shadow transition-all duration-200"
          >
            Export (.xlsx)
          </button>
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
                  <td className="px-4 py-3 text-sm">{i + 1}</td>
                  <td className="px-4 py-3 text-sm">{inventory.product_name}</td>
                  <td className="px-4 py-3 text-sm hidden md:table-cell">{inventory.stock}</td>
                  <td className="px-4 py-3 text-sm flex flex-col md:flex-row gap-2 md:gap-3 items-center">
                    <button
                      className="inline-flex items-center gap-1 bg-white text-sm text-[rgb(121,100,73)] font-medium px-3 py-2 rounded cursor-pointer transition border hover:bg-[rgb(121,100,73)] hover:text-white"
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
    </>
  );
}
