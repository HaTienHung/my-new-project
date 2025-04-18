import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
const isEqual = require('lodash.isequal');

export const useProducts = ({ prefix = '' }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const endpoint = `${prefix}/products`;

  // 🆕 Tạo hàm chuyển URL params thành object
  const getParamsFromURL = () => ({
    search: searchParams.get("search") || "",
    searchField: searchParams.get("searchField") || "",
    category: searchParams.get("category") || "",
    sortBy: searchParams.get("sortBy") || "",
    page: Number(searchParams.get("page") || 1),
    limit: Number(searchParams.get("limit") || 8),
  });

  const [formSearch, setFormSearch] = useState(getParamsFromURL());
  const [queryParams, setQueryParams] = useState(getParamsFromURL());

  // ✅ Khi URL đổi → đồng bộ lại formSearch & queryParams
  useEffect(() => {
    const newParams = getParamsFromURL();
    setFormSearch(newParams);
    setQueryParams(newParams);
  }, [searchParams]); // <- khi URL đổi

  // ✅ Khi queryParams đổi → gọi API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);

        const filter: Record<string, any> = {};
        if (queryParams.category) {
          filter.category_id_IN = [queryParams.category];
        }

        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
          params: {
            search: queryParams.search,
            "searchFields[]": [queryParams.searchField || "name"],
            filter: JSON.stringify(filter),
            "sort[]": queryParams.sortBy ? [queryParams.sortBy] : [],
            page: queryParams.page,
            limit: queryParams.limit,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setProducts(res.data?.data?.data || []);
        setTotalPages(res.data?.data?.last_page || 1);
        setCurrentPage(res.data?.data?.current_page || 1);
      } catch (err: any) {
        console.error("Lỗi fetchProducts:", err?.response?.data || err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [queryParams]);

  // ✅ Cập nhật URL và trigger update
  const submitFilters = () => {
    const params = new URLSearchParams();

    Object.entries(formSearch).forEach(([key, value]) => {
      if (value !== "" && value !== null) {
        params.set(key, value.toString());
      }
    });

    router.push(`?${params.toString()}`);
    // Không cần setQueryParams ở đây nữa — sẽ tự động trong useEffect khi URL đổi
  };

  return {
    searchParams,
    totalPages,
    currentPage,
    products,
    categories,
    formSearch,
    setFormSearch,
    submitFilters,
    isLoading,
    refetch: () => setQueryParams(getParamsFromURL()),
  };
};
