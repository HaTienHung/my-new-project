import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface CartItem {
  product_id: number;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  quantity: number; // Tổng số lượng tất cả sản phẩm
}

const initialState: CartState = {
  items: [],
  quantity: 0,
};


export const cartSlice = createSlice({

  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{ product_id: number; quantity: number }>
    ) => {
      const { product_id, quantity } = action.payload;
      const existing = state.items.find((item) => item.product_id === product_id);

      if (existing) {
        existing.quantity += quantity;
      } else {
        state.items.push({ product_id, quantity });
      }

      state.quantity = state.items.reduce((total, item) => total + item.quantity, 0);
    },
    setCartQuantity: (state, action) => {
      state.quantity = action.payload;
      console.log('hello');
    },
    resetCart: (state) => {
      state.items = [];
      state.quantity = 0;
    },
    increaseQuantity: (state, action) => {
      const { product_id } = action.payload;
      // Tìm sản phẩm trong giỏ hàng
      const item = state.items.find(item => item.product_id === product_id);

      // Nếu sản phẩm tồn tại trong giỏ hàng, tăng quantity lên 1
      if (item) {
        item.quantity += 1;
      }

      // Cập nhật lại tổng số lượng giỏ hàng sau khi thay đổi
      state.quantity = state.items.reduce((total, item) => total + item.quantity, 0);

      // Log để kiểm tra
      // console.log('Updated cart items:', JSON.parse(JSON.stringify(state.items)));
      console.log('Updated quantity for product_id', product_id, ':', item?.quantity);
    },
    decreaseQuantity: (state, action) => {
      const { product_id } = action.payload;
      // Tìm sản phẩm trong giỏ hàng
      const item = state.items.find(item => item.product_id === product_id);

      // Nếu sản phẩm tồn tại trong giỏ hàng, tăng quantity lên 1
      if (item) {
        item.quantity -= 1;
      }

      // Cập nhật lại tổng số lượng giỏ hàng sau khi thay đổi
      state.quantity = state.items.reduce((total, item) => total + item.quantity, 0);

      // Log để kiểm tra
      // console.log('Updated cart items:', JSON.parse(JSON.stringify(state.items)));
      console.log('Updated quantity for product_id', product_id, ':', item?.quantity);
    },
    removeFromCart(state, action) {
      const { product_id } = action.payload;

      const product = state.items.find(item => item.product_id === product_id);

      if (product) {
        state.items = state.items.filter(item => item.product_id !== product_id);
      }
      state.quantity = state.items.reduce((total, item) => total + item.quantity, 0);

    }
  },
});

export const { addToCart, resetCart, setCartQuantity, removeFromCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
