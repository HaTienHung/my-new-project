import { getProductsByCategory } from "@/app/lib/data";
import ClientProductPagination from "./product-pagination";

type tParams = Promise<{ slug: string }>;

export default async function Page({
  params,
  searchParams,
}: {
  params: tParams;
  searchParams: Record<string, string>;
}) {
  const { slug }: { slug: string } = await params;
  const initialPage = parseInt(searchParams.page || '1')
  const initialData = await getProductsByCategory(slug, initialPage)
  // console.log(products);
  return (
    <div className="container mx-auto px-4 py-10 text-[rgb(121,100,73)]">
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