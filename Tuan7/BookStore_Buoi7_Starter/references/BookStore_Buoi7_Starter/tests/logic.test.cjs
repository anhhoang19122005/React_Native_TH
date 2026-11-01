const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const ts = require("typescript");

// Chạy logic TypeScript thuần bằng Node, không cần runtime React Native.
require.extensions[".ts"] = (module, filename) => {
  const source = fs.readFileSync(filename, "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  });
  module._compile(outputText, filename);
};

const cart = require("../src/store/cartSlice.ts");
const auth = require("../src/store/authSlice.ts");
const wishlist = require("../src/store/wishlistSlice.ts");
const { normalize, filterBooks } = require("../src/utils/filters.ts");
const { books } = require("../db.json");
const book = books.find((item) => item.id === 3);
const item = { bookId: book.id, title: book.title, price: book.price, stock: book.stock, emoji: book.emoji, color: book.color };
const noFilter = { keyword: "", categoryId: null, priceRange: null };

test("cart: thêm trùng, giới hạn stock và giữ state gốc", () => {
  const initial = cart.default(undefined, { type: "init" });
  let state = initial;
  for (let i = 0; i < 10; i++) state = cart.default(state, cart.addItem(item));
  assert.equal(state.items.length, 1);
  assert.equal(state.items[0].quantity, 5);
  assert.equal(initial.items.length, 0);
  assert.equal(state.items.reduce((sum, row) => sum + row.price * row.quantity, 0), 1945000);
});

test("cart: không thêm sách hết hàng; quantity chặn ở 1..stock", () => {
  let state = cart.default(undefined, cart.addItem({ ...item, stock: 0 }));
  assert.equal(state.items.length, 0);
  state = cart.default(state, cart.addItem(item));
  state = cart.default(state, cart.setQuantity({ bookId: 3, quantity: -5 }));
  assert.equal(state.items[0].quantity, 1);
  state = cart.default(state, cart.setQuantity({ bookId: 3, quantity: 99 }));
  assert.equal(state.items[0].quantity, 5);
  assert.equal(cart.default(state, cart.removeItem(3)).items.length, 0);
  assert.equal(cart.default(state, cart.clearCart()).items.length, 0);
});

test("auth: đăng nhập, cập nhật và đăng xuất", () => {
  const user = { id: 1, name: "Demo", email: "demo@bookstore.vn" };
  let state = auth.default(undefined, auth.setCredentials({ user, token: "fake-token" }));
  assert.equal(!!state.user && !!state.token, true);
  state = auth.default(state, auth.updateUser({ name: "Học viên Demo" }));
  assert.equal(state.user.name, "Học viên Demo");
  assert.deepEqual(auth.default(state, auth.logout()), { user: null, token: null });
});

test("wishlist: bật/tắt không sinh id trùng", () => {
  const state = wishlist.default(undefined, wishlist.toggleWishlist(3));
  assert.deepEqual(state.ids, [3]);
  assert.deepEqual(wishlist.default(state, wishlist.toggleWishlist(3)).ids, []);
});

test("search: không dấu, chữ hoa, tên sách và tác giả", () => {
  assert.equal(normalize("  ĐẮC NHÂN TÂM  "), "dac nhan tam");
  assert.deepEqual(filterBooks(books, { ...noFilter, keyword: "nha gia" }).map((b) => b.id), [2]);
  assert.deepEqual(filterBooks(books, { ...noFilter, keyword: "DAC NHAN" }).map((b) => b.id), [4]);
  assert.ok(filterBooks(books, { ...noFilter, keyword: "Robert C. Martin" }).some((b) => b.id === 3));
  assert.equal(filterBooks(books, { ...noFilter, keyword: "xyz-no-book" }).length, 0);
  assert.equal(filterBooks(books, noFilter).length, 12);
});

test("filters: từ khoá AND danh mục AND giá; không đổi dữ liệu gốc", () => {
  const snapshot = JSON.stringify(books);
  const result = filterBooks(books, { keyword: "react", categoryId: 3, priceRange: "gt300" });
  assert.equal(result.length, 1);
  assert.equal(result[0].title, "React Native in Action");
  assert.equal(filterBooks(books, { keyword: "react", categoryId: 1, priceRange: null }).length, 0);
  assert.equal(JSON.stringify(books), snapshot);
});

test("price: mốc 100k, 300k bao gồm ở khoảng giữa", () => {
  const samples = [99999, 100000, 300000, 300001].map((price, id) => ({ ...book, id, price }));
  for (const [priceRange, expected] of [["lt100", [99999]], ["100to300", [100000, 300000]], ["gt300", [300001]]]) {
    assert.deepEqual(filterBooks(samples, { ...noFilter, priceRange }).map((b) => b.price), expected);
  }
});
