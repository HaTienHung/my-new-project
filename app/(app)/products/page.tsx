import ProductList from "@/app/ui/app/products/product-list";
import { getProducts } from "@/app/lib/data";


export default async function ProductsPage() {
  const products = await getProducts();
  return (
    <div className="container mx-auto px-4 py-10 text-[rgb(121,100,73)]">
      <h1 className="text-2xl font-bold mb-8">Danh Sách Sản Phẩm</h1>
      <ProductList products={products} />
    </div>
  );
}