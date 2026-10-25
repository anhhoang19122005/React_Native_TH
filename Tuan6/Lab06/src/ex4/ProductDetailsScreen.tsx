import React from 'react';
import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { RootProps } from './types';
import { PHONES, PHONE_COLORS } from '../data/phone';
import { useFavorites } from './FavoritesContext';
import { Stars } from '../components/Stars';
import { colors, formatPrice } from '../theme';

export function ProductDetailsScreen({ route }: RootProps<'ProductDetails'>) {
  const { id } = route.params; // id được truyền qua navigate('ProductDetails', { id }).
  const phone = PHONES.find((item) => item.id === id);
  const { has, toggle } = useFavorites();

  if (!phone) {
    return <SafeAreaView style={styles.center}><Text>Không tìm thấy sản phẩm #{id}</Text></SafeAreaView>;
  }
  const saved = has(phone.id);
  const image = PHONE_COLORS[phone.defaultColor].image;

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.imageWrap}><Image source={image} style={styles.image} resizeMode="contain" /></View>
        <Text style={styles.name}>{phone.name}</Text>
        <Stars value={phone.rating} />
        <Text style={styles.price}>{formatPrice(phone.price)}</Text>
        <Text style={styles.detail}>Nhà cung cấp: {phone.supplier}</Text>
        <Text style={styles.detail}>Đánh giá: {phone.reviewCount} lượt</Text>
        <Pressable onPress={() => toggle(phone.id)} style={[styles.favoriteButton, saved && styles.savedButton]}>
          <Text style={styles.favoriteText}>{saved ? '♥ Đã lưu yêu thích' : '♡ Lưu vào yêu thích'}</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.white }, content: { padding: 18 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  imageWrap: { height: 270, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FAFAFA', borderRadius: 14 },
  image: { width: '90%', height: '95%' }, name: { fontSize: 24, fontWeight: '800', color: colors.text, marginTop: 18, marginBottom: 8 },
  price: { fontSize: 22, fontWeight: '800', color: colors.red, marginTop: 12 }, detail: { color: colors.muted, marginTop: 8 },
  favoriteButton: { marginTop: 24, borderWidth: 1, borderColor: colors.red, padding: 14, borderRadius: 10, alignItems: 'center' },
  savedButton: { backgroundColor: colors.red }, favoriteText: { color: colors.red, fontWeight: '800' },
});