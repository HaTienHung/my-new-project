import { getLastestProducts } from "@/app/lib/data";
import HomeContent from "./home";
import { Providers } from "./providers";
import { Metadata } from 'next';
import { Suspense } from "react";
import { ProductListSkeleton } from "./ui/skeletons";

export const metadata: Metadata = {
  title: 'Trang chủ',
};

export default async function ProductPage() {
  const lastestProducts = await getLastestProducts();
  return (
    <Providers>
      <Suspense fallback={<ProductListSkeleton />}>
        <HomeContent products={lastestProducts} />
      </Suspense>
    </Providers>
  );
}