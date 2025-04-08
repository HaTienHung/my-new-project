import ProductList from "@/app/ui/app/product/product-list";
import { getLastestProducts } from "@/app/lib/data";
import Header from "./ui/app/header/header";
import Footer from "./ui/app/footer/footer";


export default async function ProductPage() {
  const lastestProducts = await getLastestProducts();
  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-10 text-[rgb(121,100,73)]">
        <h1 className="text-2xl font-bold mb-10">Danh Sách Sản Phẩm Mới Nhất</h1>
        <ProductList products={lastestProducts} />
      </div>
      <Footer />
    </>
  );
}