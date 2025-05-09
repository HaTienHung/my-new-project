import { getLastestProducts } from "@/app/lib/data";
import HomeContent from "./home";
import { Providers } from "./providers";
import { Metadata } from 'next';



export const metadata: Metadata = {
  title: 'Trang chủ',
};


export default async function ProductPage() {
  const lastestProducts = await getLastestProducts();
  return (
    <Providers>
      <HomeContent products={lastestProducts} />
    </Providers>
  );
}