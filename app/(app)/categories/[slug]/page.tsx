import ProductList from "@/app/ui/app/product/product-list";
import { getProductsByCategory } from "@/app/lib/data";


interface CategoryPageProps {
  params: { slug: string };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const products = await getProductsByCategory(params.slug);
  // console.log(products);
  return (
    <div className="container mx-auto px-4 py-10 text-[rgb(121,100,73)]">
      <h1 className="text-2xl font-bold mb-8">Danh Sách Sản Phẩm</h1>
      <ProductList products={products} />
    </div>
  );
}