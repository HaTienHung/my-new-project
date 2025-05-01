import InventoryManagment from "@/app/ui/cms/inventories/inventory-managment";
import { Metadata } from 'next';
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Quản lí kho',
};


export default function Page() {
  return (
    <InventoryManagment />
  );
}