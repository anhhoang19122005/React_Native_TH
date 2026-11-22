import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Book, CartItem } from "../types";
import type { RootState } from "./index";

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [] as CartItem[] },
  reducers: {
    addToCart(state, action: PayloadAction<Pick<Book, "id" | "title" | "price">>) {
      // TODO BT10.8a: nếu sách đã có trong giỏ thì tăng quantity, chưa có thì push { bookId, title, price, quantity: 1 }
      // Gợi ý: state.items.find(...) rồi sửa trực tiếp (Immer cho phép)
    },
    decrease(state, action: PayloadAction<string>) {
      // TODO BT10.9a: giảm quantity đi 1; nếu quantity đang là 1 thì xoá sách khỏi giỏ
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter((i) => i.bookId !== action.payload);
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addToCart, decrease, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

export const selectCartItems = (s: RootState) => s.cart.items;
// TODO BT10.8b: tính tổng số lượng bằng reduce
export const selectCartCount = (_s: RootState): number => 0;
// TODO BT10.8b: tính tổng tiền = tổng price * quantity bằng reduce
export const selectCartTotal = (_s: RootState): number => 0;
