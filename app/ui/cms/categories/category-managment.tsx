'use client';
import { useCategories } from "@/app/hooks/useCategories"; 
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Category } from "@/app/lib/definitions";
import { CategoryTableSkeleton, } from "@/app/ui/skeletons";
import { useState } from "react";
import EditCategoryModal from "../../modals/cms/category/editCategory-modal";
import CreateCategoryModal from "../../modals/cms/category/createCategory";
import DeleteModal from "../../modals/cms/delete-modal";
import SubmitButton from "../../components/submit-button";
import AddButton from "../../components/add-button";

export default function CategoryManament() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(null);
  const [deleteCategoryId, setDeleteCategoryId] = useState<number | null>(null);

  const {
    categories,
    formSearch,
    setFormSearch,
    submitFilters,
    isLoading,
    refetch
  } = useCategories();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitFilters();
  };

  const handleEdit = (id: number) => {
    setEditingCategoryId(id);
  };

  const handleDelete = (id: number) => {
    setDeleteCategoryId(id);
  }
  return (
    <>
      <h1 className="text-2xl font-semibold mb-4 text-primary">Quản lí danh mục</h1>
      <div className="mb-4">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center mb-4 text-primary"
        >
          {/* Từ khoá tìm kiếm */}
          <input
            type="text"
            value={formSearch.search}
            onChange={(e) => setFormSearch((prev) => ({ ...prev, search: e.target.value }))}
            placeholder="Tìm kiếm theo tên danh mục..."
            className="border border-solid border-gray-300 rounded-xl h-10 px-4 text-sm  shadow-sm focus:border-primary outline-none w-full"
          />

          {/* Sắp xếp */}
          <select
            value={formSearch.sortBy}
            onChange={(e) => setFormSearch((prev) => ({ ...prev, sortBy: e.target.value }))}
            className="border border-solid border-gray-300 rounded-xl h-10 px-4 text-sm shadow-sm focus:border-primary outline-none w-full appearance-none"
          >
            <option value="">-- Sắp xếp --</option>
            <option value="+name">Tên A-Z</option>
            <option value="-name">Tên Z-A</option>
          </select>

          {/* Nút tìm kiếm */}
          <div className="sm:col-span-2 flex justify-end">
            <SubmitButton label="Tìm kiếm" />
          </div>
        </form>
        <div className="sm:col-span-2 flex gap-4 justify-start  ">
          <AddButton onClick={() => setIsCreateModalOpen(true)} label="Thêm danh mục" />
          {/* <button
            className=" cursor-pointer bg-white border border-[#796449] text-[#796449] hover:bg-[#f7f4f0] text-sm px-5 py-2 rounded-lg shadow transition-all duration-200"
          >
            Export (.xlsx)
          </button> */}
        </div>
      </div>
      {isCreateModalOpen && (
        <CreateCategoryModal
          onClose={() => setIsCreateModalOpen(false)}
          onCreated={refetch}
        />
      )}
      <div className="overflow-x-auto rounded-xl shadow-md">
        <table className="min-w-full divide-y divide-gray-300 bg-white rounded-xl overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">STT</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Tên danh mục</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden md:table-cell">Slug</th>
              <th className="px-4 py-3 md:text-left text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {isLoading ? (
              <CategoryTableSkeleton rows={6} />
            ) : (
              categories.map((cat: Category, i: number) => (
                <tr key={cat.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 text-sm">{i + 1}</td>
                  <td className="px-4 py-3 text-sm">{cat.name}</td>
                  <td className="px-4 py-3 text-sm hidden md:table-cell">{cat.slug}</td>
                  <td className="px-4 py-3 text-sm flex flex-col md:flex-row gap-2 md:gap-3">
                    <button className="flex items-center gap-1 text-primary hover:text-secondary transition justify-center"
                      onClick={() => handleEdit(cat.id)}>
                      <FaEdit className="text-sm" />
                      Sửa
                    </button>
                    <button className="flex items-center gap-1 text-primary hover:text-red-600 transition justify-center"
                      onClick={() => handleDelete(cat.id)}>
                      <FaTrash className="text-sm" />
                      Xoá
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {editingCategoryId && (
          <EditCategoryModal
            id={editingCategoryId}
            onClose={() => setEditingCategoryId(null)}
            onUpdated={refetch}
          />
        )}
        {deleteCategoryId && (
          <DeleteModal
            id={deleteCategoryId}
            onClose={() => setDeleteCategoryId(null)}
            onDeleted={refetch}
            title="Xoá danh mục"
            message="Bạn có chắc chắn muốn xoá danh mục này không ?"
            endpoint="categories"
          />
        )}
      </div>
    </>
  );
}
