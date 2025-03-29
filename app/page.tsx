
import ProductList from "@/app/ui/product/product-list";
import { getLastestProducts } from "@/app/lib/data";


export default async function ProductPage() {
  const products = await getLastestProducts();
  console.log(products);
  return (
    <div className="container mx-auto px-4 py-10 text-[rgb(121,100,73)]">
      <h1 className="text-2xl font-bold mb-6">Danh Sách Sản Phẩm Mới Nhất</h1>
      <ProductList products={products} />
    </div>
  );
}