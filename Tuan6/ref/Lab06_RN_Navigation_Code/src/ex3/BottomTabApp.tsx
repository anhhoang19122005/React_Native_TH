import React, { useMemo, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { PHONES } from '../data/phones';
import { ProductRow } from '../components/ProductRow';
import { colors } from '../../theme';

 type TabParamList = { Home: undefined; Search: undefined; Profile: undefined };
const Tab = createBottomTabNavigator<TabParamList>();

function HomeScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.title}>Điện thoại nổi bật</Text>
      <FlatList data={PHONES} keyExtractor={(item) => item.id} contentContainerStyle={styles.list}
        renderItem={({ item }) => <ProductRow phone={item} onPress={() => alert(item.name)} />} />
    </SafeAreaView>
  );
}

function SearchScreen() {
  const [query, setQuery] = useState('');
  // useMemo lọc lại danh sách khi query thay đổi, tránh tính toán lại ở render không liên quan.
  const results = useMemo(() => PHONES.filter((phone) => phone.name.toLowerCase().includes(query.trim().toLowerCase())), [query]);
  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.title}>Tìm kiếm</Text>
      <TextInput value={query} onChangeText={setQuery} placeholder="Nhập tên điện thoại..." style={styles.input} />
      <FlatList data={results} keyExtractor={(item) => item.id} contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.empty}>Không tìm thấy sản phẩm phù hợp.</Text>}
        renderItem={({ item }) => <ProductRow phone={item} onPress={() => alert(item.name)} />} />
    </SafeAreaView>
  );
}

function ProfileScreen() {
  return (
    <SafeAreaView style={[styles.screen, styles.profile]}>
      <View style={styles.avatar}><Text style={styles.avatarText}>U</Text></View>
      <Text style={styles.profileName}>Người dùng React Native</Text>
      <Text style={styles.muted}>student@example.com</Text>
    </SafeAreaView>
  );
}

export function BottomTabApp() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: colors.red }}>
        <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Trang chủ', tabBarIcon: ({ color, size, focused }) => <Ionicons name={focused ? 'home' : 'home-outline'} color={color} size={size} /> }} />
        <Tab.Screen name="Search" component={SearchScreen} options={{ title: 'Tìm kiếm', tabBarIcon: ({ color, size, focused }) => <Ionicons name={focused ? 'search' : 'search-outline'} color={color} size={size} /> }} />
        <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Cá nhân', tabBarIcon: ({ color, size, focused }) => <Ionicons name={focused ? 'person' : 'person-outline'} color={color} size={size} /> }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background, padding: 16 },
  title: { fontSize: 22, fontWeight: '800', color: colors.text, marginBottom: 14 },
  list: { paddingBottom: 20 },
  input: { backgroundColor: colors.white, borderColor: colors.border, borderWidth: 1, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 12, marginBottom: 14 },
  empty: { textAlign: 'center', marginTop: 30, color: colors.muted },
  profile: { alignItems: 'center', justifyContent: 'center' },
  avatar: { width: 96, height: 96, borderRadius: 48, backgroundColor: colors.red, alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  avatarText: { color: colors.white, fontSize: 38, fontWeight: '800' },
  profileName: { fontSize: 20, fontWeight: '700', color: colors.text, marginBottom: 6 },
  muted: { color: colors.muted },
});