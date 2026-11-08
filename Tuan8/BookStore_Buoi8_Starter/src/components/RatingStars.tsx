import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme";

interface Props {
  value: number; // 0–5 (có thể lẻ, làm tròn khi vẽ)
  size?: number;
  onChange?: (v: number) => void; // có truyền → cho phép bấm chọn sao
}

// TODO BT8.5a: component sao TÁI SỬ DỤNG
//   - vẽ 5 ngôi sao ★: sao <= Math.round(value) màu colors.warning, còn lại colors.line; cỡ chữ = size
//   - nếu có onChange: bọc mỗi sao trong Pressable, bấm sao n → onChange(n)
export function RatingStars({ value, size = 18, onChange }: Props) {
  const filled = Math.round(value);
  return (
    <View style={styles.row}>
      {[1,2,3,4,5].map((n) => {
        const color = n <= filled ? colors.warning : colors.line;
        if (!onChange) {
          return <Text key={n} style={{fontSize: size, color}}>★</Text>;
          
        }
        return (
          <Pressable key={n} onPress={() => onChange(n)} hitSlop={4} accessibilityLabel={`${n} sao`}>
            <Text style={{ fontSize: size, color }}>★</Text>
          </Pressable>
        )
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  todo: { borderWidth: 1.5, borderStyle: "dashed", borderColor: colors.warning, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 2, backgroundColor: "#FFFBEB" },
  todoText: { color: "#B45309", fontWeight: "700" },
  row: { flexDirection: "row", alignItems: "center", gap: 2 },
});
