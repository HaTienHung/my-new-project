import { ProductListSkeleton } from '@/app/ui/skeletons';
export default function Loading() {
  return <div className="container mx-auto px-4 py-10 text-[rgb(121,100,73)]">
    <ProductListSkeleton />;
  </div>
}