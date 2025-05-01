import CategoryManament from "@/app/ui/cms/categories/category-managment";
import { Metadata } from 'next';
export const dynamic = "force-dynamic";


export const metadata: Metadata = {
  title: 'Quản lí danh mục',
};

export default function Page() {
  return (
    <CategoryManament />
  );
}