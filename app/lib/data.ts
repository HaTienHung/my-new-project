export async function getProducts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
      cache: "no-cache", // Luôn lấy dữ liệu mới từ API
    });

    if (!res.ok) throw new Error('Failed to fetch products');

    const data = await res.json();
    return data?.data?.data ?? []; // Trả về mảng sản phẩm trực tiếp
  } catch (error) {
    console.error('Error fetching products:', error);
    return []; // Trả về mảng rỗng nếu lỗi
  }
}
export async function getLastestProducts() {
  try {
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


