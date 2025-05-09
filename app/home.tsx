'use client';

// import { Provider } from 'react-redux';
// import { store } from '@/app/lib/redux/store';
import ProductList from '@/app/ui/app/products/product-list';
import Header from './ui/app/header/header';
import Footer from './ui/app/footer/footer';
import Link from 'next/link';
import { Product } from './lib/definitions';

export default function HomeContent({ products }: { products: Product[] }) {
  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-10 text-primary">
        <h1 className="text-xl sm:text-2xl font-bold mb-10">Danh Sách Sản Phẩm Mới Nhất</h1>
        <ProductList products={products} />
        <div className='flex items-center justify-center '>
          <Link href="/products" className='box-border'>
            <button className="border border-solid rounded-lg px-4 py-2 mt-10 hover:bg-primary hover:text-white">
              Xem toàn bộ
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
