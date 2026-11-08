Cờ ready – vẽ dòng thời gian render như ở Bài 8.3/8.7: render đầu giỏ rỗng → ghi [] đè dữ liệu cũ → đọc xong thì dữ liệu đã mất.
Token giả – mật khẩu nằm thô trong db.json và được so ở app; token tự tạo nên làm giả được. Thực tế: server so mật khẩu đã băm, cấp token có hạn (JWT…); app lưu bằng expo-secure-store (Keychain/Keystore).
Hai effect trong CartItemRow – bỏ effect đồng bộ thì khi store đổi từ nơi khác (nạp giỏ từ storage sau khi mở app, xóa rồi thêm lại sản phẩm, bấm "Thêm vào giỏ" lần nữa ở trang chi tiết) số trên nút giữ giá trị cũ.
Một nguồn state – mỗi nơi một useState → hai trái tim độc lập, bấm ở lưới vào chi tiết vẫn trắng. Store: một giá trị, mọi nơi cùng đọc.
Nút 👁 – state showPassword, secureTextEntry={!showPassword}, một Pressable đảo giá trị. (Code ở phần cuối.)