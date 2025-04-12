'use client';
import { useProducts } from "@/app/hooks/useProducts"; // nhớ import đúng path nhé
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Product } from "@/app/lib/definitions";
import { ProductTableSkeleton } from "@/app/ui/skeletons";
import { useState } from "react";
import EditProductModal from "@/app/ui/modals/cms/editProduct-form";

export default function CmsProductsPage() {
  const {
    products,
    categories, // có luôn danh mục ở đây
    formSearch,
    setFormSearch,
    submitFilters,
    isLoading,
    refetch
  } = useProducts();

  const [editingProductId, setEditingProductId] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitFilters();
  };

  const handleEdit = (id: number) => {
    setEditingProductId(id);
  };

  return (
    <>
      <h1 className="text-2xl font-semibold mb-4 text-[rgb(121,100,73)]">Quản lí sản phẩm</h1>
      <div className="mb-4">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center"
        >
          {/* Chọn trường tìm kiếm */}
          <select
            value={formSearch.searchField}
            onChange={(e) => setFormSearch((prev) => ({ ...prev, searchField: e.target.value }))}
            className="border border-gray-300 rounded-xl h-10 px-4 text-sm shadow-sm focus:ring-[rgb(121,100,73)] focus:border-[rgb(121,100,73)] w-full"
          >
            <option value="name">Tên sản phẩm</option>
            <option value="description">Mô tả</option>
          </select>

          {/* Từ khoá tìm kiếm */}
          <input
            type="text"
            value={formSearch.search}
            onChange={(e) => setFormSearch((prev) => ({ ...prev, search: e.target.value }))}
            placeholder="Tìm kiếm..."
            className="border border-gray-300 rounded-xl h-10 px-4 text-sm shadow-sm focus:ring-[rgb(121,100,73)] focus:border-[rgb(121,100,73)] w-full"
          />

          {/* Danh mục */}
          <select
            value={formSearch.category}
            onChange={(e) => setFormSearch((prev) => ({ ...prev, category: e.target.value }))}
            className="border border-gray-300 rounded-xl h-10 px-4 text-sm shadow-sm focus:ring-[rgb(121,100,73)] focus:border-[rgb(121,100,73)] w-full"
          >
            <option value="">Tất cả danh mục</option>
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

      </div>

      <div className="overflow-x-auto rounded-xl shadow-md">
        <table className="min-w-full divide-y divide-gray-300 bg-white rounded-xl overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">STT</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Tên sản phẩm</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Tên danh mục</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Giá</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Hành động</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {isLoading ? (
              <ProductTableSkeleton rows={6} />
            ) : (
              products.map((product: Product, i: number) => (
                <tr key={product.id} className="hover:bg-gray-50 transition duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{i + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{product.category?.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                    {Number(product.price).toLocaleString()} VND
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm flex gap-3">
                    <button className="flex items-center gap-1 text-[rgb(121,100,73)] hover:text-blue-600 transition duration-200 ease-in-out"
                      onClick={() => handleEdit(product.id)}>
                      <FaEdit className="text-sm" />
                      Sửa
                    </button>
                    <button className="flex items-center gap-1 text-[rgb(121,100,73)] hover:text-red-600 transition duration-200 ease-in-out">
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
    </>
  );
}
