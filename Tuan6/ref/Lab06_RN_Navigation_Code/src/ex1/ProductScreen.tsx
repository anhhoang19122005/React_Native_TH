import React from 'react';
import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { Phone } from '../types';
import { PHONE_COLORS } from '../data/phones';
import { colors, formatPrice } from '../../theme';
import { Stars } from '../components/Stars';
import type { SelectPhoneParamList } from './SelectPhoneApp';

type Props = NativeStackScreenProps<SelectPhoneParamList, 'Product'> & { phone: Phone };

// Màn hình sản phẩm: đọc màu đã chọn từ route params, nếu chưa có thì dùng màu mặc định.
export function ProductScreen({ navigation, route, phone }: Props) {
  const selectedColor = route.params?.color ?? phone.defaultColor;
  const colorInfo = PHONE_COLORS[selectedColor];

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.imageWrap}>
          <Image source={colorInfo.image} style={styles.image} resizeMode="contain" />
        </View>
        <Text style={styles.name}>{phone.name}</Text>
        <View style={styles.ratingRow}>
          <Stars value={phone.rating} />
          <Text style={styles.review}>(Xem {phone.reviewCount} đánh giá)</Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.price}>{formatPrice(phone.price)}</Text>
          <Text style={styles.oldPrice}>{formatPrice(phone.oldPrice)}</Text>
        </View>
        <Text style={styles.badge}>{phone.badge}</Text>
        <Text style={styles.supplier}>Nhà cung cấp: {phone.supplier}</Text>

        <Pressable style={styles.colorButton} onPress={() => navigation.navigate('ChooseColor', { color: selectedColor })}>
          <View style={styles.colorButtonTextWrap}>
            <Text style={styles.buttonTitle}>Màu: {colorInfo.label}</Text>
            <Text style={styles.buttonSub}>Nhấn để chọn màu khác</Text>
          </View>
          <Text style={styles.chevron}>›</Text>
        </Pressable>

        <Pressable style={styles.buyButton} onPress={() => alert(`Bạn đã chọn ${phone.name} màu ${colorInfo.label}.`)}>
          <Text style={styles.buyText}>CHỌN MUA</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.white },
  content: { padding: 18, paddingBottom: 30 },
  imageWrap: { height: 300, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FAFAFA', borderRadius: 14 },
  image: { width: '90%', height: '95%' },
  name: { fontSize: 23, fontWeight: '700', color: colors.text, marginTop: 18 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  review: { marginLeft: 8, color: colors.muted, fontSize: 12 },
  priceRow: { flexDirection: 'row', alignItems: 'center', marginTop: 14, gap: 12 },
  price: { fontSize: 22, fontWeight: '800', color: colors.red },
  oldPrice: { color: colors.muted, textDecorationLine: 'line-through' },
  badge: { alignSelf: 'flex-start', backgroundColor: '#FFF0F0', color: colors.red, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 6, marginTop: 10, fontWeight: '600' },
  supplier: { marginTop: 12, color: colors.muted },
  colorButton: { marginTop: 22, borderWidth: 1, borderColor: colors.border, borderRadius: 10, padding: 14, flexDirection: 'row', alignItems: 'center' },
  colorButtonTextWrap: { flex: 1 },
  buttonTitle: { fontWeight: '700', color: colors.text },
  buttonSub: { marginTop: 4, color: colors.muted, fontSize: 12 },
  chevron: { fontSize: 28, color: colors.muted },
  buyButton: { marginTop: 18, backgroundColor: colors.red, borderRadius: 10, padding: 16, alignItems: 'center' },
  buyText: { color: colors.white, fontWeight: '800', fontSize: 16 },
});