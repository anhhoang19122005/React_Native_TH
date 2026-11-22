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
      const found = state.items.find((b) => b.bookId === action.payload.id);
      if (found) {
        found.quantity = found.quantity + 1;
      } else {
        state.items.push({bookId: action.payload.id, title: action.payload.title, price: action.payload.price, quantity: 1})
      }

    },
    decrease(state, action: PayloadAction<string>) {
      // TODO BT10.9a: giảm quantity đi 1; nếu quantity đang là 1 thì xoá sách khỏi giỏ
      const found = state.items.find((b) => b.bookId === action.payload);
      if (found) {
        if (found.quantity <= 1) {
          state.items = state.items.filter((b) => b.bookId != action.payload);
        } else {
          found.quantity = found.quantity - 1;
        }
      }
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
export const selectCartCount = (s: RootState) => s.cart.items.reduce((s,i) => s + i.quantity, 0);
// TODO BT10.8b: tính tổng tiền = tổng price * quantity bằng reduce
export const selectCartTotal = (s: RootState) => s.cart.items.reduce((s,i) => s + i.quantity * i.price,0);
