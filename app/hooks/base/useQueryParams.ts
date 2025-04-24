// import { useState, useEffect } from "react";
// import { useSearchParams } from "next/navigation"; // Import từ next/navigation
// 
// export const useQueryParams = () => {
//   const searchParams = useSearchParams();
//   const [queryParams, setQueryParams] = useState({
//     search: "",
//     searchField: "name", // mặc định
//     category: "",
//     sortBy: "",
//     page: 1,
//     limit: 8,
//   });
// 
//   useEffect(() => {
//     // Sử dụng searchParams để lấy query params
//     const params: Record<string, any> = {};
// 
//     searchParams.forEach((value, key) => {
//       // Gán giá trị của query params vào state
//       if (key in queryParams) {
//         params[key] = value;
//       }
//     });
// 
//     // Cập nhật queryParams
//     setQueryParams((prevParams) => ({
//       ...prevParams,
//       ...params,
//       page: parseInt(params.page || "1", 10),
//       limit: parseInt(params.limit || "8", 10),
//     }));
//   }, [searchParams]); // Re-run khi searchParams thay đổi
// 
//   return queryParams;
// };
