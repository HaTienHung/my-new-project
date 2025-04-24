import { getLastestProducts } from "@/app/lib/data";
import HomeContent from "./home";
import { Providers } from "./providers";
export const dynamic = 'force-dynamic';


export default async function ProductPage() {
  const lastestProducts = await getLastestProducts();
  return (
    <Providers>
      <HomeContent products={lastestProducts} />
    </Providers>
  );
}