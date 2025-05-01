import { getProductBySlug } from "@/app/lib/data";
import ProductDetail from "@/app/ui/app/products/product-detail";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sản phẩm',
};

type tParams = Promise<{ slug: string }>;

export default async function Page({ params }: { params: tParams }) {
  const { slug }: { slug: string } = await params;
  const product = await getProductBySlug(slug);
  return (
    <div className="container mx-auto px-4 py-10 text-primary">
      <ProductDetail product={product!} />
    </div>
  );
}