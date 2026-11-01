# Kết quả kiểm chứng

## Lệnh kiểm tra

- `npm run typecheck`: thành công.
- `npm test`: 7/7 bài test logic thành công (giỏ/tồn kho/state bất biến, tài khoản, wishlist, tìm kiếm, lọc AND, biên khoảng giá).
- `npm run api`: phục vụ `db.json`, 12 sách và 5 danh mục.
- Web Expo chạy trên cổng 8097 khi kiểm thử vì 8081 đã được sử dụng; lệnh mặc định trong README vẫn dùng bình thường trên máy có cổng trống.

## Kiểm thử giao diện

Chạy bằng Playwright trên Microsoft Edge headless, viewport 390 × 844, gọi trực tiếp API json-server local. Có 12 nhóm kịch bản thành công, không có lỗi JavaScript trang; chi tiết trong [kiem-thu.json](kiem-thu.json).

Kiểm tra lỗi/thử lại bằng cách chặn kết nối HTTP từ trình duyệt rồi bỏ chặn, tương đương lỗi kết nối ở phía ứng dụng; không phải kiểm thử bằng cách tắt tiến trình json-server. Chưa kiểm tra trên điện thoại thật, thiết bị iOS/Android, chế độ landscape hoặc font hệ thống lớn.

| Kết quả | Ảnh chạy thực tế |
|---|---|
| Home | [01-home.png](01-home.png) |
| Tìm kiếm không dấu | [02-tim-kiem.png](02-tim-kiem.png) |
| Không có kết quả | [03-khong-ket-qua.png](03-khong-ket-qua.png) |
| Chi tiết | [04-chi-tiet.png](04-chi-tiet.png) |
| Giỏ, giới hạn tồn kho và badge | [05-gio-hang-badge.png](05-gio-hang-badge.png) |
| Tài khoản đã đăng nhập | [06-tai-khoan.png](06-tai-khoan.png) |
| Thanh toán nhận total | [07-thanh-toan.png](07-thanh-toan.png) |
| Năm danh mục từ API | [08-danh-muc.png](08-danh-muc.png) |
| Lọc kết hợp | [09-loc-ket-hop.png](09-loc-ket-hop.png) |
| Giá tăng dần | [10-gia-tang-dan.png](10-gia-tang-dan.png) |
| Giá giảm dần | [11-gia-giam-dan.png](11-gia-giam-dan.png) |
| Lỗi kết nối và nút thử lại | [12-loi-api.png](12-loi-api.png) |

## Dependency

`npm install` báo 15 lỗ hổng trong cây dependency (2 low, 9 moderate, 4 high). Chưa chạy `npm audit fix --force` hoặc đổi bộ phiên bản Expo của starter vì có thể tạo thay đổi không tương thích ngoài phạm vi bài tập.
