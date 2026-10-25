import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text } from 'react-native';
import { PHONES } from '../data/phones';
import { ProductRow } from '../components/ProductRow';
import type { TabProps } from './types';
import { colors } from '../../theme';

export function ProductsTab({ navigation }: TabProps<'Products'>) {
  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.title}>Danh sách sản phẩm</Text>
      <FlatList data={PHONES} keyExtractor={(item) => item.id} contentContainerStyle={styles.list}
        renderItem={({ item }) => <ProductRow phone={item} onPress={() => navigation.navigate('ProductDetails', { id: item.id })} />} />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({ root: { flex: 1, backgroundColor: colors.background, padding: 16 }, title: { fontSize: 22, fontWeight: '800', marginBottom: 14, color: colors.text }, list: { paddingBottom: 20 } });