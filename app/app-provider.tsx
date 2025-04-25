// app/providers/AppProvider.tsx
'use client';

import { ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '@/app/lib/redux/auth-slice';
import { addToCart, setCartQuantity } from '@/app/lib/redux/cart-slice';
import Cookies from "js-cookie";
import { CartItem } from './lib/definitions';

type Props = {
  children: ReactNode;
};

export default function AppProvider({ children }: Props) {
  const dispatch = useDispatch();

  // Auto login nếu đã có token
  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      dispatch(loginSuccess({ token, user: null }));
      // console.log('dispatch login');
    }
  }, [dispatch]);

  // Fetch giỏ hàng nếu đã đăng nhập
  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) return;

    const fetchCart = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/app/cart`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        const cartItems = data.data;
        const quantity = cartItems.reduce((acc: number, item: CartItem) => acc + item.quantity, 0);

        cartItems.forEach((item: CartItem) => {
          dispatch(addToCart({ product_id: item.product_id, quantity: item.quantity }));
        });

        dispatch(setCartQuantity(quantity));
      } catch (err) {
        console.error('Error fetching cart:', err);
      }
    };

    fetchCart();
  }, [dispatch]);

  return <>{children}</>;
}
