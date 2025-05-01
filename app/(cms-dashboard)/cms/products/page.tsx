import ProductMagmamemt from "@/app/ui/cms/products/product-managment";
import { Metadata } from 'next';
export const dynamic = "force-dynamic";


export const metadata: Metadata = {
  title: 'Quản lí sản phẩm',
};
export default function Page() {
  return (
    <ProductMagmamemt />
  );
}