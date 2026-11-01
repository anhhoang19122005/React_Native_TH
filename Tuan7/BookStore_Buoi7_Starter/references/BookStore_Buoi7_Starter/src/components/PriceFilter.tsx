import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { PRICE_RANGES, PriceRange } from "../utils/filters";
import { colors, radius } from "../theme";

interface Props {
  value: PriceRange;
  onChange: (v: PriceRange) => void;
}

// THỬ THÁCH: 3 nút lọc khoảng giá (bấm lần nữa để bỏ chọn)
export function PriceFilter({ value, onChange }: Props) {
  // TODO BT7.C2: render 3 nút từ PRICE_RANGES (import từ utils/filters); nút đang chọn có nền cyan (colors.cyan)
  //   active = value === r.key · onPress = onChange(active ? null : r.key)   (mẫu: xem CategoryChips)
  return (
    <View style={styles.row}>
      {PRICE_RANGES.map((range) => {
        const active = value === range.key;
        return (
          <Pressable key={range.key} accessibilityRole="button" accessibilityState={{ selected: active }}
            onPress={() => onChange(active ? null : range.key)} style={[styles.btn, active && styles.active]}>
            <Text style={styles.text}>{range.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", flexWrap: "wrap", paddingHorizontal: 12, paddingBottom: 10, gap: 8 },
  btn: { minHeight: 44, justifyContent: "center", paddingHorizontal: 12, borderRadius: radius.pill, borderWidth: 1, borderColor: colors.cyan, backgroundColor: colors.card },
  active: { backgroundColor: colors.cyan },
  text: { color: colors.navy, fontWeight: "700", fontSize: 12 },
});
