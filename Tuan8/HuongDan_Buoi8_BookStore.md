# Hướng dẫn làm bài – Buổi 8: BookStore (Đăng nhập, Đánh giá, Giỏ hàng, Yêu thích)

> Cách dùng tài liệu này: với mỗi bài, đọc theo thứ tự **Lý thuyết → Ví dụ cơ bản → Cách tư duy**, rồi **tự code**.
> Cuối mỗi bài có mục **Code mẫu** đang thu gọn. Chỉ bấm mở khi bí hoặc khi đã làm xong và muốn đối chiếu.
> (Mục thu gọn hiển thị đúng trong VS Code Markdown Preview (`Ctrl+Shift+V`) và trên GitHub.)
>
> **Quy ước của phần Code mẫu:**
> - Code mẫu của bài nào **chỉ chứa code của bài đó**.
> - Nếu một bài sau phải bổ sung vào file đã làm ở bài trước, chỉ hiện phần bổ sung, và mỗi dòng mới / dòng bị đổi có comment đánh dấu:
>   - `// ➕ THÊM MỚI (Bài x)`: dòng thêm mới.
>   - `// ✏️ SỬA (Bài x)`: dòng có sẵn bị đổi (comment nói rõ trước đó là gì).

---

## Mục lục

0. [Chuẩn bị & bức tranh tổng thể](#0-chuẩn-bị--bức-tranh-tổng-thể)
   - [0.1 Chạy trên máy Node 18 / npm 9 (hạ version dependency)](#01-chạy-trên-máy-node-18--npm-9-hạ-version-dependency)
   - [0.2 Những chỗ trong starter dễ bỏ sót](#02-những-chỗ-trong-starter-dễ-bỏ-sót)
1. [Bài 8.1 – Màn Đăng nhập](#bài-81--màn-đăng-nhập)
2. [Bài 8.2 – Màn Đăng ký](#bài-82--màn-đăng-ký)
3. [Bài 8.3 – Giữ phiên đăng nhập](#bài-83--giữ-phiên-đăng-nhập-và-đăng-xuất)
4. [Bài 8.4 – Chặn Thanh toán](#bài-84--chặn-thanh-toán-khi-chưa-đăng-nhập)
5. [Bài 8.5 – Đánh giá & sao](#bài-85--đánh-giá-sách-và-xếp-hạng-sao)
6. [Bài 8.6 – Tăng/giảm số lượng](#bài-86--tănggiảm-số-lượng-trong-giỏ)
7. [Bài 8.7 – Xóa có xác nhận & lưu giỏ](#bài-87--xóa-có-xác-nhận-và-lưu-giỏ-hàng)
8. [Bài 8.8 – Yêu thích](#bài-88--nút-yêu-thích-và-màn-yêu-thích)
9. [Thử thách C1, C2](#thử-thách)
10. [Gợi ý câu hỏi bổ sung (TraLoi.md)](#câu-hỏi-bổ-sung)
11. [Phụ lục: 3 file hoàn chỉnh](#phụ-lục-3-file-hoàn-chỉnh-dùng-chung-cho-nhiều-bài)

---

## 0. Chuẩn bị & bức tranh tổng thể

```bash
cd BookStore_Buoi8_Starter
npm install
npm run api        # Terminal 1: json-server ở http://localhost:3000
npx expo start     # Terminal 2: nhấn w mở bản web (Expo Go: xem lưu ý ở mục 0.1)
npx tsc --noEmit   # kiểm tra kiểu trước khi nộp
```

- Tìm việc: `Ctrl+Shift+F` → `TODO BT8`.
- Tài khoản thử: `demo@bookstore.vn / 123456`.
- Điện thoại thật không gọi được API → `EXPO_PUBLIC_API_URL=http://<IP-máy>:3000 npx expo start -c`.

### Bản đồ dữ liệu của app

```
            ┌────────────── Redux store ──────────────┐
            │  auth: { user, token }                  │
 Screens ──▶│  cart: CartItem[]                       │◀── usePersistence (đọc khi mở app)
 (useAuth,  │  wishlist: number[] (id sách)           │──▶ useAutoPersist / saveAuth (ghi khi đổi)
 useCart,   └─────────────────────────────────────────┘          │
 useWishlist)                                                     ▼
      │                                                     AsyncStorage
      ▼
 services/ (authService, reviewService, bookService) ──▶ json-server (db.json)
```

Ba nguyên tắc xuyên suốt cả buổi:

1. **Validate trước, gọi API sau.** Không bao giờ gửi dữ liệu sai lên server.
2. **Một nguồn sự thật (single source of truth).** Dữ liệu dùng chung (user, giỏ, yêu thích) nằm trong store, component chỉ *đọc* và *gửi action*.
3. **Dữ liệu suy ra thì tính, không lưu.** Điểm trung bình, tổng tiền, danh sách sách yêu thích… đều *tính* từ dữ liệu gốc.

---

### 0.1 Chạy trên máy Node 18 / npm 9 (hạ version dependency)

Starter gốc dùng **Expo SDK 57 / React Native 0.86 / React 19**, và cần **Node 20 trở lên** (từ RN 0.81, React Native yêu cầu Node `>= 20.19.4`). Trên máy trường (Node 18, npm 9.6.7) sẽ lỗi lúc `npm install` hoặc `npx expo start`.

Cách xử lý: hạ xuống **Expo SDK 52** (React Native 0.76.9, React 18.3.1). Bộ version này mình đã chạy thử thật trên Node 18.18 + npm 9.6.7 (xem phần "Đã kiểm tra" bên dưới). Có thể SDK 53 (React Native 0.79) cũng chạy được trên Node 18.18+ vì package của nó khai báo `node >= 18`, nhưng mình **chưa thử**, nên khuyên dùng SDK 52 đã kiểm chứng.

**Bước 1: kiểm tra đúng bản Node.** Metro (bundler của Expo) cần **Node ≥ 18.18.0**. Nếu máy là `v18.17.x` trở xuống thì vẫn lỗi, phải nhờ phòng máy cập nhật lên 18.18+ (hoặc dùng `nvm`).

```bash
node -v   # cần v18.18.0 trở lên
npm -v    # 9.x được
```

**Bước 2: thay `package.json`** bằng bản dưới đây (chỉ khác phần `dependencies` / `devDependencies`, thêm `engines`):

```json
{
  "name": "bookstore-online",
  "version": "1.0.0",
  "private": true,
  "main": "index.ts",
  "scripts": {
    "start": "expo start",
    "start:clear": "expo start -c",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web",
    "api": "json-server --watch db.json --port 3000 --host 0.0.0.0",
    "typecheck": "tsc --noEmit"
  },
  "engines": { "node": ">=18.18.0" },
  "dependencies": {
    "@expo/metro-runtime": "~4.0.1",
    "@react-native-async-storage/async-storage": "1.23.1",
    "@react-navigation/bottom-tabs": "^7.21.0",
    "@react-navigation/native": "^7.5.1",
    "@react-navigation/native-stack": "^7.21.0",
    "@reduxjs/toolkit": "~2.5.0",
    "axios": "~1.7.9",
    "expo": "~52.0.49",
    "expo-asset": "~11.0.5",
    "expo-constants": "~17.0.8",
    "expo-font": "~13.0.4",
    "expo-status-bar": "~2.0.1",
    "query-string": "^7.1.3",
    "react": "18.3.1",
    "react-dom": "18.3.1",
    "react-native": "0.76.9",
    "react-native-safe-area-context": "4.12.0",
    "react-native-screens": "~4.4.0",
    "react-native-web": "~0.19.13",
    "react-redux": "~9.2.0"
  },
  "devDependencies": {
    "@types/react": "~18.3.12",
    "json-server": "0.17.4",
    "typescript": "~5.3.3"
  }
}
```

| Package | Starter gốc | Bản cho Node 18 | Lý do |
|---|---|---|---|
| `expo` | ~57.0.27 | **~52.0.49** | SDK 52 chạy được trên Node 18.18+ |
| `react-native` | 0.86.3 | **0.76.9** | RN ≥ 0.81 đòi Node 20.19+ |
| `react` / `react-dom` | 19.2.3 | **18.3.1** | SDK 52 đi kèm React 18 |
| `@types/react` | ~19.2.0 | **~18.3.12** | Khớp React 18 |
| `typescript` | ~5.9.2 | **~5.3.3** | Bản Expo 52 khuyên dùng |
| `@expo/metro-runtime` | ~57.0.0 | **~4.0.1** | Theo SDK 52 |
| `expo-asset` / `expo-constants` / `expo-font` / `expo-status-bar` | ~57.x | **~11.0.5 / ~17.0.8 / ~13.0.4 / ~2.0.1** | Theo SDK 52 |
| `@react-native-async-storage/async-storage` | 2.2.0 | **1.23.1** | Theo SDK 52 |
| `react-native-screens` | ~4.26.0 | **~4.4.0** | Theo SDK 52 |
| `react-native-safe-area-context` | ~5.7.0 | **4.12.0** | Theo SDK 52 |
| `react-native-web` | ~0.21.0 | **~0.19.13** | Theo SDK 52 |
| `@reduxjs/toolkit` / `react-redux` / `axios` | ^2.13 / ^9.3 / ^1.20 | ~2.5.0 / ~9.2.0 / ~1.7.9 | Khóa bản cũ hơn cho an toàn, vẫn hỗ trợ React 18 |
| `@react-navigation/*` | ^7.x | **giữ nguyên ^7.x** | Bản mới nhất vẫn hỗ trợ React ≥ 18.2. **Đừng** khóa bản 7.0/7.2 cũ: gói phụ `@react-navigation/elements` sẽ đòi `native ^7.5.1` và báo lỗi peer |
| `json-server`, `query-string` | giữ nguyên | giữ nguyên | Chạy được trên Node 18 |

**Bước 3: cài lại sạch.**

```bash
# Xóa bản cài cũ (PowerShell: Remove-Item -Recurse -Force node_modules, package-lock.json)
rm -rf node_modules package-lock.json
npm install
npx expo install --check   # phải báo "Dependencies are up to date"
npx tsc --noEmit           # phải không có lỗi
```

> Nếu `npm install` báo lỗi `ERESOLVE` về peer dependency: chạy `npm install --legacy-peer-deps`. Với bộ version trên thì không cần (đã kiểm tra `npm ls` không có lỗi).

**Đã kiểm tra:** với `package.json` trên, `npm install`, `npx expo install --check`, `npx tsc --noEmit` (cả starter lẫn toàn bộ code mẫu ở cuối file) và `npx expo export --platform web` đều chạy thành công; mọi package trong `node_modules` đều chấp nhận Node 18.18. Đã chạy lại với **đúng Node 18.18.0 + npm 9.6.7**: cài sạch từ đầu, `tsc` và build web đều thành công.

**Làm trên 2 máy (máy cá nhân Node mới + máy trường Node 18):** dùng **cùng một `package.json` SDK 52** ở cả hai máy. Code viết ở máy cá nhân sẽ chạy y hệt ở máy trường. Khi chép project sang máy kia **không chép `node_modules`**, chỉ chép mã nguồn + `package.json` + `package-lock.json`, rồi chạy `npm install` (hoặc `npm ci`) trên máy đó.

**⚠️ Lưu ý về Expo Go trên điện thoại:** app Expo Go tải từ CH Play / App Store chỉ hỗ trợ SDK mới nhất, nên **không mở được project SDK 52**. Lựa chọn:
- **Chạy bản web** (nhấn `w` sau `npx expo start`). Cách này đơn giản nhất ở phòng máy, và đủ để làm và kiểm tra toàn bộ bài.
- Android thật: tải Expo Go bản cho SDK 52 (file APK) ở trang `https://expo.dev/go`.
- Android Emulator: `npx expo start` rồi nhấn `a`, Expo CLI tự cài đúng bản Expo Go.
- iPhone: không cài được Expo Go bản cũ → dùng bản web.

---

### 0.2 Những chỗ trong starter dễ bỏ sót

Đề bài chỉ in phần TODO, nhưng trong file starter còn mấy chi tiết sau, nếu không sửa thì `tsc` báo lỗi hoặc tính năng không chạy:

| File | Chi tiết | Phải làm |
|---|---|---|
| Mọi file có `<TodoBox>` | Còn dòng `import { TodoBox } …` | Xóa thẻ `<TodoBox>` **và** dòng import |
| `CheckoutScreen.tsx` | Hàm chỉ nhận `{ route }`, chưa có `navigation`; chưa import `useEffect`, `useAuth` | Đổi thành `{ navigation, route }`, thêm import |
| `CartScreen.tsx` | Chỉ import `useCart` | Thêm `useAuth` vào import từ `../store/hooks` |
| `CartItemRow.tsx` | Hàm chỉ nhận `{ item, onRemove }`, có sẵn `x{item.quantity}` và ô TODO tĩnh | Thêm `onChangeQty`; xóa `<Text>x{…}</Text>` và `<View style={styles.todo}>` |
| `RatingStars.tsx` | Chưa nhận `onChange`, chưa import `Pressable`, style chỉ có `todo` | Thêm `onChange`, `Pressable`, style `row` |
| `HeartButton.tsx` | Chưa nhận `bookId` | Thêm `bookId`, **giữ nguyên `styles.btn`** (nó có `position: "absolute"` để tim nằm góc ảnh bìa) |
| `WishlistScreen.tsx` | Tham số là `_props` | Đổi thành `{ navigation }`; import `useState, useEffect, useMemo, useCallback`, `Book` |
| `BookDetailScreen.tsx` | Chưa import `useMemo` | Thêm vào import từ `"react"` |
| `BookDetailScreen.tsx` | Giao diện sao, điểm TB, form đánh giá, hàng "Sách liên quan" **đã có sẵn** | Chỉ cần viết logic (`average`, `submitReview`, `setRelated`) |
| `FormField.tsx` | Đã có sẵn `autoCapitalize="none"` | Không cần truyền thêm |
| `theme/index.ts` | Đã có `formatPrice`, `colors.success`, `colors.danger`, `colors.heart`, `colors.warning` | Dùng luôn |

---

## Bài 8.1 – Màn Đăng nhập

### Lý thuyết

**Controlled input.** Trong React Native, `TextInput` (ở đây là `FormField`) được "điều khiển" bởi state:

```tsx
const [email, setEmail] = useState("");
<TextInput value={email} onChangeText={setEmail} />
```

Giá trị trên màn hình luôn = state. Muốn đọc dữ liệu form → đọc state.

**Validator trả về `string | null`.** Quy ước của project: hàm kiểm tra trả về *câu báo lỗi* nếu sai, `null` nếu đúng. Nhờ vậy kết quả có thể đưa thẳng vào prop `error` của `FormField`.

**Async + loading.** Gọi API mất thời gian; trong lúc chờ bật `loading = true` để nút hiện vòng xoay và không bấm được lần hai. Dùng `try / catch / finally` để chắc chắn `loading` luôn được tắt dù thành công hay lỗi.

**Hai loại lỗi:**
| Loại | Ví dụ | Hiển thị ở đâu |
|---|---|---|
| Lỗi từng ô (client) | "Vui lòng nhập email" | Dưới ô đó (`errors.email`) |
| Lỗi chung (server) | "Email hoặc mật khẩu không đúng" | Một dòng đỏ trên nút (`submitError`) |

### Ví dụ cơ bản

Một form 1 ô, không liên quan bài, chỉ để thấy khuôn:

```tsx
function NameForm() {
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const submit = () => {
    const err = name.trim() ? null : "Vui lòng nhập tên";
    setError(err);
    if (err) return;           // còn lỗi → dừng
    alert(`Xin chào ${name}`); // hợp lệ → làm việc chính
  };

  return (
    <>
      <TextInput value={name} onChangeText={setName} />
      {error && <Text style={{ color: "red" }}>{error}</Text>}
      <Button title="Gửi" onPress={submit} />
    </>
  );
}
```

### Cách tư duy

Trước khi gõ code, tự trả lời 4 câu:

1. **Màn hình cần nhớ những gì?** → email, password, lỗi từng ô, lỗi chung, đang loading hay không ⇒ 5 state.
2. **Bấm nút thì xảy ra gì, theo thứ tự nào?**
   validate → (sai thì dừng) → bật loading → gọi `login()` → `signIn()` vào store → điều hướng → (lỗi thì hiện `submitError`) → tắt loading.
3. **Đăng nhập xong đi đâu?** Phụ thuộc vào ai gọi màn này: nếu có `route.params.redirectTo === "Checkout"` thì `replace` sang Checkout (Bài 8.4 sẽ dùng), không thì về Home.
4. **Vì sao lưu `errors` trong một object?** Để một lần `setErrors(e)` cập nhật tất cả ô, và ô nào hết lỗi thì tự mất dòng đỏ.

> ⚠️ Nhớ gọi `setErrors(e)` **trước** `return` — nếu không, lỗi không hiện lên.

**Tự kiểm tra:** bỏ trống → 2 dòng lỗi; `abc`/`123` → sai định dạng + mật khẩu ngắn; đúng email sai mật khẩu → dòng đỏ chung; đúng hết → về Home.

### Code mẫu

<details>
<summary><b>Bấm để xem code mẫu Bài 8.1</b> (tự làm trước rồi mới mở)</summary>

**`src/screens/LoginScreen.tsx`: cả file (chép đè được)**

```tsx
import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { FormField } from "../components/FormField";
import { PrimaryButton } from "../components/PrimaryButton";
import { login } from "../services/authService"; // đã viết sẵn: login(email, password) → { user, token }
import { getErrorMessage } from "../api/client";
import { useAuth } from "../store/hooks";
import { validateEmail, validatePassword } from "../utils/validators"; // đã viết sẵn: trả về chuỗi lỗi hoặc null
import { RootScreenProps } from "../navigation/types";
import { colors } from "../theme";

export function LoginScreen({ navigation, route }: RootScreenProps<"Login">) {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string | null; password?: string | null }>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    const e = { email: validateEmail(email), password: validatePassword(password) };
    setErrors(e);
    if (e.email || e.password) return;

    setLoading(true);
    setSubmitError(null);
    try {
      const { user, token } = await login(email.trim(), password);
      signIn(user, token);
      if (route.params?.redirectTo === "Checkout") {
        navigation.replace("Checkout", { total: route.params.total ?? 0 });
      } else {
        navigation.navigate("Tabs", { screen: "Home" });
      }
    } catch (err) {
      setSubmitError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.logo}>📚</Text>
        <Text style={styles.title}>Đăng nhập BookStore</Text>

        <FormField label="Email" value={email} onChangeText={setEmail} error={errors.email} keyboardType="email-address" />
        <FormField label="Mật khẩu" value={password} onChangeText={setPassword} error={errors.password} secureTextEntry />
        {submitError ? <Text style={styles.submitError}>{submitError}</Text> : null}
        <PrimaryButton title="Đăng nhập" onPress={submit} loading={loading} />

        <Pressable onPress={() => navigation.replace("Register", route.params)}>
          <Text style={styles.link}>Chưa có tài khoản? Đăng ký</Text>
        </Pressable>
        <View style={styles.hint}>
          <Text style={styles.hintText}>Tài khoản demo: demo@bookstore.vn / 123456</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 20, gap: 14 },
  logo: { fontSize: 56, textAlign: "center" },
  title: { fontSize: 22, fontWeight: "800", color: colors.navy, textAlign: "center", marginBottom: 6 },
  submitError: { color: colors.danger, textAlign: "center" },
  link: { color: colors.indigo, fontWeight: "700", textAlign: "center" },
  hint: { backgroundColor: "#E0F2FE", padding: 10, borderRadius: 10 },
  hintText: { color: colors.navy, textAlign: "center", fontSize: 12 },
});
```

</details>

---

## Bài 8.2 – Màn Đăng ký

### Lý thuyết

Giống 8.1, chỉ khác:
- 4 ô → `errors` kiểu `Record<string, string | null>`.
- Có **luật phụ thuộc giữa hai ô**: `confirm` phải bằng `password`. Luật này không có trong `validators.ts` → tự viết inline.
- `validateRequired("họ tên")` là **hàm trả về hàm** (currying): `validateRequired("họ tên")(name)`.

### Ví dụ cơ bản

```ts
// Hàm trả về hàm
const required = (label: string) => (v: string) => (v.trim() ? null : `Vui lòng nhập ${label}`);

required("họ tên")("");      // "Vui lòng nhập họ tên"
required("họ tên")("An");    // null

// Kiểm tra "có lỗi nào không" trên một object
const e = { a: null, b: "Sai", c: null };
Object.values(e).some(Boolean); // true
```

### Cách tư duy

- Copy khuôn 8.1, rồi chỉ thay **phần dữ liệu** (thêm `name`, `confirm`) và **phần luật**.
- Câu hỏi: "Nếu người dùng gõ confirm trước rồi sửa password thì sao?" → vì ta validate lúc bấm nút (không phải lúc gõ), luật luôn so hai giá trị mới nhất ⇒ không cần xử lý thêm.
- Đăng ký xong `register()` trả `{ user, token }` giống `login()` ⇒ gọi `signIn()` là "tự đăng nhập".

### Code mẫu

<details>
<summary><b>Bấm để xem code mẫu Bài 8.2</b> (tự làm trước rồi mới mở)</summary>

**`src/screens/RegisterScreen.tsx`: cả file (chép đè được)**

```tsx
import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text } from "react-native";
import { FormField } from "../components/FormField";
import { PrimaryButton } from "../components/PrimaryButton";
import { register } from "../services/authService"; // đã viết sẵn: register(name, email, password)
import { getErrorMessage } from "../api/client";
import { useAuth } from "../store/hooks";
import { validateEmail, validatePassword, validateRequired } from "../utils/validators";
import { RootScreenProps } from "../navigation/types";
import { colors } from "../theme";

export function RegisterScreen({ navigation, route }: RootScreenProps<"Register">) {
  const { signIn } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    const e = {
      name: validateRequired("họ tên")(name),
      email: validateEmail(email),
      password: validatePassword(password),
      confirm: confirm === password ? null : "Mật khẩu nhập lại không khớp",
    };
    setErrors(e);
    if (Object.values(e).some(Boolean)) return;

    setLoading(true);
    setSubmitError(null);
    try {
      const { user, token } = await register(name.trim(), email.trim(), password);
      signIn(user, token);
      if (route.params?.redirectTo === "Checkout") {
        navigation.replace("Checkout", { total: route.params.total ?? 0 });
      } else {
        navigation.navigate("Tabs", { screen: "Home" });
      }
    } catch (err) {
      setSubmitError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Tạo tài khoản mới</Text>

        <FormField label="Họ tên" value={name} onChangeText={setName} error={errors.name} autoCapitalize="words" />
        <FormField label="Email" value={email} onChangeText={setEmail} error={errors.email} keyboardType="email-address" />
        <FormField label="Mật khẩu" value={password} onChangeText={setPassword} error={errors.password} secureTextEntry />
        <FormField label="Nhập lại mật khẩu" value={confirm} onChangeText={setConfirm} error={errors.confirm} secureTextEntry />
        {submitError ? <Text style={styles.submitError}>{submitError}</Text> : null}
        <PrimaryButton title="Đăng ký" onPress={submit} loading={loading} />

        <Pressable onPress={() => navigation.replace("Login", route.params)}>
          <Text style={styles.link}>Đã có tài khoản? Đăng nhập</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 20, gap: 14 },
  title: { fontSize: 22, fontWeight: "800", color: colors.navy, textAlign: "center", marginBottom: 6 },
  submitError: { color: colors.danger, textAlign: "center" },
  link: { color: colors.indigo, fontWeight: "700", textAlign: "center" },
});
```

</details>

---

## Bài 8.3 – Giữ phiên đăng nhập và đăng xuất

### Lý thuyết

**Redux store sống trong RAM** → tắt app / F5 là mất. Muốn giữ phải ghi xuống bộ nhớ máy.

**AsyncStorage** = kho key-value **bất đồng bộ**, chỉ lưu **chuỗi**:

```ts
await AsyncStorage.setItem("key", JSON.stringify(obj));
const obj = JSON.parse((await AsyncStorage.getItem("key")) ?? "null");
await AsyncStorage.removeItem("key");
```

Project bọc sẵn: `saveAuth / loadAuth / clearAuth`, `saveJSON / loadJSON`.

**`useEffect` có 2 vai trò ở đây:**

| Effect | Deps | Khi nào chạy | Việc |
|---|---|---|---|
| Đọc | `[dispatch]` | 1 lần khi mount | đọc storage → nạp vào store → `setReady(true)` |
| Ghi | `[ready, user, token]` | mỗi khi user/token đổi | có user → lưu; null → xóa |

**`useEffect` không nhận hàm async trực tiếp** → dùng IIFE: `useEffect(() => { (async () => { ... })(); }, [])`.

### Ví dụ cơ bản

Lưu một bộ đếm qua các lần mở app:

```tsx
function Counter() {
  const [count, setCount] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {                       // ĐỌC 1 lần
    (async () => {
      const saved = await AsyncStorage.getItem("count");
      if (saved) setCount(Number(saved));
      setReady(true);
    })();
  }, []);

  useEffect(() => {                       // GHI mỗi khi đổi
    if (!ready) return;                   // chưa đọc xong thì đừng ghi!
    AsyncStorage.setItem("count", String(count));
  }, [count, ready]);

  return <Button title={`${count}`} onPress={() => setCount((c) => c + 1)} />;
}
```

### Cách tư duy

Vẽ dòng thời gian khi mở app:

```
render 1: user = null, ready = false   → hiện "Đang khởi động…"
          effect ĐỌC bắt đầu (async)
          effect GHI: ready=false → bỏ qua   ✅ (nếu không chặn, clearAuth() sẽ XÓA phiên cũ!)
...đọc xong: dispatch(setCredentials) → user có giá trị; setReady(true)
render 2: ready = true → hiện app; effect GHI: có user → saveAuth (ghi lại, vô hại)
```

Đăng xuất: `signOut()` → user/token = null → effect GHI chạy → `clearAuth()`. Bạn **không cần** sửa nút Đăng xuất.

**Tự kiểm tra (web):** DevTools → Application → Local Storage → khóa `@bookstore/auth` xuất hiện/biến mất.

### Code mẫu

<details>
<summary><b>Bấm để xem code mẫu Bài 8.3</b> (tự làm trước rồi mới mở)</summary>

> File này còn được bổ sung ở Bài 8.7. Bản hoàn chỉnh của nó nằm ở **Phụ lục** cuối tài liệu.

**`src/hooks/usePersistence.ts`: phần của Bài 8.3**

```ts
// ...giữ nguyên các import và phần khai báo có sẵn

  useEffect(() => {
    (async () => {
      const auth = await loadAuth();                                   // BT8.3
      if (auth?.token && auth.user) dispatch(setCredentials(auth));
      // (đọc giỏ hàng + yêu thích: làm ở Bài 8.7)
      setReady(true);
    })();
  }, [dispatch]);

  useEffect(() => {
    if (!ready) return;
    if (user && token) saveAuth({ user, token });   // đang đăng nhập → lưu
    else clearAuth();                                // đã đăng xuất → xóa
  }, [ready, user, token]);
```

</details>

---

## Bài 8.4 – Chặn Thanh toán khi chưa đăng nhập

### Lý thuyết

**Truyền params khi điều hướng:**

```ts
navigation.navigate("Login", { redirectTo: "Checkout", total: 389000 });
// Màn Login đọc: route.params?.redirectTo, route.params?.total
```

**`navigate` vs `replace`:**

```
navigate:  Cart → Login → Checkout     (bấm ← từ Checkout quay về Login ❌ kỳ cục)
replace:   Cart → Checkout             (Login bị thay thế, ← về Cart ✅)
```

**Phòng thủ nhiều lớp (defense in depth):** chặn ở nút bấm là chưa đủ, vì có thể vào Checkout bằng đường khác (deep link, code điều hướng nhầm). Chính màn Checkout cũng phải tự kiểm tra.

### Ví dụ cơ bản

```tsx
// "Guard" đơn giản trong một màn hình
function SecretScreen({ navigation }) {
  const { isLoggedIn } = useAuth();
  useEffect(() => {
    if (!isLoggedIn) navigation.replace("Login");
  }, [isLoggedIn]);
  if (!isLoggedIn) return null;   // đừng render nội dung bí mật dù chỉ 1 frame
  return <Text>Nội dung bí mật</Text>;
}
```

### Cách tư duy

- Lớp 1 (`CartScreen.goCheckout`): rẽ nhánh theo `isLoggedIn`, nhớ gửi kèm `total` để quay lại không mất số tiền. Starter chỉ import `useCart`, nhớ import thêm `useAuth`.
- Lớp 2 (`CheckoutScreen`): `useEffect` + `return null`. Starter viết `CheckoutScreen({ route })`, phải đổi thành `({ navigation, route })` thì mới gọi được `navigation.replace`.
- Mảnh ghép cuối đã làm ở 8.1: Login đọc `redirectTo` và `replace("Checkout", { total })`.
- Vì sao điều hướng trong `useEffect` mà không gọi thẳng trong thân component? → Điều hướng là **side-effect**, gọi khi đang render sẽ gây cảnh báo/vòng lặp.

### Code mẫu

<details>
<summary><b>Bấm để xem code mẫu Bài 8.4</b> (tự làm trước rồi mới mở)</summary>

**`src/screens/CartScreen.tsx`: lớp chặn 1**

```tsx
// 1) import thêm useAuth
import { useAuth, useCart } from "../store/hooks";

// 2) trong CartScreen
const { isLoggedIn } = useAuth();

const goCheckout = () => {
  if (isLoggedIn) navigation.navigate("Checkout", { total: finalTotal });
  else navigation.navigate("Login", { redirectTo: "Checkout", total: finalTotal });
};
```

**`src/screens/CheckoutScreen.tsx`: lớp chặn 2, cả file (chép đè được)**

```tsx
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { RootScreenProps } from "../navigation/types";
import { useAuth } from "../store/hooks";
import { colors, formatPrice } from "../theme";

// KHUNG TỐI GIẢN: form địa chỉ + đặt hàng làm ở buổi sau.
export function CheckoutScreen({ navigation, route }: RootScreenProps<"Checkout">) {
  const { isLoggedIn } = useAuth();

  // Lớp bảo vệ thứ 2: vào Checkout bằng bất kỳ đường nào cũng phải đăng nhập
  useEffect(() => {
    if (!isLoggedIn) navigation.replace("Login", { redirectTo: "Checkout", total: route.params.total });
  }, [isLoggedIn, navigation, route.params.total]);

  if (!isLoggedIn) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tổng tiền cần thanh toán</Text>
      <Text style={styles.total}>{formatPrice(route.params.total)}</Text>
      <Text style={styles.note}>(Form địa chỉ & thanh toán sẽ làm ở buổi sau)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: colors.bg, gap: 8 },
  label: { color: colors.muted, fontSize: 15 },
  total: { fontSize: 32, fontWeight: "800", color: colors.indigo },
  note: { color: colors.muted, marginTop: 12 },
});
```

</details>

---

## Bài 8.5 – Đánh giá sách và xếp hạng sao

### Lý thuyết

**Component tái sử dụng bằng prop tùy chọn.** `RatingStars` có 2 chế độ:
- Chỉ có `value` → chỉ hiển thị.
- Có thêm `onChange` → mỗi sao là `Pressable`, bấm được.

Một component, ba chỗ dùng: điểm trung bình, từng review, form.

**`useMemo` cho giá trị suy ra:**

```ts
const average = useMemo(() => tinhTrungBinh(reviews), [reviews]);
```

Chỉ tính lại khi `reviews` đổi. Không cần state `average` riêng → không bao giờ bị lệch.

**Cập nhật state bất biến (immutable).** Thêm phần tử mới vào đầu mảng:

```ts
setReviews((prev) => [created, ...prev]);   // ✅ mảng mới
reviews.unshift(created);                    // ❌ sửa trực tiếp, React không thấy thay đổi
```

### Ví dụ cơ bản

```ts
const nums = [4, 5];
const avg = nums.length ? nums.reduce((s, n) => s + n, 0) / nums.length : 0; // 4.5

// Vẽ 5 phần tử từ 1..5
[1, 2, 3, 4, 5].map((n) => (n <= 3 ? "★" : "☆")).join(""); // "★★★☆☆"
```

### Cách tư duy

1. **RatingStars:** `filled = Math.round(value)`; sao thứ `n` vàng nếu `n <= filled`. Nếu có `onChange` thì bọc `Pressable` (nhớ `key` đặt ở phần tử ngoài cùng trong `map`).
2. **average:** chia cho 0 là `NaN` → phải xử lý mảng rỗng.
3. **submitReview:** lại là khuôn của 8.1: *validate → loading → gọi API → cập nhật state → catch → finally*.
4. Sau khi POST thành công, **không cần gọi lại API lấy danh sách**: server đã trả về review mới (có `id`) → chèn vào state, `average` tự tính lại nhờ `useMemo`.
5. Phần giao diện (`<RatingStars value={average} />`, dòng "4.5 (2 đánh giá)", form có `onChange={setRating}`) **đã có sẵn** trong `BookDetailScreen`. Bạn chỉ viết logic, và nhớ thêm `useMemo` vào dòng `import React, { … } from "react"`.

### Code mẫu

<details>
<summary><b>Bấm để xem code mẫu Bài 8.5</b> (tự làm trước rồi mới mở)</summary>

**`src/components/RatingStars.tsx` (BT8.5a): cả file (chép đè được)**

```tsx
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme";

interface Props {
  value: number; // 0–5 (có thể lẻ, làm tròn khi vẽ)
  size?: number;
  onChange?: (v: number) => void; // có truyền → cho phép bấm chọn sao
}

export function RatingStars({ value, size = 18, onChange }: Props) {
  const filled = Math.round(value);
  return (
    <View style={styles.row}>
      {[1, 2, 3, 4, 5].map((n) => {
        const color = n <= filled ? colors.warning : colors.line;
        if (!onChange) {
          return <Text key={n} style={{ fontSize: size, color }}>★</Text>;
        }
        return (
          <Pressable key={n} onPress={() => onChange(n)} hitSlop={4} accessibilityLabel={`${n} sao`}>
            <Text style={{ fontSize: size, color }}>★</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: 2 },
});
```

**`src/screens/BookDetailScreen.tsx` (BT8.5b + BT8.5c)**

```tsx
// 1) thêm useMemo vào import
import React, { useCallback, useEffect, useMemo, useState } from "react";

// 2) BT8.5b — thay dòng `const average = 0;`
const average = useMemo(
  () => (reviews.length ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0),
  [reviews]
);

// 3) BT8.5c
const submitReview = async () => {
  if (!user) return;
  if (rating === 0) return setFormError("Vui lòng chọn số sao");
  if (!comment.trim()) return setFormError("Vui lòng nhập bình luận");

  setFormError(null);
  setSending(true);
  try {
    const created = await addReview({ bookId, userId: user.id, userName: user.name, rating, comment: comment.trim() });
    setReviews((prev) => [created, ...prev]);
    setRating(0);
    setComment("");
  } catch (e) {
    setFormError(getErrorMessage(e));
  } finally {
    setSending(false);
  }
};

// Giao diện (sao, "4.5 (2 đánh giá)", form có onChange={setRating}) đã có sẵn — không cần sửa JSX.
```

</details>

---

## Bài 8.6 – Tăng/giảm số lượng trong giỏ

### Lý thuyết

**Debounce** = "đợi người dùng ngừng tay một khoảng rồi mới làm". Bấm `+` 10 lần nhanh → chỉ ghi store **1 lần**.

```
bấm: + + + + +         (dừng)
qty: 2 3 4 5 6          ──300ms──▶ debouncedQty = 6 → onChangeQty(id, 6)
```

**State cục bộ + đồng bộ hai chiều:**
- Cục bộ → store: `debouncedQty` đổi → `onChangeQty`.
- Store → cục bộ: `item.quantity` đổi từ nơi khác (nạp từ storage, thêm từ màn khác) → `setQty(item.quantity)`.

**Ràng buộc:** `1 ≤ qty ≤ item.stock`. Thay vì kiểm tra trong `onPress`, cho nút `disabled` khi chạm biên.

### Ví dụ cơ bản

`useDebounce` hoạt động thế nào (project có sẵn, chỉ để hiểu):

```ts
function useDebounce<T>(value: T, delay: number) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), delay);
    return () => clearTimeout(t);   // value đổi trước khi hết giờ → hủy hẹn giờ cũ
  }, [value, delay]);
  return v;
}
```

### Cách tư duy

- Vì sao không ghi store mỗi lần bấm? Mỗi lần ghi → cả giỏ re-render + `useAutoPersist` ghi AsyncStorage → tốn. Debounce gom lại.
- Vì sao cần state cục bộ? Nếu chỉ dùng store + debounce, con số trên nút sẽ "đứng hình" 300 ms → cảm giác lag.
- Điều kiện `debouncedQty !== item.quantity` tránh ghi thừa ở lần render đầu.
- `setQty((q) => q + 1)` (dạng hàm) an toàn hơn `setQty(qty + 1)` khi bấm rất nhanh.
- Starter viết `CartItemRow({ item, onRemove })`, **thiếu `onChangeQty`**, phải thêm vào. Xóa luôn `<Text style={styles.qty}>x{item.quantity}</Text>` và khối `<View style={styles.todo}>…</View>`, rồi import `useState`, `useEffect`, `useDebounce`.

### Code mẫu

<details>
<summary><b>Bấm để xem code mẫu Bài 8.6</b> (tự làm trước rồi mới mở)</summary>

**`src/components/CartItemRow.tsx`: cả file (chép đè được)**

```tsx
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { CartItem } from "../types";
import { useDebounce } from "../hooks/useDebounce";
import { colors, formatPrice, radius } from "../theme";

interface Props {
  item: CartItem;
  onChangeQty: (bookId: number, quantity: number) => void;
  onRemove: (bookId: number) => void;
}

export function CartItemRow({ item, onChangeQty, onRemove }: Props) {
  const [qty, setQty] = useState(item.quantity);
  const debouncedQty = useDebounce(qty, 300);

  // cục bộ → store, sau khi dừng bấm 300 ms
  useEffect(() => {
    if (debouncedQty !== item.quantity) onChangeQty(item.bookId, debouncedQty);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQty]);

  // store → cục bộ, khi số lượng đổi từ nơi khác
  useEffect(() => {
    setQty(item.quantity);
  }, [item.quantity]);

  const canDec = qty > 1;
  const canInc = qty < item.stock;

  return (
    <View style={styles.row}>
      <View style={[styles.cover, { backgroundColor: item.color }]}>
        <Text style={styles.emoji}>{item.emoji}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.price}>{formatPrice(item.price)}</Text>
        <View style={styles.stepper}>
          <Pressable
            disabled={!canDec}
            onPress={() => setQty((q) => Math.max(1, q - 1))}
            accessibilityLabel="Giảm"
            style={[styles.stepBtn, !canDec && styles.disabled]}
          >
            <Text style={styles.stepText}>−</Text>
          </Pressable>
          <Text style={styles.qty}>{qty}</Text>
          <Pressable
            disabled={!canInc}
            onPress={() => setQty((q) => Math.min(item.stock, q + 1))}
            accessibilityLabel="Tăng"
            style={[styles.stepBtn, !canInc && styles.disabled]}
          >
            <Text style={styles.stepText}>+</Text>
          </Pressable>
          <Text style={styles.stock}>Còn {item.stock}</Text>
        </View>
      </View>
      <Pressable onPress={() => onRemove(item.bookId)} hitSlop={8} accessibilityLabel="Xóa khỏi giỏ">
        <Text style={styles.trash}>🗑️</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", backgroundColor: colors.card, borderRadius: radius.md, padding: 10, marginHorizontal: 12, marginVertical: 5, gap: 10 },
  cover: { width: 54, height: 72, borderRadius: radius.sm, alignItems: "center", justifyContent: "center" },
  emoji: { fontSize: 26 },
  info: { flex: 1, gap: 2 },
  title: { fontWeight: "700", color: colors.text },
  price: { color: colors.indigo, fontWeight: "800" },
  stepper: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 4 },
  stepBtn: { width: 30, height: 30, borderRadius: radius.sm, borderWidth: 1, borderColor: colors.line, alignItems: "center", justifyContent: "center" },
  stepText: { fontSize: 18, fontWeight: "800", color: colors.navy },
  disabled: { opacity: 0.35 },
  qty: { minWidth: 24, textAlign: "center", fontWeight: "800", color: colors.navy, fontSize: 16 },
  stock: { color: colors.muted, fontSize: 12 },
  trash: { fontSize: 22 },
});
```

</details>

---

## Bài 8.7 – Xóa có xác nhận và lưu giỏ hàng

### Lý thuyết

**`Alert.alert` không chạy trên web** → dùng `confirmDialog(title, message, onConfirm)` trong `utils/dialog.ts` (bên trong tự chọn `Alert.alert` hay `window.confirm`).

**Custom hook** = gom logic lặp lại thành hàm `useXxx`. Giỏ hàng và yêu thích đều cần "đổi thì ghi" → viết 1 lần:

```ts
useAutoPersist(key, value, ready);
```

**`Promise.all`** chạy nhiều tác vụ async **song song**:

```ts
const [a, b, c] = await Promise.all([taskA(), taskB(), taskC()]);
// tổng thời gian ≈ tác vụ chậm nhất, thay vì cộng dồn
```

### Ví dụ cơ bản

```ts
// Custom hook tổng quát: ghi document.title mỗi khi đổi
function useDocumentTitle(title: string) {
  useEffect(() => { document.title = title; }, [title]);
}
```

### Cách tư duy

- **Cờ `ready` là mấu chốt.** Lần render đầu store giỏ = `[]`. Nếu ghi ngay → `[]` đè lên giỏ cũ trong máy **trước khi** hàm đọc kịp trả về ⇒ mở app luôn thấy giỏ trống.
- Vì vậy thứ tự trong `usePersistence` phải là: đọc xong + dispatch hết **rồi mới** `setReady(true)`.
- Xóa hết giỏ → mảng rỗng vẫn được ghi (đúng ý: lần sau mở vẫn trống).
- Với `confirmDialog`: tìm `item` theo `bookId` để hiển thị tên sách trong câu hỏi, thân thiện hơn.

### Code mẫu

<details>
<summary><b>Bấm để xem code mẫu Bài 8.7</b> (tự làm trước rồi mới mở)</summary>

**`src/screens/CartScreen.tsx` (BT8.7a): sửa hàm `askRemove`**

```tsx
// Hàm askRemove đã có sẵn trong starter (đang xóa ngay, không hỏi). Chỉ SỬA thân hàm:
const askRemove = (bookId: number) => {
  // ✏️ SỬA (Bài 8.7a): bỏ dòng `remove(bookId);`, thay bằng 2 dòng dưới
  const item = items.find((i) => i.bookId === bookId);                                          // ➕ THÊM MỚI (Bài 8.7a)
  confirmDialog("Xóa sản phẩm", `Xóa "${item?.title ?? "sản phẩm"}" khỏi giỏ hàng?`, () => remove(bookId)); // ➕ THÊM MỚI (Bài 8.7a)
};
// `confirmDialog` đã được import sẵn ở đầu file CartScreen.
```

**`src/hooks/useAutoPersist.ts` (BT8.7b): cả file (chép đè được)**

```ts
import { useEffect } from "react";
import { saveJSON } from "../storage/storage";

// HOOK CHUNG: mỗi khi `value` đổi (và đã nạp xong dữ liệu cũ) → tự ghi vào AsyncStorage.
// Dùng cho cart, wishlist… — không phải viết lại effect ở từng nơi.
export function useAutoPersist<T>(key: string, value: T, ready: boolean) {
  useEffect(() => {
    if (ready) saveJSON(key, value);
  }, [key, value, ready]);
}
```

**`src/hooks/usePersistence.ts` (BT8.7b): phần bổ sung vào file đã làm ở Bài 8.3**

```ts
  // Các dòng dưới nằm trong file đã làm ở Bài 8.3. Dòng nào có comment ➕ / ✏️ là phần Bài 8.7b thêm vào.

  useEffect(() => {
    (async () => {
      // ✏️ SỬA (Bài 8.7b): Bài 8.3 chỉ có `const auth = await loadAuth();`. Giờ đọc cả 3 thứ song song:
      const [auth, cart, wish] = await Promise.all([
        loadAuth(),
        loadJSON<CartItem[]>(CART_KEY),        // ➕ THÊM MỚI (Bài 8.7b)
        loadJSON<number[]>(WISHLIST_KEY),      // ➕ THÊM MỚI (Bài 8.7b)
      ]);
      if (auth?.token && auth.user) dispatch(setCredentials(auth));
      if (cart) dispatch(hydrateCart(cart));   // ➕ THÊM MỚI (Bài 8.7b)
      if (wish) dispatch(hydrateWishlist(wish)); // ➕ THÊM MỚI (Bài 8.7b)
      setReady(true);
    })();
  }, [dispatch]);

  // ...effect ghi/xóa phiên của Bài 8.3 giữ nguyên...

  useAutoPersist(CART_KEY, cartItems, ready);        // ➕ THÊM MỚI (Bài 8.7b), đặt ngay trước `return ready;`
  useAutoPersist(WISHLIST_KEY, wishlistIds, ready);  // ➕ THÊM MỚI (Bài 8.7b)
```

</details>

---

## Bài 8.8 – Nút yêu thích và màn Yêu thích

### Lý thuyết

**Single source of truth.** Store `wishlist` chỉ lưu **mảng id** (`number[]`). Mọi `HeartButton` (lưới, chi tiết, màn Yêu thích) đều đọc chung → luôn khớp.

**Không lưu bản sao dữ liệu.** Màn Yêu thích lấy toàn bộ sách từ API rồi **lọc theo id**:

```ts
const favorites = books.filter((b) => ids.includes(b.id));
```

Sách đổi giá trên server → màn Yêu thích tự đúng.

**Ba trạng thái của màn gọi API:** loading → error (có nút Thử lại) → data (có thể rỗng → empty state).

### Ví dụ cơ bản

```ts
const ids = [2, 5];
const books = [{ id: 1 }, { id: 2 }, { id: 5 }];
books.filter((b) => ids.includes(b.id)); // [{id:2},{id:5}]
```

### Cách tư duy

- `HeartButton` **không có** `useState` — mọi thứ lấy từ `useWishlist()`. Nếu bạn thấy mình gõ `useState(false)` cho tim là đang đi sai hướng.
- Giữ nguyên `styles.btn` có sẵn (`position: "absolute", top: 8, right: 8`): nhờ nó tim mới nằm ở góc trên bên phải ảnh bìa. Chỉ cần thêm `bookId` vào tham số, `onPress` và đổi màu/ký tự.
- `WishlistScreen`: mở `HomeScreen` ra xem khuôn loading/error, copy sang.
- Bỏ tim trong màn Yêu thích → `ids` đổi → `useMemo` tính lại `favorites` → cuốn sách biến mất, không cần tải lại API.
- `load` bọc trong `useCallback` để vừa dùng trong `useEffect`, vừa truyền cho `onRetry`.

### Code mẫu

<details>
<summary><b>Bấm để xem code mẫu Bài 8.8</b> (tự làm trước rồi mới mở)</summary>

**`src/components/HeartButton.tsx` (BT8.8a): cả file (chép đè được)**

```tsx
import React from "react";
import { Pressable, StyleSheet, Text, ViewStyle } from "react-native";
import { useWishlist } from "../store/hooks";
import { colors } from "../theme";

interface Props {
  bookId: number;
  size?: number;
  style?: ViewStyle;
}

export function HeartButton({ bookId, size = 34, style }: Props) {
  const { isFavorite, toggle } = useWishlist();
  const fav = isFavorite(bookId);

  return (
    <Pressable
      onPress={() => toggle(bookId)}
      hitSlop={6}
      accessibilityLabel={fav ? "Bỏ yêu thích" : "Yêu thích"}
      style={[styles.btn, { width: size, height: size, borderRadius: size / 2 }, style]}
    >
      <Text style={{ fontSize: size * 0.55, color: fav ? colors.heart : colors.muted }}>{fav ? "♥" : "♡"}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: { position: "absolute", top: 8, right: 8, backgroundColor: "rgba(255,255,255,0.92)", alignItems: "center", justifyContent: "center", zIndex: 2 },
});
```

**`src/screens/WishlistScreen.tsx` (BT8.8b): cả file (chép đè được)**

```tsx
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { BookGrid } from "../components/BookGrid"; // lưới 2 cột dùng lại
import { EmptyState } from "../components/EmptyState";
import { LoadingView } from "../components/LoadingView";
import { ErrorView } from "../components/ErrorView";
import { getBooks } from "../services/bookService";
import { getErrorMessage } from "../api/client";
import { useWishlist } from "../store/hooks";
import { RootScreenProps } from "../navigation/types";
import { Book } from "../types";
import { colors } from "../theme";

export function WishlistScreen({ navigation }: RootScreenProps<"Wishlist">) {
  const { ids } = useWishlist();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setBooks(await getBooks());
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const favorites = useMemo(() => books.filter((b) => ids.includes(b.id)), [books, ids]);

  if (loading) return <LoadingView />;
  if (error) return <ErrorView message={error} onRetry={load} />;

  return (
    <View style={styles.container}>
      <BookGrid
        data={favorites}
        bottomSpace={24}
        onPressBook={(b) => navigation.navigate("BookDetail", { bookId: b.id })}
        ListEmptyComponent={
          <EmptyState
            emoji="💔"
            title="Chưa có sách yêu thích"
            message="Nhấn ♡ trên mỗi cuốn sách để lưu lại ở đây."
            actionLabel="Khám phá sách"
            onAction={() => navigation.navigate("Tabs", { screen: "Home" })}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: colors.bg } });
```

</details>

---

## Thử thách

**C1 – Sách liên quan:** sau khi tải được sách `b`, gọi `getBooks({ categoryId: b.categoryId })`, lọc bỏ `b.id`, hiện bằng `FlatList horizontal`. Trong starter, state `related` và đoạn JSX `FlatList` **đã có sẵn**: bạn chỉ thêm 2 dòng vào `load()` và xóa `<TodoBox id="BT8.C1">`. Starter dùng `navigation.push` (không phải `navigate`) để mở **chồng** thêm một trang BookDetail — `navigate` tới cùng tên màn sẽ chỉ đổi params trang hiện tại.

**C2 – Mã giảm giá:** khai báo bảng mã ở client, tính `discount` và `finalTotal` từ `totalPrice` (giá trị suy ra → không lưu state riêng). `finalTotal` là thứ truyền sang Checkout trong `goCheckout`. Starter đã có dòng `const finalTotal = totalPrice;` và `goCheckout` dùng `finalTotal`, nên chỉ cần thêm `discount` vào công thức. Nhớ import `TextInput` từ `react-native`.

### Code mẫu

<details>
<summary><b>Bấm để xem code mẫu Thử thách C1, C2</b> (tự làm trước rồi mới mở)</summary>

**C1: `src/screens/BookDetailScreen.tsx`: phần bổ sung**

```tsx
// File BookDetailScreen.tsx đã có code của Bài 8.5. Thử thách C1 chỉ thêm 2 dòng vào load(),
// ngay sau `setReviews(r);`:
const sameCategory = await getBooks({ categoryId: b.categoryId });   // ➕ THÊM MỚI (Thử thách C1)
setRelated(sameCategory.filter((x) => x.id !== b.id));                // ➕ THÊM MỚI (Thử thách C1)

// Rồi xóa dòng <TodoBox id="BT8.C1">…</TodoBox> và dòng import TodoBox.
// State `related` và đoạn <FlatList horizontal …> (dùng navigation.push) đã có sẵn trong starter.
```

**C2: `src/screens/CartScreen.tsx`: phần bổ sung (logic)**

```tsx
// File CartScreen.tsx đã có code của Bài 8.4 và 8.7a. Thử thách C2 thêm / sửa các dòng sau.

import React, { useState } from "react";                                  // ✏️ SỬA (Thử thách C2): thêm useState
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";  // ✏️ SỬA (Thử thách C2): thêm TextInput
import { colors, formatPrice, radius } from "../theme";                    // ✏️ SỬA (Thử thách C2): thêm radius

// ➕ THÊM MỚI (Thử thách C2) — đặt ngoài component:
const COUPONS: Record<string, { label: string; discount: (subtotal: number) => number }> = {
  SALE10: { label: "Giảm 10%", discount: (s) => Math.round(s * 0.1) },
  GIAM50K: { label: "Giảm 50.000 đ", discount: (s) => Math.min(50000, s) },
};

// Trong CartScreen:
const [couponInput, setCouponInput] = useState("");                 // ➕ THÊM MỚI (Thử thách C2)
const [coupon, setCoupon] = useState<string | null>(null);          // ➕ THÊM MỚI (Thử thách C2)
const [couponMsg, setCouponMsg] = useState<string | null>(null);    // ➕ THÊM MỚI (Thử thách C2)
const discount = coupon ? COUPONS[coupon].discount(totalPrice) : 0; // ➕ THÊM MỚI (Thử thách C2)
const finalTotal = totalPrice - discount;   // ✏️ SỬA (Thử thách C2): trước đó là `const finalTotal = totalPrice;`
// goCheckout (Bài 8.4) đã dùng finalTotal nên Checkout tự nhận số tiền đã giảm.

// ➕ THÊM MỚI (Thử thách C2):
const applyCoupon = () => {
  const code = couponInput.trim().toUpperCase();
  if (COUPONS[code]) {
    setCoupon(code);
    setCouponMsg(`Đã áp dụng ${code}: ${COUPONS[code].label}`);
  } else {
    setCoupon(null);
    setCouponMsg("Mã giảm giá không hợp lệ");
  }
};
```

**C2: `src/screens/CartScreen.tsx`: phần bổ sung (giao diện trong footer)**

```tsx
{/* ✏️ SỬA (Thử thách C2): xóa <TodoBox id="BT8.C2"> trong footer, thay bằng khối dưới. */}
{/* ➕ THÊM MỚI (Thử thách C2) — ô nhập mã + nút Áp dụng */}
<View style={styles.couponRow}>
  <TextInput
    style={styles.couponInput}
    value={couponInput}
    onChangeText={setCouponInput}
    placeholder="Mã giảm giá"
    placeholderTextColor={colors.muted}
    autoCapitalize="characters"
  />
  <View style={{ width: 110 }}>
    <PrimaryButton title="Áp dụng" variant="outline" onPress={applyCoupon} />
  </View>
</View>
{couponMsg ? <Text style={{ color: coupon ? colors.success : colors.danger }}>{couponMsg}</Text> : null}

{/* Dòng "Tạm tính" đã có sẵn trong starter, giữ nguyên */}
<View style={styles.line}><Text style={styles.muted}>Tạm tính</Text><Text style={styles.value}>{formatPrice(totalPrice)}</Text></View>

{/* ➕ THÊM MỚI (Thử thách C2) — dòng Giảm giá, chỉ hiện khi có giảm */}
{discount > 0 && (
  <View style={styles.line}><Text style={styles.muted}>Giảm giá</Text><Text style={[styles.value, { color: colors.success }]}>-{formatPrice(discount)}</Text></View>
)}

{/* Dòng "Tổng cộng" đã dùng finalTotal, giữ nguyên */}

// ➕ THÊM MỚI (Thử thách C2) — thêm vào StyleSheet:
//   couponRow: { flexDirection: "row", gap: 8, alignItems: "center" },
//   couponInput: { flex: 1, borderWidth: 1, borderColor: colors.line, borderRadius: radius.md,
//                  paddingHorizontal: 12, paddingVertical: 10, color: colors.text },
```

</details>

---

## Câu hỏi bổ sung

Ghi vào `TraLoi.md`. Gợi ý hướng trả lời (hãy viết lại bằng lời của bạn):

1. **Cờ ready** – vẽ dòng thời gian render như ở Bài 8.3/8.7: render đầu giỏ rỗng → ghi `[]` đè dữ liệu cũ → đọc xong thì dữ liệu đã mất.
2. **Token giả** – mật khẩu nằm thô trong `db.json` và được so ở app; token tự tạo nên làm giả được. Thực tế: server so mật khẩu đã băm, cấp token có hạn (JWT…); app lưu bằng `expo-secure-store` (Keychain/Keystore).
3. **Hai effect trong CartItemRow** – bỏ effect đồng bộ thì khi store đổi từ nơi khác (nạp giỏ từ storage sau khi mở app, xóa rồi thêm lại sản phẩm, bấm "Thêm vào giỏ" lần nữa ở trang chi tiết) số trên nút giữ giá trị cũ.
4. **Một nguồn state** – mỗi nơi một `useState` → hai trái tim độc lập, bấm ở lưới vào chi tiết vẫn trắng. Store: một giá trị, mọi nơi cùng đọc.
5. **Nút 👁** – state `showPassword`, `secureTextEntry={!showPassword}`, một `Pressable` đảo giá trị. (Code ở phần cuối.)

### Code mẫu

<details>
<summary><b>Bấm để xem code mẫu câu 5 (nút 👁)</b> (tự làm trước rồi mới mở)</summary>

**`src/screens/LoginScreen.tsx`: chỉ phần bổ sung của câu hỏi 5**

```tsx
// File LoginScreen.tsx đã có code của Bài 8.1. Câu hỏi 5 thêm / sửa các dòng sau.

const [showPassword, setShowPassword] = useState(false);   // ➕ THÊM MỚI (câu hỏi 5)

{/* ✏️ SỬA (câu hỏi 5): ô Mật khẩu của Bài 8.1 được bọc trong <View>, và secureTextEntry đổi theo showPassword */}
<View>                                                                       // ➕ THÊM MỚI (câu hỏi 5)
  <FormField label="Mật khẩu" value={password} onChangeText={setPassword} error={errors.password}
    secureTextEntry={!showPassword} />                                      // ✏️ SỬA (câu hỏi 5): trước đó là `secureTextEntry`
  <Pressable                                                                  // ➕ THÊM MỚI (câu hỏi 5)
    onPress={() => setShowPassword((v) => !v)}
    hitSlop={8}
    accessibilityLabel={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
    style={styles.eye}
  >
    <Text style={{ fontSize: 18 }}>{showPassword ? "🙈" : "👁"}</Text>
  </Pressable>
</View>                                                                      // ➕ THÊM MỚI (câu hỏi 5)

// Thêm vào StyleSheet:
//   eye: { position: "absolute", right: 12, top: 30 },   ➕ THÊM MỚI (câu hỏi 5)
```

</details>

---

## Checklist nộp bài

- [ ] Không còn `<TodoBox />`, không còn `TODO BT8` (trừ thử thách bỏ qua)
- [ ] `npx tsc --noEmit` sạch
- [ ] Chạy đủ luồng: đăng ký, đăng nhập, thêm giỏ, tăng/giảm, xóa, thả tim, đánh giá, đăng xuất
- [ ] Tải lại app: phiên, giỏ, yêu thích còn nguyên
- [ ] Có `TraLoi.md` đủ 5 câu
- [ ] Nén dự án (bỏ `node_modules`) và nộp

### Lỗi thường gặp

| Triệu chứng | Nguyên nhân | Cách xử lý |
|---|---|---|
| Network Error trên điện thoại | `localhost` là chính điện thoại | `EXPO_PUBLIC_API_URL=http://<IP>:3000`, cùng Wi-Fi, mở cổng 3000 |
| Bấm Đăng nhập không phản ứng | Chưa nối `onPress={submit}` | Xem 8.1 |
| Tải lại là mất đăng nhập | Chưa làm 2 effect 8.3 | Xem 8.3 |
| Đăng nhập từ giỏ lại về Home | Quên `redirectTo` | Xem 8.1 bước 3 + 8.4 |
| Điểm TB luôn 0.0 | `average` còn là hằng `0` | Làm 8.5b |
| Sao không bấm được | Chưa bọc `Pressable` / chưa truyền `onChange={setRating}` | Làm 8.5a |
| Hộp thoại không hiện trên web | Dùng `Alert.alert` trực tiếp | Dùng `confirmDialog` |
| Mở lại app giỏ trống | Ghi khi `ready` còn false | Xem 8.7 |
| TS báo thiếu params khi navigate | Sai tên màn / thiếu params | Đối chiếu `navigation/types.ts` |
| `npm install` / `expo start` báo `Unsupported engine`, `SyntaxError`, hoặc đòi Node 20 | Starter gốc (SDK 57) cần Node 20+ | Dùng `package.json` SDK 52 ở mục 0.1 |
| Metro báo `requires Node >= 18.18` | Node 18 nhưng bản quá cũ | Cập nhật Node lên 18.18+ |
| Expo Go báo "Project is incompatible with this version of Expo Go" | Expo Go trên store chỉ hỗ trợ SDK mới nhất | Chạy bản web (`w`), hoặc cài Expo Go cho SDK 52 (mục 0.1) |
| `Cannot find name 'navigation'` ở Checkout | Starter chỉ destructure `{ route }` | Đổi thành `{ navigation, route }` |
| `onChangeQty` không bao giờ được gọi | Starter thiếu `onChangeQty` trong tham số `CartItemRow` | Thêm vào `({ item, onChangeQty, onRemove })` |

---

# Phụ lục: 3 file hoàn chỉnh (dùng chung cho nhiều bài)

Ba file dưới đây được sửa ở nhiều bài khác nhau. Đây là nội dung **sau khi làm xong tất cả bài và cả 2 thử thách**, dùng để đối chiếu lần cuối hoặc chép đè.

> Toàn bộ code mẫu trong tài liệu đã được kiểm tra: áp vào starter rồi chạy `npx tsc --noEmit` (không lỗi), không còn `TODO BT8`, và `npx expo export --platform web` build thành công, với Node 18.18 + npm 9.6.7 và bộ dependency SDK 52 ở mục 0.1.

<details>
<summary><b><code>src/hooks/usePersistence.ts</code> (Bài 8.3 + 8.7b)</b></summary>

```ts
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
      try {
        const [auth, cart, wish] = await Promise.all([
          loadAuth(),
          loadJSON<CartItem[]>(CART_KEY),
          loadJSON<number[]>(WISHLIST_KEY),
        ]);
        if (auth?.token && auth.user) dispatch(setCredentials(auth)); // BT8.3
        if (cart) dispatch(hydrateCart(cart)); // BT8.7b
        if (wish) dispatch(hydrateWishlist(wish)); // BT8.7b
      } finally {
        setReady(true); // đọc xong (hoặc lỗi) mới cho ghi
      }
    })();
  }, [dispatch]);

  useEffect(() => {
    if (!ready) return;
    if (user && token) saveAuth({ user, token });
    else clearAuth();
  }, [ready, user, token]);

  useAutoPersist(CART_KEY, cartItems, ready);
  useAutoPersist(WISHLIST_KEY, wishlistIds, ready);

  return ready;
}
```

</details>

<details>
<summary><b><code>src/screens/CartScreen.tsx</code> (Bài 8.4 + 8.7a + C2)</b></summary>

```tsx
import React, { useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { Header } from "../components/Header";
import { CartItemRow } from "../components/CartItemRow";
import { PrimaryButton } from "../components/PrimaryButton";

import { EmptyState } from "../components/EmptyState";
import { useAuth, useCart } from "../store/hooks";
import { confirmDialog } from "../utils/dialog"; // đã viết sẵn — dùng ở BT8.7a
import { TabScreenProps } from "../navigation/types";
import { colors, formatPrice, radius } from "../theme";

// BT8.C2: mã giảm giá cố định phía client
const COUPONS: Record<string, { label: string; discount: (subtotal: number) => number }> = {
  SALE10: { label: "Giảm 10%", discount: (s) => Math.round(s * 0.1) },
  GIAM50K: { label: "Giảm 50.000 đ", discount: (s) => Math.min(50000, s) },
};

export function CartScreen({ navigation }: TabScreenProps<"Cart">) {
  const { items, totalPrice, setQty, remove } = useCart();
  const { isLoggedIn } = useAuth();

  // BT8.C2
  const [couponInput, setCouponInput] = useState("");
  const [coupon, setCoupon] = useState<string | null>(null);
  const [couponMsg, setCouponMsg] = useState<string | null>(null);
  const discount = coupon ? COUPONS[coupon].discount(totalPrice) : 0;
  const finalTotal = totalPrice - discount;

  const applyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    if (COUPONS[code]) {
      setCoupon(code);
      setCouponMsg(`Đã áp dụng ${code}: ${COUPONS[code].label}`);
    } else {
      setCoupon(null);
      setCouponMsg("Mã giảm giá không hợp lệ");
    }
  };

  // BT8.7a
  const askRemove = (bookId: number) => {
    const item = items.find((i) => i.bookId === bookId);
    confirmDialog("Xóa sản phẩm", `Xóa "${item?.title ?? "sản phẩm"}" khỏi giỏ hàng?`, () => remove(bookId));
  };

  // BT8.4
  const goCheckout = () => {
    if (isLoggedIn) navigation.navigate("Checkout", { total: finalTotal });
    else navigation.navigate("Login", { redirectTo: "Checkout", total: finalTotal });
  };

  return (
    <View style={styles.container}>
      <Header title="🛒 Giỏ hàng" />
      <FlatList
        data={items}
        keyExtractor={(i) => String(i.bookId)}
        renderItem={({ item }) => <CartItemRow item={item} onChangeQty={setQty} onRemove={askRemove} />}
        contentContainerStyle={{ paddingVertical: 8, flexGrow: 1 }}
        ListEmptyComponent={
          <EmptyState emoji="🛒" title="Giỏ hàng trống" message="Hãy chọn vài cuốn sách yêu thích nhé." actionLabel="Khám phá sách" onAction={() => navigation.navigate("Home")} />
        }
      />
      {items.length > 0 && (
        <View style={styles.footer}>
          <View style={styles.couponRow}>
            <TextInput
              style={styles.couponInput}
              value={couponInput}
              onChangeText={setCouponInput}
              placeholder="Mã giảm giá"
              placeholderTextColor={colors.muted}
              autoCapitalize="characters"
            />
            <View style={{ width: 110 }}>
              <PrimaryButton title="Áp dụng" variant="outline" onPress={applyCoupon} />
            </View>
          </View>
          {couponMsg ? <Text style={{ color: coupon ? colors.success : colors.danger }}>{couponMsg}</Text> : null}
          <View style={styles.line}><Text style={styles.muted}>Tạm tính</Text><Text style={styles.value}>{formatPrice(totalPrice)}</Text></View>
          {discount > 0 && (
            <View style={styles.line}><Text style={styles.muted}>Giảm giá</Text><Text style={[styles.value, { color: colors.success }]}>-{formatPrice(discount)}</Text></View>
          )}
          <View style={styles.line}><Text style={styles.total}>Tổng cộng</Text><Text style={styles.total}>{formatPrice(finalTotal)}</Text></View>
          <PrimaryButton title="Thanh toán" onPress={goCheckout} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  footer: { backgroundColor: "#fff", padding: 14, gap: 8, borderTopWidth: 1, borderTopColor: colors.line },
  line: { flexDirection: "row", justifyContent: "space-between" },
  muted: { color: colors.muted },
  value: { fontWeight: "700", color: colors.text },
  total: { fontSize: 17, fontWeight: "800", color: colors.navy },
  couponRow: { flexDirection: "row", gap: 8, alignItems: "center" },
  couponInput: { flex: 1, borderWidth: 1, borderColor: colors.line, borderRadius: radius.md, paddingHorizontal: 12, paddingVertical: 10, color: colors.text },
});
```

</details>

<details>
<summary><b><code>src/screens/BookDetailScreen.tsx</code> (Bài 8.5 + C1)</b></summary>

```tsx
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { LoadingView } from "../components/LoadingView";
import { ErrorView } from "../components/ErrorView";
import { RatingStars } from "../components/RatingStars";
import { FormField } from "../components/FormField";
import { PrimaryButton } from "../components/PrimaryButton";
import { BookCard } from "../components/BookCard";
import { HeartButton } from "../components/HeartButton";
import { getBookById, getBooks } from "../services/bookService";
import { addReview, getReviews } from "../services/reviewService";
import { getErrorMessage } from "../api/client";
import { useAuth, useCart } from "../store/hooks";
import { RootScreenProps } from "../navigation/types";
import { Book, Review } from "../types";
import { colors, formatPrice, radius } from "../theme";

export function BookDetailScreen({ navigation, route }: RootScreenProps<"BookDetail">) {
  const { bookId } = route.params;
  const { add } = useCart();
  const { user, isLoggedIn } = useAuth();

  const [book, setBook] = useState<Book | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [related, setRelated] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // form đánh giá
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [b, r] = await Promise.all([getBookById(bookId), getReviews(bookId)]);
      setBook(b);
      setReviews(r);
      // BT8.C1: sách cùng danh mục, bỏ cuốn đang xem
      const sameCategory = await getBooks({ categoryId: b.categoryId });
      setRelated(sameCategory.filter((x) => x.id !== b.id));
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, [bookId]);
  useEffect(() => {
    load();
  }, [load]);

  // BT8.5b
  const average = useMemo(
    () => (reviews.length ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0),
    [reviews]
  );

  // BT8.5c
  const submitReview = async () => {
    if (!user) return;
    if (rating === 0) return setFormError("Vui lòng chọn số sao");
    if (!comment.trim()) return setFormError("Vui lòng nhập bình luận");

    setFormError(null);
    setSending(true);
    try {
      const created = await addReview({ bookId, userId: user.id, userName: user.name, rating, comment: comment.trim() });
      setReviews((prev) => [created, ...prev]);
      setRating(0);
      setComment("");
    } catch (e) {
      setFormError(getErrorMessage(e));
    } finally {
      setSending(false);
    }
  };

  if (loading) return <LoadingView />;
  if (error || !book) return <ErrorView message={error ?? "Không tìm thấy sách."} onRetry={load} />;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <View style={[styles.cover, { backgroundColor: book.color }]}>
        <Text style={styles.emoji}>{book.emoji}</Text>
        <HeartButton bookId={book.id} size={40} />
      </View>
      <Text style={styles.title}>{book.title}</Text>
      <Text style={styles.author}>{book.author}</Text>
      <View style={styles.ratingRow}>
        <RatingStars value={average} size={20} />
        <Text style={styles.ratingText}>
          {reviews.length ? `${average.toFixed(1)} (${reviews.length} đánh giá)` : "Chưa có đánh giá"}
        </Text>
      </View>
      <Text style={styles.price}>{formatPrice(book.price)}</Text>
      <Text style={styles.stock}>Còn {book.stock} cuốn</Text>
      <Text style={styles.desc}>{book.description}</Text>
      <PrimaryButton
        title="Thêm vào giỏ"
        onPress={() => add({ bookId: book.id, title: book.title, price: book.price, emoji: book.emoji, color: book.color, stock: book.stock })}
      />

      <Text style={styles.h}>Đánh giá của độc giả</Text>
      {isLoggedIn ? (
        <View style={styles.form}>
          <Text style={styles.formTitle}>Viết đánh giá của bạn</Text>
          <RatingStars value={rating} size={30} onChange={setRating} />
          <FormField label="Bình luận" value={comment} onChangeText={setComment} multiline placeholder="Cảm nhận của bạn về cuốn sách…" autoCapitalize="sentences" style={{ minHeight: 70, textAlignVertical: "top" }} />
          {formError ? <Text style={styles.formError}>{formError}</Text> : null}
          <PrimaryButton title="Gửi đánh giá" onPress={submitReview} loading={sending} />
        </View>
      ) : (
        <View style={styles.loginHint}>
          <Text style={styles.loginHintText}>Đăng nhập để viết đánh giá.</Text>
          <PrimaryButton title="Đăng nhập" variant="outline" onPress={() => navigation.navigate("Login")} />
        </View>
      )}
      {reviews.length === 0 ? (
        <Text style={styles.muted}>Hãy là người đầu tiên đánh giá cuốn sách này.</Text>
      ) : (
        reviews.map((r) => (
          <View key={r.id} style={styles.review}>
            <View style={styles.reviewHead}>
              <Text style={styles.reviewer}>{r.userName}</Text>
              <RatingStars value={r.rating} size={14} />
            </View>
            <Text style={styles.reviewBody}>{r.comment}</Text>
          </View>
        ))
      )}

      {related.length > 0 && (
        <>
          <Text style={styles.h}>Sách liên quan</Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={related}
            keyExtractor={(b) => String(b.id)}
            renderItem={({ item }) => (
              <View style={{ width: 150 }}>
                <BookCard book={item} onPress={(b) => navigation.push("BookDetail", { bookId: b.id })} />
              </View>
            )}
          />
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 16, gap: 8, paddingBottom: 40 },
  cover: { height: 220, borderRadius: radius.lg, alignItems: "center", justifyContent: "center" },
  emoji: { fontSize: 90 },
  title: { fontSize: 22, fontWeight: "800", color: colors.text, marginTop: 8 },
  author: { color: colors.muted, fontSize: 15 },
  ratingRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  ratingText: { color: colors.muted },
  price: { fontSize: 20, fontWeight: "800", color: colors.indigo },
  stock: { color: colors.muted },
  desc: { color: colors.text, lineHeight: 22, marginVertical: 4 },
  h: { fontSize: 18, fontWeight: "800", color: colors.navy, marginTop: 18 },
  form: { backgroundColor: "#fff", padding: 12, borderRadius: radius.md, gap: 10 },
  formTitle: { fontWeight: "800", color: colors.text },
  formError: { color: colors.danger },
  loginHint: { backgroundColor: "#fff", padding: 12, borderRadius: radius.md, gap: 8 },
  loginHintText: { color: colors.muted },
  muted: { color: colors.muted },
  review: { backgroundColor: "#fff", padding: 12, borderRadius: radius.md, gap: 4 },
  reviewHead: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  reviewer: { fontWeight: "800", color: colors.text },
  reviewBody: { color: colors.text },
});
```

</details>
