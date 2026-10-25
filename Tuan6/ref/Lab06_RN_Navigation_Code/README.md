# Lab 06 — React Native Navigation (đầy đủ code)

Dự án minh họa 5 bài trong tài liệu Lab 06: Select Phone, API, Bottom Tab, Stack + Tab + Favorites, Drawer.

## 1. Yêu cầu

- Node.js LTS
- npm
- Expo Go trên điện thoại (hoặc Android Studio/iOS Simulator)

## 2. Cài đặt và chạy

```bash
npm install
npx expo install --fix
npm run typecheck
npx expo start
```

Quét QR bằng Expo Go. Nhấn `w` trong terminal nếu muốn thử web; một số hành vi native có thể khác trên web.

## 3. Cấu trúc

```text
Lab06_RN_Navigation_Code/
├── App.tsx                 # Menu chọn Bài 1–5
├── index.ts                # Đăng ký component gốc với Expo
├── package.json
├── assets/phones/          # 4 ảnh điện thoại minh họa
├── theme.ts                # Màu chung, formatPrice
└── src/
    ├── types.ts
    ├── data/phones.ts
    ├── api/phoneApi.ts
    ├── components/          # Stars, Loading, ErrorBox, ProductRow
    ├── ex1/                 # Bài 1 và Bài 2
    ├── ex3/                 # Bài 3: Bottom Tab
    ├── ex4/                 # Bài 4: Stack + Tab + Context yêu thích
    └── ex5/                 # Bài 5: Drawer
```

## 4. Bài 2 — cấu hình API thật (tùy chọn)

Mặc định `src/api/phoneApi.ts` dùng dữ liệu mẫu sau một khoảng chờ ngắn để project chạy được ngay và vẫn minh họa trạng thái loading.

Nếu bạn có endpoint MockAPI trả về một **mảng** JSON điện thoại, tạo file `.env` ở thư mục gốc:

```env
EXPO_PUBLIC_PHONES_API_URL=https://<project-id>.mockapi.io/phones
```

Mỗi phần tử có thể có các trường `id`, `name`, `price`, `oldPrice`, `rating`, `reviewCount`, `supplier`, `badge`, `colors`, `defaultColor`. Sau khi đổi `.env`, khởi động lại Expo bằng `npx expo start --clear`.

## 5. Ghi chú

- Các ảnh PNG là ảnh minh họa đơn giản được đóng gói trong project, không phải ảnh sản phẩm thương mại chính hãng.
- Bài 1 dùng `PHONES[1]` để hiển thị Vsmart Live 4. Bài 4 truyền `id` qua `route.params` và dùng Context chia sẻ danh sách yêu thích giữa hai tab.
- Nếu Expo báo lệch phiên bản package, chạy `npx expo install --fix` để đồng bộ theo SDK đang cài.
