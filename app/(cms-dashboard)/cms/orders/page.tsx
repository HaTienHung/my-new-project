import OrderManagment from "@/app/ui/cms/orders/order-managment";
export const dynamic = "force-dynamic";

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quản lí đơn hàng',
};

export default function Page() {
  return (
    <OrderManagment />
  );
}