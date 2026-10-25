import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';

// Báo lỗi và cung cấp nút để người dùng thử tải lại.
export function ErrorBox({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Không tải được dữ liệu</Text>
      <Text style={styles.message}>{message}</Text>
      <Pressable onPress={onRetry} style={styles.button}>
        <Text style={styles.buttonText}>Thử lại</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  title: { fontSize: 18, fontWeight: '700', color: colors.red, marginBottom: 8 },
  message: { textAlign: 'center', color: colors.muted, marginBottom: 18 },
  button: { backgroundColor: colors.red, paddingHorizontal: 24, paddingVertical: 11, borderRadius: 8 },
  buttonText: { color: colors.white, fontWeight: '700' },
});