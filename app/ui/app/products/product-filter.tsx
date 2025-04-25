import { Category, FormSearch } from "@/app/lib/definitions";

interface ProductFilterProps {
  formSearch: FormSearch;
  setFormSearch: React.Dispatch<React.SetStateAction<FormSearch>>;
  categories: Category[];
  submitFilters: () => void;
}

export default function ProductFilter({
  formSearch,
  setFormSearch,
  categories,
  submitFilters,
}: ProductFilterProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formSearch);
    submitFilters();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center my-2 "
    >
      {/* Danh mục */}
      <select
        value={formSearch.category}
        onChange={(e) => setFormSearch((prev) => ({ ...prev, category: e.target.value }))}
        className="border border-solid  border-gray-300 rounded-xl h-10 px-4 text-base sm:text-sm shadow-sm focus:ring-[rgb(121,100,73)] focus:border-[rgb(121,100,73)] w-full"
      >
        <option value="">-- Tất cả danh mục --</option>
        {categories.map((cat: Category) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      {/* Sắp xếp */}
      <select
        value={formSearch.sortBy}
        onChange={(e) => setFormSearch((prev) => ({ ...prev, sortBy: e.target.value }))}
        className="border border-solid  border-gray-300 rounded-xl h-10 px-4 text-base sm:text-sm shadow-sm focus:ring-[rgb(121,100,73)] focus:border-[rgb(121,100,73)] w-full"
      >
        <option value="">-- Sắp xếp --</option>
        <option value="+name">Tên A → Z</option>
        <option value="-name">Tên Z → A</option>
        <option value="+price">Giá tăng dần</option>
        <option value="-price">Giá giảm dần</option>
      </select>

      {/* Giá từ */}
      <input
        type="text"
        value={formSearch.minPrice || ""}
        onChange={(e) => setFormSearch((prev) => ({ ...prev, minPrice: e.target.value }))}
        placeholder="Giá từ (VNĐ)"
        className="border border-solid  border-gray-300 rounded-xl h-10 px-4 text-base sm:text-sm shadow-sm focus:ring-[rgb(121,100,73)] focus:border-[rgb(121,100,73)] w-full"
      />

      {/* Giá đến */}
      <input
        type="text"
        value={formSearch.maxPrice || ""}
        onChange={(e) => setFormSearch((prev) => ({ ...prev, maxPrice: e.target.value }))}
        placeholder="Giá đến (VNĐ)"
        className="border border-solid  border-gray-300 rounded-xl h-10 px-4 text-base sm:text-sm shadow-sm focus:ring-[rgb(121,100,73)] focus:border-[rgb(121,100,73)] w-full"
      />

      {/* Nút tìm kiếm */}
      <div className="sm:col-span-2 flex justify-end mb-2 select-none">
        <button
          type="submit"
          className="bg-[rgb(121,100,73)] hover:bg-opacity-90 text-white text-base sm:text-sm px-5 py-2 rounded-xl shadow transition-all duration-200 hover:underline cursor-pointer underline-offset-4 "
        >
          Lọc
        </button>
      </div>
    </form>
  );
}
