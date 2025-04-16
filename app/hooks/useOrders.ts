import { useState, useEffect } from "react";
import axios from "axios";

export const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [formSearch, setFormSearch] = useState({
    search: "",
    searchField: "",
    status: "",
    sortBy: "",
    page: 1,
  });

  const [queryParams, setQueryParams] = useState(formSearch);

  // Gọi API sản phẩm
  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const filter: Record<string, any> = {};

      if (queryParams.status) {
        filter.status_IN = [queryParams.status];
      }
      console.log("URL API:", process.env.NEXT_PUBLIC_API_URL);

      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/cms/orders`, {
        params: {
          search: queryParams.search || "",
          "searchFields[]": [queryParams.searchField || "user.name"],
          filter: JSON.stringify(filter),
          "sort[]": queryParams.sortBy ? [queryParams.sortBy] : [],
          page: queryParams.page || 1,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log('query', queryParams.status);
      console.log("filter", filter);
      setOrders(res.data?.data || []);
      console.log(orders);
    } catch (err: any) {
      console.error("Lỗi fetchProducts:", err?.response?.data || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Trigger lại khi queryParams thay đổi
  useEffect(() => {
    fetchOrders();
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
    orders,
    categories,
    formSearch,
    setFormSearch,
    submitFilters,
    isLoading,
    refetch: fetchOrders,
  };
};
