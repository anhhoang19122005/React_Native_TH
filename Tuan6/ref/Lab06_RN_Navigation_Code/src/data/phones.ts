import type { ImageSourcePropType } from 'react-native';
import type { ColorKey, Phone } from '../types';

// Dùng require tĩnh để Metro bundler đóng gói ảnh vào ứng dụng.
export const PHONE_COLORS: Record<ColorKey, { label: string; hex: string; image: ImageSourcePropType }> = {
  silver: { label: 'Bạc', hex: '#C9CDD2', image: require('../../assets/phones/silver.png') },
  red: { label: 'Đỏ', hex: '#D92332', image: require('../../assets/phones/red.png') },
  black: { label: 'Đen', hex: '#22252A', image: require('../../assets/phones/black.png') },
  blue: { label: 'Xanh', hex: '#2675D8', image: require('../../assets/phones/blue.png') },
};

// Dữ liệu mẫu dùng chung cho Bài 1, 3 và 4.
export const PHONES: Phone[] = [
  {
    id: '1', name: 'Vsmart Joy 4', price: 2490000, oldPrice: 2990000,
    rating: 4, reviewCount: 128, supplier: 'Vsmart', badge: 'Trả góp 0%',
    colors: ['silver', 'red', 'black', 'blue'], defaultColor: 'blue',
  },
  {
    id: '2', name: 'Vsmart Live 4', price: 3990000, oldPrice: 4490000,
    rating: 5, reviewCount: 236, supplier: 'Vsmart', badge: 'Giảm 500.000 đ',
    colors: ['silver', 'red', 'black', 'blue'], defaultColor: 'black',
  },
  {
    id: '3', name: 'Vsmart Aris', price: 5690000, oldPrice: 6490000,
    rating: 4, reviewCount: 92, supplier: 'Vsmart', badge: 'Giá tốt',
    colors: ['silver', 'red', 'black', 'blue'], defaultColor: 'silver',
  },
];

// Chuẩn hóa dữ liệu từ API vì API bên ngoài có thể thiếu một vài trường.
export function normalizePhone(raw: Partial<Phone>, index: number): Phone {
  const fallback = PHONES[index % PHONES.length];
  return {
    id: String(raw.id ?? fallback.id),
    name: raw.name ?? fallback.name,
    price: Number(raw.price ?? fallback.price),
    oldPrice: Number(raw.oldPrice ?? fallback.oldPrice),
    rating: Number(raw.rating ?? fallback.rating),
    reviewCount: Number(raw.reviewCount ?? fallback.reviewCount),
    supplier: raw.supplier ?? fallback.supplier,
    badge: raw.badge ?? fallback.badge,
    colors: raw.colors?.length ? raw.colors : fallback.colors,
    defaultColor: raw.defaultColor ?? fallback.defaultColor,
  };
}