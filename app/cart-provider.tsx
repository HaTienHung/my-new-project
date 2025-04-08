// app/cart-provider.tsx
'use client';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart, setCartQuantity } from './lib/redux/cart-slice';

export default function CartProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/app/cart`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        const cartItems = data.data;
        const quantity = cartItems.reduce((acc: number, item: any) => acc + item.quantity, 0);

        // Dispatch các item giỏ hàng vào Redux store
        cartItems.forEach((item: any) => dispatch(addToCart({ product_id: item.product_id, quantity: item.quantity })));
        dispatch(setCartQuantity(quantity));
      } catch (err) {
        console.error('Error fetching cart:', err);
      }
    };

    fetchCart();
  }, [dispatch]);

  return <>{children}</>;
}
