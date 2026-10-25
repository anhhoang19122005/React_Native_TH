import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text } from 'react-native';
import { PHONES } from '../data/phone';
import { ProductRow } from '../components/ProductRow';
import type { TabProps } from './types';
import { useFavorites } from './FavoritesContext';
import { colors } from '../theme';

export function FavoritesTab({ navigation }: TabProps<'Favorites'>) {
  const { ids } = useFavorites();
  const favorites = PHONES.filter((phone) => ids.includes(phone.id));
  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.title}>Sản phẩm yêu thích</Text>
      <FlatList data={favorites} keyExtractor={(item) => item.id} contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.empty}>Chưa có sản phẩm nào được lưu.</Text>}
        renderItem={({ item }) => <ProductRow phone={item} onPress={() => navigation.navigate('ProductDetails', { id: item.id })} />} />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({ root: { flex: 1, backgroundColor: colors.background, padding: 16 }, title: { fontSize: 22, fontWeight: '800', marginBottom: 14, color: colors.text }, list: { paddingBottom: 20 }, empty: { textAlign: 'center', marginTop: 40, color: colors.muted } });