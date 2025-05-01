import { getProductsByCategory } from "@/app/lib/data";
import ClientProductPagination from "./product-pagination";

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Danh mục',
};

type tParams = Promise<{ slug: string }>;
type tSearchParams = Promise<Record<string, string>>;

export default async function Page({
  params,
  searchParams,
}: {
  params: tParams;
  searchParams: tSearchParams;
}) {
  const { slug }: { slug: string } = await params;
  const sParams = await searchParams;
  const initialPage = parseInt(sParams.page || '1');
  const initialData = await getProductsByCategory(slug, initialPage)
  // console.log(products);
  return (
    <div className="container mx-auto px-4 py-10 text-primary">
      <div>
        <ClientProductPagination
          slug={slug}
          initialPage={initialPage}
          initialProducts={initialData.products}
          initialTotalPages={initialData.lastPage}
        />
      </div>
    </div>
  );
}