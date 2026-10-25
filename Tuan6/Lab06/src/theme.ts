// Màu dùng chung để các màn hình có giao diện nhất quán.
export const colors = {
  red: '#D70018',
  dark: '#222222',
  text: '#333333',
  muted: '#777777',
  border: '#E4E4E4',
  background: '#F6F6F6',
  white: '#FFFFFF',
  green: '#198754',
  blue: '#2878D0',
};

// Chuyển số 3990000 thành chuỗi dễ đọc: 3.990.000 đ.
export function formatPrice(value: number): string {
  return `${Math.round(value).toLocaleString('vi-VN')} đ`;
}