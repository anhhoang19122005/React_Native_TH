import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Switch, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { colors } from '../theme';

type DrawerParamList = { Home: undefined; Profile: undefined; Settings: undefined };
const Drawer = createDrawerNavigator<DrawerParamList>();

function HomeScreen() {
  return <SafeAreaView style={styles.screen}><Text style={styles.title}>Trang chủ</Text><Text style={styles.body}>Chào mừng bạn đến với bài thực hành Drawer Navigation.</Text><Text style={styles.body}>Mở menu bằng cách vuốt từ cạnh trái hoặc nhấn biểu tượng menu trên thanh tiêu đề.</Text></SafeAreaView>;
}
function ProfileScreen() {
  return <SafeAreaView style={styles.screen}><View style={styles.avatar}><Text style={styles.avatarText}>U</Text></View><Text style={styles.title}>Người dùng React Native</Text><Text style={styles.body}>student@example.com</Text></SafeAreaView>;
}
function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.title}>Cài đặt</Text>
      <View style={styles.settingRow}><View style={styles.settingText}><Text style={styles.label}>Thông báo</Text><Text style={styles.body}>Nhận thông báo mới</Text></View><Switch value={notifications} onValueChange={setNotifications} /></View>
      <View style={styles.settingRow}><View style={styles.settingText}><Text style={styles.label}>Chế độ tối</Text><Text style={styles.body}>Bật/tắt tùy chọn giao diện tối</Text></View><Switch value={darkMode} onValueChange={setDarkMode} /></View>
      <Text style={styles.note}>Trạng thái thông báo: {notifications ? 'Bật' : 'Tắt'}</Text>
      <Text style={styles.note}>Chế độ tối: {darkMode ? 'Bật' : 'Tắt'} (ví dụ minh họa)</Text>
    </SafeAreaView>
  );
}

export function DrawerApp() {
  return (
    <NavigationContainer>
      <Drawer.Navigator screenOptions={{ drawerActiveTintColor: colors.red, headerTintColor: colors.text }}>
        <Drawer.Screen name="Home" component={HomeScreen} options={{ title: 'Trang chủ' }} />
        <Drawer.Screen name="Profile" component={ProfileScreen} options={{ title: 'Cá nhân' }} />
        <Drawer.Screen name="Settings" component={SettingsScreen} options={{ title: 'Cài đặt' }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  screen: { flex: 1, padding: 22, backgroundColor: colors.white }, title: { fontSize: 23, fontWeight: '800', color: colors.text, marginBottom: 12 },
  body: { color: colors.muted, lineHeight: 22, marginBottom: 8 }, avatar: { width: 90, height: 90, borderRadius: 45, backgroundColor: colors.red, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginTop: 40, marginBottom: 18 },
  avatarText: { color: colors.white, fontSize: 36, fontWeight: '800' }, settingRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: colors.border }, settingText: { flex: 1 }, label: { fontSize: 16, fontWeight: '700', color: colors.text }, note: { marginTop: 12, color: colors.muted },
});