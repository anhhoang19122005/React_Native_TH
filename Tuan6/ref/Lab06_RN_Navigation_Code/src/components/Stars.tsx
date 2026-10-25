import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

// Hiển thị 5 ngôi sao; sao có chỉ số <= value sẽ được tô vàng.
export function Stars({ value }: { value: number }) {
  return (
    <View style={styles.row}>
      {Array.from({ length: 5 }, (_, index) => (
        <Text key={index} style={[styles.star, index < Math.round(value) ? styles.filled : styles.empty]}>
          ★
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
  star: { fontSize: 18, marginRight: 1 },
  filled: { color: '#F5A623' },
  empty: { color: '#D4D4D4' },
});