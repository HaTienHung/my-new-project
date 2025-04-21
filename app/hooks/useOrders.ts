import { useState, useEffect } from "react";
import axios from "axios";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const getParamsFromURL = () => ({
    search: searchParams.get("search") || "",
    searchField: searchParams.get("searchField") || "",
    status: searchParams.get("status") || "",
    category: searchParams.get("category") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
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
  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const filter: Record<string, any> = {};

      if (queryParams.status) {
        filter.status_IN = [queryParams.status];
      }

      if (queryParams.minPrice && queryParams.maxPrice) {
        filter.price_RANGE = [queryParams.minPrice, queryParams.maxPrice];
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
      // console.log('query', queryParams.status);
      // console.log("filter", filter);
      setOrders(res.data?.data || []);
      // console.log(orders);
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



  const submitFilters = () => {
    const params = new URLSearchParams();

    const formToSubmit = { ...formSearch, page: 1 };

    Object.entries(formToSubmit).forEach(([key, value]) => {
      if (value !== "" && value !== null && value !== undefined) {
        params.set(key, value.toString());
      }
    });
    router.push(`${pathname}?${params.toString()}`);
  };

  return {
    orders,
    formSearch,
    setFormSearch,
    submitFilters,
    isLoading,
    refetch: () => setQueryParams(getParamsFromURL()),
  };
};
