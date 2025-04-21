// export async function getProducts() {
//   try {
//     // await new Promise(resolve => setTimeout(resolve, 1000));
// 
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
//       cache: "no-cache", // Luôn lấy dữ liệu mới từ API
//     });
// 
//     if (!res.ok) throw new Error('Failed to fetch products');
// 
//     const data = await res.json();
//     return data?.data?.data ?? []; // Trả về mảng sản phẩm trực tiếp
//   } catch (error) {
//     console.error('Error fetching products:', error);
//     return []; // Trả về mảng rỗng nếu lỗi
//   }
// }

export async function getLastestProducts() {
  try {
    // await new Promise(resolve => setTimeout(resolve, 1000));

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/`, {
      cache: "no-cache", // Luôn lấy dữ liệu mới từ API
    });

    if (!res.ok) throw new Error('Failed to fetch products');

    const data = await res.json();
    return data?.data ?? []; // Trả về mảng sản phẩm trực tiếp
  } catch (error) {
    console.error('Error fetching products:', error);
    return []; // Trả về mảng rỗng nếu lỗi
  }
}

export async function getProductsByCategory(
  slug: string,
  page: number
): Promise<{ products: any[]; lastPage: number }> {
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/${slug}?page=${page}`, {
      cache: "no-cache",
    });

    if (!res.ok) throw new Error('Failed to fetch products');

    const data = await res.json();

    return {
      products: data?.data?.data || [],
      lastPage: data?.data?.last_page || 1,
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    return {
      products: [],
      lastPage: 1,
    };
  }
}


export async function getProductBySlug(slug: string): Promise<any> {
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${slug}`, {
      cache: "no-cache", // Luôn lấy dữ liệu mới từ API
    });
    // console.log(slug);
    if (!res.ok) throw new Error('Failed to fetch products');

    const data = await res.json();
    // console.log(data);
    return data?.product ?? null;
  } catch (error) {
    console.error('Error fetching products:', error);
    return []; // Trả về mảng rỗng nếu lỗi
  }
}

export const getCategories = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {// Cập nhật mỗi 1 giờ
  });
  const data = await res.json();
  return data?.data ?? [];
};






