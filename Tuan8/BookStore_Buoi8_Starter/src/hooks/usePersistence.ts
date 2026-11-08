import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setCredentials } from "../store/authSlice";
import { hydrateCart } from "../store/cartSlice";
import { hydrateWishlist } from "../store/wishlistSlice";
import { clearAuth, loadAuth, saveAuth } from "../storage/authStorage"; // đã viết sẵn
import { loadJSON } from "../storage/storage"; // đã viết sẵn
import { useAutoPersist } from "./useAutoPersist";
import { CartItem } from "../types"; // dùng khi đọc loadJSON<CartItem[]>

export const CART_KEY = "@bookstore/cart";
export const WISHLIST_KEY = "@bookstore/wishlist";

// Mở app → nạp dữ liệu đã lưu; sau đó mọi thay đổi tự ghi lại. App.tsx chỉ hiện màn hình chính khi ready = true.
export function usePersistence() {
  const dispatch = useAppDispatch();
  const [ready, setReady] = useState(false);
  const user = useAppSelector((s) => s.auth.user);
  const token = useAppSelector((s) => s.auth.token);
  const cartItems = useAppSelector((s) => s.cart.items);
  const wishlistIds = useAppSelector((s) => s.wishlist.ids);

  useEffect(() => {
    (async () => {
      // TODO BT8.3 (auto-login): const auth = await loadAuth(); nếu có token + user → dispatch(setCredentials(auth))
      const [auth, cart, wish] = await Promise.all([
        loadAuth(),
        loadJSON<CartItem[]>(CART_KEY),        // ➕ THÊM MỚI (Bài 8.7b)
        loadJSON<number[]>(WISHLIST_KEY),      // ➕ THÊM MỚI (Bài 8.7b)
      ]);
      if (auth?.token && auth.user) 
        dispatch(setCredentials(auth));
      // TODO BT8.7b (giỏ hàng + yêu thích): đọc loadJSON<CartItem[]>(CART_KEY) và loadJSON<number[]>(WISHLIST_KEY)
      //   rồi dispatch(hydrateCart(...)) / dispatch(hydrateWishlist(...)). Gợi ý: dùng Promise.all để đọc 3 thứ song song.
      if (cart)
        dispatch(hydrateCart(cart));
      if (wish)
        dispatch(hydrateWishlist(wish));
      setReady(true);
    })();
  }, [dispatch]);

  useAutoPersist(CART_KEY, cartItems, ready);
  useAutoPersist(WISHLIST_KEY, wishlistIds, ready);

  useEffect(() => {
    if (!ready) return;
    // TODO BT8.3: có user + token → saveAuth({ user, token }); ngược lại (đã đăng xuất) → clearAuth()
    if (!ready) return;
    if (user && token) saveAuth({user, token});
    else clearAuth();
  }, [ready, user, token]);

  // TODO BT8.7b: gọi useAutoPersist(CART_KEY, cartItems, ready) và useAutoPersist(WISHLIST_KEY, wishlistIds, ready)

  return ready;
}
