// GIỜ 4 — Bài tập 1: Màn hình Trang chủ hoàn chỉnh
// Ghép: Header (cố định, KHÔNG cuộn) + ScrollView (Chips + Grid, CUỘN được)
// + FloatingCartButton (absolute, cùng cấp với ScrollView, KHÔNG cuộn theo).

import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Header } from "../components/Header";
import { CategoryChips } from "../components/CategoryChips";
import { BookGrid } from "../components/BookGrid";
import { BOOKS } from "../../data";
import { FloatingCartButton } from "../components/FloatingCartButton";

export function HomeScreen({
    cartCount,
    onPressBook,
    onPressCart
} : {
    cartCount: number;
    onPressBook: (id:number) => void;
    onPressCart: () => void;
}) {
    return (
        <View style={styles.screen}>
            <Header/>
            <ScrollView style={styles.scroll}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.sectionTitle}>Danh mục</Text>
                <CategoryChips/>
                <Text style={styles.sectionTitle}>Sách nổi bật</Text>
                <BookGrid  books={BOOKS} onPressBook={onPressBook}/>
            </ScrollView>

            <FloatingCartButton count={cartCount} onPress={onPressCart}/>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "white",
    },
    scroll: {
        flex: 1,
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 140,
    },
    sectionTitle: {
        fontSize: 15,
        fontWeight: "700",
        color: "#111827",
        marginBottom: 10,
        marginTop: 4,
    },
});