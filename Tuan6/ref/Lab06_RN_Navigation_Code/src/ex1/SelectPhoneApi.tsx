import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import type { Phone } from '../types';
import { fetchPhones } from '../api/phoneApi';
import { Loading } from '../components/Loading';
import { ErrorBox } from '../components/ErrorBox';
import { ProductRow } from '../components/ProductRow';
import { SelectPhoneApp } from './SelectPhoneApp';
import { colors } from '../../theme';

// Bài 2: minh họa useEffect + fetch + loading/error/retry trước khi mở màn sản phẩm.
export function SelectPhoneApi() {
  const [phones, setPhones] = useState<Phone[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPhone, setSelectedPhone] = useState<Phone | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchPhones();
      setPhones(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Đã xảy ra lỗi không xác định.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void load(); }, [load]);

  if (selectedPhone) return <SelectPhoneApp phone={selectedPhone} />;
  if (loading) return <Loading message="Đang tải danh sách điện thoại..." />;
  if (error) return <ErrorBox message={error} onRetry={() => void load()} />;

  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.title}>Bài 2 · Chọn điện thoại từ API</Text>
      <Text style={styles.help}>Chọn một sản phẩm để mở giao diện Select Phone.</Text>
      <View style={styles.list}>
        {phones.map((phone) => <ProductRow key={phone.id} phone={phone} onPress={() => setSelectedPhone(phone)} />)}
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background, padding: 16 },
  title: { fontSize: 20, fontWeight: '800', color: colors.text, marginBottom: 6 },
  help: { color: colors.muted, marginBottom: 14 },
  list: { flex: 1 },
});