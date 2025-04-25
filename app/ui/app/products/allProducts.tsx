'use client';
import ProductList from "@/app/ui/app/products/product-list";
import { useProducts } from "@/app/hooks/useProducts";
import Pagination from "@/app/ui/pagination";
import { useEffect, useState } from "react";
import { ProductListSkeleton } from "@/app/ui/skeletons";
import ProductFilter from "@/app/ui/app/products/product-filter";
import { FaFilter } from "react-icons/fa6";
export const dynamic = 'force-dynamic';


export default function AllProducts() {
  const {
    currentPage,
    totalPages,
    products,
    formSearch,
    setFormSearch,
    submitFilters,
    categories,
    isLoading,
  } = useProducts({ prefix: '' });

  const handlePageChange = (page: number) => {
    setFormSearch((prev) => ({
      ...prev,
      page, // Cập nhật lại giá trị page
    }));
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev); // toggle giữa true <-> false
  };

  useEffect(() => {
    submitFilters();  // Gọi lại API khi page thay đổi
  }, [formSearch.page]);  // Theo dõi sự thay đổi của formSearch.page

  return (
    <div className="container mx-auto px-4 py-10 text-[rgb(121,100,73)] z-20">
      <div className="pb-4 flex justify-end">
        <div className="flex gap-2 border border-solid  rounded-lg cursor-pointer items-center p-2 box-border" onClick={toggleDropdown}>
          <span className="text-sm md:text-base ">Lọc</span>
          <FaFilter
            className="text-[rgb(121,100,73)] text-sm md:text-base cursor-pointer"
          />
        </div>
      </div>
      {isOpen && (
        <ProductFilter
          formSearch={formSearch}
          setFormSearch={setFormSearch}
          categories={categories}
          submitFilters={submitFilters}
        />
      )}
      {isLoading ? (<ProductListSkeleton />) : (<ProductList products={products} />)}
      {products.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}