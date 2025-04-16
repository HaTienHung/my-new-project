// app/providers/AppProvider.tsx
'use client';

import { ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '@/app/lib/redux/auth-slice';
import { addToCart, setCartQuantity } from '@/app/lib/redux/cart-slice';

type Props = {
  children: ReactNode;
};

export default function AppProvider({ children }: Props) {
  const dispatch = useDispatch();

  // Auto login nếu đã có token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(loginSuccess({ token, user: null }));
    }
  }, [dispatch]);

  // Fetch giỏ hàng nếu đã đăng nhập
  useEffect(() => {
    const token = localStorage.getItem('token');
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
        const quantity = cartItems.reduce((acc: number, item: any) => acc + item.quantity, 0);

        cartItems.forEach((item: any) => {
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
