import { useState, useEffect } from "react";
import axios from "axios";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";


export const useInventories = () => {
  const [inventories, setInventories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  // 🆕 Tạo hàm chuyển URL params thành object
  const getParamsFromURL = () => ({
    search: searchParams.get("search") || "",
    searchField: searchParams.get("searchField") || "",
    sortBy: searchParams.get("sortBy") || "",
    page: Number(searchParams.get("page") || 1),
  });

  const [formSearch, setFormSearch] = useState(getParamsFromURL());
  const [queryParams, setQueryParams] = useState(getParamsFromURL());

  // ✅ Khi URL đổi → đồng bộ lại formSearch & queryParams
  useEffect(() => {
    const newParams = getParamsFromURL();
    setFormSearch(newParams);
    setQueryParams(newParams);
  }, [searchParams]); // <- khi URL đổi

  // Gọi API sản phẩm
  const fetchInventories = async () => {
    try {
      setIsLoading(true);
      console.log("URL API:", process.env.NEXT_PUBLIC_API_URL);

      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/cms/inventories`, {
        params: {
          search: queryParams.search || "",
          "searchFields[]": [queryParams.searchField || "name"],
          "sort[]": queryParams.sortBy ? [queryParams.sortBy] : [],
          page: queryParams.page || 1,
        },
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });

      setInventories(res.data?.data?.data || []);
      setTotalPages(res.data?.data?.last_page || 1);
      setCurrentPage(res.data?.data?.current_page || 1);
    } catch (err: any) {
      console.error("Lỗi fetchProducts:", err?.response?.data || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Trigger lại khi queryParams thay đổi
  useEffect(() => {
    fetchInventories();
  }, [queryParams]);

  const submitFilters = () => {
    const params = new URLSearchParams();

    // Lặp qua các bộ lọc và chỉ thêm vào URL nếu giá trị không phải là null hoặc rỗng
    Object.entries(formSearch).forEach(([key, value]) => {
      if (value !== "" && value !== null) {
        params.set(key, value.toString());
      }
    });
    router.push(`${pathname}?${params.toString()}`);
  };


  return {
    currentPage,
    totalPages,
    inventories,
    formSearch,
    setFormSearch,
    submitFilters,
    isLoading,
    refetch: () => setQueryParams(getParamsFromURL()),
  };
};
