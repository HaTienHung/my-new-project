'use client';

import { Provider } from 'react-redux';
import { store } from '@/app/lib/redux/store';
import ProductList from '@/app/ui/app/products/product-list';
import Header from './ui/app/header/header';
import Footer from './ui/app/footer/footer';

export default function HomeContent({ products }: { products: any[] }) {
  return (
    <Provider store={store}>
      <Header />
      <div className="container mx-auto px-4 py-10 text-[rgb(121,100,73)]">
        <h1 className="text-2xl font-bold mb-10">Danh Sách Sản Phẩm Mới Nhất</h1>
        <ProductList products={products} />
      </div>
      <Footer />
    </Provider>
  );
}
