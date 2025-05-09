import AllProducts from "@/app/ui/app/products/allProducts";
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Tất cả sản phẩm',
};
export default function Page() {
  return (
    <AllProducts />
  );
}