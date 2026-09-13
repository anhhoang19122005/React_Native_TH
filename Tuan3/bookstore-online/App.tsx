import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Header } from './src/components/Header';
import { CategoryChips } from './src/components/CategoryChips';
import { BOOKS } from './data';
import { BookGrid } from './src/components/BookGrid';
import { FloatingCartButton } from './src/components/FloatingCartButton';
import { useState } from 'react';


export default function App() {
  const [cartCount, setCartCount] = useState(0);
  return (
    <View style= {styles.screen}>
      <Header/>
      <ScrollView contentContainerStyle={styles.content}>
        <CategoryChips/>
        <BookGrid books={BOOKS}  onPressBook={(id) => console.log("Open " + id)}/>
      </ScrollView>
      <FloatingCartButton count={cartCount} onPress={() => setCartCount(cartCount + 1)} />
      <StatusBar style='auto'/>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F8FAFC' },
  content: { 
    padding: 16, paddingBottom: 100 
  },
  });
