import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { BOOKS } from './data';
import { useState } from 'react';
import BookDetailScreen from './src/screens/BookDetailScreen';
import { HomeScreen } from './src/screens/HomeScreen';


export default function App() {
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
  const [cartCount, setCartCount] = useState(0);
  const selectedBook = BOOKS.find((b) => b.id === selectedBookId) ?? null;
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.body}>
        {selectedBook ? (
          <BookDetailScreen book={selectedBook} 
          onBack={() => setSelectedBookId(null)} 
          onAddToCart={() => setCartCount((n) => n + 1)} />
        ) : (
          <HomeScreen
            cartCount={cartCount}
            onPressBook={(id) => setSelectedBookId(id)}
            onPressCart={() => console.log('Xem giỏ hàng (thuộc Giờ 5)')}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#FFFFFF' },
  body: { flex: 1 },
});
