import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, Pressable, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { PHONES } from './src/data/phone';
import { SelectPhoneApp } from './src/ex1/SelectPhoneApp';
// import { SelectPhoneApi } from './src/ex1/SelectPhoneApi';
// import { BottomTabApp } from './src/ex3/BottomTabApp';
// import { StackTabApp } from './src/ex4/StackTabApp';
// import { DrawerApp } from './src/ex5/DrawerApp';
import { colors } from './src/theme';
import { SelectPhoneApi } from './src/ex2/SelectPhoneApi';
import { BottomTabApp } from './src/ex3/BottomTabApp';
import { StackTabApp } from './src/ex4/StackTabApp';
import { DrawerApp } from './src/ex5/DrawerApp';

type Lesson = 'menu' | 'ex1' | 'ex2' | 'ex3' | 'ex4' | 'ex5';
const lessons: { id: Lesson; title: string; description: string }[] = [
  { id: 'ex1', title: 'Bài 1 · Select Phone', description: 'Stack navigation và truyền màu được chọn.' },
  { id: 'ex2', title: 'Bài 2 · Select Phone + API', description: 'fetch, loading, error và thử tải lại.' },
  { id: 'ex3', title: 'Bài 3 · Bottom Tab', description: 'Trang chủ, tìm kiếm và cá nhân.' },
  { id: 'ex4', title: 'Bài 4 · Stack + Tab + Favorites', description: 'Truyền id, màn chi tiết và Context.' },
  { id: 'ex5', title: 'Bài 5 · Drawer', description: 'Trang chủ, cá nhân và cài đặt Switch.' },
];

export default function App() {
  const [lesson, setLesson] = useState<Lesson>('menu');

  // Mỗi bài tự có NavigationContainer riêng; bấm quay về menu sẽ unmount bài đó.
  if (lesson === 'ex1') return <><StatusBar style="dark" /><SelectPhoneApp phone={PHONES[1]} /></>;
  if (lesson === 'ex2') return <><StatusBar style="dark" /><SelectPhoneApi /></>;
  if (lesson === 'ex3') return <><StatusBar style="dark" /><BottomTabApp /></>;
  if (lesson === 'ex4') return <><StatusBar style="dark" /><StackTabApp /></>;
  if (lesson === 'ex5') return <><StatusBar style="dark" /><DrawerApp /></>;

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.eyebrow}>THỰC HÀNH REACT NATIVE · LAB 06</Text>
        <Text style={styles.heading}>Navigation</Text>
        <Text style={styles.intro}>Chọn một bài để chạy thử. Mỗi bài là một ví dụ độc lập để bạn dễ quan sát cách điều hướng hoạt động.</Text>
        {lessons.map((item, index) => (
          <Pressable key={item.id} onPress={() => setLesson(item.id)} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
            <View style={styles.number}><Text style={styles.numberText}>{index + 1}</Text></View>
            <View style={styles.cardCopy}><Text style={styles.cardTitle}>{item.title}</Text><Text style={styles.cardDescription}>{item.description}</Text></View>
            <Text style={styles.chevron}>›</Text>
          </Pressable>
        ))}
        <Text style={styles.footer}>App.tsx là menu ở thư mục gốc. Các màn hình của từng bài nằm trong src/.</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background }, content: { padding: 20, paddingTop: 38, paddingBottom: 30 },
  eyebrow: { fontSize: 11, fontWeight: '800', letterSpacing: 1, color: colors.red }, heading: { fontSize: 32, fontWeight: '900', color: colors.text, marginTop: 8 },
  intro: { fontSize: 15, lineHeight: 22, color: colors.muted, marginTop: 10, marginBottom: 22 },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white, padding: 14, borderRadius: 14, marginBottom: 12, borderWidth: 1, borderColor: colors.border },
  pressed: { opacity: 0.7 }, number: { width: 42, height: 42, borderRadius: 12, backgroundColor: '#FFF0F0', alignItems: 'center', justifyContent: 'center' }, numberText: { color: colors.red, fontWeight: '900', fontSize: 18 },
  cardCopy: { flex: 1, marginLeft: 12 }, cardTitle: { color: colors.text, fontSize: 15, fontWeight: '800' }, cardDescription: { color: colors.muted, marginTop: 4, lineHeight: 18, fontSize: 12 },
  chevron: { color: colors.muted, fontSize: 28, paddingLeft: 8 }, footer: { color: colors.muted, fontSize: 12, marginTop: 12, lineHeight: 18 },
});