import { getLastestProducts } from "@/app/lib/data";
import HomeContent from "./home";


export default async function ProductPage() {
  const lastestProducts = await getLastestProducts();
  return (
    <HomeContent products={lastestProducts} />
  );
}