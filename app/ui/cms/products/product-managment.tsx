'use client';
import { useProducts } from "@/app/hooks/useProducts"; // nhớ import đúng path nhé
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Product } from "@/app/lib/definitions";
import { ProductTableSkeleton } from "@/app/ui/skeletons";
import { useEffect, useState } from "react";
import EditProductModal from "@/app/ui/modals/cms/product/editProduct-modal";
import CreateProductModal from "../../modals/cms/product/createProduct-modal";
import Pagination from "../../pagination";

export default function ProductMagmamemt() {
  const {
    currentPage,
    totalPages,
    products,
    categories, // có luôn danh mục ở đây
    formSearch,
    setFormSearch,
    submitFilters,
    setQueryParams,
    isLoading,
    searchParams,
    refetch
  } = useProducts({ prefix: '/cms' });

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<number | null>(null);
  const perPage = 12;


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formSearch.page !== 1) {
      // Reset page về 1 sẽ tự động trigger submitFilters từ useEffect
      setFormSearch((prev) => ({ ...prev, page: 1 }));
    } else {
      // Nếu đã là page 1 thì submit luôn
      submitFilters();
    }
  };

  const handleEdit = (id: number) => {
    setEditingProductId(id);
  };

  const handlePageChange = (page: number) => {
    setFormSearch((prev) => ({
      ...prev,
      page, // Cập nhật lại giá trị page
    }));
  };

  useEffect(() => {
    submitFilters();  // Gọi lại API khi page thay đổi
  }, [formSearch.page]);

  return (
    <>
      <h1 className="text-2xl font-semibold mb-4 text-[rgb(121,100,73)]">Quản lí sản phẩm</h1>
      <div className="mb-4">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center mb-4"
        >
          {/* Chọn trường tìm kiếm */}
          <select
            value={formSearch.searchField}
            onChange={(e) => setFormSearch((prev) => ({ ...prev, searchField: e.target.value }))}
            className="border border-gray-300 rounded-xl h-10 px-4 text-sm shadow-sm focus:ring-[rgb(121,100,73)] focus:border-[rgb(121,100,73)] w-full"
          >
            <option value="">-- Tìm kiếm theo --</option>
            <option value="name">Tên sản phẩm</option>
            <option value="description">Mô tả</option>
          </select>

          {/* Từ khoá tìm kiếm */}
          <input
            type="text"
            value={formSearch.search}
            onChange={(e) => setFormSearch((prev) => ({ ...prev, search: e.target.value }))}
            placeholder="Tìm kiếm theo tên sản phẩm..."
            className="border border-gray-300 rounded-xl h-10 px-4 text-sm shadow-sm focus:ring-[rgb(121,100,73)] focus:border-[rgb(121,100,73)] w-full"
          />

          {/* Danh mục */}
          <select
            value={formSearch.category}
            onChange={(e) => setFormSearch((prev) => ({ ...prev, category: e.target.value }))}
            className="border border-gray-300 rounded-xl h-10 px-4 text-sm shadow-sm focus:ring-[rgb(121,100,73)] focus:border-[rgb(121,100,73)] w-full"
          >
            <option value="">-- Tất cả danh mục --</option>
            {categories.map((cat: any) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* Sắp xếp */}
          <select
            value={formSearch.sortBy}
            onChange={(e) => setFormSearch((prev) => ({ ...prev, sortBy: e.target.value }))}
            className="border border-gray-300 rounded-xl h-10 px-4 text-sm shadow-sm focus:ring-[rgb(121,100,73)] focus:border-[rgb(121,100,73)] w-full"
          >
            <option value="">-- Sắp xếp --</option>
            <option value="+name">Tên A → Z</option>
            <option value="-name">Tên Z → A</option>
            <option value="+price">Giá tăng dần</option>
            <option value="-price">Giá giảm dần</option>
          </select>

          <input
            type="text"
            value={formSearch.minPrice || ""}
            onChange={(e) => setFormSearch((prev: any) => ({ ...prev, minPrice: e.target.value }))}
            placeholder="Giá từ (VNĐ)"
            className="border border-gray-300 rounded-xl h-10 px-4 text-sm shadow-sm focus:ring-[rgb(121,100,73)] focus:border-[rgb(121,100,73)] w-full"
          />

          <input
            type="text"
            value={formSearch.maxPrice || ""}
            onChange={(e) => setFormSearch((prev: any) => ({ ...prev, maxPrice: e.target.value }))}
            placeholder="Giá đến (VNĐ)"
            className="border border-gray-300 rounded-xl h-10 px-4 text-sm shadow-sm focus:ring-[rgb(121,100,73)] focus:border-[rgb(121,100,73)] w-full"
          />

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
            onClick={() => setIsCreateModalOpen(true)}
            className=" cursor-pointer bg-[#796449] hover:bg-[#5f4f3a] text-white text-sm px-5 py-2 rounded-lg shadow transition-all duration-200"
          >
            Thêm sản phẩm
          </button>
          <button
            className=" cursor-pointer bg-white border border-[#796449] text-[#796449] hover:bg-[#f7f4f0] text-sm px-5 py-2 rounded-lg shadow transition-all duration-200"
          >
            Import (.xlsx)
          </button>
        </div>
      </div>
      {isCreateModalOpen && (
        <CreateProductModal
          onClose={() => setIsCreateModalOpen(false)}
          onCreated={refetch}
        />
      )}

      <div className="overflow-x-auto rounded-xl shadow-md">
        <table className="min-w-full divide-y divide-gray-300 bg-white rounded-xl overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">STT</th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Tên sản phẩm</th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden md:table-cell">Danh mục</th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden md:table-cell">Giá</th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Hành động</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {isLoading ? (
              <ProductTableSkeleton rows={8} />
            ) : (
              products.map((product: Product, i: number) => (
                <tr key={product.id} className="hover:bg-gray-50 transition duration-150">
                  <td className="px-4 py-3 text-sm text-gray-700">{(currentPage - 1) * perPage + i + 1}</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{product.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-700 hidden md:table-cell">{product.category?.name}</td>
                  <td className="px-4 py-3 text-sm text-green-600 hidden md:table-cell">
                    {Number(product.price).toLocaleString()} VNĐ
                  </td>
                  <td className="px-4 py-3 text-sm flex flex-col md:flex-row gap-2 md:gap-3">
                    <button
                      className="flex items-center gap-1 text-[rgb(121,100,73)] hover:text-blue-600 transition"
                      onClick={() => handleEdit(product.id)}
                    >
                      <FaEdit className="text-sm" />
                      Sửa
                    </button>
                    <button className="flex items-center gap-1 text-[rgb(121,100,73)] hover:text-red-600 transition">
                      <FaTrash className="text-sm" />
                      Xoá
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {editingProductId && (
          <EditProductModal
            id={editingProductId}
            onClose={() => setEditingProductId(null)}
            onUpdated={refetch}
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
