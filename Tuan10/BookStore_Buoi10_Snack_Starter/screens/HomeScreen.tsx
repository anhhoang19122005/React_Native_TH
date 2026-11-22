import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { CompositeScreenProps } from "@react-navigation/native";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList, TabParamList } from "../navigation";
import { loadBooks } from "../data/books";
import { normalize } from "../utils";
import type { Book } from "../types";
import BookCard from "../components/BookCard";
import { colors } from "../theme";

type Props = CompositeScreenProps<BottomTabScreenProps<TabParamList, "Home">, NativeStackScreenProps<RootStackParamList>>;

export function HomeScreen({ navigation }: Props) {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [isTile, setIsTile] = useState(false); // Switch "Dạng lưới"

  // TODO BT10.11c (Bonus, không bắt buộc): đọc từ API khi USE_API = true
  //   - import { USE_API } từ "../config"; import { fetchBooks, selectBooksState } từ "../store/booksSlice"
  //   - dispatch(fetchBooks()) trong useEffect khi USE_API bật; nguồn dữ liệu là state.books.items
  //   - đặt sourceBooks = (đang đọc mảng) ? books : api.items; categories và visible đều dùng sourceBooks
  //   - status "loading" hiện ActivityIndicator; status "failed" hiện thông báo lỗi, nút "Thử lại" (dispatch lại)
  //     và nút "Dùng dữ liệu mảng" (quay về đọc mảng); kéo để làm mới cũng dispatch(fetchBooks())
  // Lần đầu: tải mảng (có độ trễ giả lập) rồi tắt trạng thái loading
  useEffect(() => {
    loadBooks().then((data) => {
      setBooks(data);
      setLoading(false);
    });
  }, []);

  // TODO BT10.5b: kéo để làm mới
  //   setRefreshing(true) -> setBooks(await loadBooks()) -> setRefreshing(false)
  const onRefresh = useCallback(async () => {}, []);

  const categories = useMemo(() => Array.from(new Set(books.map((b) => b.category))), [books]);

  // TODO BT10.6: lọc theo category (null là tất cả) và theo keyword (so khớp tên hoặc tác giả,
  //   dùng normalize() để bỏ dấu); bọc trong useMemo với [books, keyword, category]
  const visible = useMemo(() => {
    let result = [...books];
    if (category !== null) {
      console.log("filtering category")
      result = result.filter((b) => b.category === category)
    }
    if (keyword !== "") {
      console.log("filtering keyword")
      result = result.filter((b) => normalize(b.title + " " + b.author).includes(normalize(keyword)))
    }
    return result;
  }, [books, keyword, category]);

  const onSelect = useCallback((id: string) => {
    // TODO BT10.7d: navigation.navigate("Detail", { id })
    navigation.navigate("Detail", {id})
  }, []);

  // TODO BT10.5a: numColumns = isTile ? 2 : 1
  const numColumns = isTile ? 2 : 1;

  return (
    // TODO BT10.1b: thay View bên dưới bằng SafeAreaView (edges={["top"]}) từ react-native-safe-area-context,
    //   đổi cả thẻ đóng </View> tương ứng ở cuối return thành </SafeAreaView>
    <SafeAreaView edges={["top"]} style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.title}>📚 BookStore</Text>
        <TextInput
          style={styles.search}
          placeholder="Tìm theo tên sách hoặc tác giả…"
          placeholderTextColor="#9AA3B8"
          value={keyword}
          onChangeText={setKeyword}
        />
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Dạng lưới</Text>
          <Switch value={isTile} onValueChange={setIsTile} testID="grid-switch" />
        </View>
      </View>

      <View style={styles.chips}>
        {[null, ...categories].map((c) => (
          <TouchableOpacity
            key={c ?? "all"}
            style={[styles.chip, category === c && styles.chipOn]}
            onPress={() => setCategory(c)}
            testID={`chip-${c ?? "all"}`}
          >
            <Text style={[styles.chipText, category === c && styles.chipTextOn]}>{c ?? "Tất cả"}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {loading ? (
        // TODO BT10.2b: hiển thị <ActivityIndicator size="large" color={colors.indigo} /> kèm chữ "Đang tải sách…"
        <View>
          <ActivityIndicator size="large" color={colors.indigo} />
          <Text style={styles.empty}>Đang tải…</Text>
        </View>
        
      ) : (
        // TODO BT10.2a: thay khối bên dưới bằng FlatList (data={visible}, keyExtractor) hiển thị tên, rating, ✅/❌
        // TODO BT10.3d: renderItem dùng <BookCard book={item} layout={isTile ? "tile" : "row"} onSelect={onSelect} />
        // TODO BT10.5a: key={String(numColumns)}, numColumns, columnWrapperStyle={isTile ? styles.columnWrapper : undefined}
        // TODO BT10.5b: refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        <FlatList
          key={String(numColumns)}
          numColumns={numColumns}
          columnWrapperStyle={isTile ? styles.columnWrapper : undefined}
          data={visible}
          keyExtractor={(book) => book.id.toString()}
          renderItem={({item}) => (
            <BookCard book={item} onSelect={onSelect} layout={isTile ? 'tile' : 'row'} isTile={isTile}/>
          )}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
          ListEmptyComponent={(<Text style={styles.empty}>Không tìm thấy sách phù hợp.</Text>)}
        />
        
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  header: { backgroundColor: colors.navy, paddingHorizontal: 14, paddingBottom: 12, paddingTop: 6, gap: 8 },
  title: { color: "#fff", fontSize: 22, fontWeight: "800" },
  search: { backgroundColor: "#fff", borderRadius: 10, paddingHorizontal: 12, paddingVertical: 9 },
  switchRow: { flexDirection: "row", alignItems: "center", justifyContent: "flex-end", gap: 8 },
  switchLabel: { color: "#D5DDF7", fontWeight: "600" },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: 8, paddingHorizontal: 14, paddingTop: 10 },
  chip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, backgroundColor: "#fff", borderWidth: 1, borderColor: colors.line },
  chipOn: { backgroundColor: colors.indigo, borderColor: colors.indigo },
  chipText: { color: colors.text, fontWeight: "600", fontSize: 13 },
  chipTextOn: { color: "#fff" },
  columnWrapper: { justifyContent: "space-between" },
  center: { flex: 1, alignItems: "center", justifyContent: "center", gap: 10 },
  errorTitle: { fontSize: 16, fontWeight: "700", color: colors.text },
  errorText: { color: colors.muted, textAlign: "center", paddingHorizontal: 24 },
  errorActions: { flexDirection: "row", gap: 10, marginTop: 6 },
  errBtn: { backgroundColor: colors.indigo, paddingHorizontal: 16, paddingVertical: 10, borderRadius: 10, borderWidth: 1, borderColor: colors.indigo },
  errBtnAlt: { backgroundColor: "#fff" },
  errBtnText: { color: "#fff", fontWeight: "700" },
  banner: { color: "#B42318", marginBottom: 8, textAlign: "center" },
  empty: { textAlign: "center", color: colors.muted, marginTop: 30 },
  plain: { fontSize: 15, color: colors.text, paddingVertical: 4 },
});
