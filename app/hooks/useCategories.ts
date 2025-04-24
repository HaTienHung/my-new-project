import { useState, useEffect } from "react";
import axios from "axios";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";


export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

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
  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      console.log("URL API:", process.env.NEXT_PUBLIC_API_URL);

      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/cms/categories`, {
        params: {
          search: queryParams.search || "",
          "searchFields[]": [queryParams.searchField || "name"],
          "sort[]": queryParams.sortBy ? [queryParams.sortBy] : [],
          page: queryParams.page || 1,
        },
        headers: {
          "Authorization": `Bearer ${Cookies.get("token")}`,
        },
      });

      setCategories(res.data?.data?.data || []);
    } catch (error) {
      console.error("Đã xảy ra lỗi", error);
      throw new Error("Lỗi khi fetch dữ liệu");
    } finally {
      setIsLoading(false);
    }
  };

  // Trigger lại khi queryParams thay đổi
  useEffect(() => {
    fetchCategories();
  }, [queryParams]);

  const submitFilters = () => {
    const params = new URLSearchParams();

    // Lặp qua các bộ lọc và chỉ thêm vào URL nếu giá trị không phải là null hoặc rỗng
    const formToSubmit = { ...formSearch, page: 1 };

    Object.entries(formToSubmit).forEach(([key, value]) => {
      if (value !== "" && value !== null && value !== undefined) {
        params.set(key, value.toString());
      }
    });

    router.push(`${pathname}?${params.toString()}`);
  };

  return {
    categories,
    formSearch,
    setFormSearch,
    submitFilters,
    isLoading,
    refetch: () => setQueryParams(getParamsFromURL()),
  };
};
