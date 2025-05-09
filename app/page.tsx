// import { getLastestProducts } from "@/app/lib/data";
import HomeContent from "./home";
import { getLastestProducts } from "./lib/data";
import { Providers } from "./providers";
import { Metadata } from 'next';
export const dynamic = "force-dynamic";

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