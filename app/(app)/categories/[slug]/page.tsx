import { getProductsByCategory } from "@/app/lib/data";
import ClientProductPagination from "./product-pagination";



export default async function Page({ params, searchParams }: any) {
  const initialPage = parseInt(searchParams.page || '1')
  const initialData = await getProductsByCategory(params.slug, initialPage)
  // console.log(products);
  return (
    <div className="container mx-auto px-4 py-10 text-[rgb(121,100,73)]">
      <div>
        <ClientProductPagination
          slug={params.slug}
          initialPage={initialPage}
          initialProducts={initialData.products}
          initialTotalPages={initialData.lastPage}
        />
      </div>
    </div>
  );
}