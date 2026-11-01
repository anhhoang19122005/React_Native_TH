# Trả lời câu hỏi bổ sung — Buổi 7

## 1. Cấu trúc điều hướng

`BookDetail` nằm ở Native Stack để phủ lên toàn bộ màn Tabs, ẩn thanh tab và tự có nút quay lại. Khi quay về, Home vẫn giữ vị trí cuộn và bộ lọc vì màn Tabs chưa bị gỡ. Nếu đặt Chi tiết vào Bottom Tab, nó sẽ thành một tab riêng, thanh tab vẫn xuất hiện và không tự có nút quay lại như Stack.

## 2. Redux và useMemo

Redux Toolkit dùng Immer: `state.items.push(...)` thực chất thay đổi một bản nháp, sau đó Immer tạo state mới mà không sửa state gốc. Bỏ `useMemo` thì tổng số lượng và tổng tiền vẫn đúng, nhưng phép `reduce` sẽ chạy lại mỗi lần component render. `useMemo` chỉ tối ưu việc tính toán theo `[items]`, không phải điều kiện để kết quả chính xác.

## 3. Promise.all

Home hiện dùng `Promise.all`, nên nếu `getCategories()` lỗi thì cả nhóm bị reject và Home hiển thị `ErrorView`, dù request sách thành công. Có thể chuyển sang `Promise.allSettled([getBooks(), getCategories()])`, kiểm tra `status` của từng kết quả rồi vẫn hiển thị sách nếu request sách fulfilled, đồng thời thông báo riêng rằng danh mục chưa tải được. Đánh đổi là phải quản lý lỗi/thử lại từng phần, chấp nhận giao diện thiếu chip danh mục và chờ mọi request kết thúc thay vì báo lỗi ngay khi một request thất bại.

## 4. Debounce

Nếu chỉ tạo `setTimeout` trong `onChangeText` mà không huỷ timer cũ, mỗi lần gõ vẫn tạo một lần lọc riêng: đó chỉ là trì hoãn, không phải debounce. `useEffect` với `[value, delay]` và cleanup huỷ timer trước khi đặt timer mới, nên chỉ lần gõ cuối được áp dụng sau 400 ms. Cleanup cũng huỷ timer khi component unmount, tránh callback cập nhật state sau khi màn đã bị gỡ.

## 5. Sắp xếp theo giá

Home có state `sort` và hai nút “Giá tăng dần / Giá giảm dần”; bấm lại nút đang chọn để trở về thứ tự API. Sắp xếp thực hiện sau lọc trong `visibleBooks`, trên bản sao để không thay đổi mảng gốc, và `sort` nằm trong dependencies của `useMemo`.

```tsx
const [sort, setSort] = useState<"asc" | "desc" | null>(null);
const visibleBooks = useMemo(() => {
  const filtered = filterBooks(books, {
    keyword: debouncedKeyword, categoryId, priceRange,
  });
  return sort === null ? filtered : [...filtered].sort((a, b) =>
    sort === "asc" ? a.price - b.price : b.price - a.price
  );
}, [books, debouncedKeyword, categoryId, priceRange, sort]);
```

Ảnh chạy thực tế được lưu tại `docs/ket-qua/` (khác với ảnh mẫu có sẵn trong `docs/ui/`).

## Thử thách C1 — Adapter wishlist

`BookDetailScreen` chỉ gọi `useWishlist().isFavorite()` và `toggle()`, không tự dispatch action hoặc đọc cấu trúc Redux. Nếu thay Redux bằng Zustand/Recoil mà giữ hợp đồng các hook `useCart`, `useAuth`, `useWishlist`, phần giao diện không phải sửa; thay đổi nằm ở tầng adapter/store.

## Lưu ý về TODO

Theo yêu cầu riêng, giữ nguyên các chữ/chú thích `TODO` trong mã nguồn, kể cả các thông báo lỗi TODO cũ đã chuyển thành comment. Các khung hướng dẫn `TodoBox` không còn được render trên các màn đã hoàn thành; component gốc vẫn được giữ lại để tham khảo.
