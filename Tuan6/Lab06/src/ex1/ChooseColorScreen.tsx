import React from 'react';
import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { ColorKey, Phone } from '../types';
import { PHONE_COLORS } from '../data/phone';
import { colors } from '../theme';
import type { SelectPhoneParamList } from './SelectPhoneApp';

type Props = NativeStackScreenProps<SelectPhoneParamList, 'ChooseColor'> & { phone: Phone };
const COLOR_ORDER: ColorKey[] = ['silver', 'red', 'black', 'blue'];

// Khi chọn màu, quay về màn Product và truyền màu mới qua params.
export function ChooseColorScreen({ navigation, route, phone }: Props) {
  const currentColor = route.params?.color ?? phone.defaultColor;
  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backRow}>
          <Text style={styles.backArrow}>‹</Text><Text style={styles.backText}>Quay lại</Text>
        </Pressable>
        <Text style={styles.title}>Chọn màu điện thoại</Text>
        <Text style={styles.subtitle}>{phone.name}</Text>
        {COLOR_ORDER.filter((key) => phone.colors.includes(key)).map((key) => {
          const item = PHONE_COLORS[key];
          const active = currentColor === key;
          return (
            <Pressable key={key} onPress={() => navigation.navigate('Product', { color: key })} style={[styles.option, active && styles.activeOption]}>
              <Image source={item.image} style={styles.thumb} resizeMode="contain" />
              <View style={[styles.swatch, { backgroundColor: item.hex }]} />
              <Text style={styles.optionLabel}>{item.label}</Text>
              <Text style={styles.check}>{active ? '✓ Đang chọn' : 'Chọn màu'}</Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.white },
  content: { padding: 18 },
  backRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  backArrow: { fontSize: 32, color: colors.red, marginRight: 8 },
  backText: { fontSize: 16, color: colors.text },
  title: { fontSize: 22, fontWeight: '800', color: colors.text },
  subtitle: { color: colors.muted, marginTop: 5, marginBottom: 16 },
  option: { flexDirection: 'row', alignItems: 'center', padding: 10, borderWidth: 1, borderColor: colors.border, borderRadius: 12, marginBottom: 10 },
  activeOption: { borderColor: colors.red, backgroundColor: '#FFF7F7' },
  thumb: { width: 54, height: 70 },
  swatch: { width: 22, height: 22, borderRadius: 11, borderWidth: 1, borderColor: '#BBBBBB', marginHorizontal: 12 },
  optionLabel: { flex: 1, fontSize: 16, fontWeight: '600', color: colors.text },
  check: { color: colors.red, fontSize: 12, fontWeight: '600' },
});