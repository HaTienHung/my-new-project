import { getProductsByCategory } from "@/app/lib/data";
import ClientProductPagination from "./product-pagination";


interface PageParams {
  slug: string;
  page: number;
}

interface PageProps {
  params: PageParams;
  searchParams: Record<string, string>;
}


export default async function Page({ params, searchParams }: PageProps) {
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