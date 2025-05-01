import Cart from "@/app/ui/app/cart/cart-list";
import { Metadata } from 'next';
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Giỏ hàng',
};


export default async function Page() {
  return (
    <div className="container mx-auto px-4 py-6 text-primary">
      <Cart />
    </div>
  );
}