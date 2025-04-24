import { getProductBySlug } from "@/app/lib/data";
import ProductDetail from "@/app/ui/app/products/product-detail";

interface ProductDetailProps {
  params: { slug: string };
}

export default async function Page({ params }: ProductDetailProps) {
  const product = await getProductBySlug(params.slug);
  // console.log(products);
  return (
    <div className="container mx-auto px-4 py-10 text-[rgb(121,100,73)]">
      <ProductDetail product={product} />
    </div>
  );
}