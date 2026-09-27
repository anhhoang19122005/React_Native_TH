import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { BOOKS, CART_ITEMS } from './data';
import { useState } from 'react';
import BookDetailScreen from './src/screens/BookDetailScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { TabBar, TabKey } from './src/components/TabBar';
import { CartScreen } from './reference/bookstore-online-gio5/screens/CartScreen';


export default function App() {
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
  const [cartCount, setCartCount] = useState(0);
  const [activeTab, setActiveTab] = useState<TabKey>('cart');
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
        {activeTab === 'cart' ? (
          <CartScreen items={CART_ITEMS} />
        ) : (
          <Placeholder tab={activeTab} />
        )}
          <TabBar active={activeTab} onChange={setActiveTab} />
      </View>
    </SafeAreaView>
  );
}
function Placeholder({ tab }: { tab: TabKey }) {
  const note: Record<TabKey, string> = {
    home: 'Nội dung tab "Trang chủ" thuộc Giờ 4 — xem project bookstore-online-gio4.',
    category: 'Nội dung tab "Danh mục" thuộc Giờ 2 — xem project bookstore-online-gio2.',
    cart: '',
    account: 'Tài liệu gốc không mô tả tab này, để trống.',
  };
  return (
    <View style={styles.placeholder}>
      <Text style={styles.placeholderText}>{note[tab]}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#FFFFFF' },
  body: { flex: 1 },
  placeholder: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  placeholderText: { textAlign: 'center', color: '#5B6B7F' },
});

