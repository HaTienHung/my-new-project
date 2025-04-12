import { useState, useEffect } from "react";
import axios from "axios";

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [formSearch, setFormSearch] = useState({
    search: "",
    searchField: "",
    category: "",
    sortBy: "",
    page: 1,
  });

  const [queryParams, setQueryParams] = useState(formSearch);

  // Gọi API sản phẩm
  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const filter: Record<string, any> = {};

      if (queryParams.category) {
        filter.category_id_IN = [queryParams.category];
      }
      console.log("URL API:", process.env.NEXT_PUBLIC_API_URL);

      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
        params: {
          search: queryParams.search || "",
          "searchFields[]": [queryParams.searchField || "name"],
          filter: JSON.stringify(filter),
          "sort[]": queryParams.sortBy ? [queryParams.sortBy] : [],
          page: queryParams.page || 1,
        },
      });

      setProducts(res.data?.data?.data || []);
    } catch (err: any) {
      console.error("Lỗi fetchProducts:", err?.response?.data || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Trigger lại khi queryParams thay đổi
  useEffect(() => {
    fetchProducts();
  }, [queryParams]);


  // Gọi API danh mục 1 lần khi mount
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
      console.log(res);
      setCategories(res.data?.data || []); // tuỳ cấu trúc, bạn có thể cần `.data.data`
    };

    fetchCategories();
  }, []);

  const submitFilters = () => {
    setQueryParams({ ...formSearch });
  };

  return {
    products,
    categories,
    formSearch,
    setFormSearch,
    submitFilters,
    isLoading,
    refetch: fetchProducts,
  };
};
