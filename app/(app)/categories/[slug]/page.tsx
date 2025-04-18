import ProductList from "@/app/ui/app/products/product-list";
import { getProductsByCategory } from "@/app/lib/data";


interface CategoryPageProps {
  params: { slug: string };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const products = await getProductsByCategory(params.slug);
  // console.log(products);
  return (
    <div className="container mx-auto px-4 py-10 text-[rgb(121,100,73)]">
      <ProductList products={products} />
    </div>
  );
}