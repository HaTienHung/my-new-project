import { getProductBySlug } from "@/app/lib/data";
import ProductDetail from "@/app/ui/app/products/product-detail";

type tParams = Promise<{ slug: string }>;

export default async function Page({ params }: { params: tParams }) {
  const { slug }: { slug: string } = await params;
  const product = await getProductBySlug(slug);
  return (
    <div className="container mx-auto px-4 py-10 text-[rgb(121,100,73)]">
      <ProductDetail product={product!} />
    </div>
  );
}