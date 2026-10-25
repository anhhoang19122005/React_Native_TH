import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import type { Phone } from '../types';
import { PHONE_COLORS } from '../data/phone';
import { colors, formatPrice } from '../theme';
import { Stars } from './Stars';

// Một dòng sản phẩm có thể tái sử dụng ở nhiều danh sách.
export function ProductRow({ phone, onPress }: { phone: Phone; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
      <Image source={PHONE_COLORS[phone.defaultColor].image} style={styles.image} resizeMode="contain" />
      <View style={styles.info}>
        <Text style={styles.name}>{phone.name}</Text>
        <Stars value={phone.rating} />
        <Text style={styles.price}>{formatPrice(phone.price)}</Text>
        <Text style={styles.supplier}>{phone.supplier}</Text>
      </View>
      <Text style={styles.chevron}>›</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white, padding: 12, marginBottom: 10, borderRadius: 12, borderWidth: 1, borderColor: colors.border },
  pressed: { opacity: 0.75 },
  image: { width: 76, height: 92 },
  info: { flex: 1, marginLeft: 12, gap: 3 },
  name: { fontSize: 16, fontWeight: '700', color: colors.text },
  price: { color: colors.red, fontWeight: '700', marginTop: 2 },
  supplier: { color: colors.muted, fontSize: 12 },
  chevron: { fontSize: 28, color: colors.muted, paddingHorizontal: 4 },
});