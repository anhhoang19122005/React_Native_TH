import { normalizePhone, PHONES } from '../data/phones';
import type { Phone } from '../types';

// Có thể đặt EXPO_PUBLIC_PHONES_API_URL trong file .env để gọi API thật.
// Ví dụ: EXPO_PUBLIC_PHONES_API_URL=https://<project-id>.mockapi.io/phones
const API_URL = process.env.EXPO_PUBLIC_PHONES_API_URL;

export async function fetchPhones(): Promise<Phone[]> {
  // Khi chưa cấu hình API, trả dữ liệu mẫu để project vẫn chạy được.
  if (!API_URL) {
    await new Promise((resolve) => setTimeout(resolve, 700)); // giả lập độ trễ mạng
    return PHONES;
  }

  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error(`Máy chủ trả về lỗi HTTP ${response.status}`);
  }

  const payload: unknown = await response.json();
  if (!Array.isArray(payload)) {
    throw new Error('API cần trả về một mảng các điện thoại.');
  }
  return payload.map((item, index) => normalizePhone(item as Partial<Phone>, index));
}