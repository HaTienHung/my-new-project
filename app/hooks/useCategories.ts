import { useState, useEffect } from "react";
import axios from "axios";

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [formSearch, setFormSearch] = useState({
    search: "",
    searchField: "",
    sortBy: "",
    page: 1,
  });

  const [queryParams, setQueryParams] = useState(formSearch);

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
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setCategories(res.data?.data?.data || []);
    } catch (err: any) {
      console.error("Lỗi fetchProducts:", err?.response?.data || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Trigger lại khi queryParams thay đổi
  useEffect(() => {
    fetchCategories();
  }, [queryParams]);

  const submitFilters = () => {
    setQueryParams({ ...formSearch });
  };

  return {
    categories,
    formSearch,
    setFormSearch,
    submitFilters,
    isLoading,
    refetch: fetchCategories,
  };
};
