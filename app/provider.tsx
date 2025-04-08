'use client';

import { Provider } from 'react-redux';
import { store } from '@/app/lib/redux/store';
import { ReactNode } from 'react';
import CartProvider from './cart-provider';

interface ProvidersProps {
  children: ReactNode; // Chỉ định kiểu dữ liệu cho 'children'
}

export function Providers({ children }: ProvidersProps) {
  return <Provider store={store}>
    <CartProvider>{children}
    </CartProvider>
  </Provider>;
}
