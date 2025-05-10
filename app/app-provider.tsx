// app/providers/AppProvider.tsx
'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '@/app/lib/redux/auth-slice';
import { resetCart, setCartItems } from '@/app/lib/redux/cart-slice';
import Cookies from "js-cookie";
import { CartItem } from './lib/definitions';
import { RootState } from './lib/redux/store';

type Props = {
  children: ReactNode;
};

export default function AppProvider({ children }: Props) {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const [hasFetchedCart, setHasFetchedCart] = useState(false);

  // Auto login nếu đã có token
  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      dispatch(loginSuccess({ token, user: null }));
      // console.log('dispatch login');
    }
  }, [dispatch]);

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token || hasFetchedCart) return;

    const fetchCart = async () => {
      try {
        dispatch(resetCart());
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/app/cart`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        const cartItems: CartItem[] = data.data;

        dispatch(setCartItems({
          items: cartItems.map(item => ({
            product_id: item.product_id,
            quantity: item.quantity,
          }))
        }));

        setHasFetchedCart(true);
      } catch (err) {
        console.error('Error fetching cart:', err);
      }
    };

    fetchCart();
  }, [isAuthenticated, hasFetchedCart]);

  return <>{children}</>;
}
