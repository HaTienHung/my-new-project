import { useEffect, useState } from "react";
import axios from "axios";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";


export const useProducts = ({ prefix = '' }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

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

  // ✅ Khi queryParams đổi → gọi API
  useEffect(() => {
    const fetchProducts = async () => {
      try {

        setIsLoading(true);

        const filter: Record<string, any> = {};
        if (queryParams.category) {
          filter.category_id_IN = [queryParams.category];
        }
        if (queryParams.minPrice && queryParams.maxPrice) {
          filter.price_RANGE = [queryParams.minPrice, queryParams.maxPrice];
        }

        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
          params: {
            search: queryParams.search,
            "searchFields[]": [queryParams.searchField || "name"],
            filter: JSON.stringify(filter),
            "sort[]": queryParams.sortBy ? [queryParams.sortBy] : [],
            page: queryParams.page,
          },
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });

        // console.log('Filter:', filter);
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

    // Lặp qua các bộ lọc và chỉ thêm vào URL nếu giá trị không phải là null hoặc rỗng
    Object.entries(formSearch).forEach(([key, value]) => {
      if (value !== "" && value !== null) {
        params.set(key, value.toString());
      }
    });
    if (pathname.startsWith('/cms')) {
      router.push(`${pathname}?${params.toString()}`);
    } else {
      router.push(`/products?${params.toString()}`);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
      console.log(res);
      setCategories(res.data?.data || []);
    };

    fetchCategories();
  }, []);

  return {
    searchParams,
    totalPages,
    currentPage,
    products,
    categories,
    formSearch,
    setQueryParams,
    setFormSearch,
    submitFilters,
    isLoading,
    refetch: () => setQueryParams(getParamsFromURL()),
  };
};
