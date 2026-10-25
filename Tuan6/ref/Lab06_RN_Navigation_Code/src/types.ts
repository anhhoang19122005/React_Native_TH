// Chỉ cho phép 4 khóa màu mà ứng dụng hỗ trợ.
export type ColorKey = 'silver' | 'red' | 'black' | 'blue';

// Kiểu dữ liệu chung của một điện thoại trong các bài thực hành.
export interface Phone {
  id: string;
  name: string;
  price: number;
  oldPrice: number;
  rating: number;
  reviewCount: number;
  supplier: string;
  badge: string;
  colors: ColorKey[];
  defaultColor: ColorKey;
}